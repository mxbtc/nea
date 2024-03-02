"use client"

import styles from '@/app/(authenticated)/dashboard/channels/[channelId]/page.module.css'
import { useEffect, useState } from 'react'
import { SendFill } from 'react-bootstrap-icons'
import serverAction from './serverAction'
import { toast } from 'react-toastify'

export default function MessageField({ userData, channelId }) {

    const useKeyboardShortcut = ( keys, callback ) => {
        useEffect(() => {
            const handleKeyDown = (event) => {
                if (
                    keys.every(
                        (key) =>
                        (key === "ctrl" && event.ctrlKey) ||
                        (key === "shift" && event.shiftKey) ||
                        (key === "alt" && event.altKey) ||
                        (typeof key === "string" && event.key.toLowerCase() === key)
                    )
                ) {
                    callback();
                }
              };
      
              window.addEventListener("keydown", handleKeyDown);
      
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [keys, callback]);
    };

	const [messageInputText, setMessageInputText] = useState("")
	
	async function enterMessage () {
        let content = messageInputText

        if (!content || !userData || !channelId) return;

        let res = await serverAction({...userData, channelId: channelId, content: content, createdAt: new Date()})

        console.log(res)

        if (res.error) {
            toast.error(res.message)
        }

		setMessageInputText("")
	}

	useKeyboardShortcut(["ctrl", "enter"], enterMessage);

    return (
        <div id={styles.messageInputContainer} >
            <form id={styles.messageInput} action={enterMessage}>
                <textarea name={"message"} required
                placeholder={"Enter your message..."}
                title={"Enter your message..."}
                onChange={e => setMessageInputText(e.target.value)}
                maxLength={4000}
                value={messageInputText}
                ></textarea>
                <div id={styles.sendContainer}>
                    <button type={"submit"} title={"Enter your message..."}><SendFill fill={"#EDEDED"}/></button>
                    <span>Send</span>
                </div>
            </form>
        </div>
    )

}