import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Employees from '@/../../models/Employee'
import { connection } from '@/../../lib/database'
import Form from './form'

// Title of page
export const metadata = {
    title: 'DFS Messaging - Add Employee',
}

export default async function Page() {

    const session = await getServerSession(authOptions)
    // if the user is not signed in, redirect them to the sign in page
    if (!session) {
        redirect('/sign-in')
    }
    // connect to db
    await connection()
    let checkEmployee = await Employees.findOne({
        userId: session.user.id,
        permissionLevel: 3
    }).exec()
    // if it does not find an employee with the session's user id and a perm level of 3, redirect to home
    if (!checkEmployee) {
        redirect('/dashboard')
    }

    return <Form/>
}