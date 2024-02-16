"use client"

import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'
import formAction from './formAction.js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function Form() {
    let router = useRouter()
    // track the response messages 
    const [message, setMessage] = useState({})
    // send message every time form is submitted
    useEffect(() => {
        if (message.success) {
            toast.success(message.message) // send success message
            router.push("/admin/dashboard/employees")
        } else if (message.message) {
            // send error message
            toast.error(message.message)
        }
    }, [message])
    // function which runs when form is submitted
    async function clientAction(formData) {
        // get function which runs on server
        const res = await formAction(formData)
        // update message state
        setMessage(res)
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
                        <h2>Admin Dashboard - Add Employee</h2>
                    </div>
                </div>
                <div id={styles.formContainer}>
                    <form action={clientAction}>
                        <div id={styles.inputs}>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel} >
                                    Employee Email
                                </label>
                                <input 
                                    type="email" required name="email"
                                    placeholder={"Enter employee email here..."}
                                >
                                </input>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel} >
                                    Employee Level
                                </label>
                                <select required name="permission">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className={styles.inputContainer}>
                                <button type="submit">
                                    Add Employee
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}