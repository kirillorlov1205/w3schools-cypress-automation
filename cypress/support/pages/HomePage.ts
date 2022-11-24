import { BasePage } from './BasePage'
import { NavigationBar } from './elements/NavigationBar'
import { SearchField } from './elements/SearchField'

export class HomePage extends BasePage {

    public searchField: SearchField

    public constructor() {
        super()
        this.url = '/'
        this.searchField = new SearchField()
    }

    public getWhereToBeginButton() {
        cy.task('log', 'Getting "Where to begin button"...')
        return cy.get('a[href="where_to_start.asp"]')
    }

    public clickWhereToBeginButton() {
        cy.task('Clicking "Where to begin button"...')
        this.getWhereToBeginButton().click()
    }
}