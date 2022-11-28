import { HomePage } from '../support/pages/HomePage'
import { PageFactory } from '../support/pages/PageFactory'
import { PAGES, SPECIAL_SYMBOLS } from '../support/types/enums'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage
const textForTest = 'test'

describe('Search test', () => {

    beforeEach(() => {
        homePage.visitPage()
    })

    it(`Should search for "${textForTest}"`, () => {
        homePage.searchField.clickSearchIcon()
        homePage.searchField.fillSearchField(textForTest)
        homePage.searchField.getSearchModalPage().should('be.visible')
    })

    it(`Shouldn't open search modal page without providing any text in the search field`, () => {
        homePage.searchField.clickSearchIcon()
        homePage.searchField.clickSubmitSearchButton()
        homePage.searchField.getSearchModalPage().should('not.exist')
    })

    it(`Shouldn't open search modal page without providing any text in the search field`, () => {
        homePage.searchField.clickSearchIcon()
        homePage.searchField.clickSubmitSearchButton()
        homePage.searchField.getSearchModalPage().should('not.exist')
    })

    for (const key in SPECIAL_SYMBOLS) {
        const specialSymbol = SPECIAL_SYMBOLS[key as keyof typeof SPECIAL_SYMBOLS]
        it(`Should search for special symbol "${specialSymbol}"`, () => {
            homePage.searchField.clickSearchIcon()
            homePage.searchField.fillSearchField(specialSymbol)
            homePage.searchField.getSearchModalPage().should('be.visible')
        })
    }

    it(`Shouldn't open search modal page while searching for space character " "`, () => {
        homePage.searchField.clickSearchIcon()
        homePage.searchField.clickSubmitSearchButton()
        homePage.searchField.getSearchModalPage().should('not.exist')
    })
})