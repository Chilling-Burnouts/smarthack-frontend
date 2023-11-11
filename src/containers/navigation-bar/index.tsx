import Link from "next/link";
import { Fragment, useCallback } from "react";

import { useAuthState } from "@src/src/redux/auth";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const authState = useAuthState();

  const router = useRouter();

  const goToLogin = useCallback(() => {
    router.push("/login");
  }, []);

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-xl font-bold" href="/">
          MyPortfolioApp
        </Link>
        <div>
          {authState.isLoggedIn ? (
            <Fragment>
              <Link className="px-4" href="/monitor">
                Monitor
              </Link>
              <Link className="px-4" href="/recommend">
                Recommend
              </Link>
              <button className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded">
                Logout
              </button>
            </Fragment>
          ) : (
            <button
              onClick={goToLogin}
              className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
