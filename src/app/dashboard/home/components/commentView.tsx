import { useEffect, useState } from "react";
import axios from "axios";
import { headers } from "next/headers";
import { PostArticleProps } from "@/app/components/types";
import InputComment from "./inputComment";

export default function CommentsView(tweetid: string) {
  const [tweets, setTweets] = useState<PostArticleProps| null>(null);
  const [comments, setComments] = useState<PostArticleProps| null>(null);
  const loadtweets = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tweet/fetch-tweets/${tweetid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      setTweets(response.data);
    } catch (error) {

    }
  };

  const loadComments = async () => {
    try {
      if (!tweets) {
        await loadtweets();
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/fetch-comments/${tweets?.tweetId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setComments(response.data);
    } catch (error) {

    }
  };
  //   useEffect(() => {});
  return (
    <div>
      <InputComment/>
      {/* <PostArticle
        profileImage={""}
        firstName={""}
        lastName={""}
        username={""}
        content={""}
        isVerified={false}
        createdAt={""}
        likeCount={0}
        commentCount={0}
        retweetCount={0}
        tweetId={0}
        userId={""}
        hasliked={false}
      /> */}
    </div>
  );
}
