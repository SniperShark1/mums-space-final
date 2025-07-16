import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  color?: string;
}

export const FlowerIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <circle fill="#FFE066" cx="12" cy="12" r="4" />
      <path 
        d="M8,6 C8,3.79 9.79,2 12,2 C14.71,2 17,3.68 17.97,5.92 C18.68,4.75 20,4 21.5,4 C23.71,4 25.5,5.79 25.5,8 C25.5,10.71 23.82,13 21.58,13.97 C22.75,14.68 23.5,16 23.5,17.5 C23.5,19.71 21.71,21.5 19.5,21.5 C16.79,21.5 14.5,19.82 13.53,17.58 C12.82,18.75 11.5,19.5 10,19.5 C7.79,19.5 6,17.71 6,15.5 C6,12.79 7.68,10.5 9.92,9.53 C8.75,8.82 8,7.5 8,6 Z" 
        fill="#FF80AB" 
        transform="translate(-4, -0.5)"
      />
    </g>
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <g fill="none" stroke="none">
      <path
        fill={color}
        d="M21,20 L15,20 L15,13 L9,13 L9,20 L3,20 L3,9.97 L12,3.27 L21,9.97 L21,20 Z M19,18 L19,10.7 L12,5.27 L5,10.7 L5,18 L7,18 L7,11 L17,11 L17,18 L19,18 Z"
      />
      <rect fill={color} x="8" y="4" width="2" height="2" rx="0.5" />
      <rect fill={color} x="14" y="4" width="2" height="2" rx="0.5" />
      <rect fill={color} x="11" y="16" width="2" height="4" rx="0.5" />
    </g>
  </svg>
);

export const GroupsIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <path
      fill={color}
      d="M16,11 C17.66,11 18.99,9.66 18.99,8 C18.99,6.34 17.66,5 16,5 C14.34,5 13,6.34 13,8 C13,9.66 14.34,11 16,11 Z M8,11 C9.66,11 10.99,9.66 10.99,8 C10.99,6.34 9.66,5 8,5 C6.34,5 5,6.34 5,8 C5,9.66 6.34,11 8,11 Z M8,13 C5.67,13 1,14.17 1,16.5 L1,19 L15,19 L15,16.5 C15,14.17 10.33,13 8,13 Z M16,13 C15.71,13 15.38,13.02 15.03,13.05 C16.19,13.89 17,15.02 17,16.5 L17,19 L23,19 L23,16.5 C23,14.17 18.33,13 16,13 Z"
    />
  </svg>
);

export const MessagesIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <path
      fill={color}
      d="M20,2 L4,2 C2.9,2 2,2.9 2,4 L2,22 L6,18 L20,18 C21.1,18 22,17.1 22,16 L22,4 C22,2.9 21.1,2 20,2 Z M8,14 L16,14 C16.55,14 17,14.45 17,15 C17,15.55 16.55,16 16,16 L8,16 C7.45,16 7,15.55 7,15 C7,14.45 7.45,14 8,14 Z M16,12 L8,12 C7.45,12 7,11.55 7,11 C7,10.45 7.45,10 8,10 L16,10 C16.55,10 17,10.45 17,11 C17,11.55 16.55,12 16,12 Z M16,8 L8,8 C7.45,8 7,7.55 7,7 C7,6.45 7.45,6 8,6 L16,6 C16.55,6 17,6.45 17,7 C17,7.55 16.55,8 16,8 Z"
    />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <path
      fill={color}
      d="M19.14,12.94 C19.18,12.64 19.2,12.33 19.2,12 C19.2,11.68 19.18,11.36 19.13,11.06 L21.16,9.48 C21.34,9.34 21.39,9.07 21.28,8.87 L19.36,5.55 C19.24,5.33 18.99,5.26 18.77,5.33 L16.38,6.29 C15.88,5.91 15.35,5.59 14.76,5.35 L14.4,2.81 C14.36,2.57 14.16,2.4 13.92,2.4 L10.08,2.4 C9.84,2.4 9.65,2.57 9.61,2.81 L9.25,5.35 C8.66,5.59 8.12,5.92 7.63,6.29 L5.24,5.33 C5.02,5.25 4.77,5.33 4.65,5.55 L2.74,8.87 C2.62,9.08 2.66,9.34 2.86,9.48 L4.89,11.06 C4.84,11.36 4.8,11.69 4.8,12 C4.8,12.31 4.82,12.64 4.87,12.94 L2.84,14.52 C2.66,14.66 2.61,14.93 2.72,15.13 L4.64,18.45 C4.76,18.67 5.01,18.74 5.23,18.67 L7.62,17.71 C8.12,18.09 8.65,18.41 9.24,18.65 L9.6,21.19 C9.65,21.43 9.84,21.6 10.08,21.6 L13.92,21.6 C14.16,21.6 14.36,21.43 14.39,21.19 L14.75,18.65 C15.34,18.41 15.88,18.09 16.37,17.71 L18.76,18.67 C18.98,18.75 19.23,18.67 19.35,18.45 L21.27,15.13 C21.39,14.91 21.34,14.66 21.15,14.52 L19.14,12.94 Z M12,15.6 C10.02,15.6 8.4,13.98 8.4,12 C8.4,10.02 10.02,8.4 12,8.4 C13.98,8.4 15.6,10.02 15.6,12 C15.6,13.98 13.98,15.6 12,15.6 Z"
    />
  </svg>
);

