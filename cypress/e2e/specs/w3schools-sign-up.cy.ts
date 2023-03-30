import { SIGN_UP_INVALID_NAMES, SIGN_UP_INVALID_PASSWORDS, SIGN_UP_VALIDATION_MESSAGES, TEST_USER } from 'cypress/support/constants'
import { HomePage } from 'cypress/e2e/pages/HomePage'
import { LoginPage } from 'cypress/e2e/pages/LoginPage'
import { PageFactory } from 'cypress/e2e/pages/PageFactory'
import { INVALID_EMAILS } from 'cypress/support/constants'
import randomstring from 'randomstring'
import { SignUpPage } from 'cypress/e2e/pages/SignUpPage'
import { PAGES, SIGN_UP_NAME_TYPES } from 'cypress/support/enums'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage
const loginPage: LoginPage = PageFactory.getPage(PAGES.LOGIN) as LoginPage
const signUpPage: SignUpPage = PageFactory.getPage(PAGES.SIGN_UP_PAGE) as SignUpPage

describe('Sign up tests', () => {

    const randomEmail = `${randomstring.generate(8)}@gmail.com`.toLowerCase()

    beforeEach(() => {
        homePage.visitPage()
    })

    it(`Should successfully register the user with email "${randomEmail}", 
    password "${TEST_USER.password}", first name "${TEST_USER.first_name}", last name "${TEST_USER.last_name}"`, () => {
        signUpPage.register(randomEmail, TEST_USER.password, TEST_USER.first_name, TEST_USER.last_name)
        signUpPage.getValidationAlert().should('have.text', `We've sent an email to ${randomEmail} with instructions.`)
    })

    it(`Should show "${SIGN_UP_VALIDATION_MESSAGES.emptyEmailValidationMessage}" validation message while registration with empty email and valid password "${TEST_USER.password}"`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.clickSignUpButton()
        signUpPage.fillPasswordField(TEST_USER.password)
        signUpPage.clickSignUpForFreeButton()
        signUpPage.getEmailValidationMessage().should('have.text', SIGN_UP_VALIDATION_MESSAGES.emptyEmailValidationMessage)
    })

    for (const key in INVALID_EMAILS) {
        const invalidEmail = INVALID_EMAILS[key as keyof typeof INVALID_EMAILS]
        it(`Should show "${SIGN_UP_VALIDATION_MESSAGES.invalidEmailValidationMessage}" validation message while registration with invalid email "${invalidEmail}" and valid password "${TEST_USER.password}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.getSignUpForFreeButton().should('be.visible')
            signUpPage.fillEmailField(invalidEmail)
            signUpPage.fillPasswordField(TEST_USER.password)
            signUpPage.clickSignUpForFreeButton()
            signUpPage.getEmailValidationMessage().should('have.text', SIGN_UP_VALIDATION_MESSAGES.invalidEmailValidationMessage)
        })
    }

    it(`Should transfer the user to the Login page while clicking button [Log in] on the Sign up page`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.clickSignUpButton()
        signUpPage.clickReturnToLoginButton()
        loginPage.getSignUpButton().should('be.visible')
    })

    for (const key in SIGN_UP_INVALID_PASSWORDS) {
        const invalidPassword = SIGN_UP_INVALID_PASSWORDS[key as keyof typeof SIGN_UP_INVALID_PASSWORDS]
        it(`Should active password validation helper "${key}" while registration with invalid password "${invalidPassword}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.getSignUpForFreeButton().should('be.visible')
            signUpPage.fillEmailField(TEST_USER.email)
            signUpPage.fillPasswordField(invalidPassword)
            signUpPage.getPasswordValidationHelperByName(key).should('have.attr', 'fill', '#04AA6D')
        })
    }

    for (const key in SIGN_UP_INVALID_NAMES) {
        const invalidFirstName = SIGN_UP_INVALID_NAMES[key as keyof typeof SIGN_UP_INVALID_NAMES]
        it(`Should show "${SIGN_UP_VALIDATION_MESSAGES.invalidNameErrorMessage}" validation message while registration with first name "${invalidFirstName}" that "${key}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.fillEmailField(randomEmail)
            signUpPage.fillPasswordField(TEST_USER.password)
            signUpPage.clickSignUpForFreeButton()
            signUpPage.fillNameFieldByType(SIGN_UP_NAME_TYPES.FIRST_NAME, invalidFirstName)
            signUpPage.fillNameFieldByType(SIGN_UP_NAME_TYPES.LAST_NAME, TEST_USER.first_name)
            signUpPage.clickSignUpForFreeButton()
            signUpPage.getNameInputErrorMessage().should('have.text', SIGN_UP_VALIDATION_MESSAGES.invalidNameErrorMessage)
        })
    }

    for (const key in SIGN_UP_INVALID_NAMES) {
        const invalidLastName = SIGN_UP_INVALID_NAMES[key as keyof typeof SIGN_UP_INVALID_NAMES]
        it(`Should show "${SIGN_UP_VALIDATION_MESSAGES.invalidNameErrorMessage}" validation message while registration with last name "${invalidLastName}" that "${key}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.fillEmailField(randomEmail)
            signUpPage.fillPasswordField(TEST_USER.password)
            signUpPage.clickSignUpForFreeButton()
            signUpPage.fillNameFieldByType(SIGN_UP_NAME_TYPES.FIRST_NAME, TEST_USER.last_name)
            signUpPage.fillNameFieldByType(SIGN_UP_NAME_TYPES.LAST_NAME, invalidLastName)
            signUpPage.clickSignUpForFreeButton()
            signUpPage.getNameInputErrorMessage().should('have.text', SIGN_UP_VALIDATION_MESSAGES.invalidNameErrorMessage)
        })
    }

    for (const key in SIGN_UP_NAME_TYPES) {
        const nameType = SIGN_UP_NAME_TYPES[key as keyof typeof SIGN_UP_NAME_TYPES]
        it(`Should show "${SIGN_UP_VALIDATION_MESSAGES.invalidNameErrorMessage}" validation message while registration with empty "${nameType}"`, () => {
            homePage.navigationBar.clickLoginButton()
            loginPage.clickSignUpButton()
            signUpPage.fillEmailField(randomEmail)
            signUpPage.fillPasswordField(TEST_USER.password)
            signUpPage.clickSignUpForFreeButton()
            signUpPage.fillNameFieldByType(nameType, nameType)
            signUpPage.clickSignUpForFreeButton()
            signUpPage.getNameInputErrorMessage().should('have.text', SIGN_UP_VALIDATION_MESSAGES.invalidNameErrorMessage)
        })
    }

    it(`Should transfer the user to the Login page while clicking button [Log in] on the Sign up page`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.clickSignUpButton()
        signUpPage.clickReturnToLoginButton()
        loginPage.getSignUpButton().should('be.visible')
    })

    it(`Should transfer the user to the Home page while clicking on [Home Page] navigation button on the Sign up page`, () => {
        homePage.navigationBar.clickLoginButton()
        loginPage.clickSignUpButton()
        signUpPage.clickHomePageButton()
        homePage.getWhereToBeginButton().should('be.visible')
    })
})