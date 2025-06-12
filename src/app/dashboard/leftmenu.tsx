import Link from "next/link";
import WhiteButton from "../components/button";
import MenuNavButton from "./components/menuNavButton";
import { useUserContext } from "@/context/userContext";
import { useEffect, useRef, useState } from "react";

interface ComponentAProps {
  onSelect: (value: string) => void;
}
export default function LeftMenu({ onSelect }: ComponentAProps) {
  const { user, profile, isLoading, isError, disconnectUser } =
    useUserContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !(containerRef.current as any).contains(event.target)
      ) {
        setMenuVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Une erreur est survenue</p>;
  if (!user || !profile) return <p>Aucun utilisateur trouvé</p>;

  const MenuList = [
    { icone: "/icons/Home-Fill.svg", label: "Home", link: "/dashboard/home" },
    {
      icone: "/icons/Search.svg",
      label: "Explore",
      link: "/dashboard/explore",
    },
    {
      icone: "/icons/Notifications.svg",
      label: "Notifications",
      link: "/dashboard/notifications",
    },
    {
      icone: "/icons/Messages.svg",
      label: "Messages",
      link: "/dashboard/messages",
    },
    {
      icone: "/icons/Bookmarks.svg",
      label: "Bookmarks",
      link: "/dashboard/bookmarks",
    },
    { icone: "/icons/Lists.svg", label: "Lists", link: "/dashboard/lists" },
    {
      icone: "/icons/Profile.svg",
      label: "Profile",
      link: `/dashboard/${profile.username}`,
    },
    { icone: "/icons/More.svg", label: "More", link: "/dashboard/more" },
  ];

  const MenuListResponsive = [
    { icone: "/icons/Home-Fill.svg", link: "/dashboard/home" },
    { icone: "/icons/Search.svg", link: "/dashboard/explore" },
    { icone: "/icons/Notifications.svg", link: "/dashboard/notifications" },
    { icone: "/icons/Messages.svg", link: "/dashboard/messages" },
    { icone: "/icons/Bookmarks.svg", link: "/dashboard/bookmarks" },
    { icone: "/icons/Lists.svg", link: "/dashboard/lists" },
  ];

  return (
    <div className="flex w-full md:h-screen md:flex-col md:items-center md:justify-between md:p-4">
      <div className="hidden  md:flex flex-row md:flex-col justify-evenly md:gap-4 w-fit md:w-full items-center">
        {MenuList.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex items-center lg:items-start w-full"
          >
            <MenuNavButton
              key={index}
              icone={item.icone}
              label={item.label}
              onClick={() => {
                console.log("Clicked on:", item.label);
                onSelect(item.label);
              }}
            />
          </Link>
        ))}
        <WhiteButton
          label="Post"
          className="p-2 rounded-full lg:w-full"
          icon={<img src="/feather.svg" className="w-full aspect-square" />}
        />
      </div>

      <div className="flex flex-row w-full md:hidden items-center justify-between h-auto">
        {MenuListResponsive.map((item, index) => (
          <Link key={index} href={item.link} className="flex-1">
            <MenuNavButton
              icone={item.icone}
              label=""
              onClick={() => {}} // fonction vide pour éviter l'erreur
            />
          </Link>
        ))}
      </div>
      {/*  */}
      <div className="flex flex-col items-center justify-center">
        {/* Menu flottant */}
        {menuVisible && (
          <div className="hidden md:block md:w-full bg-[#1d1d1d] rounded-md shadow-lg z-50 p-2">
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">
              <img className="w-5 h-5 lg:hidden" src="/icons/Settings.svg" alt="settings image" />
              <span className="hidden lg:inline text-white">Paramètres</span>
            </button>

            <button
              className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded text-red-500 cursor-pointer"
              onClick={disconnectUser}
            >
              <img className="w-5 h-5 lg:hidden" src="/icons/logout.svg" alt="settings image" />
              <span className="hidden lg:inline text-red-500">Déconnexion</span>
            </button>
          </div>
        )}

        <div>
          <div
            onClick={() => setMenuVisible((v) => !v)}
            className="hidden md:flex items-center justify-between gap-4 w-full hover:bg-[#1d1d1d] rounded-full p-2 mt-4 cursor-pointer"
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  profile.profileImage ||
                  "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
                }
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-11 md:h-11  rounded-full object-cover"
                loading="lazy"
                alt=""
              />

              <div className="hidden lg:block">
                <div className="flex flex-row gap-2">
                  <p className="font-bold text-base truncate max-w-[10ch] overflow-hidden whitespace-nowrap">
                    {profile.firstName} {profile.lastName}
                  </p>
                  {/* <img src="/icons/Private.svg" /> */}
                </div>
                <p className="text-sm">@{profile.username}</p>
              </div>
            </div>

            <img className="hidden lg:block" src="/icons/More-2.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
