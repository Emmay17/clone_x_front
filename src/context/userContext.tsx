"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User, Profile, ProfileResponse } from "@/app/components/types";
// import { redirect } from "next/dist/server/api-utils";
// import { headers } from "next/headers";
import { redirect, useRouter } from 'next/navigation'
// import { headers } from "next/headers";



interface UserContextType {
  user: User | null;
  profile: Profile | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  isLoading: boolean;
  isError: boolean;
  disconnectUser: () => Promise<void>;
}
export const UserContext = createContext<UserContextType | null>(null);

// creation du provider

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

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
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectUser = async () => {
    const token = localStorage.getItem("auth_token");

    if(!token){
      alert("deconnexion echouer, token introuvable")
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,null,
        {
          headers:{
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          }
        }
      );
      if (response.status === 200) {
        setUser(null);
        setProfile(null);
        localStorage.removeItem("user");
        localStorage.removeItem("profile");
        localStorage.removeItem("auth_token");
        router.push("/"); // Redirection vers la page d'accueil
      }else{
        alert("deconnexion echouer")
      }
    } catch (error) {
      alert("deconnexion echouer, erreur :"+error)
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchUserProfile(parsedUser.id);
    } else {
      setIsLoading(false);
      router.push("/");
    }
    // disconnectUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, profile, setUser, setProfile, isLoading, isError, disconnectUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
