import { NavigationBar } from './elements/NavigationBar'
import { SearchField } from './elements/SearchField'

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

    // public getPageHeaderByName = (name: string) => {
    //     cy.task('log', `Getting page header by "${name}" name...`)
    //     switch (name) {
    //         case 'Catalog':
    //             return cy.get('a.catalog-navigation__bubble')
    //         case 'Auto':
    //             return cy.get('div.vehicle-form h1')
    //         case 'Realt':
    //             return cy.get('a[href="https://r.onliner.by/pk/"] span.project-navigation__sign')
    //         case 'Tasks':
    //             return cy.get('a[href= "/tasks"] span.project-navigation__sign')
    //         case 'Baraholka':
    //             return cy.get('div.b-mnforum-header-i h1')
    //         case 'Forum':
    //             return cy.get('h1.m-title')
    //         default:
    //             throw new Error('No such header')
    //     }
    // }

    // public waitTillPageHeaderIncludeText(pageHeader: string, headerText: string) {
    //     cy.task('log', `Waiting till ${pageHeader} page header include "${headerText}" text...`)
    //     this.getPageHeaderByName(pageHeader).invoke('text').then((text: string) => {
    //         expect(text).to.include(headerText)
    //     })
    // }
}