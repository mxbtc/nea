"use server"
import connection from '@/../../lib/database'
import Participants from '@/../../models/Participant'
import Channels from '@/../../models/Channel'
import { ObjectId } from 'mongodb'

export default async function buttonAction (userId, channelId) {
    try {
        
        if (!userId || !channelId) {
            return {
                message: "Insufficient data!",
                error: true
            }
        }

        await connection() // establish connection

        let channel = await Channels.findOne({
            _id: new ObjectId(channelId)
        })

        if (!channel) {
            return {
                message: "Channel does not exist!",
                error: true
            }
        }

        if (channel.ownerId.toString() === userId) { // check to see if user is also owner
            return {
                message: "You are the owner - you cannot leave!",
                error: true
            }
        }

        let participant = await Participants.findOne({
            channelId: new ObjectId(channelId),
            userId: new ObjectId(userId)
        })

        if (!participant) {
            return {
                message: "You are not part of this channel!",
                error: true
            }
        }

        await Participants.deleteOne({
            _id: participant._id
        })

        return {
            message: "Success!"
        }

        
    } catch (error) {
        console.log(error)
        return {
            message: "There was an unexpected error...",
            error: true
        }
    }
}