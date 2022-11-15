export const BASE_URL = 'https://www.w3schools.com/'

export const DEFAULT_WAITNG_TIME = 10000

export const ASSETS_FOLDER = 'cypress/assets'

export const TEST_USER = {
    email: 'test12051@mail.ru',
    password: 'Testing123!',
    firstName: 'testFirstName',
    lastName: 'testLastName'
}

export const INVALID_EMAILS = {
    withInvalidCharacterPrefix: 'abc#def@mail.com',
    withInvalidTopDomain: 'abc.def@mail.c',
    withInvalidCharacterDomain: 'abc.def@mail#archive.com',
    withoutTopDomain: 'abc.def@mail',
    withTwoDotsInTopDomain: 'abc.def@mail..com',
}

export const LOGIN_VALIDATION_MESSAGES = {

}

export const SIGN_UP_VALIDATION_MESSAGES = {
    invalidEmailValidationMessage: 'Looks like you forgot something',
    emptyEmailValidationMessage: 'Please enter an email',
    validCredsValidationMessage: "Your password is secure and you're all set!"
}

export const SIGN_UP_INVALID_PASSWORDS = {
    'One lowercase character': 'TEST123!',
    'One uppercase character': 'test123!',
    'One number': 'Testing!',
    'One special character': 'Test1234',
    '8 characters minimum': 'Test12!',
}