"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User, Profile, ProfileResponse } from "@/app/components/types";

interface UserContextType {
  user: User | null;
  profile: Profile | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  isLoading: boolean;
  isError: boolean;
}
export const UserContext = createContext<UserContextType | null>(null);

// creation du provider

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUserProfile = async (idUser: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile/${idUser}`
      );

      const profileData: ProfileResponse = response.data;
      setProfile(profileData.data);
    } catch (error) {
      console.error("Erreur du profile :", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser){
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchUserProfile(parsedUser.id);
    }else{
        setIsLoading(false)
    }
  },[]);

  return (
    <UserContext.Provider value = {{ user, profile, setUser, setProfile, isLoading, isError }}>
    {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
