import { BasePage } from './BasePage'

export class ResetPasswordPage extends BasePage {

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
}