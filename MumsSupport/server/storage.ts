import { 
  users, type User, type InsertUser, 
  posts, type Post, type InsertPost,
  comments, type Comment, type InsertComment,
  groups, type Group, type InsertGroup,
  groupMembers, type GroupMember, type InsertGroupMember,
  messages, type Message, type InsertMessage,
  quotes, type Quote, type InsertQuote,
  type PostWithUser
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Post methods
  getPosts(): Promise<PostWithUser[]>;
  getPostById(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  deletePost(id: number): Promise<boolean>;
  likePost(id: number): Promise<Post | undefined>;
  unlikePost(id: number): Promise<Post | undefined>;
  
  // Comment methods
  getCommentsByPostId(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Group methods
  getGroups(): Promise<Group[]>;
  getGroupById(id: number): Promise<Group | undefined>;
  createGroup(group: InsertGroup): Promise<Group>;
  joinGroup(groupMember: InsertGroupMember): Promise<GroupMember>;
  leaveGroup(groupId: number, userId: number): Promise<boolean>;
  
  // Message methods
  getMessagesByUser(userId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  
  // Quote methods
  getRandomQuote(): Promise<Quote | undefined>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private groups: Map<number, Group>;
  private groupMembers: Map<number, GroupMember>;
  private messages: Map<number, Message>;
  private quotes: Map<number, Quote>;
  
  sessionStore: session.SessionStore;
  
  currentUserId: number;
  currentPostId: number;
  currentCommentId: number;
  currentGroupId: number;
  currentGroupMemberId: number;
  currentMessageId: number;
  currentQuoteId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.groups = new Map();
    this.groupMembers = new Map();
    this.messages = new Map();
    this.quotes = new Map();
    
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.currentCommentId = 1;
    this.currentGroupId = 1;
    this.currentGroupMemberId = 1;
    this.currentMessageId = 1;
    this.currentQuoteId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
    
    // Seed some quotes
    this.seedQuotes();
    
    // Seed some groups
    this.seedGroups();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Post methods
  async getPosts(): Promise<PostWithUser[]> {
    const postsList = Array.from(this.posts.values());
    
    // Sort by created date, newest first
    postsList.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
    
    // Attach user data to posts
    const postsWithUsers: PostWithUser[] = [];
    
    for (const post of postsList) {
      const user = this.users.get(post.userId);
      
      if (user) {
        postsWithUsers.push({
          ...post,
          user: {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            avatar: user.avatar || null,
            memberType: user.memberType || null,
          }
        });
      }
    }
    
    return postsWithUsers;
  }
  
  async getPostById(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }
  
  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const post: Post = { 
      ...insertPost, 
      id, 
      createdAt: new Date(),
      likes: 0,
      commentsCount: 0
    };
    this.posts.set(id, post);
    return post;
  }
  
  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }
  
  async likePost(id: number): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      this.posts.set(id, post);
      return post;
    }
    return undefined;
  }
  
  async unlikePost(id: number): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (post && post.likes && post.likes > 0) {
      post.likes = post.likes - 1;
      this.posts.set(id, post);
      return post;
    }
    return undefined;
  }
  
  // Comment methods
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.postId === postId
    );
  }
  
  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = { 
      ...insertComment, 
      id, 
      createdAt: new Date() 
    };
    this.comments.set(id, comment);
    
    // Update post comments count
    const post = this.posts.get(insertComment.postId);
    if (post) {
      post.commentsCount = (post.commentsCount || 0) + 1;
      this.posts.set(post.id, post);
    }
    
    return comment;
  }
  
  // Group methods
  async getGroups(): Promise<Group[]> {
    return Array.from(this.groups.values());
  }
  
  async getGroupById(id: number): Promise<Group | undefined> {
    return this.groups.get(id);
  }
  
  async createGroup(insertGroup: InsertGroup): Promise<Group> {
    const id = this.currentGroupId++;
    const group: Group = { ...insertGroup, id };
    this.groups.set(id, group);
    return group;
  }
  
  async joinGroup(insertGroupMember: InsertGroupMember): Promise<GroupMember> {
    const id = this.currentGroupMemberId++;
    const groupMember: GroupMember = { ...insertGroupMember, id };
    this.groupMembers.set(id, groupMember);
    
    // Update group member count
    const group = this.groups.get(insertGroupMember.groupId);
    if (group) {
      group.memberCount = (group.memberCount || 0) + 1;
      this.groups.set(group.id, group);
    }
    
    return groupMember;
  }
  
  async leaveGroup(groupId: number, userId: number): Promise<boolean> {
    const groupMemberEntry = Array.from(this.groupMembers.entries()).find(
      ([_, member]) => member.groupId === groupId && member.userId === userId
    );
    
    if (groupMemberEntry) {
      const [id] = groupMemberEntry;
      const success = this.groupMembers.delete(id);
      
      // Update group member count
      if (success) {
        const group = this.groups.get(groupId);
        if (group && group.memberCount && group.memberCount > 0) {
          group.memberCount = group.memberCount - 1;
          this.groups.set(group.id, group);
        }
      }
      
      return success;
    }
    
    return false;
  }
  
  // Message methods
  async getMessagesByUser(userId: number): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      (message) => message.senderId === userId || message.receiverId === userId
    );
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(),
      isRead: false
    };
    this.messages.set(id, message);
    return message;
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (message) {
      message.isRead = true;
      this.messages.set(id, message);
      return message;
    }
    return undefined;
  }
  
  // Quote methods
  async getRandomQuote(): Promise<Quote | undefined> {
    const quotesList = Array.from(this.quotes.values());
    if (quotesList.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * quotesList.length);
    return quotesList[randomIndex];
  }
  
  // Seed data
  private seedQuotes() {
    const quotes = [
      {
        content: "You don't have to be perfect to be a wonderful mother. Your children need your love, not your perfection.",
        author: "Unknown"
      },
      {
        content: "The days are long, but the years are short.",
        author: "Gretchen Rubin"
      },
      {
        content: "Being a mother is learning about strengths you didn't know you had.",
        author: "Linda Wooten"
      },
      {
        content: "It's not what you do for your children, but what you have taught them to do for themselves.",
        author: "Ann Landers"
      },
      {
        content: "To the world you may be one person, but to one person you may be the world.",
        author: "Dr. Seuss"
      }
    ];
    
    quotes.forEach(quote => {
      const id = this.currentQuoteId++;
      this.quotes.set(id, { id, ...quote });
    });
  }
  
  private seedGroups() {
    const groups = [
      // Location-based groups
      {
        name: "Riverside Mums",
        description: "Weekly coffee meetups, weekend playdates, and monthly workshops for mums with children under 5.",
        imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "Riverside Park",
        distance: "5.2 miles",
        memberCount: 86
      },
      {
        name: "Mum & Baby Yoga",
        description: "Gentle yoga classes that welcome babies and toddlers. Relaxation and community for post-natal recovery.",
        imageUrl: "https://images.unsplash.com/photo-1591538749349-5b809fda551d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "Community Center",
        distance: "2.8 miles",
        memberCount: 42
      },
      {
        name: "Single Mums Support",
        description: "A supportive community for single mothers to share experiences and provide mutual support.",
        imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "Online",
        distance: "Virtual",
        memberCount: 124
      },
      
      // Age-based groups (Mum's Circles)
      {
        name: "Newborn Mums Circle 👶",
        description: "For mothers with newborns and babies (0-2 years). Discussions about sleep training, first foods, and developmental milestones.",
        imageUrl: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "Online & Local",
        distance: "Virtual",
        memberCount: 97,
        type: "age-group",
        ageGroup: "newborn",
        emoji: "👶"
      },
      {
        name: "Toddler Mums Circle 🚼",
        description: "For mothers with toddlers (2-5 years). Share the joys and challenges of the toddler years, from potty training to tantrums and everything in between.",
        imageUrl: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "Online",
        distance: "Virtual",
        memberCount: 83,
        type: "age-group",
        ageGroup: "toddler",
        emoji: "🚼"
      },
      {
        name: "School-age Mums Circle 🎒",
        description: "For mothers with school-age children (5-13 years). Navigate school choices, homework struggles, extracurricular activities, and helping children develop socially.",
        imageUrl: "https://images.unsplash.com/photo-1503676382389-4809596d5290?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "Online",
        distance: "Virtual",
        memberCount: 76,
        type: "age-group",
        ageGroup: "school",
        emoji: "🎒"
      },
      {
        name: "Teen Mums Circle 🎓",
        description: "A safe space for mums raising teenagers (13-18 years) to share experiences, seek advice, and support one another through the teenage years.",
        imageUrl: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "Online",
        distance: "Virtual",
        memberCount: 62,
        type: "age-group",
        ageGroup: "teen",
        emoji: "🎓"
      },
      {
        name: "Adult Children Mums Circle 🏡",
        description: "For mothers with adult children (18+ years). Discuss maintaining relationships with grown children, supporting their independence, and embracing this new chapter.",
        imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        location: "Online",
        distance: "Virtual",
        memberCount: 58,
        type: "age-group",
        ageGroup: "adult",
        emoji: "🏡"
      }
    ];
    
    groups.forEach(group => {
      const id = this.currentGroupId++;
      this.groups.set(id, { id, ...group });
    });
  }
}

export const storage = new MemStorage();
