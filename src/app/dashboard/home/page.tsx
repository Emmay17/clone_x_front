// /app/dashboard/home/page.tsx
"use client";
import PostArticle from "@/app/components/postArticle";
import RightSearch from "../rightSearh";
import Entete from "./components/entete";
import InputTweet from "./components/inputTweet";
// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loader from "@/app/components/loader";
import { usePostTweetContext } from "@/context/postTweetContext";

export default function HomePage() {
  // mes indicateurs pour reperer la fin du scroll
  const observateur = useRef<IntersectionObserver | null>(null);
  const lastObservedObject = useRef<HTMLDivElement | null>(null);

  const { fetchTweet, tweets, lastPagereached, isErrorFetch, isloadingFetch} = usePostTweetContext();
  // const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchTweet();
    // fetchPosts();
  }, []);

  useEffect(() => {
    if (observateur.current) observateur.current.disconnect();

    observateur.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchTweet();
        console.log("Fin du scroll détectée");
      }
    });

    return () => observateur.current?.disconnect();
  }, []); // <- observateur créé une seule fois

  useEffect(() => {
    // Quand les tweets changent, observe le nouveau dernier élément
    if (lastObservedObject.current) {
      observateur.current?.observe(lastObservedObject.current);
    }
  }, [tweets]);

  return (
    <div className="w-full h-screen flex md:gap-x-5 box-border overflow-hidden">
      <section className="md:basis-1/2 flex-1 md:border-r border-gray-500 h-screen overflow-y-auto pb-[3rem] md:pb-0">
        <Entete
          entete="Home"
          icone={<img src="/icons/Timeline-Prop.svg" className="w-6 h-6" />}
        />
        <InputTweet />
        {/* posts en <articles> */}

        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <Loader />
          </div>
        ) : null}
        {isError ? (
          <p className="text-red-500">
            Une erreur est survenue lors du chargement des posts.
          </p>
        ) : tweets.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            Aucun post trouvé. Soyez le premier à partager quelque chose !
          </p>
        ) : (
          tweets.map((post: any) => (
            // console.log(post.id),
            <PostArticle
              key={post.id}
              profileImage={post.user?.profile?.profileImage}
              firstName={post.user?.profile?.firstName}
              lastName={post.user?.profile?.lastName}
              username={post.user?.profile?.username}
              content={post?.content}
              tweetImage={post.medias?.[0]?.url}
              createdAt={post?.createdAt}
              likeCount={post?.likesCount}
              commentCount={post?.repliesCount}
              retweetCount={post?.retweetsCount}
              isVerified={post.user?.isVerified}
            />
          ))
        )}

        {
          !lastPagereached ? (
            <div className="flex justify-center items-center p-10">
              <Loader />
            </div>
          ) : isErrorFetch ? (
            <p className="text-red-500 text-center mt-4">
              Une erreur est survenue lors du chargement des tweets.
            </p>
          ) : <p className="text-gray-500 text-center mt-4">
              Plus de tweets à afficher.
            </p>
        }
        <div ref={lastObservedObject} style={{ height: "3rem" }}></div>
      </section>

      <section className="hidden md:block basis-[45%] bg-blue-500/5">
        <RightSearch />
      </section>
    </div>
  );
}
