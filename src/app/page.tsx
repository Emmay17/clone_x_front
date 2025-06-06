import Authentification from "@/app/user/authentification";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex md:grid md:grid-rows-[20px_1fr_20px] w-full items-center justify-items-center min-h-screen p-1 md:p-8 md:pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col md:flex-row w-full gap-2 md:gap-[32px] row-start-2 items-center justify-center sm:items-center">
        <div className="md:w-[50%] h-full flex items-center justify-center">
          <img className="w-[3rem] md:w-[20rem]" src="logo-white.png" alt="" />
        </div>
        <div className="md:w-[50%] w-auto flex items-center justify-start">
            <Authentification/>
        </div>
      </main>
    </div>
  );
}
