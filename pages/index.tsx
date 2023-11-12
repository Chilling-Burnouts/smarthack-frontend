import Link from "next/link";
import { useRouter } from "next/router";

import { useAppSelector } from "@src/redux/hooks";

const LandingPage: React.FC = () => {
  const authState = useAppSelector((state) => state.auth);

  const router = useRouter();

  if (authState.isLoggedIn) {
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-center">
      <h1 className="text-5xl font-bold text-white mb-6">
        Welcome to InvestraTrack
      </h1>
      <p className="text-white mb-4">
        Your Personal Investment Portfolio Tracker
      </p>
      <Link
        className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded"
        href="/login"
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
