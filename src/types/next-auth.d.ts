import {DefaultSession} from "@/types/next-auth";

declare module "@/types/next-auth" {
    interface Session {
        user: {
            address: string;
        } & DefaultSession["user"];
    }
}