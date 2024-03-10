"use client"

import styles from '@/app/(authenticated)/dashboard/channels/[channelId]/page.module.css'
import { useEffect, useState } from 'react'
import { SendFill } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'

export default function MessageField({ userData, channelId }) {

    const useKeyboardShortcut = ( keys, callback ) => { // function to create shortcuts
        useEffect(() => {
            const handleKeyDown = (event) => {
                if (
                    keys.every( // check if every key matches what was inputted
                        (key) =>
                        (key === "ctrl" && event.ctrlKey) ||
                        (key === "shift" && event.shiftKey) ||
                        (key === "alt" && event.altKey) ||
                        (typeof key === "string" && event.key.toLowerCase() === key)
                    )
                ) {
                    callback(); // call passed function when buttons are pressed simultaneously
                }
              };
      
              window.addEventListener("keydown", handleKeyDown);
      
            return () => { // when component is removed, delete event listener
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [keys, callback]);
    };

	const [messageInputText, setMessageInputText] = useState("") // track input
	
	async function enterMessage () { // function to send message
        let content = messageInputText

        if (!content || !userData || !channelId) return;
        // send data to API using FormData
        let formData = new FormData()
        formData.append("id", userData.id)
        formData.append("name", userData.name)
        formData.append("email", userData.email)
        formData.append("channelId", channelId)
        formData.append("content", content)
        formData.append("createdAt", new Date())

        setMessageInputText("") // reset input box
        // cache: no-store means that data is not stored on browser
        let res = await fetch("/api/messages/send", {
            cache: "no-store",
            method: "POST",
            body: formData
        })
        // Send toast using provided message if there is an error
        if (res.error) {
            toast.error(res.message)
        }
	}


    useKeyboardShortcut(["shift", "enter"], () => setMessageInputText(prev => prev + "\n"));
	useKeyboardShortcut(["ctrl", "enter"], () => setMessageInputText(prev => prev + "\n"));
    useKeyboardShortcut(["enter"], enterMessage); // send message when pressing enter

    return (
        <div id={styles.messageInputContainer} >
            <form id={styles.messageInput} action={enterMessage}>
                <textarea name={"message"} required
                // prevent newline when pressing enter
                onKeyDown={e => e.key.toLowerCase() == "enter" ? e.preventDefault() : null}
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
