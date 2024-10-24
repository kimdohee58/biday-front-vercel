'use client'
//src/utils/userContext.tsx
import {initialUser, UserModel} from "@/model/user/user.model";
import {createContext, ReactNode, useContext, useState} from "react";

interface UserContextType {
    user: UserModel,
    setUser: (user: UserModel) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children:ReactNode}) => {
    const [user, setUser] = useState<UserModel>(initialUser);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser error");
    }
    return context;
}