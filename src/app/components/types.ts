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


export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface PostArticleProps {
  profileImage: string; // URL de la photo de profil
  firstName: string;
  lastName: string;
  username: string; // @pseudo
  content: string;
  isVerified: boolean;
  tweetImage?: string; // optionnel : peut ne pas exister
  createdAt: string; // ou Date
  likeCount: number;
  commentCount: number;
  retweetCount: number;
  onReply?: () => void;
  onRetweet?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  tweetId: number;
  userId: string;
  hasliked: boolean;
}