import { connection } from "../../../../../lib/database"
import Users from '../../../../../models/User'
import { hashData } from "../../../../../lib/utils"

export async function POST(request) {
    // Data received from front-end
    let data = await request.formData()
    // If no data, return error
    if (!data) {
        return new Response(
            'No data entered'
        , {
            status: 400
        })
    }
    
    let [email, username, password] = [data.get("email"), data.get("username"), data.get("password")]
    // If one or more values not found, return error
    if (!email || !username || !password) {
        return new Response(
            'Insufficient data'
        , {
            status: 400
        })
    }
    // Emails are stored in lowercase
    email = email.toLowerCase();
    // Hashing password
    let hashedPassword = hashData(password)
    // Check all at once, as checking individually takes up computing time
    await connection()
    let user = await Users.findOne({
        email: email,
        username: username,
        password: hashedPassword
    })

    if (!user) {
        return new Response(
            'Incorrect details'
        , {
            status: 400
        })
    }

    return new Response(
        {
            message: "User logged in",
            email: email,
            username: username,
            password: hashedPassword
        }
    , {
        status: 200
    })
  }