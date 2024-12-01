import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

const config: NextAuthConfig = {
  providers: [
    {
      id: "atproto",
      name: "Bluesky",
      type: "oauth",
      // ... rest of your atproto provider config
    },
  ],
};

const handler = NextAuth(config);
export { handler as GET, handler as POST };
