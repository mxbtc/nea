'use client'
import styles from './page.module.css'
import NavBar from '../../components/navbar/navbar'
import SignUpForm from '../../components/sign-up-form/form'
import { useSession, SessionProvider } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Sign Up Page
function Main() {
	const [loading, setLoading] = useState(false)
	let router = useRouter()

	const {data: session} = useSession()
	// IF the user is already logged in, they will be redirected to the dashboard
	if (session) {
		router.push("/dashboard")
	}
	// Function to submit users
	async function submitForm(data) {
		setLoading(true)
		toast.info("Attempting to create user...", {position: "bottom-right"})
		// Send data to backend
		let res = await fetch('api/users/create', {
			method: 'POST',
			body: data
		})
		if (res) { setLoading(false) }
		let msg = await res.text()
		if (res.status === 400) {
			toast.error(msg, {position: "bottom-right"})
		}
		if (res.status === 200) {
			toast.success("Successfully created user! Redirecting to sign in...", {position: "bottom-right"})
			router.push('/sign-in')
		}
	}

	// Function for sending data to API
	return <>
	<title>DFS Messaging - Sign Up</title>
	{/* Background image, separate for effects */}
	<div id={styles.backgroundImage}></div>
	<div id={styles.backgroundImage2}></div>
	{/* Navbar which includes all links */}
	<div id={styles.navbar}>
		<NavBar/>
	</div>
	{/* Wrapper for main page */}
	<div id={styles.page}>
		{/* Sign up form  */}
		{/* When submitted, form data sent to "(url)/api/users/create" using POST method, since we are making a user */}
		<form id={styles.form} action={submitForm}>
			<SignUpForm loading={loading}/>
		</form>
	</div>
	</>
}
// Wrapper for session
export default function Page() {
	return <SessionProvider><Main/></SessionProvider>
}