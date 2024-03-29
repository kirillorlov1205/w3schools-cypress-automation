import { BasePage } from './BasePage'

export class LoginPage extends BasePage {

    public constructor() {
        super()
    }

    public getEmailField = () => {
        cy.task('log', 'Getting email field...')
        return cy.get('#modalusername')
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
        cy.task('log', 'Getting [submit] button...')
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
        cy.task('log', 'Getting [forgot password] button...')
        return cy.get('div.LoginModal_forgot_pwd_wrapper__qttSX')
    }

    public clickForgotPasswordButton() {
        cy.task('log', 'Clicking [forgot password] button...')
        this.getForgotPasswordButton().click()
    }

    public getSignUpButton() {
        cy.task('log', 'Getting [sign up] button...')
        return cy.xpath('//span[contains(text()," Sign up")]')
    }

    public clickSignUpButton() {
        cy.task('log', 'Clicking [sign up] button...')
        this.getSignUpButton().click()
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