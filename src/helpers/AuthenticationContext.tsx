import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps } from "../@types/authentication.type";
import { MessageContext } from "./MessagesContext";
import { FetchResponseProps } from "../@types/fetch.type";
import { useNavigate } from "react-router-dom";

export const AuthenticationContext = createContext<AuthContextProps>({
  authenticated: false,
  login: (username: string, password: string) => {
    return Promise.resolve();
  },
  logout: () => {
    return Promise.resolve();
  },
  register: () => {
    return Promise.resolve(false);
  },
  verifyLogin: () => {
    return Promise.resolve(false);
  },
});
const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { success, error } = useContext(MessageContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [authorization, setAuthorization] = useState<string | undefined>();
  const navigate = useNavigate();

  const verifyLogin = async () => {
    if (window && window.localStorage) {
      const authorizationStorage =
        window.localStorage.getItem("authorization") ?? undefined;
      if (authorizationStorage) {
        const tokenValid = await profile(authorizationStorage);
        if (tokenValid) {
          setAuthorization(authorizationStorage);
          setAuthenticated(true);
          return true;
        }
      }
    }
    window.localStorage.removeItem("authorization");
    setAuthorization(undefined);
    setAuthenticated(false);
    return false;
  };
  const login = async (username: string, password: string) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };
      const request = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        options
      );
      const response: FetchResponseProps<string> = await request.json();
      if (request.status === 200) {
        setAuthenticated(true);
        setAuthorization(response.result);
        window.localStorage.setItem("authorization", response.result);
        success(response.message);
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (err: Error | any) {
      error(err.message);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };
      const request = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        options
      );
      const response: FetchResponseProps<string> = await request.json();
      if (request.status === 201) {
        success(response.message);
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (err: Error | any) {
      error(err.message);
      return false;
    }
  };

  const logout = async () => {
    setAuthenticated(false);
    setAuthorization(undefined);
    window.localStorage.removeItem("authorization");
    success("User logged out");
    navigate("/login");
  };

  const profile = async (token: string) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/profile`,
      options
    );
    const response: FetchResponseProps<{
      username: string;
    }> = await request.json();

    if (request.status === 200) {
      return true;
    } else {
      error(response.message);
      return false;
    }
  };
  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        authorization,
        login,
        logout,
        register,
        verifyLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
