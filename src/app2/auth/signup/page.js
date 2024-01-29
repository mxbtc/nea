/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import styles from './signup.module.css'
import { BoxArrowLeft} from 'react-bootstrap-icons'
import crypto from 'crypto'
import { redirect } from 'next/navigation'
import SignUpForm from './signupform'
import dbConnect from '../../../../lib/dbConnect'
import Users from '../../../../models/User'

export default function Home({searchParams}) {
  

  async function submitData (formData) {
    'use server'

    await dbConnect()

    let checkUser = await Users.findOne(
      {
        username: formData.get('username')
      }
    ).exec()

    if (checkUser) {
      redirect('/auth/signup?err=user_exists')
     } else {

      let password = formData.get("password")
      let hash = crypto.createHash('md5').update(password).digest('hex');
      
      await Users.create(
        {
          username: formData.get('username'),
          password: hash,
          channels: []
        }
      )

      redirect('/')

     }

     
    
  } 

  return <div>
    <div id={styles.signUpPage}>
      <div id={styles.signUpModule}>
        <div id={styles.signUpImageHolder}>
          <a href="/"><BoxArrowLeft/> Return to Home</a>
        </div>
        <div id={styles.signUpFormHolder}>
          <h1>Sign Up</h1>
          <form id={styles.signUpForm} action={submitData} suppressHydrationWarning>
            <SignUpForm suppressHydrationWarning searchParams={searchParams}/>
          </form>
        </div>
      </div>
    </div>
  </div>
}
