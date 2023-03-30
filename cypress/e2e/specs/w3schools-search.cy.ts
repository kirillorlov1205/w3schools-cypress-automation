import { BASE_URL, REFERENCES_PAGE_TITLES_MAP } from 'cypress/support/constants'
import { HomePage } from 'cypress/e2e/pages/HomePage'
import { PageFactory } from 'cypress/e2e/pages/PageFactory'
import { PAGES, SPECIAL_SYMBOLS } from 'cypress/support/enums'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage
const textForTest = 'test'

describe('Search tests', () => {

    beforeEach(() => {
        homePage.visitPage()
    })

    describe('Search on Home page tests', () => {

        it(`Should search for "${textForTest}"`, () => {
            homePage.fillSearchFieldOnHomePage(textForTest)
            homePage.getSearchDropdownOnHomePage().should('be.visible')
        })

        it(`Shouldn't open search dropdown without providing any text in the search field`, () => {
            homePage.clickSubmitSearchButtonOnHomePage()
            homePage.getSearchDropdownOnHomePage().should('not.be.visible')
        })

        for (const title in REFERENCES_PAGE_TITLES_MAP) {
            const pageLink = REFERENCES_PAGE_TITLES_MAP[title as keyof typeof REFERENCES_PAGE_TITLES_MAP]
            it(`Should search for "${title}" page`, () => {
                homePage.fillSearchFieldOnHomePage(title)
                homePage.clickSubmitSearchButtonOnHomePage()
                homePage.getCurrentUrl().should('eq', `${BASE_URL}${pageLink}`)
            })
        }
    })

    describe('Search on navigation bar tests', () => {

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
            homePage.searchField.fillSearchField(' ')
            homePage.searchField.clickSubmitSearchButton()
            homePage.searchField.getSearchModalPage().should('not.exist')
        })
    })
})