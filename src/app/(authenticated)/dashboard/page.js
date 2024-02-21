import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Dashboard from '@/components/user-dashboard/dashboard'

export const metadata = {
    title: 'DFS Messaging - Dashboard',
}

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session) { // redirect to sign in if not signed in
        redirect("/sign-in")
    }

    return (
        <>
            <header id={styles.header}>
                <div id={styles.navbar}>
                    <NavBar/>
                </div>
			</header>
            <Dashboard userId={session?.user?.id}/>
        </>
    )
}