import { TEST_USER } from '../constants/constants'
import { LoginPage } from './LoginPage'
import randomstring from 'randomstring'
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

    public getNameFieldByType(nameFieldType: string) {
        cy.task('log', `Getting ${nameFieldType} name field...`)
        return cy.get(`input[name ="${nameFieldType}_name"]`)
    }

    public fillNameFieldByType(nameFieldType: string, str: string) {
        cy.task('log', `Filling ${nameFieldType} name field...`)
        this.getNameFieldByType(nameFieldType).type(str)
    }

    public register() {
        const randomEmail = `${randomstring.generate(8)}@gmail.com`.toLowerCase()
        this.navigationBar.clickLoginButton()
        this.clickSignUpButton()
        this.fillEmailField(randomEmail)
        this.fillPasswordField(TEST_USER.password)
        this.getValidationAlert().should('have.text', validCredsValidationMessage)
        this.clickSignUpForFreeButton()
        this.fillNameFieldByType('first', TEST_USER.firstName)
        this.fillNameFieldByType('last', TEST_USER.lastName)
        this.clickSignUpForFreeButton()
        this.getValidationAlert().should('have.text', `We've sent an email to ${randomEmail} with instructions.`)
    }
}