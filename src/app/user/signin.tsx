import Modal from "@/app/components/modal";
import { useState, useEffect, Children } from "react";
import Connexion from "./connexion";
import Inscription from "./inscription";

export default function SignIn() {
  const [showModal, setShowModal] = useState(false);
  const [showModalInscription, setShowModalInscription] = useState(false);


  return (
    <div className="w-full px-4 mb-10 md:mb-0">
      <h1 className="text-[40px] w-auto md:text-[64px] font-bold">Happening now</h1>

      <div className="flex - flex-col gap-5 md:w-[70%] w-full">
        <p className="text-[23px] md:text-[31px] font-bold">Join today.</p>

        <div className="flex flex-col gap-4">
          {/* premier bouton */}
          <div className="flex flex-row h-[3rem] gap-2 text-black justify-center items-center bg-white p-1 rounded-full">
            <img
              alt="img"
              loading="lazy"
              className="h-[1.5rem] md:w-[35px] md:h-[35px]"
              src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
            />

            <span className="text-[1.05rem] font-bold">Sign up with Google</span>
          </div>

          {/* connexion avec apple */}
          <div className="flex flex-row h-[3rem] items-center gap-2 bg-white text-black justify-center p-1 rounded-full h-[2rem">
            <p className="text-[2rem]"></p>
            <p className="text-[1.05rem] font-bold">Sign up with Apple</p>
          </div>
        </div>

        {/* ----- or ----- */}
        <div className="flex flex-row items-center gap-2">
          <hr className="w-full " />
          <p className="text-[15px]">or</p>
          <hr className="w-full" />
        </div>

        <div className="flex flex-col gap-3">
          {/* cree un compte bouton */}
          <p onClick={() => setShowModalInscription(true)} className="flex justify-center h-[3rem] items-center text-[15px] font-bold bg-blue-500 text-white p-1 rounded-full">
            Create an account
          </p>

          <p className="text-[12px]">
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[17px] font-bold">Already have an account?</p>

          <button
            onClick={() => setShowModal(true)}
            className="flex justify-center w-full text-blue-500 h-[3rem] items-center text-[15px] font-bold border-[1px] p-1 rounded-full border-white"
          >
            Sign in
          </button>
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Connexion/>
        </Modal>

        <Modal isOpen={showModalInscription} onClose={() => setShowModalInscription(false)}>
          <Inscription/>
        </Modal>
      </div>
    </div>
  );
}
