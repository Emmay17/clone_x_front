import { useState, useEffect } from "react";

interface PostArticleProps {
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
}

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
    onReply,
    onRetweet,
    onLike,
    onShare,
  } = props;

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
      <div className="aspect-square flex">
        {}
        <img
          src={
            profileImage ||
            "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
          }
          alt=""
          className="w-10 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover"
          loading="lazy"
        />
      </div>
      {/* left part */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full justify-between items-center">
          {/* user name and username and time */}
          <div className="flex gap-1">
            <span className="text-white font-semibold">
              {firstName}
              {lastName}
            </span>
            {isVerified && <img src="/icons/Verified.svg" alt="" />}
            <span className="text-gray-500">@{username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{formattedDate}</span>
          </div>
          {/* button ...  */}
          <div>
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
          <button className="flex gap-1 items-center">
            <img
              src="/icons/Reply.svg"
              alt="comment"
              className="w-[18.75px] h-[18.75px]"
            />
            <span>{commentCount}</span>
          </button>

          <button className="flex gap-1 items-center">
            <img
              src="/icons/Retweet.svg"
              alt="comment"
              className="w-[18.75px] h-[18.75px]"
            />
            <span>{retweetCount}</span>
          </button>

          <button className="flex gap-1 items-center">
            <img
              src="/icons/React.svg"
              alt="comment"
              className="w-[18.75px] h-[18.75px]"
            />
            <span>{likeCount}</span>
          </button>

          <button className="flex gap-1 items-center">
            <img
              src="/icons/Share.svg"
              alt="comment"
              className="w-[18.75px] h-[18.75px]"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
