import { HomePage } from '../support/pages/HomePage'
import { PageFactory } from '../support/pages/PageFactory'
import { PAGES, SEARCH_ITEMS } from '../support/types/enums'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage
const textForTest = 'test'

describe('Search test', () => {

    beforeEach(() => {
        homePage.visitPage()
    })

    it(`Should search for "${textForTest}"`, () => {
        //"o"
        //
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

    enum SPECIAL_SIMBOLS {
        tilde = '~',
        exclamation = '!',
        hash = '#',
        percent = '%',
        caret = '^',
        asterisk = '*',
        hyphen = '-',
        equals = '=',
    //     equals = '=',
    // }

    // for (const key in object) {

    // }

    // it(`Should show search section "в новостях" on modal page while clicking and providing text "${textForTest}"`, () => {
    //     homePage.searchField.fillSearchField(textForTest)
    //     homePage.searchField.getSearchTabsItemByName(SEARCH_ITEMS.NEWS).click()
    //     homePage.searchField.getSearchFilterItemByName('За полгода').should('be.visible')
    // })

    // it(`Should show search section "на барахолке" on modal page while clicking and providing text "${textForTest}"`, () => {
    //     homePage.searchField.fillSearchField(textForTest)
    //     homePage.searchField.getSearchTabsItemByName(SEARCH_ITEMS.BARAHOLKA).click()
    //     homePage.searchField.getCatalogSearchResultsList().should('be.visible')
    // })

    // it(`Should show search section "на форуме" on modal page while clicking and providing text "${textForTest}"`, () => {
    //     homePage.searchField.fillSearchField(textForTest)
    //     homePage.searchField.getSearchTabsItemByName(SEARCH_ITEMS.FORUM).click()
    //     homePage.searchField.getResultItemFromForumList().should('be.visible')
    // })
})