import Image from 'next/image'
import styles from './page.module.css'
import NavBar from './hooks/navbar/navbar'
 
// Create page's title
export const metadata = {
  title: 'DFS Messaging - Home',
}

export default function Home() {
	return <>
		{/* Wrapper for the overall page. If we need more sections, we can add them later within the wrapper and use display:grid to sort the layout  */}
		<div id={styles.homePage}>
			{/* Importing the navbar component from ./app/hooks - don't need to rewrite code on each page */}
			<NavBar/>
			{/* Hero Page - Take up space */}
			<div id={styles.hero}>
				DFS Messaging
			</div>
		</div>
	</>
}
