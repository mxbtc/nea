"use server"
import { customAlphabet } from 'nanoid'
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

        let name = data.get("name")

        if (!name) {
            return {
                message: "You need a name for your channel!",
                error: true
            }
        }

        if (name.length < 3 || name.length > 80) {
            return {
                message: "The name is too long/short!",
                error: true
            }
        }

        let regex = /^[a-zA-Z0-9.!_\- ?]+$/

        if (!regex.test(name)) {
            return {
                message: "Invalid character in the name!",
                error: true
            }
        }


        let [inviteId, unique] = ["", false]

        while (!unique) { // as long as the invite id is not unique, this function runs in a continuous loop
            await connection()
            let nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
            inviteId = nanoid() // generates alphanumeric string with length of 10 characters
            let res = await Channels.findOne({
                inviteId: inviteId
            })
            if (!res) {
                unique = true
            }
        }

        await connection()
        
        let newChannel = await Channels.create({
            name: name,
            inviteId: inviteId,
            ownerId: new ObjectId(userId)
        })

        let newParticipant = await Participants.create({
            userId: new ObjectId(userId),
            channelId: newChannel._id
        })

        return {
            name: name,
            inviteId: inviteId
        }

        
    } catch (error) {
        console.log(error)
        return {
            message: "There was an unexpected error...",
            error: true
        }
    }
}