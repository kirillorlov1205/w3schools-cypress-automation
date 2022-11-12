import { BasePage } from './BasePage'

export class LoginPage extends BasePage {

    public constructor() {
        super()
    }

    public getEmailField = () => {
        cy.task('log', 'Getting email field...')
        return cy.get('input.EmailInput_input_field__6t4Ux')
    }

    public fillEmailField = (email: string) => {
        cy.task('log', `Filling email field with "${email}" email...`)
        this.getEmailField().type(email)
    }

    public getPasswordField = () => {
        cy.task('log', 'Getting password field...')
        return cy.get('input.PasswordInput_input_field__EWMIU')
    }

    public fillPasswordField = (password: string) => {
        cy.task('log', `Filling password field with "${password}" password...`)
        this.getPasswordField().type(password)
    }

    public getSubmitButton = () => {
        cy.task('log', 'Getting submit button...')
        return cy.get('button.Button_primary__d2Jt3')
    }

    public submitForm() {
        cy.task('log', 'Submitting login form...')
        this.getSubmitButton().click()
    }

    public getEmailValidationMessage = () => {
        cy.task('log', 'Getting email validation message...')
        return cy.get('span.EmailInput_email_error__IJxXf')
    }

    public getValidationAlert() {
        cy.task('log', 'Getting validation alert...')
        return cy.get('div.Alert_iwrp__5q1xH')
    }

    public getForgotPasswordButton() {
        cy.task('log', 'Getting forgot password button...')
        return cy.get('div.LoginModal_forgot_pwd_wrapper__qttSX')
    }
}