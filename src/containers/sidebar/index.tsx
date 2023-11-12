import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { setUser } from "@src/auth";
import { logout } from "@src/redux/auth";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";

export const Sidebar: React.FC = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const goToLogin = useCallback(() => {
    router.push("/login");
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logout());
    setUser(null);
    router.push("/");
  }, []);

  const isActive = (path: string) => {
    return router.pathname === path ? "bg-accent text-white" : "";
  };

  return (
    <nav className="bg-primary text-white h-screen left-0 top-0 flex flex-col justify-between p-4 shadow-md">
      <div className="flex text-center justify-center flex-col">
        <Link
          className="text-3xl font-bold hover:text-secondary mb-10 justify-center"
          href={authState.isLoggedIn ? "/dashboard" : "/"}
        >
          InvestraTrack
        </Link>
        {authState.isLoggedIn && (
          <div className="flex flex-col space-y-4">
            <Link
              className={`hover:bg-accent hover:text-white hover:shadow-md p-3 my-3 rounded-lg transition-all duration-300 ${isActive(
                "/dashboard"
              )}`}
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className={`hover:bg-accent hover:text-white hover:shadow-md p-3 my-3 rounded-lg transition-all duration-300 ${isActive(
                "/search"
              )}`}
              href="/search"
            >
              Search Companies
            </Link>
            <Link
              className={`hover:bg-accent hover:text-white hover:shadow-md p-3 my-3 rounded-lg transition-all duration-300 ${isActive(
                "/recommend"
              )}`}
              href="/recommend"
            >
              See Recommendations
            </Link>
          </div>
        )}
      </div>
      <div>
        {authState.isLoggedIn ? (
          <button
            onClick={onLogout}
            className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded transition duration-300 shadow-lg w-full"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={goToLogin}
            className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded transition duration-300 shadow-lg w-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
