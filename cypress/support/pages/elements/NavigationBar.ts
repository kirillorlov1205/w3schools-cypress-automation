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

    public getHomePageNavigationButton() {
        cy.task('log', 'Getting home page button...')
        return cy.get('a[href="https://www.w3schools.com "]')
    }

    public clickHomePageButton = () => {
        cy.task('log', 'Clicking home page button...')
        this.getHomePageNavigationButton().click()
    }

    public getNavigationItemByName = (name: string) => {
        cy.task('log', `Getting navigation item by name "${name}"...`)
        return cy.xpath(`//div[contains(@class, 'w3-bar')]/a[contains(text(), "${name}")]`)
    }

    public clickNavigationItemByName = (name: string) => {
        cy.task('log', `Clicking on navigation item by name "${name}"...`)
        this.getNavigationItemByName(name).click()
    }

    public getItemFromDropdownMenuByName = (name: string) => {
        cy.task('log', `Getting item from dropdown menu by name "${name}"...`)
        return cy.xpath(`//div[contains(@class, "w3-row-padding")]//div[contains(@class, 'w3-col')]/a[contains(text(), "${name}")]`)
    }

    public clickItemFromDropdownMenuByName = (name: string) => {
        cy.task('log', `Clicking item from dropdown menu by name "${name}"...`)
        this.getItemFromDropdownMenuByName(name).click()
    }

    // public getThemeOfPage = (: string) => {
    //     cy.task('log', `Getting item from dropdown menu by name "${name}"...`)
    //     return cy.xpath(`//body[contains(@class, '${}')]`)
    // }
}