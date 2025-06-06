// /app/dashboard/home/page.tsx
"use client";
import PostArticle from "@/app/components/postArticle";
import RightSearch from "../rightSearh";
import Entete from "./components/entete";
import InputTweet from "./components/inputTweet";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex md:gap-x-5 box-border overflow-hidden">
      <section className="md:basis-1/2 flex-1 md:border-r border-gray-500 h-screen overflow-y-auto pb-[3rem] md:pb-0">
        <Entete
          entete="Home"
          icone={<img src="/icons/Timeline-Prop.svg" className="w-6 h-6" />}
        />
        <InputTweet />
        {/* posts en <articles> */}
        <PostArticle profileImage={""} firstName={""} lastName={""} username={""} content={""} createdAt={""} likeCount={0} commentCount={0} retweetCount={0} isVerified={false}/>
      </section>

      <section className="hidden md:block basis-[45%] bg-blue-500/5">
        <RightSearch />
      </section>
    </div>
  );
}
