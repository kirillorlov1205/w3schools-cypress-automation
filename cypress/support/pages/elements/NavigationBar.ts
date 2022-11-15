import { NAVIGATION_ITEMS } from '../../types/enums'

export class NavigationBar {

    constructor() { }

    public getLoginButton = () => {
        cy.task('log', 'Getting login button...')
        return cy.get('a[id="w3loginbtn"]')
    }

    public clickLoginButton = () => {
        cy.task('log', 'Clicking login button...')
        this.getLoginButton().click()
    }

    public getLogOutButton() {
        cy.task('log', 'Getting log out button...')
        return cy.get('button._tFEpH')
    }

    public clickLogOutButton = () => {
        cy.task('log', 'Clicking log out button...')
        this.getLogOutButton().click()
    }

    // public getNavigationItemByInnerLink = (link: NAVIGATION_ITEMS) => {
    //     cy.task('log', `Getting navigation item by inner "${link}" link...`)
    //     return cy.get(`a[href = "${link}"] span.b-main-navigation__text`)
    // }

    // public clickOnNavigationItemByInnerLink = (link: NAVIGATION_ITEMS) => {
    //     cy.task('log', `Clicking on navigation item by inner "${link}" link...`)
    //     this.getNavigationItemByInnerLink(link).click()
    // }
}