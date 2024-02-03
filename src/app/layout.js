import './globals.css'
import { GeistSans } from 'geist/font/sans';
import NavBar from '../components/navbar/navbar';


export default function RootLayout({ children }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body>
				{children}
			</body>
		</html>
	)
}
