const ERROR_SUCCESS = { status: true, info: "Success" }
const ERROR_ACCOUNT_EXIST = { status: false, info: "This account already exists" }
const ERROR_CREDENTIALS_DONT_MATCH = { status: false, info: "Check your email and password" }
const ERROR_ACCOUNT_INACTIVE = { status: false, info: "This account is deactivated" }
const ERROR_TOKEN_INVALID = { status: false, info: "O token não foi encontrado!!" }


module.exports = {
            ERROR_ACCOUNT_EXIST,
            ERROR_ACCOUNT_INACTIVE,
            ERROR_CREDENTIALS_DONT_MATCH,
            ERROR_SUCCESS,
            ERROR_TOKEN_INVALID
}