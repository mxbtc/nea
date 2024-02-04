import './globals.css'
import { GeistSans } from 'geist/font/sans';
import ToastWrapper from '../components/toast/toast.js'


export default function RootLayout({ children }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body>
				{children}
				<ToastWrapper/>
			</body>
		</html>
	)
}
