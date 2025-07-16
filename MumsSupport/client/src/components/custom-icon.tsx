import { cn } from "@/lib/utils";
import {
  FlowerIcon,
  HomeIcon,
  GroupsIcon,
  MessagesIcon,
  SettingsIcon,
  HappyIcon,
  TiredIcon,
  SadIcon,
  FrustratedIcon,
  RelievedIcon,
  LovedIcon,
  ExhaustedIcon,
  ConfusedIcon,
  AmusedIcon,
  ProudIcon,
  OverwhelmedIcon,
  CoolIcon,
  AnxiousIcon,
  ExcitedIcon,
  ScaredIcon,
  FlowerEmotionIcon
} from "./IconComponents";

export type IconName = 
  | "flower" 
  | "flower-emotion"
  | "home" 
  | "groups" 
  | "messages" 
  | "settings"
  | "happy"
  | "tired"
  | "sad"
  | "frustrated"
  | "relieved"
  | "loved"
  | "exhausted"
  | "confused"
  | "amused"
  | "proud"
  | "overwhelmed"
  | "anxious"
  | "cool"
  | "excited"
  | "scared";

type IconSize = "sm" | "md" | "lg";

interface CustomIconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

// SVG components for each icon
// The ones we have actual SVGs for
const iconComponents: Partial<Record<IconName, React.FC<{className?: string, color?: string}>>> = {
  flower: FlowerIcon,
  "flower-emotion": FlowerEmotionIcon,
  home: HomeIcon,
  groups: GroupsIcon,
  messages: MessagesIcon,
  settings: SettingsIcon,
  happy: HappyIcon,
  tired: TiredIcon,
  sad: SadIcon,
  frustrated: FrustratedIcon,
  relieved: RelievedIcon,
  loved: LovedIcon,
  exhausted: ExhaustedIcon,
  confused: ConfusedIcon,
  amused: AmusedIcon,
  proud: ProudIcon,
  overwhelmed: OverwhelmedIcon,
  anxious: AnxiousIcon,
  cool: CoolIcon,
  excited: ExcitedIcon,
  scared: ScaredIcon
};

// Emoji fallbacks for icons we don't have SVGs for yet
const iconEmojis: Record<IconName, string> = {
  flower: "🌸",
  "flower-emotion": "🌷",
  home: "🏠",
  groups: "👥",
  messages: "💬",
  settings: "⚙️",
  happy: "😊",
  tired: "😴",
  sad: "😥",
  frustrated: "😡",
  relieved: "😌",
  loved: "🥰",
  exhausted: "😩",
  confused: "🤔",
  amused: "😂",
  proud: "🥳",
  overwhelmed: "😤",
  anxious: "😖",
  cool: "😎",
  excited: "🤩",
  scared: "😱"
};

// Size classes for different icon sizes
const sizeClasses: Record<IconSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8"
};

// Text size classes for emoji fallbacks
const textSizeClasses: Record<IconSize, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl"
};

export function CustomIcon({ 
  name, 
  size = "md", 
  className 
}: CustomIconProps) {
  // Check if we have an SVG for this icon
  const IconComponent = iconComponents[name];
  
  // If we have an SVG component, use it
  if (IconComponent) {
    return (
      <IconComponent 
        className={cn(sizeClasses[size], className)} 
        color="currentColor"
      />
    );
  }
  
  // Otherwise fall back to emoji
  return (
    <span 
      className={cn(textSizeClasses[size], className)} 
      role="img" 
      aria-label={name}
    >
      {iconEmojis[name]}
    </span>
  );
}