import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";

const prisma = new PrismaClient();

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

type Profile = {
  email?: string;
  // other profile properties
};

type Account = {
  provider: string;
  // other account properties
};


export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile;
    }) {
      if (account && account.provider === "google" && profile?.email) {
        const result: string | boolean =
          profile.email.endsWith("@vitstudent.ac.in");
        return Promise.resolve(result);
      }

      // Default case, return a resolved Promise with a boolean value
      return Promise.resolve(false);
    },
  },

  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code&hd=vitstudent.ac.in",
    })

  ],
};


export const getServerAuthSession = () => getServerSession(authOptions);
