import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const metadata = {
    title: 'DFS Messaging - Admin Dashboard',
}

export default async function Page() {
    const session = await getServerSession()
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