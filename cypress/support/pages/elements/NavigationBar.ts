export class NavigationBar {

    constructor() { }

    public getLoginButton = () => {
        cy.task('log', 'Getting [login] button...')
        return cy.get('a[id="w3loginbtn"]')
    }

    public clickLoginButton = () => {
        cy.task('log', 'Clicking [login] button...')
        this.getLoginButton().click()
    }

    public getLogOutButton() {
        cy.task('log', 'Getting [log out] button...')
        return cy.get('button._tFEpH')
    }

    public clickLogOutButton = () => {
        cy.task('log', 'Clicking [log out] button...')
        this.getLogOutButton().click()
    }

    public getHomePageNavigationButton() {
        cy.task('log', 'Getting [Home page] button...')
        return cy.get('a[href="https://www.w3schools.com "]')
    }

    public clickHomePageButton = () => {
        cy.task('log', 'Clicking [Home page] button...')
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

    public getThemeSwitcher = () => {
        cy.task('log', `Getting theme switcher...`)
        return cy.get(`a[xxtitle="Toggle Dark Code"] i`)
    }

    public clickThemeSwitcher = () => {
        cy.task('log', `Clicking on theme switcher...`)
        this.getThemeSwitcher().click()
    }

    public getThemeFromDropdownByName = (themeName: string) => {
        cy.task('log', `Getting theme by name "${themeName}"...`)
        return cy.xpath(`//label[contains(text(), '${themeName}')]`)
    }

    public switchThemeByName = (themeName: string) => {
        cy.task('log', `Switching theme to "${themeName}"...`)
        this.getThemeSwitcher().trigger('mouseover')
        this.getThemeFromDropdownByName(themeName).click()
    }

    public getPageByTheme = (themeName: string) => {
        cy.task('log', `Getting page by theme name "${themeName}"...`)
        return cy.xpath(`//body[contains(@class, '${themeName}')]`)
    }

    public getButtonWithOuterLink = (title: string) => {
        cy.task('log', `Getting button with outer link by title "${title}"...`)
        return cy.get(`a[title = "${title}"]`)
    }

    public clickOnButtonWithOuterLink = (title: string) => {
        cy.task('log', `Clicking on button with outer link by title "${title}"...`)
        this.getButtonWithOuterLink(title)
            .invoke('removeAttr', 'target')
            .click()
    }
}