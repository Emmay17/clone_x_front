"use client";
import WhiteButton from "@/app/components/button";
import React, { useState, useEffect } from "react";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import { usePostTweetContext } from "@/context/postTweetContext";
import Loader from "@/app/components/loader";

export default function InputComment() {
  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const { user, profile } = useUserContext();
  const {
    tweet,
    setTweet,
    img,
    setImg,
    isLoading: postLoading,
    error,
    posttweet,
  } = usePostTweetContext();

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(img);
    } else {
      setPreview(null);
    }
  }, [img]);

  if (!user || !profile) return <p>Aucun utilisateur trouvé</p>;

  const isDisabled = (!tweet || tweet.trim() === "") && !img;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tweet !== null) {
      await posttweet(user.id, tweet, img);
    } else {
      // handle the case where tweet is null
    }

    if (!error) {
      // Si pas d’erreur, on clear les champs
      setTweet(null);
      setImg(null);
      setPreview(null);
    }
  };

  return (
    <div className="hidden md:flex h-screen md:h-auto gap-1 md:gap-5 md:p-4  border-gray-500 overflow-y-auto">
      <form
        className="w-full flex flex-col justify-between gap-4 overflow-y-auto"
        onSubmit={handleSubmit}
      >
        

        <div className="flex flex-row gap-2 w-full justify-center items-center">
          <div className="relative w-10 h-10 p-4  rounded-full overflow-hidden ">
            <Image
              src={
                profile.profileImage ||
                "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
              }
              fill
              loading="lazy"
              alt="user image profile"
              className="object-cover"
            />
          </div>
          <textarea
            className="w-full resize-none max-h-180 overflow-y-auto focus:outline-none focus:ring-0 focus:border-none border-none"
            name="tweet"
            id="inputTweet"
            placeholder="Post your reply"
            onInput={autoGrow}
            onChange={(e) => setTweet(e.target.value)}
            value={tweet ?? ""}
          ></textarea>
        </div>

        {preview && (
          <div className="w-full aspect-[16/9] h-auto rounded-md overflow-hidden">
            <img
              src={preview}
              loading="lazy"
              alt="Preview"
              className="object-cover rounded-md w-full h-auto"
            />
          </div>
        )}

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={(e) => setImg(e.target.files?.[0] ?? null)}
          className="hidden"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-row justify-between items-center gap-10">
          <ul className="flex gap-2">
            <li>
              <img
                src="/icons/Media.svg"
                className="cursor-pointer"
                onClick={() => document.getElementById("fileInput")?.click()}
              />
            </li>
            <li>
              <img src="/icons/Gif.svg" className="cursor-pointer" />
            </li>
            <li>
              <img src="/icons/Poll.svg" className="cursor-pointer" />
            </li>
            <li>
              <img src="/icons/Emoji.svg" className="cursor-pointer" />
            </li>
            <li>
              <img src="/icons/Schedule.svg" className="cursor-pointer" />
            </li>
          </ul>
          <WhiteButton
            label={postLoading ? <Loader /> : "Post"}
            type="submit"
            icon={"Post"}
            className={`px-4 py-2 rounded-full ${
              isDisabled || postLoading
                ? "opacity-50 cursor-not-allowed hover:cursor-not-allowed"
                : ""
            }`}
          />
        </div>
      </form>
    </div>
  );
}
