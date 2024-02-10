import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'

export const metadata = {
    title: 'DFS Messaging - Admin Dashboard',
}

export default function Page() {
    return (
        <div>
            <div id={styles.navbar}>
				<NavBar/>
			</div>
            <div>
                Dashboard
            </div>
        </div>
    )
}