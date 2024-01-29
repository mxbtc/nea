'use client'

import styles from './navbar.module.css'
import Image from 'next/image';

function SessionButtons () {
    // This function will return different components depending on whether the user is logged in or not

    // For the prototype, the user will be logged out
    let session = false;

    // If the user is logged out, the user will see the log in and sign up button
    // If the user is signed in, the user will see the log out and dashboard button
    return !session ?
        [
            <li key={"link"} className={styles.link}><button>Log In</button></li>,
            <li key={"link"} className={styles.link}><button>Sign Up</button></li>
        ]
        : 
        [
            <li key={"link"} className={styles.link}><button>Log Out</button></li>,
            <li key={"link"} className={styles.link}><button>Dashboard</button></li>
        ]

}
// Navbar to be returned
export default function NavBar () {
    return (
        <div id={styles.navbar}>
            {/* Logo Placeholder */}
            <div className={styles.logo}>
                <Image src="./logoWhiteOnBlack.svg" width={50} height={50} alt="Logo"/>
            </div>
            {/* Links */}
            <div className={styles.linksParent}>
                <ul className={styles.linksContainer}>
                    <li className={styles.link}>
                        <a href="/">Home</a>
                    </li>
                    {/* Buttons based on user session state */}
                    <SessionButtons/>
                </ul>
            </div>
        </div>
    )
}