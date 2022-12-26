import { BasePage } from './BasePage'

export class ResetPasswordPage extends BasePage {

    public constructor() {
        super()
    }

    public getEmailField = () => {
        cy.task('log', 'Getting email field...')
        return cy.get('div.ResetPasswordRequest_modal_inner__42fZy  input.EmailInput_input_field__6t4Ux')
    }

    public fillEmailField = (email: string) => {
        cy.task('log', `Filling email field with "${email}" email...`)
        this.getEmailField().type(email)
    }

    public getReturnToLoginButton() {
        cy.task('log', 'Getting [return to login] button...')
        return cy.get('div.ResetPasswordRequest_return_to_login_wrapper__-jz5P')
    }

    public clickReturnToLoginButton() {
        cy.task('log', 'Clicking [return to login] button...')
        this.getReturnToLoginButton().click()
    }

    public getEmailValidationMessage() {
        cy.task('log', 'Getting email validation message...')
        return cy.get('span.EmailInput_email_error__IJxXf')
    }

    public getResetPasswordSubmitButton() {
        cy.task('log', 'Getting [reset password submit] button...')
        return cy.get('div.ResetPasswordRequest_cta_bottom_box__gSd9O button')
    }

    public clickResetPasswordSubmitButton() {
        cy.task('log', 'Clicking [reset password submit] button...')
        this.getResetPasswordSubmitButton().click()
    }

    public getSuccessfulValidationEmailMessage() {
        cy.task('log', 'Getting successful email validation message...')
        return cy.get('span.ResetPasswordForm_email_message__li39K')
    }

    public getPasswordResetSuccessfulMessage() {
        cy.task('log', 'Getting password reset successful message...')
        return cy.get('div.Alert_success__g430w')
    }

    public getPasswordResetSpamInfoMessage() {
        cy.task('log', 'Getting password reset spam info message...')
        return cy.get('p.ResetPasswordRequest_reset_done_msg__HYi4h')
    }

    public getReturnToLoginButtonOnSuccessfulResetPage() {
        cy.task('log', 'Getting [return to login button] on successful reset page...')
        return cy.get('div.ResetPasswordRequest_cta_bottom_box__gSd9O a')
    }

    public clickReturnToLoginButtonOnSuccessfulResetPage() {
        cy.task('log', 'Clicking [return to login button] on successful reset page...')
        this.getReturnToLoginButtonOnSuccessfulResetPage().click()
    }

    public getEmailDoesNotExistAlert() {
        cy.task('log', 'Getting email does not exist alert...')
        return cy.get('div.Alert_iwrp__5q1xH')
    }

    public getHomePageButton() {
        cy.task('log', 'Getting [home page] button...')
        return cy.get('a[href="https://w3schools.com"]')
    }

    public clickHomePageButton = () => {
        cy.task('log', 'Clicking [home page] button...')
        this.getHomePageButton().click()
    }
}