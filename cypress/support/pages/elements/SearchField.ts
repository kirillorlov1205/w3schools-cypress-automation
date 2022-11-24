export class SearchField {

    constructor() { }

    public getSearchField = () => {
        cy.task('log', 'Getting search field...')
        return cy.get('a.w3searchbtntopnav')
    }

    public fillSearchField = (str: string) => {
        cy.task('log', `Searching for "${str}"...`)
        this.getSearchField().type(str) 
    }

    public getSearchModalPage = () => {
        cy.task('log', 'Getting search modal page...')
        return cy.get('div.gsc-results-wrapper-overlay')
    }

    // public getSearchTabsItemByName = (name: string) => {
    //     cy.task('log', `Getting search tabs item by "${name}" name...`)
    //     return this.getSearchModalPage().xpath(`//div[text() = '${name}']`)
    // }

    // public getSearchFilterItemByName = (name: string) => {
    //     cy.task('log', `Getting search filter item by "${name}" name...`)
    //     return this.getSearchModalPage().xpath(`//a[text() = '${name}']`)
    // }

    // public getCatalogSearchResultsList = () => {
    //     cy.task('log', 'Getting Catalog search result list...')
    //     return this.getSearchModalPage().find('ul.search__results')
    // }

    // public getResultItemFromForumList = () => {
    //     cy.task('log', 'Getting result item from forum list...')
    //     return this.getSearchModalPage().find('div.result__item_forum')
    // }
}