export const HappyIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    
    {/* Smiling mouth with teeth */}
    <path d="M7,14 C7,14 9,17.5 12,17.5 C15,17.5 17,14 17,14" fill="#FFFFFF" />
    <path d="M7,14 C7,14 9,17.5 12,17.5 C15,17.5 17,14 17,14" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
    
    {/* Interior of mouth */}
    <path d="M8,14.5 C9,16 10.5,16.7 12,16.7 C13.5,16.7 15,16 16,14.5" fill="#7C2929" />
    
    {/* Happy eyes (curved lines) */}
    <path d="M9,10 C9,10 10,8 8,8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15,10 C15,10 14,8 16,8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Eyebrows */}
    <path d="M8,7 C8.5,6.5 9.5,6.5 10,7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M14,7 C14.5,6.5 15.5,6.5 16,7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Basic emotion icons
export const TiredIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <path d="M7,8.5 L10,8.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14,8.5 L17,8.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9,15 L15,15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SadIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>

    {/* Closed eyes with curved brows */}
    <path d="M8,9 L10,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14,9 L16,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    
    {/* Eyebrows */}
    <path d="M7,7 C8,6.5 9,6.5 10,7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-20, 8.5, 6.75)" />
    <path d="M14,7 C15,6.5 16,6.5 17,7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" transform="rotate(20, 15.5, 6.75)" />
    
    {/* Crying mouth */}
    <path d="M9,16 C10,14.5 11,14 12,14 C13,14 14,14.5 15,16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" transform="rotate(180, 12, 15)"/>
    <path d="M10,16.5 C10.5,15.5 11.5,15 12,15 C12.5,15 13.5,15.5 14,16.5" fill="#442200" />
    
    {/* Tears */}
    <path d="M8.5,10 L8.5,14" stroke="#40C0FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M15.5,10 L15.5,14" stroke="#40C0FF" strokeWidth="2" strokeLinecap="round" />
    <circle fill="#40C0FF" cx="8.5" cy="14" r="1" />
    <circle fill="#40C0FF" cx="15.5" cy="14" r="1" />
  </svg>
);

export const FrustratedIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    
    {/* Frowning mouth */}
    <path d="M9,16 C9.5,15 10.5,14.5 12,14.5 C13.5,14.5 14.5,15 15,16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" transform="rotate(180, 12, 15.25)"/>
    
    {/* Closed eyes with furrow */}
    <path d="M8,9 L10,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14,9 L16,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    
    {/* Furrowed brow */}
    <path d="M7,7 C8,5.8 10,5.8 11,7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" transform="rotate(180, 9, 6.4)" />
    <path d="M13,7 C14,5.8 16,5.8 17,7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" transform="rotate(180, 15, 6.4)" />
    <path d="M11,6 L13,6" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Hands on temples */}
    <path d="M3,11 L5,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21,11 L19,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4,12 L6,10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20,12 L18,10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const RelievedIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <circle fill="#FFFFFF" cx="8.5" cy="9" r="1.5"/>
    <circle fill="#FFFFFF" cx="15.5" cy="9" r="1.5"/>
    <path d="M8.5,15.5 C9.5,17 10.5,17.5 12,17.5 C13.5,17.5 14.5,17 15.5,15.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const LovedIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <path d="M8,9 C7.5,8.5 6.5,8.5 6,9 C5.5,9.5 5.5,10.5 6,11 L12,17 L18,11 C18.5,10.5 18.5,9.5 18,9 C17.5,8.5 16.5,8.5 16,9 L12,13 L8,9 Z" fill="#FFFFFF"/>
    <circle fill="#FFFFFF" cx="8.5" cy="8" r="1.2"/>
    <circle fill="#FFFFFF" cx="15.5" cy="8" r="1.2"/>
  </svg>
);

export const AnxiousIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <path d="M9,9.5 C8.5,9 7.5,8.5 6.5,9.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17.5,9.5 C16.5,8.5 15.5,9 15,9.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.5,13.5 L15.5,13.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.5,15.5 C9.5,17 10.5,17.5 12,17.5 C13.5,17.5 14.5,17 15.5,15.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const ExhaustedIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <path d="M8,9 L9,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15,9 L16,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16,15 C14,13 10,13 8,15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7,6 L10,8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M17,6 L14,8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export const ConfusedIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <circle fill="#FFFFFF" cx="8.5" cy="9" r="1.5"/>
    <circle fill="#FFFFFF" cx="15.5" cy="9" r="1.5"/>
    <path d="M9,16 L12.5,14 L16,16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const AmusedIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <path d="M7,9 L9,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15,9 L17,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7,15 C8,17 10,18 12,18 C14,18 16,17 17,15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.5,12 L9.5,12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14.5,12 L15.5,12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const ProudIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <circle fill="#FFFFFF" cx="8.5" cy="9" r="1.5"/>
    <circle fill="#FFFFFF" cx="15.5" cy="9" r="1.5"/>
    <path d="M8,15 C10,17 14,17 16,15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12,3 L12,5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17,5 L16,7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7,5 L8,7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const OverwhelmedIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <path d="M8,9 L11,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13,9 L16,9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7,15 L17,15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7,6 L17,6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4,12 L6,12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18,12 L20,12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const CoolIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    <path d="M6,10 L18,10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8,15 C10,17 14,17 16,15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7,7 L9,7 L9,13 L7,13 Z" fill="#FFFFFF"/>
    <path d="M15,7 L17,7 L17,13 L15,13 Z" fill="#FFFFFF"/>
  </svg>
);

