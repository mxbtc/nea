"use server"
import Participants from '@/../../models/Participant'
import Channels from '@/../../models/Channel'
import connection from '@/../../lib/database'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
    const session = await getServerSession(authOptions)
    // if the user is not signed in, redirect them to the sign in page
    if (!session) {
        return Response.json({error: "Not allowed"})
    }

    let userId = session.user.id

    async function getChannels() {
        await connection() // establish db connection
        let participantChannels = await Participants.find({
            userId: userId
        }) // get all channels which user is apart of
         // joins channels to particpants, and resolved promise.
        let channelData = await Promise.all(participantChannels.map(await joinData))

        return await channelData
    }
    // Function to join channel and user data
    async function joinData (participant) {
        // temp variable to clone participant data
        let temp = {
            id: participant.channelId.toString()
        }
        // connect to db
        await connection()
        // search for user using participant's channelId
        let channel = await Channels.findOne({
            _id: participant.channelId
        })
        // if there is a channel, join the data
        if (channel) {
            temp.name = channel.name
            temp.inviteId = channel.inviteId.toString()
        }
    
        return temp
    
    }

    let channels = await getChannels()
    // return success, including data
    return Response.json({
        data: channels
    })

}