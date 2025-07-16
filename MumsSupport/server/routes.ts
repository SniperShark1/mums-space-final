import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { getClerkUser } from "./clerk";
import { searchLocalResources, LocalResource } from "./perplexity";
import { 
  insertPostSchema, 
  insertCommentSchema,
  insertGroupSchema,
  insertGroupMemberSchema,
  insertMessageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // User route (for Clerk integration)
  app.get('/api/clerk-user', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
      // Extract userId from session in clerkMiddleware
      const session = (req as any).clerkSession;
      if (!session || !session.sub) {
        return res.status(401).json({ message: 'Invalid session' });
      }

      const clerkUser = await getClerkUser(session.sub);
      if (!clerkUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Format the response in a way that matches our app's user model
      const user = {
        id: 1, // We'd normally get this from our database
        username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress || '',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        displayName: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : (clerkUser.username || ''),
        memberType: 'Member', // Default
        bio: clerkUser.publicMetadata?.bio as string || '',
        avatar: clerkUser.imageUrl
      };

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user data' });
    }
  });

  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost({
        ...postData,
        userId: req.user!.id,
      });
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const postId = parseInt(req.params.id);
      const post = await storage.getPostById(postId);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      if (post.userId !== req.user!.id) {
        return res.status(403).json({ message: "Not authorized to delete this post" });
      }
      
      const success = await storage.deletePost(postId);
      if (success) {
        res.status(200).json({ message: "Post deleted successfully" });
      } else {
        res.status(500).json({ message: "Failed to delete post" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  app.post("/api/posts/:id/like", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const postId = parseInt(req.params.id);
      const post = await storage.likePost(postId);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to like post" });
    }
  });

  app.post("/api/posts/:id/unlike", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const postId = parseInt(req.params.id);
      const post = await storage.unlikePost(postId);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to unlike post" });
    }
  });

  // Comments routes
  app.get("/api/posts/:id/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const comments = await storage.getCommentsByPostId(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/posts/:id/comments", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const postId = parseInt(req.params.id);
      const commentData = insertCommentSchema.parse({ ...req.body, postId });
      
      const post = await storage.getPostById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const comment = await storage.createComment({
        ...commentData,
        userId: req.user!.id,
      });
      
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Groups routes
  app.get("/api/groups", async (req, res) => {
    try {
      const groups = await storage.getGroups();
      res.json(groups);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch groups" });
    }
  });

  app.get("/api/groups/:id", async (req, res) => {
    try {
      const groupId = parseInt(req.params.id);
      const group = await storage.getGroupById(groupId);
      
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      res.json(group);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch group" });
    }
  });

  app.post("/api/groups", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const groupData = insertGroupSchema.parse(req.body);
      const group = await storage.createGroup(groupData);
      res.status(201).json(group);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create group" });
    }
  });

  app.post("/api/groups/:id/join", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const groupId = parseInt(req.params.id);
      const group = await storage.getGroupById(groupId);
      
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      const groupMember = await storage.joinGroup({
        groupId,
        userId: req.user!.id,
      });
      
      res.status(201).json(groupMember);
    } catch (error) {
      res.status(500).json({ message: "Failed to join group" });
    }
  });

  app.post("/api/groups/:id/leave", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const groupId = parseInt(req.params.id);
      const success = await storage.leaveGroup(groupId, req.user!.id);
      
      if (success) {
        res.status(200).json({ message: "Left group successfully" });
      } else {
        res.status(404).json({ message: "Group membership not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to leave group" });
    }
  });

  // Messages routes
  app.get("/api/messages", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const messages = await storage.getMessagesByUser(req.user!.id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const messageData = insertMessageSchema.parse({
        ...req.body,
        senderId: req.user!.id
      });
      
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  app.post("/api/messages/:id/read", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

    try {
      const messageId = parseInt(req.params.id);
      const message = await storage.markMessageAsRead(messageId);
      
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  // Daily quote
  app.get("/api/quote", async (req, res) => {
    try {
      const quote = await storage.getRandomQuote();
      
      if (!quote) {
        return res.status(404).json({ message: "No quotes available" });
      }
      
      res.json(quote);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  // Help resources with Perplexity AI
  app.get("/api/local-resources", async (req, res) => {
    try {
      const location = req.query.location as string;
      
      if (!location || location.trim() === '') {
        return res.status(400).json({ message: "Location is required" });
      }

      if (!process.env.PERPLEXITY_API_KEY) {
        return res.status(503).json({ 
          message: "Service unavailable: API key not configured",
          needsKey: true
        });
      }
      
      const resources = await searchLocalResources(location);
      res.json(resources);
    } catch (error) {
      console.error('Error fetching local resources:', error);
      res.status(500).json({ 
        message: "Failed to fetch local resources",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
