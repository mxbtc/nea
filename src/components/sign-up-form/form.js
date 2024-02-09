'use client' // We make sure the form is loaded in the client side, as we are manipulating window data
import { useEffect, useState } from 'react' // both of these hooks allow us to track data and perform effects on the client side on the client side
import styles from './form.module.css' // Imported stylesheet
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons' // Imported icons
import Image from 'next/image'
import { validateUsername, validateEmail, validatePassword } from '../../../lib/utils' 
// Sign Up form to be returned
function Form ({loading}) {
    let [email,setEmail] = useState("") // Hook which allows to track value of email  
    let [emailValid, setEmailValid] = useState("Loading") // Track if email is valid
    let [username,setUsername] = useState("") // Hook which allows to track value of username
    let [usernameValid, setUsernameValid] = useState("Loading") // Hook to track username validity
    let [password,setPassword] = useState("") // Hook which allows to track value of password
    let [passwordValid, setPasswordValid] = useState("Loading") // Hook to track password validity
    let [confirmPassword,setConfirmPassword] = useState("") // Hook which allows to track value of confirmed password
    const [showPassword, setShowPassword] = useState(false) // Hook which allows us to track is password is shown or not
    // Hook to check if email exists
    useEffect(() => {
        if (email.length === 0) {
            return setEmailValid("Loading")
        }
        if (!validateEmail(email)) {
            return setEmailValid({valid: validateEmail(email)})
        }
        async function check() {
            // Using api to check if email exists
            let res = await fetch('/api/users/find-email?' + new URLSearchParams({email: email})).then(r => r.json())
            // Return message if email is invalid
            return setEmailValid({exists: res.exists, valid: validateEmail(email)})
        }
        check()
    }, [email])
    // Check to see if username is valid
    useEffect(() => {
        if (username.length === 0) {
            return setUsernameValid("Loading")
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            // This hook is used to implement an input mask to prevents non alphanumerical character to be entered
            setUsername(username.match(/[a-zA-Z0-9]/g) ? username.match(/[a-zA-Z0-9]/g).join("") : "")
        }
        if (username.length > 35) {
            // Input mask to stop it reaching over 35 characters
            setUsername(username.slice(0,35))
        }
        if (!validateUsername(username)) {
            setUsernameValid(false)
        }
        setUsernameValid(true)
    }, [username])
    // Check to see if password is valid
    useEffect(() => {
        if (password.length === 0) {
            return setPasswordValid("Loading")
        }
        if (!validatePassword(password)) {
            return setPasswordValid(false)
        }
        setPasswordValid(true)
    }, [password])

    return (
        <>
            <span id={styles.header}>Sign Up</span>
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
                        // Red if email is invalid, else regular color
                        style={{"color": emailValid.valid && !emailValid.exists ? "inherit" : "#B73F3F"}}
                    >
                    </input>
                    <div className={styles.validation}>
                        <span>
                            {/* Visual check */}
                            <Valid rule={emailValid === "Loading" ? "Loading" : emailValid.valid && !emailValid.exists}/>
                            {/* Appropriate message for error/success */}
                            {emailValid === "Loading" ? "Valid email" : 
                            !emailValid.valid ? "Email needs to be in valid format" 
                            : emailValid.exists ? "Email is already in use"
                            : "Valid email"}
                        </span>
                    </div>
                </div>
                {/* input for username */}
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel} >
                        Username
                    </label>
                    <input 
                        // Set max length to 35 characters and min to 3 - frontend basic length check
                        type="text" required name="username" maxLength={35} minLength={3}
                        onChange={e => setUsername(e.target.value)} value={username} 
                        placeholder={"JohnSmith"}
                        style={{"color": usernameValid ? "inherit" : "#D13F3F"}}>
                    </input>
                    <div className={styles.validation}>
                        {/* If username meets rules, tick is returned ; message also displayed */}
                        <span>
                            <Valid rule={usernameValid === "Loading" ? "Loading" : /^[a-zA-Z0-9]+$/.test(username)}/>
                            Username must have only letters A-Z and numbers 0-9 (case sensitive)
                        </span>
                        <span>
                            <Valid rule={usernameValid === "Loading" ? "Loading" : username.length <= 35 && username.length >= 3}/>
                            Username must be 3-35 characters long
                        </span>
                    </div>
                    {/* Input container for password */}
                    
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
                        placeholder={"Type a password..."}
                        style={{"color": passwordValid ? "inherit" : "#D13F3F"}}>
                    </input>
                    <div className={styles.validation}>
                        {/* If password meets rules, tick is returned ; message also displayed */}
                        <span>
                            <Valid rule={passwordValid === "Loading" ? "Loading" : 
                            password.length >= 8 && password.length <= 128 && /^[a-zA-Z0-9]+$/.test(password)}/>
                            Password must be 8-40 characters long and alphanumeric
                        </span>
                        <span>
                            <Valid rule={passwordValid === "Loading" ? "Loading" : password.toLowerCase() !== password  }/>
                            Password must have at least 1 capital letter
                        </span>
                        <span>
                            <Valid rule={passwordValid === "Loading" ? "Loading" : /[0-9]/gi.test(password)  }/>
                            Password must have at least 1 number
                        </span>
                    </div>
                </div>
                {/* Input to confirm password */}
                <div className={styles.inputContainer}>
                    <label className={styles.inputLabel} >
                        Confirm Password
                    </label>
                    <input 
                        required type={showPassword ? "input" : "password"} 
                        name="passwordConf" maxLength={40} minLength={8}
                        onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} 
                        placeholder={"Retype your password..."}
                        style={{"color": password === confirmPassword ? "inherit" : "#D13F3F"}}>
                    </input>
                    <div className={styles.validation}>
                        {/* Check to see if passwords match */}
                        <span>
                            <Valid rule={password.length === 0 ? confirmPassword.length !== 0 ? false : "Loading" : password === confirmPassword}/>
                            Passwords must match
                        </span>
                    </div>
                    <div className={styles.inputContainer}>
                        <button
                        type={'submit'}
                        // If all requirements are not met, then the button is disabled
                        disabled={
                            !(emailValid.valid && !emailValid.exists && usernameValid && passwordValid && password === confirmPassword) || loading
                        }
                        >Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function SignUpForm({loading}) {
    const [isClient, setClient] = useState(false) // Hook which allows us to check if client has loaded 
    // This hook runs on the initial render to show that the client has loaded
    useEffect(() => {
        setClient(true)
    }, [])
    return (
        <div id={styles.signUpForm}>
            {isClient && <Form loading={loading}/>}
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
// Component either returns a tick, cross, or a loading icon depending on if the validation rule has been met
function Valid ({ rule }) {
    // Loading wheel if checking validation
    if (rule === "Loading") {
        return <Image src={"/loading.gif"} height={20} width={20} alt={"Loading"}/>
    }
    // If rule is met, return tick else return cross
    return rule ?
    <Image src={"/check.svg"} height={15} width={15} alt={"Loading"} style={{padding:"2.5px"}}/>
    : <Image src={"/cross.svg"} height={15} width={15} alt={"Loading"} style={{padding:"2.5px"}}/>
}