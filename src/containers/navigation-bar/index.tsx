import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { useAuthState, logout } from "@src/redux/auth";
import { useAppDispatch } from "@src/redux/store";
import { VerticalLine } from "@src/components/vertical-line";

export const Navbar: React.FC = () => {
  const authState = useAuthState();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const goToLogin = useCallback(() => {
    router.push("/login");
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logout());
    router.push("/");
  }, []);

  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          className="text-xl font-bold hover:text-secondary"
          href={authState.isLoggedIn ? "/dashboard" : "/"}
        >
          InvestraTrack
        </Link>
        {authState.isLoggedIn ? (
          <div className="flex-grow flex justify-center items-center space-x-4">
            <Link className="hover:text-secondary" href="/search">
              Search Companies
            </Link>
            <VerticalLine />
            <Link className="hover:text-secondary" href="/recommend">
              See Recommendations
            </Link>
          </div>
        ) : null}
        <div>
          {authState.isLoggedIn ? (
            <button
              onClick={onLogout}
              className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded transition duration-300 shadow-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={goToLogin}
              className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded transition duration-300 shadow-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
