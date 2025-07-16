// src/pages/profile-setup.tsx
import React, { useState, useRef } from "react";

export default function ProfileSetup() {
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Use FileReader for reliable image preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Function to trigger file input click
  const openFileSelector = () => {
    // This will open your computer's file browser
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#8E294F", marginBottom: "1.5rem" }}>
          Upload your profile photo
        </h2>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          style={{ display: "none" }}
          id="profile-image"
        />
        
        <div style={{ marginBottom: "1.5rem" }}>
          {/* Clickable circle */}
          <div
            onClick={openFileSelector}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "2px solid #8E294F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              backgroundColor: "white",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div style={{ color: "#8E294F", fontWeight: "bold" }}>CLICK HERE</div>
            )}
          </div>
          
          {/* Clickable text */}
          <p 
            onClick={openFileSelector}
            style={{ 
              color: "#8E294F", 
              marginTop: "0.5rem",
              cursor: "pointer" 
            }}
          >
            Click to upload/change
          </p>
        </div>
        
        <button
          style={{
            backgroundColor: "#8E294F",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem",
            width: "100%",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
