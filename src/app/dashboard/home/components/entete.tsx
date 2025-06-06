import React from "react";
import { useUserContext } from "@/context/userContext";
interface EnteteProps {
  entete: React.ReactNode;
  icone: React.ReactNode;
}
export default function Entete({ entete, icone }: EnteteProps) {
  const { user, profile, isLoading, isError } = useUserContext();
  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Une erreur est survenue</p>;
  if (!user || !profile) return <p>Aucun utilisateur trouvé</p>;

  return (
    <div>
      <div className="hidden md:flex flex-row items-center justify-between p-2 lg:p-4 border-gray-500 md:border-b">
        <h1 className="text-[1.25rem]">{entete}</h1>
        {icone}
      </div>

      <div className="flex w-full md:hidden items-center justify-between p-2 border-b-1">
        <img
          src={profile.profileImage || "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"} 
          alt=""
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover"
          loading="lazy"
        />

        <img
          src="/logo-white.png"
          alt="logo x"
          className="w-5 h-5"
        />

        <a className="text-[1rem] border-[1px] border-gray-500 rounded-full py-1 px-3 font-bold"><span>Upgrade</span></a>
      </div>
    </div>
  );
}
