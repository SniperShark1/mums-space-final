import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabaseClient } from '../lib/supabase';

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

export const useProfileSetupActions = (
  profileData: ProfileData,
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>
) => {
  const { user } = useUser();
  const [uploading, setUploading] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for children_count
    if (name === 'children_count') {
      const count = parseInt(value);
      setProfileData(prev => ({
        ...prev,
        children_count: count
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle image upload - UPDATED TO USE CLERK
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setUploading(true);
    
    try {
      // Upload directly to Clerk
      await user?.setProfileImage({ file });
      
      // Get the profile image URL from Clerk
      const profileImageUrl = user?.profileImageUrl;
      
      // Update profile data with Clerk image URL
      setProfileData(prev => ({
        ...prev,
        profile_image_url: profileImageUrl || ''
      }));
      
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };
  
  // Save profile data
  const handleSave = async () => {
    console.log("handleSave called");
    if (!user) {
      console.log("No user found, cannot save");
      return false;
    }
    
    try {
      console.log("Preparing data for Supabase");
      // Prepare data for Supabase
      const dataToSave = {
        user_id: user.id,
        ...profileData,
        // Make sure we're using the latest profile image URL from Clerk
        profile_image_url: user.profileImageUrl || profileData.profile_image_url,
        updated_at: new Date().toISOString()
      };
      
      console.log("Data to save:", dataToSave);
      
      // Save to Supabase
      console.log("Sending data to Supabase");
      const { error } = await supabaseClient
        .from('user_profiles')
        .upsert(dataToSave, { onConflict: 'user_id' });
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      console.log("Profile saved successfully");
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  };
  
  // Check if form is valid
  const isFormValid = Boolean(
    profileData.full_name && 
    profileData.username &&
    // If there are children, validate their required fields
    (profileData.children_count === 0 || 
      Array.from({length: profileData.children_count}, (_, i) => i + 1).every(i => 
        profileData[`child_${i}_group` as keyof ProfileData]
      )
    )
  );
  
  return {
    handleInputChange,
    handleImageUpload,
    handleSave,
    isFormValid,
    uploading
  };
};