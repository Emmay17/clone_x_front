"use client";

import { useState } from "react";
import LeftMenu from "./leftmenu";
import Modal from "../components/modal";
import InputTweet from "./home/components/inputTweet";
import { useUserContext, UserProvider } from "@/context/userContext";
import Loader from "../components/loader";
import { redirect } from "next/navigation";
import { PostTweetProvider } from "@/context/postTweetContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, profile, isLoading, isError } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Home");

  if (isLoading) {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    redirect("/");
  }

  return (
    <div className="flex flex-col md:flex-row w-full md:max-w-[90%] mx-auto md:px-1  overflow-hidden box-border">
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-[4rem] text-xl right-4 bg-blue-500 text-white font-bold w-[3.5rem] h-[3.5rem] rounded-full shadow-lg flex items-center justify-center md:hidden z-50"
      >
        +
      </button>
      <div className="flex gap-4 md:w-[20%] bg-black fixed bottom-0 left-0 right-0 md:static h-[3rem] md:h-screen z-50">
        <LeftMenu
          onSelect={(value: string) => {
            setSelectedLabel(value);
          }}
        />
      </div>

      <div className="flex w-full md:w-[80%] pb-[3rem] md:pb-0">
        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto md:border-x border-gray-500">
          {children}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <InputTweet />
          </Modal>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <PostTweetProvider>
        <DashboardContent>{children}</DashboardContent>
      </PostTweetProvider>
    </UserProvider>
  );
}
