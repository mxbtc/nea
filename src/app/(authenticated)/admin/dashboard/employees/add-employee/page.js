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
    // server action - when the form is submitted, this function is ran on the server.
    async function addEmployee(data) {
        "use server"
        // get email and permission level from form response.
        let email = data.get("email")
        let permission = data.get("permission");
        // if one or none of them are found, redirect to admin dashboard
        if (!email || !permission) {
            redirect("/admin/dashboard/employees")
        }
        // connect to db
        await connection();
        // find user with specified email
        let user = await Users.findOne({
            email
        }).exec()
        // if user not found, redirect to admin dashboard
        if (!user) {
            redirect("/admin/dashboard/employees")
        }
        // check to see if employee exists using userId
        let checkEmployee = await Employees.findOne({
            userId: user._id,
        })
        // if employee exists, return to admin dashboard
        if (checkEmployee) {
            redirect("/admin/dashboard/employees")
        }
        // add employee to database.
        let newEmployee = await Employees.create({
            userId: user._id,
            permissionLevel: parseInt(permission)
        })
        // save employee to database.
        newEmployee.save()
        // redirect to admin dashboard
        redirect("/admin/dashboard/employees")

    }

    return (
        <>
            <header id={styles.header}>
                <div id={styles.navbar}>
                    <NavBar/>
                </div>
            </header>
            <section id={styles.section}>
                <div id={styles.headBar}>
                    <div>
                        <h2>Admin Dashboard - Add Employee</h2>
                    </div>
                </div>
                <div id={styles.formContainer}>
                    <form action={addEmployee}>
                        <div id={styles.inputs}>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel} >
                                    Employee Email
                                </label>
                                <input 
                                    type="email" required name="email"
                                    placeholder={"Enter employee email here..."}
                                >
                                </input>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel} >
                                    Employee Level
                                </label>
                                <select required name="permission">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className={styles.inputContainer}>
                                <button type="submit">
                                    Add Employee
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}