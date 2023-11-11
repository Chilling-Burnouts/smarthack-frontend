import { Button } from "@src/src/components/button";
import { Input } from "@src/src/components/input";
import React from "react";

export const Login: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-2/5 p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <Input id="username" type="text" placeholder="Your username" />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Input id="password" type="password" placeholder="Your password" />
          </div>
          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
};
