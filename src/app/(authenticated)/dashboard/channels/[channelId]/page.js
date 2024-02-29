"use client"
import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'
import { useState } from 'react'


export default function Page() {

	const [messages, setMessages] = useState([])
	const [messageInputText, setMessageInputText] = useState("")
	let id=0

	function enterMessage () {
		let content = messageInputText
		let author = "Test User"
		messages.push(
			{
				id: id++,
				username: author,
				content : content
			}
		)
		setMessageInputText("")
	}

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
                            Dashboard
                        </h2>
					</div>
                </div>
                <div id={styles.container}>
					<div id={styles.messages}>
						{
							messages.map(message => {
								return <div class={styles.message} key={message.id}>
									<div class={styles.messageAuthor}>
										{message.username}
									</div>
									<div class={styles.message}>
										{message.content}
									</div>
							</div>
							})
						}
					</div>
					<div id={styles.messageInputContainer}>
							<input id={styles.messageInput} type={"text"} name={"message"} required
							onChange={e => setMessageInputText(e.target.value)}
							value={messageInputText}
							></input>
							<button type={"button"} onClick={enterMessage}>Enter</button>
					</div>
                </div>
            </section>
        </>
    )
}