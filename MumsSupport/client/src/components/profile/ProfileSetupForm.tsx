import React from 'react';
import heartsBg from "../../assets/hearts-bg.png";

interface ProfileData {
  profile_image_url: string;
  full_name: string;
  username: string;
  email: string;
  about_me: string;
  children_count: number;
  child_1_group: string;
  child_1_nickname: string;
  child_2_group: string;
  child_2_nickname: string;
  child_3_group: string;
  child_3_nickname: string;
  child_4_group: string;
  child_4_nickname: string;
  child_5_group: string;
  child_5_nickname: string;
  gender: string;
}

interface ProfileSetupFormProps {
  profileData: ProfileData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  uploading: boolean;
  loading: boolean;
  isFormValid: boolean;
}

const ProfileSetupForm: React.FC<ProfileSetupFormProps> = ({
  profileData,
  onInputChange,
  onImageUpload,
  onSave,
  uploading,
  loading,
  isFormValid
}) => {
  // Character limit for About Me
  const aboutMeMaxLength = 300;
  const aboutMeRemaining = aboutMeMaxLength - (profileData.about_me?.length || 0);
  
  // Styles
  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    fontFamily: 'Bodoni Moda, serif',
    color: '#8E294F'
  } as React.CSSProperties;
  
  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
    color: '#8E294F',
  } as React.CSSProperties;

  // Style for read-only inputs
  const readOnlyInputStyle = {
    ...inputStyle,
    backgroundColor: '#f0f0f0', // Light gray background for read-only fields
    cursor: 'not-allowed',
  } as React.CSSProperties;
  
  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#8E294F',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'Bodoni Moda, serif',
  } as React.CSSProperties;
  
  // Render children inputs based on count
  const renderChildInputs = () => {
    const inputs = [];
    const count = typeof profileData.children_count === 'string' 
      ? parseInt(profileData.children_count, 10) // Always use radix with parseInt
      : profileData.children_count;
    
    for (let i = 1; i <= count; i++) {
      inputs.push(
        <div key={i} style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '8px' }}>
          <h3 style={{ color: '#8E294F', marginBottom: '15px', fontFamily: 'Bodoni Moda, serif' }}>Child {i}</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Child {i} Age</label>
            <select 
              name={`child_${i}_group`}
              value={profileData[`child_${i}_group` as keyof ProfileData] as string}
              onChange={onInputChange}
              style={inputStyle}
            >
              <option value="">Select age group</option>
              <option value="0-1 Years">0-1 Years</option>
              <option value="2-5 Years">2-5 Years</option>
            </select>
          </div>
          
          <div>
            <label style={labelStyle}>Child {i} Nickname</label>
            <input
              type="text"
              name={`child_${i}_nickname`}
              value={profileData[`child_${i}_nickname` as keyof ProfileData] as string}
              onChange={onInputChange}
              placeholder="Enter a nickname"
              style={inputStyle}
            />
          </div>
        </div>
      );
    }
    
    return inputs;
  };

  const handleSaveClick = () => {
    console.log("Save button clicked");
    onSave();
  };

  // Determine which image to display (uploaded or placeholder)
  // IMPORTANT: Replace "your-placeholder-image-url.jpg" with the actual path to your placeholder image.
  // This image should be in your public folder so you can reference it directly.
  const displayImageUrl = profileData.profile_image_url || "/your-placeholder-image.png"; 

  return (
    <div
      style={{
        backgroundImage: `url(${heartsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        margin: 0,
        padding: "20px 0",
      }}
    >
      <div style={{
        width: "90%",
        maxWidth: "380px",
        padding: "20px 30px",
        backgroundColor: "rgba(247, 201, 199, 0.7)",
        backdropFilter: "blur(4px)",
        borderRadius: "8px",
        border: "2px solid white",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '20px', 
          fontSize: '28px',
          fontFamily: 'Bodoni Moda, serif',
          color: '#8E294F'
        }}>
          Complete Your Profile
        </h1>
        
        <div> {/* Main form content container */}
          {/* Profile Image Display and Upload */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}> {/* Centered container */}
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}> {/* Centered image */}
              <img
                src={displayImageUrl}
                alt="Profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid white',
                }}
              />
            </div>

            <label style={{
              padding: '10px 15px',
              backgroundColor: '#8E294F',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'Bodoni Moda, serif',
              display: 'inline-block'
            }}>
              {uploading ? 'Uploading...' : 'Upload Photo'}
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                style={{ display: 'none' }}
                disabled={uploading}
              />
            </label>
          </div>
          
          {/* Name - READ-ONLY */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              name="full_name"
              value={profileData.full_name}
              onChange={onInputChange}
              required
              readOnly // Made read-only
              style={readOnlyInputStyle} // Apply read-only style
            />
          </div>
          
          {/* Username - READ-ONLY */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={onInputChange}
              required
              readOnly // Made read-only
              style={readOnlyInputStyle} // Apply read-only style
            />
            {profileData.username && (
              <div style={{ fontSize: '14px', color: '#4CAF50', marginTop: '5px' }}>
                Username is available!
              </div>
            )}
          </div>

          {/* Email - NEW & READ-ONLY */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={onInputChange}
              required
              readOnly // Made read-only
              style={readOnlyInputStyle} // Apply read-only style
            />
          </div>

          {/* About Me - WITH CHARACTER COUNTER */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>About me</label>
            <textarea
              name="about_me"
              value={profileData.about_me}
              onChange={onInputChange}
              maxLength={aboutMeMaxLength}
              style={{...inputStyle, minHeight: '100px'}}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '14px',
              color: aboutMeRemaining < 30 ? '#A5166' : '#8E294F', // Corrected color code
              marginTop: '5px',
              fontFamily: 'Bodoni Moda, serif'
            }}>
              {aboutMeRemaining} characters remaining
            </div>
          </div>
          
          {/* Number of Children */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Number of children</label>
            <select
              name="children_count"
              value={profileData.children_count}
              onChange={onInputChange}
              style={inputStyle}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          
          {/* Child Inputs */}
          {profileData.children_count > 0 && renderChildInputs()}
          
          {/* Save Button - Simplified */}
          <div style={{ marginTop: '20px' }}>
            <button
              type="button"
              onClick={handleSaveClick}
              style={buttonStyle}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupForm;