export interface User {
  id: string;
  email: string;
  status: "activated" | "deactivated" | "banned";
  role: "test_user" | "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImage?: string;
  bannerImage?: string;
  bio?: number;
  location?: number;
  website?: string;
  birthDate: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  message: string;
  data: Profile;
}


export interface Token {
  type: "bearer";
  name: string | null;
  token: string;
  abilities: string[];
  lastUsedAt: string | null;
  expiresAt: string;
}

export interface LoginResponse {
  message: string;
  token: Token;
  type: "auth_token";
  user: User;
}

export interface UserProfile {
    user : User;
    profile : Profile;
}

export interface Media {
  id: string;
  url: string;
  type: "image" | "video"; // selon ce que tu attends
}

export interface PostData {
  id: string;
  content: string;
  user: User;
  media: Media[];
  createdAt: string;
}

export interface Post {
  user_id: string;
  content?: string;
  parent_tweet?: string;
  createdAt: string;
  updatedAt: string;
}
