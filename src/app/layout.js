import './globals.css'
import { GeistSans } from 'geist/font/sans';
import ToastWrapper from '../components/toast/toast.js'
import NavBar from '@/components/navbar/navbar'
import localFont from 'next/font/local'

const myFont = localFont({
	src: './GeistVariableVF.ttf',
	display: 'swap',
  })


export default function RootLayout({ children }) {
	return (
		<html lang="en" className={myFont.className}>
			<body>
				{children}
				<ToastWrapper/>
			</body>
		</html>
	)
}
