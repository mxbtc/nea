"use client"

import styles from '@/app/(authenticated)/dashboard/channels/[channelId]/page.module.css'
import { useEffect, useState } from 'react'
import { SendFill } from 'react-bootstrap-icons'
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

        let formData = new FormData()
        formData.append("id", userData.id)
        formData.append("name", userData.name)
        formData.append("email", userData.email)
        formData.append("channelId", channelId)
        formData.append("content", content)
        formData.append("createdAt", new Date())

        setMessageInputText("")

        let res = await fetch("/api/messages/send", {
            cache: "no-store",
            method: "POST",
            body: formData
        })

        console.log(res)

        if (res.error) {
            toast.error(res.message)
        }
	}

	useKeyboardShortcut(["ctrl", "enter"], enterMessage);

    return (
        <div id={styles.messageInputContainer} >
            <form id={styles.messageInput} action={enterMessage}>
                <textarea name={"message"} required
                placeholder={"Enter your message..."}
                title={"Enter your message..."}
                onChange={e => setMessageInputText(e.target.value)}
                maxLength={8000}
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
