"use server"
import { pusherServer } from "@/../../lib/pusher";
import connection from '@/../../lib/database'
import Messages from '@/../../models/Message'
import { ObjectId } from "mongodb";

export default async function serverAction({id: userId, name, email, channelId, content, createdAt }) {
    try {
        if (!userId) return { error: true, message: "You need a userId!" };

        if (!email) return { error: true, message: "You need an email!" };

        if (!name) return { error: true, message: "You need a name!" };

        if (!content) return {error: true, message: "You need content!"}

        if (content.length < 1 || content.length < 4000) {
            
        }

        let username = name

        pusherServer.trigger(channelId, "incoming-message", {userId, username, email, channelId, content, createdAt: createdAt || new Date()})

        await connection()

        await Messages.create({
            content: content,
            userId: new ObjectId(userId),
            channelId: new ObjectId(channelId)
        })

        return { message: "Success!" }
    } catch (error) {
        return { error: true, message: "There was an error..." }
    }
}