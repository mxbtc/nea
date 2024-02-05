'use client'
import styles from './page.module.css'
import NavBar from '../../components/navbar/navbar'
import SignInForm from '../../components/sign-in-form/form'
import { useSession, SessionProvider, signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

// Sign In Page
function Main() {
	let router = useRouter()

	const { data } = useSession()
    let session = data
	// IF the user is already logged in, they will be redirected to the dashboard
	if (session) {
		router.push("/dashboard")
	}
	// Function to submit users
	async function submitForm(data) {
		// Send data to backend
		let res = await fetch('api/users/login', {
			method: 'POST',
			body: data
		})
		let msg = await res.text()
		if (res.status === 400) {
			toast.error(msg, {position: "bottom-right"})
		}
		if (res.status === 200) {
			toast.success("Signing in...", {position: "bottom-right"})
            signIn("credentials", {
                redirect: false,
                email: data.get("email"),
                username: data.get("username"),
                password: data.get("password")
            })
			setTimeout(() => {
				router.push('/dashboard')
			}, 2000)
			
		}
	}
	return <>
	<title>DFS Messaging - Sign In</title>
	{/* Background image, separate for effects */}
	<div id={styles.backgroundImage}></div>
	<div id={styles.backgroundImage2}></div>
	{/* Navbar which includes all links */}
	<div id={styles.navbar}>
		<NavBar/>
	</div>
	{/* Wrapper for main page */}
	<div id={styles.page}>
		<form id={styles.form} action={submitForm}>
            <SignInForm/>
		</form>
	</div>
	</>
}
// Wrapper for session
export default function Page() {
	return <SessionProvider><Main/></SessionProvider>
}