// src/pages/profile-details.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

// Create the Supabase client only if we have the required values
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export default function ProfileDetails() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get profile image from localStorage
  const profileImage = localStorage.getItem('profileImageUrl') || '';
  
  // Form fields
  const [name, setName] = useState(user?.fullName || localStorage.getItem('signupName') || '');
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || localStorage.getItem('signupEmail') || '');
  const [username, setUsername] = useState(localStorage.getItem('signupUsername') || '');
  const [aboutMe, setAboutMe] = useState('');
  const [numberOfKids, setNumberOfKids] = useState(0);
  const [children, setChildren] = useState<Array<{age: string, nickname: string}>>([]);
  const [usernameAvailable, setUsernameAvailable] = useState(true); // Assume true since it's from signup

  // Age options for children
  const ageOptions = ["0-1 Years", "2-5 Years", "6-10 Years", "11-15 Years", "16+ Years"];

  // Update children array when number of kids changes
  useEffect(() => {
    const newChildren = [...children];
    
    // Add children if needed
    while (newChildren.length < numberOfKids) {
      newChildren.push({ age: ageOptions[0], nickname: '' });
    }
    
    // Remove children if needed
    while (newChildren.length > numberOfKids) {
      newChildren.pop();
    }
    
    setChildren(newChildren);
  }, [numberOfKids]);

  // Update child information
  const updateChild = (index: number, field: 'age' | 'nickname', value: string) => {
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setChildren(newChildren);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Check if Supabase is initialized
      if (!supabase) {
        throw new Error('Supabase client not initialized. Check your environment variables.');
      }
      
      // Insert user profile into Supabase
      const { data, error: supabaseError } = await supabase
        .from('profiles')
        .insert([
          { 
            name, 
            email, 
            username, 
            about_me: aboutMe,
            number_of_kids: numberOfKids,
            children: children,
            profile_image_url: profileImage,
            user_id: user?.id
          }
        ]);
      
      if (supabaseError) throw supabaseError;
      
      // Navigate to the next page on success
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Profile save error:', err);
      setError(err.message || 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/lovable-uploads/hearts-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(247, 201, 199, 0.7)",
          backdropFilter: "blur(4px)",
          border: "2px solid white",
          borderRadius: "24px",
          padding: "2rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {/* Profile image preview */}
        {profileImage && (
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <img 
              src={profileImage} 
              alt="Profile" 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #8E294F',
              }}
            />
          </div>
        )}
        
        <h2 style={{ color: "#8E294F", marginBottom: "1.5rem", textAlign: "center" }}>
          Complete Your Profile
        </h2>
        
        {/* Error message */}
        {error && (
          <div style={{ 
            color: "red", 
            marginBottom: "1rem",
            padding: "0.5rem",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            borderRadius: "4px"
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Name field - Read Only */}
          <div style={{ marginBottom: "1rem" }}>
            <label 
              htmlFor="name" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#8E294F",
                fontWeight: "bold"
              }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              readOnly
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                backgroundColor: "#f5f5f5", // Gray background to indicate read-only
              }}
            />
          </div>
          
          {/* Email field - Read Only */}
          <div style={{ marginBottom: "1rem" }}>
            <label 
              htmlFor="email" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#8E294F",
                fontWeight: "bold"
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              readOnly
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                backgroundColor: "#f5f5f5", // Gray background to indicate read-only
              }}
            />
          </div>
          
          {/* Username field - Read Only */}
          <div style={{ marginBottom: "1rem" }}>
            <label 
              htmlFor="username" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#8E294F",
                fontWeight: "bold"
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              readOnly
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                backgroundColor: "#f5f5f5", // Gray background to indicate read-only
              }}
            />
            <div style={{ 
              fontSize: "0.8rem", 
              color: "green",
              marginTop: "0.25rem"
            }}>
              Username is available!
            </div>
          </div>
          
          {/* About Me field with character counter */}
          <div style={{ marginBottom: "1rem" }}>
            <label 
              htmlFor="aboutMe" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#8E294F",
                fontWeight: "bold"
              }}
            >
              About me
            </label>
            <textarea
              id="aboutMe"
              value={aboutMe}
              onChange={(e) => {
                // Limit to 300 characters
                if (e.target.value.length <= 300) {
                  setAboutMe(e.target.value);
                }
              }}
              rows={3}
              maxLength={300}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
            <div style={{ 
              fontSize: "0.8rem", 
              color: aboutMe.length > 250 ? "#8E294F" : "gray",
              textAlign: "right",
              marginTop: "0.25rem"
            }}>
              {aboutMe.length}/300 characters
            </div>
          </div>
          
          {/* Number of children field */}
          <div style={{ marginBottom: "1rem" }}>
            <label 
              htmlFor="numberOfKids" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#8E294F",
                fontWeight: "bold"
              }}
            >
              Number of children
            </label>
            <select
              id="numberOfKids"
              value={numberOfKids}
              onChange={(e) => setNumberOfKids(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                backgroundColor: "white"
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          
          {/* Children fields */}
          {children.map((child, index) => (
            <div key={index} style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "8px" }}>
              <h3 style={{ color: "#8E294F", marginBottom: "1rem" }}>Child {index + 1}</h3>
              
              <div style={{ marginBottom: "1rem" }}>
                <label 
                  htmlFor={`child-${index}-age`} 
                  style={{ 
                    display: "block", 
                    marginBottom: "0.5rem", 
                    color: "#8E294F",
                    fontWeight: "bold"
                  }}
                >
                  Child {index + 1} Age
                </label>
                <select
                  id={`child-${index}-age`}
                  value={child.age}
                  onChange={(e) => updateChild(index, 'age', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                    backgroundColor: "white"
                  }}
                >
                  {ageOptions.map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label 
                  htmlFor={`child-${index}-nickname`} 
                  style={{ 
                    display: "block", 
                    marginBottom: "0.5rem", 
                    color: "#8E294F",
                    fontWeight: "bold"
                  }}
                >
                  Child {index + 1} Nickname
                </label>
                <input
                  id={`child-${index}-nickname`}
                  type="text"
                  value={child.nickname}
                  onChange={(e) => updateChild(index, 'nickname', e.target.value)}
                  placeholder="Optional"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>
          ))}
          
          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: "#8E294F",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem",
              width: "100%",
              fontSize: "1rem",
              cursor: "pointer",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}