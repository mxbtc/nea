'use client' // We make sure the form is loaded in the client side, as we are manipulating window data
import { useEffect, useState } from 'react' // both of these hooks allow us to track data and perform effects on the client side on the client side
import styles from './form.module.css' // Imported stylesheet
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons' // Imported icons
import { validateEmail } from '../../../lib/utils' 
// Sign in form to be returned
function Form () {
    let [email,setEmail] = useState("") // Hook which allows to track value of email
    let [username,setUsername] = useState("") // Hook which allows to track value of username
    let [password,setPassword] = useState("") // Hook which allows to track value of password
    const [showPassword, setShowPassword] = useState(false) // Hook which allows us to track is password is shown or not

    return (
        <>
            <span id={styles.header}>Sign In</span>
            <div id={styles.signUpInputs}>
                {/* input for email */}
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel} >
                        Email
                    </label>
                    <input 
                        type="email" required name="email"
                        // Track value of input box by using setEmail hook
                        onChange={e => setEmail(e.target.value)} value={email} 
                        placeholder={"example@professional-email.com"}
                    >
                    </input>
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel} >
                        Username
                    </label>
                    <input 
                        type="string" required name="username"
                        // Track value of input box by using setUsername hook
                        onChange={e => setUsername(e.target.value)} value={username} 
                        placeholder={"JohnSmith"}
                    >
                    </input>
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel} >
                        Password
                         {/* Button to show password */}
                        <span>
                            Show Password
                            <ShowPassword  showPassword={showPassword} setShowPassword={setShowPassword}/>
                        </span>
                    </label>
                    <input 
                        required type={showPassword ? "input" : "password"} 
                        name="password" maxLength={40} minLength={8}
                        onChange={e => setPassword(e.target.value)} value={password} 
                        placeholder={"Enter password..."}>
                    </input>
                </div>
                <div className={styles.inputContainer}>
                    <button type={"submit"}
                    disabled={!(username.length > 3 && password.length > 8 && validateEmail(email))}
                    >Sign in</button>
                </div>
            </div>
        </>
    )
}

export default function SignInForm() {
    const [isClient, setClient] = useState(false) // Hook which allows us to check if client has loaded 
    // This hook runs on the initial render to show that the client has loaded
    useEffect(() => {
        setClient(true)
    }, [])
    return (
        <div id={styles.signUpForm}>
            {isClient && <Form/>}
        </div>
    )
}
// Component which displays whether or not password is being shown
// When component is clicked, showPassword alternates between true and false
function ShowPassword ({ setShowPassword, showPassword }) {
    return showPassword ? 
    <EyeSlashFill color="gray" onClick={() => setShowPassword(!showPassword)}/>
    : <EyeFill color="gray" onClick={() => setShowPassword(!showPassword)}/>
}