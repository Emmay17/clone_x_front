import { useCommentModal } from "@/context/commentTweetContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { PostArticleProps } from "./types";
import Image from "next/image";

function formatTweetDate(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "à l'instant";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return "hier";

  // Pour plus vieux, afficher jour et mois (ex: 26 mai)
  // Si c’est une autre année, afficher aussi l’année
  const optionsSameYear: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  const optionsOtherYear: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString("fr-FR", optionsSameYear);
  } else {
    return date.toLocaleDateString("fr-FR", optionsOtherYear);
  }
}
// export const [showCommentModal, setshowCommentModal] = useState(false);

export default function PostArticle(props: PostArticleProps) {
  const {
    profileImage,
    firstName,
    lastName,
    username,
    content,
    tweetImage,
    createdAt,
    likeCount,
    isVerified,
    commentCount,
    retweetCount,
    hasliked,
    onReply,
    onRetweet,
    onLike,
    onShare,
    tweetId,
    userId,
  } = props;

  const [isLiked, setIsLiked] = useState(hasliked ?? false);
  const [likeCountState, setLikeCountState] = useState(Number(likeCount));
  const { showCommentModal, setShowCommentModal } = useCommentModal();

  async function likeUnlike(id: number, idUser: string) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/likes/likeUnlike-tweet/${id}/user/${idUser}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      const message = response.data.message;

      if (message.includes("Like ajouté avec succès")) {
        setIsLiked(true);
        setLikeCountState((prev) => prev + 1);
        console.log("Like ajouté avec succès");
      } else if (message.includes("like supprimé avec succès")) {
        setIsLiked(false);
        setLikeCountState((prev) => prev - 1);
        console.log("like supprimé avec succès");
      }
    } catch (error) {
      console.log("Erreur lors de la requête de like/unlike :", error);
    }
  }

  const [formattedDate, setFormattedDate] = useState(() =>
    formatTweetDate(createdAt)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedDate(formatTweetDate(createdAt));
    }, 60000); // met à jour chaque minute

    return () => clearInterval(interval); // évite les fuites mémoire
  }, [createdAt]);

  return (
    <article className="flex gap-2 p-4 w-full border-b border-gray-500">
      {/* user image profile */}
      <div className="relative w-12 h-12 p-4 rounded-full overflow-hidden ">
        <Image
          src={
            profileImage ||
            "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
          }
          fill
          loading="lazy"
          alt="user image profile"
          className="object-cover"
        />
      </div>
      {/* left part */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full justify-between items-center">
          {/* user name and username and time */}
          <div className="flex gap-1">
            <span className="text-white font-semibold">
              {firstName} {lastName}
            </span>
            {isVerified && <img src="/icons/Verified.svg" alt="" />}
            <span className="text-gray-500">@{username}</span>
            <span className="text-gray-500 font-bold">·</span>
            <span className="text-gray-500">{formattedDate}</span>
          </div>
          {/* button ...  */}
          <div className=" cursor-pointer">
            {/* <img src="" alt="" /> */}
            <img src="/icons/More-2.svg" alt="" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Tweet text */}
          <p className="text-base leading-6 whitespace-pre-line">
            {content || null}
          </p>
          {/* Tweet image */}
          {tweetImage && (
            <div className="rounded-md overflow-hidden mt-2  w-full max-h-[395px]">
              <img
                src={tweetImage}
                alt="tweet-img"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Tweet reactions */}
        <div className="flex justify-between text-gray-500 mt-2 text-sm w-full">
          <button
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => {
              setShowCommentModal(true);
            }}
          >
            <img
              src="/icons/Reply copy.svg"
              alt="comment"
              className="w-[18.75px] h-[18.75px]"
            />
            <span>{commentCount}</span>
          </button>

          <button
            className="flex gap-1 items-center cursor-pointer"
            onClick={onRetweet}
          >
            <img
              src="/icons/Vector.svg"
              alt="retweet"
              className="w-[18.75px] h-[18.75px]"
            />
            <span>{retweetCount}</span>
          </button>

          <button
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => likeUnlike(tweetId, userId)}
          >
            <img
              src={isLiked ? "/icons/liked.svg" : "/icons/Vector-1.svg"}
              alt="comment"
              className="w-[18.75px] h-[18.75px]"
            />
            <span>{likeCountState}</span>
          </button>

          <button
            className="flex gap-1 items-center cursor-pointer"
            onClick={onShare}
          >
            <img
              src="/icons/Share copy.svg"
              alt="comment"
              className="w-[18.75px] h-[18.75px]"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
