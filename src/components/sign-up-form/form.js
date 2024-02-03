'use client' // We make sure the form is loaded in the client side, as we are manipulating window data
import { useEffect, useState } from 'react' // both of these hooks allow us to track data and perform effects on the client side on the client side
import styles from './form.module.css' // Imported stylesheet
import { EyeSlashFill, EyeFill } from 'react-bootstrap-icons' // Imported icons
import Image from 'next/image'
// Function which checks is email is valid
const validateEmail = (email) => {
    // RegEx which filters out anything not matching the format of an email
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email) && email.length < 100;
};
// Component which displays whether or not password is being shown
// When component is clicked, showPassword alternates between true and false
function ShowPassword ({ setShowPassword, showPassword }) {
    return showpass ? 
    <EyeSlashFill color="gray" onClick={() => setShowPassword(!showPassword)}/>
    : <EyeFill color="gray" onClick={() => setShowPass(!showPassowrd)}/>
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
// Sign Up form to be returned
function Form () {
    let [email,setEmail] = useState("") // Hook which allows to track value of email  
    let [emailValid, setEmailValid] = useState("Loading") // Track if email is valid
    let [username,setUsername] = useState("") // Hook which allows to track value of username
    let [usernameValid, setUsernameValid] = useState("Loading") // Hook to track username validity
    let [password,setPassword] = useState("") // Hook which allows to track value of password
    let [confirmPassword,setConfirmPassword] = useState(1) // Hook which allows to track value of confirmed password
    const [showPassword, setShowPassword] = useState(false) // Hook which allows us to track is password is shown or not

    useEffect(() => {
        async function check() {
            // Using api to check if email exists
            let res = await fetch('/api/users/find-email?' + new URLSearchParams({email: email})).then(r => r.json())
            // Return message if email is invalid
            setEmailValid({exists: !res.exists, valid: validateEmail(email)})
        }
        check()
    }, [email])

    useEffect(() => {
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            setUsername(username.match(/[a-zA-Z0-9]/g) ? username.match(/[a-zA-Z0-9]/g).join("") : "")
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            return setUsernameValid(false)
        }
        if (username.length > 35) {
            setUsername(username.slice(0,35))
        }
        if (username.length > 35) {
            return setUsernameValid(false)
        }
        if (username.length < 3) {
            return setUsernameValid(false)
        }
        setUsernameValid(true)
    }, [username])

    return (
        <>
            <span id={styles.header}>Sign Up</span>
            <div id={styles.signUpInputs}>
                <div class={styles.inputContainer}>
                    <label class={styles.inputLabel} >
                        Email
                    </label>
                    <input type="email" required name="email" 
                    onChange={e => setEmail(e.target.value)} value={email} 
                    placeholder={"example@professional-email.com"}
                    style={{"color": emailValid.valid && emailValid.exists ? "#000000" : "#D13F3F"}}>
                    </input>
                    <div class={styles.validation}>
                        {/* If email meets rules, tick is returned ; message also displayed */}
                        <span><Valid rule={emailValid.valid && emailValid.exists}/>{emailValid === "Loading" ? "Checking email..." : 
                        !emailValid.exists ? "Email already in use" 
                        : emailValid.valid ? "Email is valid"
                        : "Email in incorrect format"}</span>
                    </div>
                </div>
                <div class={styles.inputContainer}>
                    <label class={styles.inputLabel} >
                        Username
                    </label>
                    <input type="text" required name="username" maxLength={35}
                    onChange={e => setUsername(e.target.value)} value={username} 
                    placeholder={"JohnSmith"}
                    style={{"color": usernameValid ? "#000000" : "#D13F3F"}}>
                    </input>
                    <div class={styles.validation}>
                        {/* If username meets rules, tick is returned ; message also displayed */}
                        <span><Valid rule={/^[a-zA-Z0-9]+$/.test(username)}/>Username is alphanumerical (letters A-Z and numbers only)</span>
                        <span><Valid rule={username.length <= 35 && username.length >= 3}/>Username is between 3-35 character inclusive</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function SignUpForm() {
    const [isClient, setClient] = useState(false) // Hook which allows us to check if client has loaded 
    // This hook checks when the client has initially loaded and runs when the page first opens to tell us the client has rendered it.
    useEffect(() => {
        setClient(true)
    }, [])

    return (
        <div id={styles.signUpForm}>
            {isClient && <Form/>}
        </div>
    )
}