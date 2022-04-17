import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";



import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
});

// const options = {
// 	providers: [
// 		GitHubProvider({
// 			clientId: process.env.GITHUB_ID,
// 			clientSecret: process.env.GITHUB_SECRET
// 		}),
// 	],
// }

// export default (req, res) => NextAuth(req, res, options)