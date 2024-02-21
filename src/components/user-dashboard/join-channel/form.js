"use client"

import { toast } from 'react-toastify'
import styles from './form.module.css'
import formAction from './formAction'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Form({ toggleView }) {
    let [invite, setInvite] = useState("")
    let [disabled, setDisabled] = useState(false)

    useEffect(() => {
        let regex = /^[a-zA-Z0-9]+$/

        if (!regex.test(invite)) {
            // This hook is used to implement an input mask which prevents invalid characters to be entered
            setInvite(invite.match(/[a-zA-Z0-9]/g) ? invite.match(/[a-zA-Z0-9]/g).join("") : "")
        }
    }, [invite])

    let {data: session} = useSession()

    async function clientAction(data) {
        setDisabled(true)
        let res = await formAction(data, session?.user?.id)
        setDisabled(false)
        if (res.error) {
            toast.error(res.message)
            return;
        }
        
        toast.success(`Your have joined: "${res.name}"!`)
        setTimeout(() => {
          toggleView("view")
        }, 300)
    }

    return (
        <>
                <div id={styles.formContainer}>
                    <form action={clientAction}>
                        <div id={styles.inputs}>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel} >
                                    Invite ID
                                </label>
                                <input 
                                    type={'text'} required name="invite" value={invite}
                                    minLength={10} maxLength={10}
                                    onChange={e => setInvite(e.target.value)}
                                    placeholder={"Enter the Invite ID here"}
                                >
                                </input>
                            </div>
                            <div className={styles.inputContainer}>
                                <button type="submit" disabled={disabled}>
                                    Join
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
        </>
    )
}