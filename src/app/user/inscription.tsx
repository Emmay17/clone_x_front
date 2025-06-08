"use client";
import { useState } from "react";
import WhiteButton from "../components/button";
import axios from "axios";
import Loader from "../components/loader";

export default function Inscription() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    birthdayDate: "",
    password: "",
    password_connfirmation: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState<
    null | "next" | "createAccount"
  >(null);

  const HandleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoadingButton("next");
    // Vérifier que l'email est rempli avant de continuer
    if (!formData.email || formData.email.trim() === "") {
      setError("Veuillez entrer votre adresse e-mail.");
      setLoadingButton(null);
      return;
    }
    try {
      // Envoi de la requête POST avec Axios
      const response = await axios.post(
        "http://localhost:3333/auth/verify-email",
        {
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.existe) {
        setError("Cette addresse e-mail existe déjà.");
      } else {
        setStep(2);
      }
      setLoadingButton(null);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError("Erreur: " + (error.response?.data?.message || error.message));
      } else {
        setError("Erreur inattendue : " + error.message);
      }
      setLoadingButton(null);
    }
  };

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoadingButton("createAccount");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          birthdayDate: formData.birthdayDate,
          password: formData.password,
          password_confirmation: formData.password_connfirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Inscription réussie !");
        setStep(3);
      }
      if (response.status === 400) {
        setError("Erreur d'inscription : " + response.data.message);
      }
      if (response.status === 500) {
        setError("Erreur interne du serveur : " + response.data.message);
      }
      setLoadingButton(null);
    } catch (error) {
      setError("Erreur de soumission du formulaire:" + error);
      setLoadingButton(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {step === 1 && (
        <>
          <span className="text-[26px] font-bold py-4">
            Create your account
          </span>
        </>
      )}

      {step === 2 && (
        <>
          <span className="text-[26px] font-bold py-4">
            Create your password
          </span>
        </>
      )}

      <form
        action=""
        onSubmit={step === 1 ? HandleNext : HandleSubmit}
        className="flex flex-col justify-between flex-1 gap-4 box-border "
      >
        {step === 1 && (
          <>
            <div className="flex flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-4 mt-4">
                <input
                  className="border border-white rounded-md p-4"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />

                <input
                  className="border border-white rounded-md p-4"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />

                <input
                  className="border border-white rounded-md p-4"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <span className="text-[15px]">Date of birth</span>
                <p className="text-[14px] text-gray-500">
                  This will not be shown publicly. Confirm your own age, even if
                  this account is for a business, a pet, or something else.
                </p>
                <input
                  className="border border-white rounded-md p-4"
                  type="date"
                  value={formData.birthdayDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthdayDate: e.target.value })
                  } // Note: conChange should be onChange
                />
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-4 mt-4">
              <input
                className="border border-white rounded-md p-4"
                type="text"
                placeholder="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <input
                className="border border-white rounded-md p-4"
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <input
                className="border border-white rounded-md p-4"
                type="password"
                placeholder="confirmation password"
                value={formData.password_connfirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_connfirmation: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}

        {error && (
          <span className="bg-red-500 w-full h-auto text-white text-[1rem] font-bold rounded-md p-2 items-center flex ">
            {error}
          </span>
        )}
        {message && (
          <span className="bg-green-500 w-full h-[3rem] text-white text-[1rem] font-bold rounded-md p-2 items-center flex">
            {message}
          </span>
        )}

        {step === 1 && (
          <>
            <WhiteButton
              label={loadingButton === "next" ? <Loader /> : "Next"}
              icon={undefined}
              onClick={() => console.log("Publié !")}
              className="h-[3rem]"
              type="submit"
            />
          </>
        )}

        {step === 2 && (
          <>
            <WhiteButton
              label={
                loadingButton === "createAccount" ? (
                  <Loader />
                ) : (
                  "Create account"
                )
              }
              icon={undefined}
              onClick={() => console.log("Publié !")}
              className="h-[3rem] cursor-pointer"
              type="submit"
            />
          </>
        )}
      </form>
    </div>
  );
}
