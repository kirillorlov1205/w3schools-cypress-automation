import { HomePage } from '../support/pages/HomePage'
import { PageFactory } from '../support/pages/PageFactory'
import { NAVIGATION_ITEMS_NAMES, PAGES } from '../support/types/enums'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage

describe('Onliner navigation bar tests', () => {

    beforeEach(() => {
        homePage.visitPage()
    })

    const tutorialsPageTitlesMap = {
        'Learn HTML': 'https://www.w3schools.com/html/default.asp',
        'Learn CSS': 'https://www.w3schools.com/css/default.asp',
        'Learn RWD': 'https://www.w3schools.com/css/css_rwd_intro.asp',
        'Learn Bootstrap': '/bootstrap/bootstrap_ver.asp',
        // '': '',
        // '': '',

    }

    for (const pageTitle in tutorialsPageTitlesMap) {
        const pageLink = tutorialsPageTitlesMap[pageTitle as keyof typeof tutorialsPageTitlesMap]
        it(`Should navigate to the "${pageTitle}" page from "Tutorials" dropdown`, () => {
            homePage.navigationBar.clickNavigationItemByName(NAVIGATION_ITEMS_NAMES.TUTORIALS)
            homePage.navigationBar.clickItemFromDropdownMenuByName(pageTitle)
            homePage.getCurrentUrl().should('eq', pageLink)
        })
    }
})