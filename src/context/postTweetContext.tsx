"use client";

import { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";

interface PostTweetContextType {
  tweet?: string | null;
  setTweet: (tweet: string | null) => void;
  img?: File | null;
  setImg: (img: File | null) => void;
  isLoading: boolean;
  error: string | null;
  posttweet: (
    idUser: string,
    tweet?: string,
    imgfile?: File | null
  ) => Promise<void>;
  fetchUserTweet: (idUser: string) => Promise<any>;
  fetchTweet: () => Promise<any>;
}

const PostTweetContext = createContext<PostTweetContextType | null>(null);

export const PostTweetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tweet, setTweet] = useState<string | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState<string | null>(null);
  const posttweet = async (idUser: string) => {
    if (!tweet && !img) {
      setIsError("Veuillez saisir un tweet ou ajouter une image.");
      return;
    }

    setIsLoading(true);
    setIsError(null);

    try {
      const formData = new FormData();
      formData.append("user_id", idUser);
      if (tweet) formData.append("content", tweet);
      if (img) formData.append("media", img);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tweet/post-tweet`,
        formData
      );

      // clear just after posting
      setTweet(null);
      setImg(null);
    } catch (error: any) {
      setIsError(`Erreur lors de la publication du tweet : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserTweet = async (idUser: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tweet/fetch-tweets/${idUser}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des tweets de l'utilisateur :",
        error
      );
      throw new Error(
        "Erreur lors de la récupération des tweets de l'utilisateur"
      );
    }
  };

  const fetchTweet = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tweet/all`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de tous les tweets :",
        error
      );
      throw new Error("Erreur lors de la récupération de tous les tweets");
    }
  };
  return (
    <PostTweetContext.Provider
      value={{
        tweet,
        setTweet,
        img,
        setImg,
        isLoading,
        error,
        posttweet,
        fetchUserTweet,
        fetchTweet,
      }}
    >
      {children}
    </PostTweetContext.Provider>
  );
};

// create the hook to use  the context

export const usePostTweetContext = () => {
  const context = useContext(PostTweetContext);
  if (!context) {
    throw new Error(
      "usePostTweetContext must be used within a PostTweetProvider"
    );
  }
  return context;
};
