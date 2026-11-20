import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// .env: MONGODB_SECRET_URL_ID = MongoDB connection string
const client = new MongoClient(`${process.env.MONGODB_SECRET_URL_ID}`)
const db = client.db("assignment-projects")

export const auth = betterAuth({

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    user: {
        additionalFields: {
            // 🎭 User Role Field
            role: {
                // DB te string hisebe save hobe; allowed value: "students" | "teachers" | "admin"
                type: "string", // টাইপ অবশ্যই "string" হতে হবে
                defaultValue: "students",
                required: true,
                input: true, // ক্লায়েন্ট সাইড থেকে ইনপুট নেওয়ার অনুমতি
            },

            // 🖼️ Cover Image Field


            coverImage: {
                type: "string",
                required: false,
                input: true,
            },
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
})
