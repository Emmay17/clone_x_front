"use client";
import { useUserContext } from "@/context/userContext";
import Entete from "../home/components/entete";
import Loader from "@/app/components/loader";
import RightSearch from "../rightSearh";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const { user, profile, isLoading, isError } = useUserContext();
  // const {}
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Erreur lors du chargement de l'utilisateur
      </div>
    );
  }
  if (!user || !profile) {
    return <p>Aucun utilisateur trouvé</p>;
  }

  function formatedDate(d: string) {
    const dateStr = d;
    const date = new Date(dateStr);

    const formatted = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    return formatted;
  }

  const menuProfile = [
    { label: "Posts", link: `/dashboard/${profile.username}/posts` },
    { label: "Replies", link: `/dashboard/${profile.username}/replies` },
    { label: "Highlights", link: `/dashboard/${profile.username}/highlights` },
    { label: "Articles", link: `/dashboard/${profile.username}/articles` },
    { label: "Media", link: `/dashboard/${profile.username}/media` },
    { label: "Likes", link: `/dashboard/${profile.username}/likes` },
  ];
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    const checscreenSize = () => {
      if (window.innerWidth >= 1024) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    checscreenSize();
    window.addEventListener("resize", checscreenSize);
    return () => {
      window.removeEventListener("resize", checscreenSize);
    };
  }, []);
  return (
    <div className="h-screen flex gap-4">
      <div
        className={`${
          showSearch ? "md:w-3/5" : "w-full"
        } md:border-r border-gray-500 overflow-y-auto `}
      >
        <Entete
          entete={
            <div className="flex flex-col">
              <p className="text-lg">
                {profile.firstName} {profile.lastName}
              </p>
              <span className="text-gray-500 font-light text-sm/8">
                0 postes
              </span>
            </div>
          }
          icone={undefined}
        />
        {/* Banner */}
        <div
          className="relative h-48 md:h-70 w-full bg-cover bg-center"
          style={{
            backgroundImage: profile.bannerImage
              ? `url(${profile.bannerImage})`
              : "none",
            backgroundColor: profile.bannerImage ? undefined : "#e5e7eb", // bg-gray-200
          }}
        >
          {/* Profile Picture */}
          <div className="absolute -bottom-12 left-4 md:left-8">
            <div className="w-20 h-20 md:w-32 md:h-32 border-4 border-black rounded-full overflow-hidden shadow-md">
              <Image
                src={
                  profile.profileImage ||
                  "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
                }
                alt="Photo de profil"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end px-4 mt-4">
          <button className="border px-3 py-1 text-sm light:text-black rounded-full border-gray-500 text-white font-bold cursor-pointer hover:bg-gray-500/20 hover:text-white transition duration-300 ease-in-out">
            Edit Profile
          </button>
        </div>

        <div className="md:p-4 lg:p-8 p-2">
          <p className="font-bold text-[1.2rem]">{`${profile.firstName} ${profile.lastName}`}</p>
          <span className="text-gray-500 text-[0.9rem]">
            @{profile.username}
          </span>

          <p className="text-[1rem]">
            {profile.bio || "Bio not available yet..."}
          </p>
        </div>
        <div className="flex gap-2 md:px-4 lg:px-8 px-2">
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-gray-600 text-xl">
              link
            </span>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              www.exemple.com
            </a>
          </div>

          <div className="flex gap-1 items-center">
            <span className="material-symbols-outlined text-gray-600 text-xl">
              calendar_month
            </span>
            <p className="text-gray-600 font-bold text-base">
              Joined {formatedDate(profile.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-4 md:px-4 lg:px-8 px-2 mt-4">
          <p className="text-gray-600 font-bold text-base">
            <strong className="text-white">0</strong> Followers
          </p>
          <p className="text-gray-600 font-bold text-base">
            <strong className="text-white">0</strong> Following
          </p>
        </div>
        <nav>
          <ul className="flex flex-row justify-between items-center border-b border-gray-500 overflow-x-auto whitespace-nowrap scroll-invisible">
            {menuProfile.map((item, index) => {
              const isActive = pathname === item.link;

              return (
                <li key={index} className="px-4">
                  <Link
                    href={item.link}
                    className={`block text-gray-700 h-full py-4 transition duration-300  ${
                      isActive
                        ? "border-blue-500 border-b-4 font-bold text-white"
                        : "border-transparent hover:border-blue-500 hover:border-b-4 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="overflow-y-auto">{children}</div>
      </div>

      {showSearch && (
        <div className="lg:flex flex-col w-2/5 h-screen ">
          <RightSearch />
        </div>
      )}
    </div>
  );
}
