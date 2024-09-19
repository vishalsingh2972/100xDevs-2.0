const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

const zod = require('zod');
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(5);

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {

    const usernameCheck = emailSchema.safeParse(username);
    const passwordCheck = passwordSchema.safeParse(password);

    if (!usernameCheck.success || !passwordCheck.success) { //if either of above checks fail return 'null'
        //console.log('kuch to gadbad hai!');
        return null;
    }

    const JWT = jwt.sign({ username }, jwtPassword); //or jwt.sign({ username: username }, jwtPassword)
    //console.log(JWT);

    return JWT;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    const verified = jwt.verify(token, jwtPassword);
//veified doesn't work with if/else, need try catch blocks to catch errors ~ jwt.verify requires a try-catch block to handle potential errors.
    try {
        jwt.verify(token, jwtPassword);
        return true;
    }
    catch (e) {
        return false;
    }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */

function decodeJwt(token) {
    const decoded = jwt.decode(token);
//decode works with if/else ~ jwt.decode can be used with simple if statements to check for validity.
    if (decoded) {
        return true;
    }
    return false;
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
