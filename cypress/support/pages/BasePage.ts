import { NavigationBar } from './elements/NavigationBar'

export class BasePage {

    public navigationBar: NavigationBar
    protected url!: string

    public constructor() {
        this.navigationBar = new NavigationBar()
    }

    public getPageTitle() {
        cy.task('log', 'Getting page title...')
        return cy.title()
    }

    public visitPage() {
        cy.task('log', `Opening page "${this.url}"...`)
        cy.visit(this.url)
    }

    public getCurrentUrl() {
        cy.task('log', 'Getting current url...')
        return cy.url()
    }

    public getPageHeaderByName(name: string) {
        cy.task('log', `Getting page header by "${name}" name ...`)
        return cy.xpath(`//div[contains(@class, "w3-bar")]/a[contains(text(), "${name} ")]`)
    }

    public clickPageHeaderByName(name: string) {
        cy.task('log', `Clicking page header by "${name}" name ...`)
        this.getPageHeaderByName(name).click()
    }
}