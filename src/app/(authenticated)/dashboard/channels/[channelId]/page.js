
import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import MessagesBox from '@/components/messages/messages'
import MessageField from '@/components/message-field/message-field'
import { connection } from '@/../../lib/database'
import Channels from '@/../../models/Channel'
import Participants from '@/../../models/Participant'
import Messages from '@/../../models/Message'
import Users from '@/../../models/User'


export default async function Page ({ params }) {

	let session = await getServerSession(authOptions)

	if (!session) {
		redirect("/sign-in")
	}

	let channelId = params.channelId

	await connection()

	let channel = await Channels.findOne({
		_id: channelId
	})

	if (!channel) redirect('/dashboard');

	let participant = await Participants.findOne({
		userId: session.user.id,
		channelId: channelId
	})

	if (!participant) redirect('/dashboard');

	let existingMessages = await Messages.find({
		channelId: channelId
	})

	let serialisedMessages = existingMessages.map(async message => {
		await connection()

		let user = await Users.findOne(
			{
				_id: message.userId
			}
		)

		if (user) {
			return {
				content: message.content,
				username: user.username,
				email: user.email,
				createdAt: message.createdAt,
				_id: message._id.toString()
			}
		}
	})

	async function getMessages () {
		return Promise.all(serialisedMessages)
	} 

	serialisedMessages = (await getMessages()).reverse()

    return (
        <>
            <header id={styles.header}>
                <div id={styles.navbar}>
                    <NavBar/>
                </div>
			</header>
			<section id={styles.section}>
                <div id={styles.headBar}>
                    <div>
                        <h2>
                            Messages
                        </h2> - {channel.name}
					</div>
                </div>
                <div id={styles.container}>
					<div id={styles.messages}>
						{
							<MessagesBox channelId={channelId} initialMessages={serialisedMessages}/>
						}
					</div>
					<MessageField userData={session.user} channelId={channelId}/>
                </div>
            </section>
        </>
    )
}