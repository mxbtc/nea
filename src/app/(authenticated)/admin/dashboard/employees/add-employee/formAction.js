"use server"

import Employees from '@/../../models/Employee'
import { connection } from '@/../../lib/database'
import Users from '@/../../models/User'
// action to do when form is submitted
export default async function formAction(data) {
    // get email and permission level from form response.
    let email = data.get("email")
    let level = data.get("permission");
    // if one or none of them are found, redirect to admin dashboard
    if (!email || !level) {
        return {
            message: "Missing email/employee level!"
        }
    }
    email = email.toLowerCase()
    level = parseInt(level)

    if (!level) {
        return {
            message: "Missing email/employee level!"
        }
    }

    if (![1,2,3].includes(level)) {
        return {
            message: "Invalid level option!"
        }
    }

    // connect to db
    await connection();
    // find user with specified email
    let user = await Users.findOne({
        email
    }).exec()
    // if user not found, redirect to admin dashboard
    if (!user) {
        return {
            message: "Email is not in database!"
        }
    }
    // check to see if employee exists using userId
    let checkEmployee = await Employees.findOne({
        userId: user._id,
    })
    // if employee exists, return to admin dashboard
    if (checkEmployee) {
        return {
            message: "Employee already exists!"
        }
    }
    // add employee to database.
    let newEmployee = await Employees.create({
        userId: user._id,
        permissionLevel: level
    })
    // save employee to database.
    newEmployee.save()
    // redirect to admin dashboard
    console.log("Cook")
    return {
        message: "Employee successfully added!",
        success: true
    }

}