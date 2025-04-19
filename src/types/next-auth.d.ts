import NextAuth from "next-auth";

// FOR ADDING CUSTOM FIELDS TO THE JWT

declare module "next-auth" {
    interface Session {
        role?: string;
        customField?: string;
    }

    interface User {
        role?: string;
        customField?: string;
    }
}
