import './globals.css'
import { GeistSans } from 'geist/font/sans';
import ToastWrapper from '@/components/toast/toast.js'
import NavBar from '@/components/navbar/navbar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


export default async function RootLayout({ children }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/sign-in')
    }

	return (
		<html lang="en" className={GeistSans.className}>
			<body>
				<div id={"navbar"}>
					<NavBar/>
				</div>
				{children}
				<ToastWrapper/>
			</body>
		</html>
	)
}
