import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/dist/server/api-utils'

export const metadata = {
    title: 'DFS Messaging - Admin Dashboard',
}

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <div id={styles.main}>
            <div id={styles.navbar}>
				<NavBar/>
			</div>
            <div>
                Dashboard
            </div>
            <div>
                <form>
                    <h2>Create Chat</h2>
                    <input type={"text"} placeholder={"Name"}/>
                    <button type={"submit"}>Create</button>
                </form>
            </div>
            <div>
                <form>
                    <h2>Join Chat</h2>
                    <input type={"text"} placeholder={"Enter Invite ID"}/>
                    <button type={"submit"}>Join</button>
                </form>
            </div>
            <div>
                <h2>View All Groups</h2>
            </div>
        </div>
    )
}