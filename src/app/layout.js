import './globals.css'
import { GeistSans } from 'geist/font/sans';
import ToastWrapper from '../components/toast/toast.js'
import NavBar from '@/components/navbar/navbar'


export default function RootLayout({ children }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className={GeistSans.className}>
				<div id={"navbar"}>
					<NavBar/>
				</div>
				{children}
				<ToastWrapper/>
			</body>
		</html>
	)
}
