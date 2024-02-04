import { connection } from "../../../../../lib/database"
import Users from '../../../../../models/User'
import { validateUsername, validateEmail, validatePassword, hashData } from "../../../../../lib/utils"

export async function POST(request) {
    // Data received from front-end
    let data = await request.formData()
    // If no data, return error
    if (!data) {
        return new Response(
            'No data'
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
    if (!validateUsername(username) || !validateEmail(email) || !validatePassword(password)) {
        return new Response(
            'Invalid data'
        , {
            status: 400
        })
    }
    // Making email lowercase to store in database
    email = email.toLowerCase();
    // CHecking is user email exists already
    let user = await Users.findOne({
        email: email
    })
    console.log(user)
    if (user) {
        return new Response(
            'Email already in use!'
        , {
            status: 400
        })
    }
    // Check if username already exists
    user = await Users.findOne({
        username: username
    })
    if (user) {
        return new Response(
            'Username already in use!'
        , {
            status: 400
        })
    }
    // Hashing password
    let hashedPassword = hashData(password)
    await Users.create({
        email: email,
        username: username,
        password: hashedPassword
    })
    return new Response(
        'User created!'
    , {
        status: 200
    })
  }