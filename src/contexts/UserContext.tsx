import { createContext, ReactNode, useContext, useState } from 'react';

interface User {
  name: string;
  username: string;
  email: string;
  bio?: string;
  genres?: string[];
}

interface UserContextData {
  user: User | null;
  createUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function createUser(data: User) {
    setUser(data);
  }

  function updateUser(data: Partial<User>) {
    setUser((current) => {
      if (!current) return current;

      return {
        ...current,
        ...data,
      };
    });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}