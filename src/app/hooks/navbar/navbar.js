'use client'

import styles from './navbar.module.css'
import Image from 'next/image'
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"
import Link from 'next/link'
import { permanentRedirect, redirect } from 'next/navigation'

function LoginButton () {

    const { data : session } = useSession()

    if (session) {
        return (
            <li>
                <div id={styles.logout} onClick={() => signOut()}>Log Out</div>
            </li>
        )
    } else {
        return (
            <li >
                <div id={styles.login} onClick={() => signIn()}>Login</div><a href={"/auth/signup"}  id={styles.signUp} onClick={() => redirect('/auth/signup')}>Sign Up</a>
            </li>
        )
    }

}

export default function NavBar () {
    return <div id={styles.navbar}>
        <SessionProvider>
        <div id={styles.icon}>
            <Image 
            src='/nextjs.png'
            width={50}
            height={50}
            alt="Logo"
            id={styles.logo}
            />
        </div>
        <ul id={styles.links}>
            <li>Home</li>
            <LoginButton/>
        </ul>
        </SessionProvider>
    </div>
}