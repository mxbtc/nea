import Image from 'next/image'
import styles from './page.module.css'
import NavBar from './hooks/navbar/navbar'
import { Metadata } from 'next'
 
// either Static metadata
export const metadata = {
  title: 'DFS Messaging - Home',
}

export default function Home() {
	return <>
		<div className={styles.homePage}>
			{/* Importing the navbar component from ./app/hooks - don't need to rewrite code on each page */}
			<NavBar/>
			{/* Hero Page - Take up space */}
			<div className={styles.hero}>
				DFS Messaging
			</div>
		</div>
	</>
}
