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
    // Data received from front-end
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get("filter") || ""

    // connect to db
    await connection()
    let users;

    // if there is a filter, return the users with the filter, else return all users (get the first 50 users)
    if (filter) {
        users = await Users.find().or([{username: {$regex: filter, $options: 'i'}}, {email: {$regex: filter, $options: 'i'}}]).limit(50)
    } else {
        users = await Users.find()
    }


    let res = {
        users: users
    }
    // respond with users in an object
    return Response.json(res)
  }