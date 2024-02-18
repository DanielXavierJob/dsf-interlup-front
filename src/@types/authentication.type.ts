interface AuthContextProps {
  authenticated: boolean;
  authorization?: string;
  login:  (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string) => Promise<boolean>;
  verifyLogin: () => Promise<boolean>
}

export { AuthContextProps };
