import styles from './page.module.css'
import NavBar from '@/components/navbar/navbar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Employees from '@/../../models/Employee'
import { connection } from '@/../../lib/database'
import mongoose from 'mongoose'

export default async function Page({ params, searchParams }) {

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
    // if it does not find an employee with the session's user id and a perm level of 3, 
    // redirect to home
    if (!checkEmployee) {
        redirect('/dashboard')
    }
    // id from [id] slug
    const id = params.id

    async function editEmployee(data) {
        "use server"
        
        let permissionLevel = data.get("permission") // get permission from submitted form
        // if there is no input, return to dashboarrd
        if (!permissionLevel) {
            redirect("/admin/dashboard/employees")
        }

        await connection()
        // if the employee exists, it will be updated else it won't
        let employeeUpdated = await Employees.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(id)
        },
        {
            permissionLevel: parseInt(permissionLevel)
        },
        {upsert: false}) // new record wont be added if the employee isn't found

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
                        <h2>Admin Dashboard - Edit Employee</h2>
                    </div>
                </div>
                <div id={styles.formContainer}>
                    <form action={editEmployee}>
                        <div id={styles.inputs}>
                            <div className={styles.inputContainer}>
                                <label className={styles.inputLabel} >
                                    Change Employee Level
                                </label>
                                <select required name="permission">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className={styles.inputContainer}>
                                <button type="submit">
                                    Edit Employee
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}