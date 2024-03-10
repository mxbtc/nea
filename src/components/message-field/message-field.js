"use client"

import styles from '@/app/(authenticated)/dashboard/channels/[channelId]/page.module.css'
import { useEffect, useRef, useState } from 'react'
import { SendFill } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'

export default function MessageField({ userData, channelId }) {

    const useKeyboardShortcut = ( keys, callback, ref) => { // function to create shortcuts
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
                    callback(event); // call passed function when buttons are pressed simultaneously
                }
              };
              if (ref) {
                if (ref.current) {
                    ref.current.addEventListener("keydown", handleKeyDown)

                    return () => { // when component is removed, delete event listener
                        try {
                            ref.current.removeEventListener("keydown", handleKeyDown);
                        } catch (e) {
                            console.log(e)
                        }
                    };
                }
              }
        }, [keys, callback, ref]);
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

    const textArea = useRef(null)

    function makeNewLine(e) {
        e.preventDefault()

        let { selectionStart, selectionEnd } = e.target

        let newInputValue = messageInputText.substring(0, selectionStart) + "\n" + messageInputText.substring(selectionEnd)

        setMessageInputText(newInputValue)

        if (textArea.current) {
            textArea.current.value = newInputValue
            textArea.current.selectionStart = textArea.current.selectionEnd = selectionStart + 1
        }
    }

    useKeyboardShortcut(["shift", "enter"], makeNewLine, textArea); // make new line
	useKeyboardShortcut(["ctrl", "enter"], makeNewLine, textArea); // make new line
    useKeyboardShortcut(["enter"], enterMessage, textArea); // send message when pressing enter

    return (
        <div id={styles.messageInputContainer} >
            <form id={styles.messageInput} action={enterMessage}>
                <textarea name={"message"} required
                // prevent newline when pressing enter
                ref={textArea}
                onKeyDown={e => {
                    if (e.key.toLowerCase() == "enter") {
                        e.preventDefault()
                    }
                }}
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
