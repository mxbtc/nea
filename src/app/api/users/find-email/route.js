import { checkEmailExists, connection } from "../../../../../lib/database"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    let res = {
        email: email,
        exists: await checkEmailExists(email)
    }

    return Response.json(res)
  }