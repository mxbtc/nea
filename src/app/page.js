import styles from './page.module.css'
import NavBar from './components/navbar/navbar'
 
// Create page's title
export const metadata = {
  title: 'DFS Messaging - Home',
}
// Home page
export default function Home() {
	return <>
		{/* Background image, separate for blur effect */}
		<div id={styles.backgroundImage}></div>
		{/* Wrapper for the overall page. If we need more sections, we can add them later within the wrapper and use display:grid to sort the layout  */}
		<div id={styles.homePage}>
			{/* Importing the navbar component from ./app/hooks - don't need to rewrite code on each page */}
			<div id={styles.navbar}>
				<NavBar/>
			</div>
			{/* Hero Page - Take up space */}
			<div id={styles.hero}>
				<span className={styles.reveal}>Control your day.</span>
				<span className={styles.reveal + " " + styles.reveal2}>In style.</span>
			</div>
		</div>
	</>
}