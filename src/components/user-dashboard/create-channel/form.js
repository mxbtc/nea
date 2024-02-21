"use client"

import { toast } from 'react-toastify'
import styles from './form.module.css'
import formAction from './formAction'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Form({ toggleView }) {
    let [name, setName] = useState("")
    let [disabled, setDisabled] = useState(false)

    useEffect(() => {
        let regex = /^[a-zA-Z0-9.!_\- ?]+$/ // checks that string only includes space, alphanumerics . ! _ - and ?

        if (!regex.test(name)) {
            // This hook is used to implement an input mask which prevents invalid characters to be entered
            setName(name.match(/[a-zA-Z0-9.!_\- ?]/g) ? name.match(/[a-zA-Z0-9.!_\- ?]/g).join("") : "")
        }
    }, [name]) // occurrs when input value name changes

    let {data: session} = useSession()

    async function clientAction(data) {
        setDisabled(true) // stops user from spamming button
        let res = await formAction(data, session?.user?.id)
        setDisabled(false)
        if (res.error) {
            toast.error(res.message)
            return;
        }
        
        toast.success(`Your group chat ("${res.name}") has been created`)
        toast.info(`The invite code is: ${res.inviteId}.\nMake sure you remember this!`)
        toggleView("view")
    }

    return (
        <>
                <div id={styles.formContainer}>
                    <form action={clientAction}>
                        <div id={styles.inputs}>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel} >
                                    Channel Name
                                </label>
                                <input 
                                    type={'text'} required name="name" value={name}
                                    minLength={3} maxLength={80}
                                    onChange={e => setName(e.target.value)}
                                    placeholder={"Enter your desired name here..."}
                                >
                                </input>
                            </div>
                            <div className={styles.inputContainer}>
                                <button type="submit" disabled={disabled}>
                                    Create new channel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
        </>
    )
}