export const ExcitedIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    
    {/* Big smile with open mouth */}
    <path d="M7,12 C7,12 9,17 12,17 C15,17 17,12 17,12" fill="#FFFFFF" />
    <path d="M7,12 C7,12 9,17 12,17 C15,17 17,12 17,12" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
    
    {/* Interior of mouth */}
    <path d="M8,13 C9,16 11,16.5 12,16.5 C13,16.5 15,16 16,13" fill="#FF3B3B" />
    
    {/* Wide open eyes */}
    <circle fill="#FFFFFF" cx="9" cy="9" r="1.8"/>
    <circle fill="#FFFFFF" cx="15" cy="9" r="1.8"/>
    <circle fill="#331800" cx="9" cy="9" r="0.9"/>
    <circle fill="#331800" cx="15" cy="9" r="0.9"/>
    
    {/* Eyebrows raised high in excitement */}
    <path d="M7,6.5 C8,6 10,6 11,6.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M13,6.5 C14,6 16,6 17,6.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Raised hands on sides (simplified) */}
    <path d="M2,12 L5,8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22,12 L19,8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3,10 L5,7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21,10 L19,7" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ScaredIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <circle fill={color} cx="12" cy="12" r="10"/>
    
    {/* Screaming mouth */}
    <path d="M9,16 C9,13.5 10.5,12 12,12 C13.5,12 15,13.5 15,16" fill="#442200" stroke="#FFFFFF" strokeWidth="0.5" />
    <path d="M9,16 C9,17 10.5,18 12,18 C13.5,18 15,17 15,16" fill="#442200" />
    
    {/* Wide open eyes */}
    <circle fill="#FFFFFF" cx="9" cy="9" r="2"/>
    <circle fill="#FFFFFF" cx="15" cy="9" r="2"/>
    <circle fill="#000000" cx="9" cy="9" r="1"/>
    <circle fill="#000000" cx="15" cy="9" r="1"/>
    
    {/* Eyebrows raised high in fear */}
    <path d="M7,6.5 C8,6 9.5,6 10.5,6.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-10, 8.75, 6.25)" />
    <path d="M13.5,6.5 C14.5,6 16,6 17,6.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" transform="rotate(10, 15.25, 6.25)" />
    
    {/* Hands on cheeks */}
    <path d="M6,12 C5,12 5,10 6,9 C7,8 8,9 8,10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18,12 C19,12 19,10 18,9 C17,8 16,9 16,10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5,11 C4,11 4,9 5,8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19,11 C20,11 20,9 19,8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const FlowerEmotionIcon: React.FC<IconProps> = ({ className, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    {/* Flower center */}
    <circle fill="#FFD700" cx="12" cy="12" r="3" />
    
    {/* Petals */}
    <path d="M12,5 C13,5 14,6 14,7 C14,8 13,9 12,9 C11,9 10,8 10,7 C10,6 11,5 12,5 Z" fill={color} />
    <path d="M17,7 C18,7 19,8 19,9 C19,10 18,11 17,11 C16,11 15,10 15,9 C15,8 16,7 17,7 Z" fill={color} />
    <path d="M19,12 C19,13 18,14 17,14 C16,14 15,13 15,12 C15,11 16,10 17,10 C18,10 19,11 19,12 Z" fill={color} />
    <path d="M17,17 C16,17 15,16 15,15 C15,14 16,13 17,13 C18,13 19,14 19,15 C19,16 18,17 17,17 Z" fill={color} />
    <path d="M12,19 C11,19 10,18 10,17 C10,16 11,15 12,15 C13,15 14,16 14,17 C14,18 13,19 12,19 Z" fill={color} />
    <path d="M7,17 C6,17 5,16 5,15 C5,14 6,13 7,13 C8,13 9,14 9,15 C9,16 8,17 7,17 Z" fill={color} />
    <path d="M5,12 C5,11 6,10 7,10 C8,10 9,11 9,12 C9,13 8,14 7,14 C6,14 5,13 5,12 Z" fill={color} />
    <path d="M7,7 C8,7 9,8 9,9 C9,10 8,11 7,11 C6,11 5,10 5,9 C5,8 6,7 7,7 Z" fill={color} />
    
    {/* Stem */}
    <path d="M12,19 L12,22" stroke="#008800" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Leaves */}
    <path d="M12,20 C10,19 9,21 10,22" stroke="#008800" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M12,21 C14,20 15,22 14,23" stroke="#008800" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);