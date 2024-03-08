import { pusherServer } from "@/../../lib/pusher";
import connection from '@/../../lib/database'
import Messages from '@/../../models/Message'
import { ObjectId } from "mongodb";

export async function POST(request) {
    try {

        let formData = await request.formData()

        if (!formData) return Response.json({ error: true, message: "No data found" });

        let userId = formData.get("id")
        let name = formData.get("name")
        let email = formData.get("email")
        let channelId = formData.get("channelId")
        let content = formData.get("content")
        let createdAt = formData.get("createdAt")

        if (!userId) return Response.json({ error: true, message: "You need a userId!" });

        if (!email) return Response.json({ error: true, message: "You need an email!" });

        if (!name) return Response.json({ error: true, message: "You need a name!" });

        if (!content) return Response.json({error: true, message: "You need content!"});

        if (!channelId) return Response.json({error: true, message: "You need a channel!"});

        if (content.length < 1 || content.length > 4000) {
            return Response.json({error: true, message: "You need content to be between 1-4000 characters!"})
        }

        let username = name

        await pusherServer.trigger(channelId, "incoming-message", {userId, username, email, channelId, content, createdAt: new Date(createdAt) || new Date()})

        await connection()

        await Messages.create({
            content: content,
            userId: new ObjectId(userId),
            channelId: new ObjectId(channelId)
        })

        return Response.json({ message: "Success!" })
    } catch (error) {
        console.log(error)
        return Response.json({ error: true, message: "There was an error..." });
    }
}
