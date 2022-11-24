import { SIGN_UP_VALIDATION_MESSAGES, TEST_USER } from '../types/constants'
import { SIGN_UP_NAME_TYPES } from '../types/enums'
import { LoginPage } from './LoginPage'
export class SignUpPage extends LoginPage {

    constructor() {
        super()
    }

    public getSignUpForFreeButton() {
        cy.task('log', 'Getting sign up submit button...')
        return cy.get('div.LoginModal_cta_bottom_box_button_login__5Fbwv span')
    }

    public clickSignUpForFreeButton() {
        cy.task('log', 'Clicking sign up submit button...')
        this.getSignUpForFreeButton().click()
    }

    public getNameFieldByType(nameFieldType: SIGN_UP_NAME_TYPES) {
        cy.task('log', `Getting ${nameFieldType} name field...`)
        return cy.get(`input[name ="${nameFieldType}"]`)
    }

    public fillNameFieldByType(nameFieldType: SIGN_UP_NAME_TYPES, str: string) {
        cy.task('log', `Filling ${nameFieldType} name field...`)
        this.getNameFieldByType(nameFieldType).type(str)
    }

    public register(email: string, password: string, firstName: string, lastName: string) {
        cy.task('log', `Registration the user with email "${email}", password "${password}", first name "${firstName}", last name "${lastName}...`)
        this.navigationBar.clickLoginButton()
        this.clickSignUpButton()
        this.fillEmailField(email)
        this.fillPasswordField(password)
        this.getValidationAlert().should('have.text', SIGN_UP_VALIDATION_MESSAGES.validCredsValidationMessage)
        this.clickSignUpForFreeButton()
        this.fillNameFieldByType(SIGN_UP_NAME_TYPES.FIRST_NAME, firstName)
        this.fillNameFieldByType(SIGN_UP_NAME_TYPES.LAST_NAME, lastName)
        this.clickSignUpForFreeButton()
        this.getValidationAlert().should('have.text', `We've sent an email to ${email} with instructions.`)
    }

    public getReturnToLoginButton() {
        cy.task('log', 'Getting Log in button...')
        return cy.xpath('//span[contains(text(), " Log in")]')
    }

    public clickReturnToLoginButton() {
        cy.task('log', 'Clicking log in button...')
        this.getReturnToLoginButton().click()
    }

    public getPasswordValidationHelperByName(name: string) {
        cy.task('log', `Getting password validation helper by name "${name}"...`)
        return cy.xpath(`//li[contains(text(),'${name}')]//*[name()='circle']`)
    }

    public getNameInputErrorMessage() {
        cy.task('log', 'Getting name input error message...')
        return cy.get("span.NameInput_email_error__Wr-Sd")
    }

    public getResendEmailButton() {
        cy.task('log', 'Getting resend email button...')
        return cy.get('//button[contains(text(), "Resend verification email")]')
    }

    public clickResendEmailButton() {
        cy.task('log', 'Clicking resend email button...')
        this.getResendEmailButton().click()
    }
}