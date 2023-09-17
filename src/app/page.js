import Image from 'next/image'
import styles from './page.module.css'
import NavBar from './hooks/navbar/navbar'

export default function Home() {
  return <>
  <NavBar/>
  <div id={styles.main}>
    <div className={styles.heroText}>
    Your place to communicate
    </div>
    <button className={styles.join}>Join now</button>
  </div>
  
  </>
}
