"use server"
import connection from '@/../../lib/database'
import Channels from '@/../../models/Channel'
import Participants from '@/../../models/Participant'
import { ObjectId } from 'mongodb'

export default async function formAction (data, userId) {
    try {
        if (!data) {
            return {
                message: "No data inputted!",
                error: true
            }
        }
        if (!userId) {
            return {
                message: "You are not logged in!",
                error: true
            }
        }

        let inviteId = data.get("invite")

        if (!inviteId) {
            return {
                message: "You need to enter an invite",
                error: true
            }
        }

        if (inviteId.length !== 10) {
            return {
                message: "Invalid invite!",
                error: true
            }
        }

        let regex = /^[a-zA-Z0-9]+$/

        if (!regex.test(inviteId)) {
            return {
                message: "Invalid character(s) in the invite!",
                error: true
            }
        }

        await connection()

        let channel = await Channels.findOne({
            inviteId: inviteId
        })

        if (!channel) {
            return {
                message: "Invite does not exist!",
                error: true
            }
        }

        let checkParticipant = await Participants.findOne({
            userId: new ObjectId(userId),
            channelId: channel._id
        })

        if (checkParticipant) {
            return {
                message: "You are already in this channel!",
                error: true
            }
        }

        let newParticipant = await Participants.create({
            userId: new ObjectId(userId),
            channelId: channel._id
        })

        return {
            name: channel.name
        }

        
    } catch (error) {
        console.log(error)
        return {
            message: "There was an unexpected error...",
            error: true
        }
    }
}