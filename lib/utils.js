import crypto from 'crypto'
//Function to Hash data
export function hashData(data) {
    let hash = crypto.createHash('md5').update(data).digest('hex');
    return hash
}
// Function to validate username
export function validateUsername(username) {
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return false
    }
    if (username.length > 35) {
        return false
    }
    if (username.length < 3) {
        return false
    }
    return true
}

// Function which checks is email is valid
export function validateEmail (email) {
    // RegEx which filters out anything not matching the format of an email
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email) && email.length < 100;
};
//Function to validate password
export function validatePassword(password) {
    if (password.length > 40 || password.length < 8) {
        return false
    }
    if (password.toLowerCase() === password) {
        return false
    }
    if (!/[0-9]/gi.test(password)) {
        return false
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        return false
    }
    return true
}