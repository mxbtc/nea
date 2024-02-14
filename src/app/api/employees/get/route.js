import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { connection } from "../../../../../lib/database"
import Users from '../../../../../models/User'
import Employees from '@/../../models/Employee'

export async function GET(request) {
    const session = await getServerSession(authOptions)
    // if the user is not signed in, redirect them to the sign in page
    if (!session) {
        return Response.json({error: "Not allowed"})
    }
    // connect to db
    await connection()
    let checkEmployee = await Employees.findOne({
        userId: session.user.id,
        permissionLevel: 3
    }).exec()
    // if it does not find an employee with the session's user id and a perm level of 3, return error
    if (!checkEmployee) {
        return Response.json({error: "Not allowed"})
    }

    async function getEmployees () {
        await connection() // establish db connection
        let employees = await Employees.find() // get all employees
         // joins users to employees, and resolved promise.
        let employeesData = await Promise.all(employees.map(await joinData))
        // sorting employees by name in ascending order
        employeesData.sort((a, b) => {
            if (a.username > b.username) {
                return 1
            }
            if (a.username === b.username) {
                return 0
            }
            return -1
        })
        // sorting employees by permission level in descending order.
        employeesData.sort((a, b) => b.permissionLevel - a.permissionLevel)

        return await employeesData
    }
    // Function to join employee and user data
    async function joinData (employee) {
        // temp variable to clone employee object
        let temp = {
            _id: employee._id.toString(),
            userId: employee.userId.toString(),
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

    let employees = await getEmployees()


    const res = {
        employees: employees
    }
    // respond with users in an object
    return Response.json(res)
  }