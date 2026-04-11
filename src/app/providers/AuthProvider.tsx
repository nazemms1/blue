import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Permission } from "@shared/types";
import { usePermissions } from "@shared/hooks";

interface TestAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: User["role"];
  permissions: Permission[];
}

const TEST_ACCOUNTS: TestAccount[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@blue.dev",
    password: "admin123",
    role: "admin",
    permissions: ["media", "content"],
  },
  {
    id: "2",
    name: "Media Editor",
    email: "media@blue.dev",
    password: "media123",
    role: "editor",
    permissions: ["media"],
  },
  {
    id: "3",
    name: "Content Editor",
    email: "content@blue.dev",
    password: "content123",
    role: "editor",
    permissions: ["content"],
  },
];

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  can: (permission: Permission) => boolean;
  canAny: (...permissions: Permission[]) => boolean;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "blue_user";

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readUser);

  const { can, canAny } = usePermissions({
    permissions: user?.permissions ?? [],
  });

  const login = useCallback(
    async (credentials: { email: string; password: string }): Promise<User> => {
      // Simulate network latency
      await new Promise((r) => setTimeout(r, 600));

      const account = TEST_ACCOUNTS.find(
        (a) =>
          a.email.toLowerCase() === credentials.email.toLowerCase() &&
          a.password === credentials.password,
      );

      if (!account) {
        throw new Error("Invalid email or password.");
      }

      const loggedInUser: User = {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
        permissions: account.permissions,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      localStorage.setItem("auth_token", `mock-jwt-${account.id}`);
      setUser(loggedInUser);
      return loggedInUser;
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("auth_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        can,
        canAny,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}
