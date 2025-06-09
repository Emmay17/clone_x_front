"use client";

import PostArticle from "@/app/components/postArticle";
import { usePostTweetContext } from "@/context/postTweetContext";
import { useUserContext } from "@/context/userContext";
import { use, useEffect, useState } from "react";

export default function Postes() {
  const { fetchUserTweet } = usePostTweetContext();
  const { user } = useUserContext();

  // l'etat local pour stocker les different tweet de l'utilisateur
  const [userTweets, setUserTweets] = useState<any[]>([]);
  const userId = user ? user.id : null;

  useEffect(() => {
    const loadTweet = async () => {
      if (userId !== null) {
        try {
          const tweets = await fetchUserTweet(userId);
          setUserTweets(tweets.data);
          console.log("Tweets de l'utilisateur :", tweets.data);
        } catch (error) {
          console.error("Erreur lors du chargement des tweets :", error);
        }
      }
    };
    loadTweet();
  }, [userId]);
  return (
    <div className="flex flex-col justify-center items-center">
      {userTweets.length === 0 ? (
        <p className="text-gray-500 mt-4">Aucun tweet pour l'instant.</p>
      ) : (
        userTweets.map((tweet) => (
          <PostArticle
            key={tweet.id}
            profileImage={tweet.user.profile.profileImage}
            firstName={tweet.user.profile.firstName}
            lastName={tweet.user.profile.lastName}
            username={tweet.user.profile.username}
            tweetImage={tweet.medias.length > 0 ? tweet.medias[0].url : null}
            content={tweet.content}
            createdAt={tweet.createdAt}
            likeCount={tweet.likesCount}
            commentCount={tweet.repliesCount}
            retweetCount={tweet.retweetsCount}
            isVerified={tweet.user.profile.isVerified}
          />
        ))
      )}
    </div>
  );
}
