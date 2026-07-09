import React from "react";
import logo from "/favicon.svg";
import {useLogin }from "../api/AuthService";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { SecondaryLoader } from "../components/loader";

export default function Auth() {
  const LoginMutation = useLogin();
  const { isPending } = LoginMutation;

  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      LoginMutation.mutate(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
<main className="relative min-h-screen overflow-hidden  transition-colors duration-300">
  {/* Background Blur */}
  <div className="absolute -top-44 -left-32 h-96 w-96 rounded-full bg-violet-500/20 blur-[130px] dark:bg-violet-600/30" />
  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px] dark:bg-blue-600/20" />

  <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">
    <div className="grid w-full items-center gap-20 lg:grid-cols-2">

      {/* LEFT */}
      <div className="flex justify-center">
        <div className="w-full max-w-lg">

          <div className="mb-8 flex justify-center">
            <img
              src={logo}
              alt="logo"
              className="h-16 w-16"
            />
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white/80 p-10 shadow-2xl backdrop-blur-xl transition-colors duration-300 dark:border-neutral-700/60 dark:bg-neutral-900/70">

            <div className="text-center">

              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
                Welcome to
              </h1>

              <h2 className="mt-2 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent dark:from-violet-400 dark:to-blue-400">
                FLUX AI
              </h2>

              <p className="mt-5 leading-7 text-neutral-600 dark:text-neutral-400">
                Continue with your Google account to access your
                personalized AI workspace and start building amazing
                conversations.
              </p>

            </div>

            <button
              disabled={isPending}
              onClick={googleAuth}
              className="mt-12 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-neutral-900 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              {isPending ? (
                <div className="h-5 w-5 fill-current">
                  <SecondaryLoader />
                </div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    />
                    <path
                      fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    />
                    <path
                      fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    />
                    <path
                      fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    />
                    <path
                      fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    />
                    <path
                      fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    />
                  </svg>

                  Continue with Google
                </>
              )}
            </button>

            <p className="mt-8 text-center text-xs leading-6 text-neutral-600 dark:text-neutral-500">
              By continuing you agree to our{" "}
              <span className="cursor-pointer font-medium text-violet-600 transition-colors hover:underline dark:text-violet-400">
                Terms
              </span>{" "}
              and{" "}
              <span className="cursor-pointer font-medium text-violet-600 transition-colors hover:underline dark:text-violet-400">
                Privacy Policy
              </span>
              .
            </p>

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative hidden items-center justify-center lg:flex">

        {/* Glow */}
        <div className="absolute h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[140px] dark:bg-violet-600/10" />

        <img
          src="https://readymadeui.com/images/integration-illus.webp"
          alt="AI Illustration"
          className="relative z-10 w-full max-w-2xl select-none object-contain"
          draggable={false}
        />

      </div>

    </div>
  </div>
</main>
  );
}