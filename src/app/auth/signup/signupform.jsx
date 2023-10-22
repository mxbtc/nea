'use client'

import styles from './signup.module.css'
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import Toast from 'awesome-toast-component'

export default function SignUpForm ({searchParams}) {
  const [isClient, setClient] = useState(false);
  useEffect(()=>{
    setClient(true)
  }, [])
  return isClient ? <SUForm searchParams={searchParams}/> : <></>
}

function SUForm ({searchParams}) {
  'use client'

  const [showPass, setShowPass] = useState(false)
  const [username, setUser] = useState(1)
  const [pass, setPass] = useState("")
  const [confPass, setConfPass] = useState(1)

  useEffect(() => {
    searchParams.err === "user_exists" ? new Toast('User already exists', {
      timeout: 3000,
      style: {
        container: [
          ['background-color', '#FF5F5F']
        ]
      }
    }) : null
  })

  function ShowPassword () {
    if (showPass) {
      return <EyeSlashFill color="gray" onClick={() => setShowPass(showPass ? false : true)}/>
    } else {
      return <EyeFill color="gray" onClick={() => setShowPass(showPass ? false : true)}/>
    }
  }

    return <div suppressHydrationWarning>
            <div className={styles.sUFInput}>
              <label>Username</label>
              <input suppressHydrationWarning type="text" required name="username" onChange={e => setUser(e.target.value)}
              style={{borderBottom:`2px solid ${username.length >= 3 || username === 1 ? "hsl(0, 0%, 80%)" : "red"}`}}
              ></input>
              <div>
                <span suppressHydrationWarning style={{color:`${username.length >= 3 ? "green" : "red"}`}}>Length at least 3 characters</span>
                <span suppressHydrationWarning style={{color:`${/^[a-zA-Z0-9]+$/.test(username) ? "green" : "red"}`}}>Only Alphanumeric</span>
              </div>
            </div>
            <div className={styles.sUFInput}>
              <label>
                Password 
                {/* <button type="button"> */}
                <ShowPassword suppressHydrationWarning/>
                {/* </button> */}
              </label>
              <input suppressHydrationWarning required id="pword" type={showPass ? "text" : "password"} name="password"
              onChange={e => setPass((e.target.value))}
              ></input>
              <div>
                <span suppressHydrationWarning style={{color:`${pass.length >= 8 ? "green" : "red"}`}}>Length at least 8 characters</span>
                <span suppressHydrationWarning style={{color:`${pass.toLowerCase() !== pass ? "green" : "red"}`}}>Capital letter</span>
                <span suppressHydrationWarning style={{color:`${/[0-9]/gi.test(pass) ? "green" : "red"}`}}>Number</span>
              </div>
            </div>
            <div className={styles.sUFInput}>
              <label>Confirm Password</label>
              <input suppressHydrationWarning required type="password" name="cpassword"
              style={{borderBottom:`2px solid ${confPass === pass || confPass === 1 ? "hsl(0, 0%, 80%)" : "red"}`}}
              onChange={e => setConfPass((e.target.value))}></input>
            </div>
            <div className={styles.sUFInput}>
              <button suppressHydrationWarning type="submit" name="submit" disabled={
                username.length >= 3
                && /^[a-zA-Z0-9]+$/.test(username)
                && /[0-9]/gi.test(pass) 
                && pass.toLowerCase() !== pass 
                && confPass === pass
                && pass.length >= 8 ? false : true
              }>Sign Up</button>
            </div></div>
}