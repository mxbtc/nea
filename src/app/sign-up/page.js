import styles from './page.module.css'
import NavBar from '../../components/navbar/navbar'
import SignUpForm from '../../components/sign-up-form/form'

// Sign Up Page
export default function Page() {
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
		{/* When submitted, form data sent to "(url)/api/user/create" using POST method, since we are making a user */}
		<form id={styles.form}>
			<SignUpForm/>
		</form>
	</div>
	</>
}