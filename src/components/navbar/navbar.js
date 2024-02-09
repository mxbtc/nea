/* On this line, we make sure the navbar is loaded on the client side, as the login data is stored in the user's 
   local storage. We need the session data to render the right buttons
*/
'use client'
import styles from './navbar.module.css'
import Image from 'next/image';
// We will use these functions from the library to make the buttons and redirect to the right page.
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"
import { useRouter } from 'next/navigation';

// This function will return different components depending on whether the user is logged in or not
function SessionButtons ({router}) {
    // Get the session (if there is one) and store it
    let { data: session } = useSession()
    // If the user is logged out, the user will see the log in and sign up button
    // If the user is signed in, the user will see the log out and dashboard button
    return !session ?
        [
            <li key={"link1"} className={styles.link}><button onClick={() => router.push("/sign-in")}>Sign In</button></li>,
            <li key={"link2"} className={styles.link}><button onClick={() => router.push("/sign-up")}>Sign Up</button></li>
        ]
        : 
        [
            <li key={"link3"} className={styles.link}><button onClick={signOut}>Sign Out</button></li>,
            <li key={"link4"} className={styles.link}><button onClick={() => router.push("/dashboard")}>Dashboard</button></li>
        ]
}
// Navbar to be returned
export default function NavBar () {
    const router = useRouter()
    return (
        <SessionProvider>
            <div id={styles.navbar}>
                {/* Logo Placeholder */}
                <div className={styles.logo}>
                    <Image src="/logoBlackOnWhite.svg" width={40} height={40} alt="Logo"/>
                </div>
                {/* Links */}
                <div className={styles.linksParent}>
                    <ul className={styles.linksContainer}>
                        <li className={styles.link}>
                            <button onClick={() => router.push("/")}>Home</button>
                        </li>
                        {/* Buttons based on user session state */}
                        <SessionButtons router={router}/>
                    </ul>
                </div>
            </div>
        </SessionProvider>
    )
}