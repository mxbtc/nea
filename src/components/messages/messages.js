"use client"
import styles from '@/app/(authenticated)/dashboard/channels/[channelId]/page.module.css'
import { useEffect, useState } from 'react'
import { pusherClient } from '@/../../lib/pusher'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { nanoid } from 'nanoid'
export const dynamic = 'force-dynamic'

export default function MessagesBox({ initialMessages, channelId }) {

	const [incomingMessages, setIncomingMessages] = useState([])
    const [renderedInitMessages, setRenderedInitMessages] = useState([])
    const [renderedIncomingMessages, setRenderedIncomingMessages] = useState([])

	useEffect(() => {

		let messageHandler = (data) => {
            setIncomingMessages(prev => [data, ...prev])
        }

        pusherClient.subscribe(channelId)

        pusherClient.bind('incoming-message', messageHandler)
    
        return () => {
			pusherClient.unbind('incoming-message', messageHandler)
		  	pusherClient.unsubscribe(channelId)
        }
    }, [])

    let messageCleaner = (message) => {
		return <div className={styles.message} key={nanoid() + `${new Date()}`}>
			<div className={styles.profilePictureContainer}>
				<div className={styles.profilePicture}>
					{message.username?.slice(0,1)}
				</div>
			</div>
			<div className={styles.mainContent}>
				<div className={styles.messageAuthor}>
					<span>
						{message.username} ({message.email})
					</span>
					<span>
						{new Date(message.createdAt).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric"})}
					</span>
				</div>
				<div className={styles.messageContent}>
					<div>
						<Markdown
						components={{
							code(props) {
							const {children, className, node, ...rest} = props
							const match = /language-(\w+)/.exec(className || '')
							return match ? (
								<SyntaxHighlighter
								{...rest}
								PreTag="div"
								language={match[1]}
								showLineNumbers={true}
								style={oneDark}
								lineNumberStyle={{minWidth: "2em"}}
								>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
							) : (
								<code {...rest} className={className}>
								{children}
								</code>
							)
							}
						}}
						remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
							{message.content}
						</Markdown>
					</div>
				</div>
			</div>
		</div>
	}

    useEffect(() => {
		let temp = initialMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        setRenderedInitMessages(temp.map(message => messageCleaner(message)))
    }, [initialMessages])

    useEffect(() => {
		let temp = incomingMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        setRenderedIncomingMessages(temp.map(message => messageCleaner(message)))
    }, [incomingMessages])

    return <>
    { renderedIncomingMessages.map(message => message) }
    { renderedInitMessages.map(message => message) }
    </>

}