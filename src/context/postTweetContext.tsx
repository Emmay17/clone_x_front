"use client";

import {
  createContext,
  use,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { PaginationMeta } from "@/app/components/types";
import { metadata } from "@/app/layout";

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
  tweets: any[];
  addNewTweet: (newTweet: any) => void;
  isloadingFetch?: boolean;
  lastPagereached?: boolean;
  isErrorFetch?: boolean;
  metadataPage?: PaginationMeta | null;
}

const PostTweetContext = createContext<PostTweetContextType | null>(null);

export const PostTweetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // variables pour tweet loading et error dans le dahsboard dans home
  const [tweets, setTweets] = useState<any[]>([]);
  const [metadataPage, setMetadataPage] = useState<PaginationMeta | null>(null);
  const [isloadingFetch, setIsLoadingFetch] = useState(false);
  const [isErrorFetch, setIsErrorFetch] = useState(false);
  const [lastPagereached, setLastPageReached] = useState(false);

  // const [fetchloading, isLoadingFetch] = useState(false);

  const pageRef = useRef(1);

  const [img, setImg] = useState<File | null>(null);
  const [tweet, setTweet] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState<string | null>(null);
  const isFetching = useRef(false);

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
      console.log(response.data);
      addNewTweet(response.data.data);
      // clear just after posting
      setTweet(null);
      setImg(null);
    } catch (error: any) {
      setIsError(`Erreur lors de la publication du tweet : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const addNewTweet = (newTweet: any) => {
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
    // metadataPage?.total += 1 ;

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
  // fonction de recuperation des tweets pour la page home
  const fetchTweet = async () => {
    if (isFetching.current) {
      console.log("Déjà en cours de fetch, on stoppe.");
      return;
    }
    isFetching.current = true;

    setIsLoadingFetch(true);
    console.log("page actuelle: ", pageRef.current);

    if (metadataPage && pageRef.current > metadataPage.lastPage) {
      console.log("Fin de la pagination atteinte");
      return;
    }

    try {
      // lancer la requête pour récupérer les tweets
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tweet/fetch-all-tweets/${pageRef.current}/10`
      );

      if (response.status === 200) {
        // visiualiser mes metatas et changer leurs etats
        console.log("Réponse brute de l'API :", response.data);

        const meta = response.data.tweets.meta;
        console.log("Metadata récupérée :", meta);
        setMetadataPage(meta);

        if (pageRef.current > meta.lastPage) {
          console.log("Fin de la pagination atteinte");
          setLastPageReached(true);
          setIsLoadingFetch(false);
          isFetching.current = false;
          return;
        }

        const fetchedPosts = response.data.tweets?.data || [];
        setTweets((prev) => [...prev, ...fetchedPosts]);

        // if (pageRef.current > meta.lastPage) {
        //   console.log("Fin de la pagination atteinte");
        //   isFetching.current = false;
        //   return;
        // } else {
          pageRef.current += 1;
        // }
        setIsErrorFetch(false);
      }

      setIsErrorFetch(false);
    } catch (error) {
      setIsErrorFetch(true);
    } finally {
      isFetching.current = false;
      setIsLoadingFetch(false);
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
        addNewTweet,
        tweets, // expose the tweets state
        isloadingFetch,
        lastPagereached,
        isErrorFetch,
        metadataPage,
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
