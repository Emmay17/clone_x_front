import { useState } from "react";
import axios from "axios";
// Correct :
import { useRouter } from "next/navigation";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialise l’erreur
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        setErrorMessage(response.data.message);
        const { token, user } = response.data;
        localStorage.setItem("auth_token", token.token);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
      }
    } catch (error: any) {
      // Gère les erreurs ici
      console.log("Erreur complète :", error); // Ajoute cette ligne
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(`${error.response.data.message}`);
      } else {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="py-3">
      <p className="text-2xl font-bold">Sign in to X</p>

      <div className="flex flex-col gap-4 my-4">
        {/* premier bouton */}
        <div className="flex flex-row h-[3rem] gap-2 text-black justify-center items-center bg-white p-1 rounded-full">
          <img
            alt="img"
            loading="lazy"
            className="h-[1.5rem] md:w-[35px] md:h-[35px]"
            src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
          />

          <span className="text-[1.05rem] font-bold">Sign in with Google</span>
        </div>

        {/* connexion avec apple */}
        <div className="flex flex-row h-[3rem] items-center gap-2 bg-white text-black justify-center p-1 rounded-full h-[2rem">
          <p className="text-[2rem]"></p>
          <p className="text-[1.05rem] font-bold">Sign in with Apple</p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <hr className="w-full " />
        <p className="text-[15px]">or</p>
        <hr className="w-full" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-4">
        <label className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-[0.1rem] border-gray-300 rounded-md"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border-[0.1rem] border-gray-300 rounded-md"
          />
        </label>

        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded-md">
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          className="bg-white text-black font-bold p-2 rounded-full"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
