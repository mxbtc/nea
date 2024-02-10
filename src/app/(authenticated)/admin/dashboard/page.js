import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Employees from '@/../../models/Employee'
import Users from '@/../../models/User'
import { connection } from '@/../../lib/database'
// Title of page
export const metadata = {
    title: 'DFS Messaging - Management Dashboard',
}
// This function gets the joined data of all employees
async function getEmployees () {
    await connection()
    let employees = await Employees.find()
    let employeesData = await Promise.all(employees.map(await joinData))
    return await employeesData
}
// Function to join employee and user data
async function joinData (employee) {
    // temp variable to clone employee object
    let temp = {
        _id: employee._id,
        userId: employee.userId,
        permissionLevel: employee.permissionLevel
    }
    // connect to db
    await connection()
    // search for user using employee's userId
    let user = await Users.findOne({
        _id: employee.userId
    })
    // if there is a user, add it to the temp employee object
    if (user) {
        temp.email = user.email
        temp.username = user.username
    }

    return temp

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
    // store all employees
    let employees = await getEmployees()

    return (
        <div>
            <div id={styles.navbar}>
				<NavBar/>
			</div>
            <div>
                Management Dashboard
            </div>
            <table id={styles.employees}> {/* table to display employee data */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Permission Level</th>
                    </tr>
                </thead>
                <tbody>
                {
                    employees.map(employee => { // loop over employees, making a table row which includes the employee data.
                        return (
                            <tr key={employee._id.toString()} eid={employee._id.toString()} uid={employee.userId.toString()}>
                                <td>Employee Name: {employee.username}</td>
                                <td>Employee Email: {employee.email}</td>
                                <td>Employee Level: {employee.permissionLevel}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            
        </div>
    )
}