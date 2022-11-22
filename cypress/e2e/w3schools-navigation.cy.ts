import { BASE_URL, EXERCISES_PAGE_TITLES_MAP } from 'cypress/support/types/constants'
import { HomePage } from '../support/pages/HomePage'
import { PageFactory } from '../support/pages/PageFactory'
import { NAVIGATION_ITEMS_NAMES, PAGES } from '../support/types/enums'
import { REFERENCES_PAGE_TITLES_MAP, TUTORIALS_PAGE_TITLES_MAP } from '../support/types/constants'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage

describe('Onliner navigation bar tests', () => {

    beforeEach(() => {
        homePage.visitPage()
    })

    for (const pageTitle in TUTORIALS_PAGE_TITLES_MAP) {
        const pageLink = TUTORIALS_PAGE_TITLES_MAP[pageTitle as keyof typeof TUTORIALS_PAGE_TITLES_MAP]
        it(`Should navigate to the "${pageTitle}" page from "Tutorials" dropdown`, () => {
            homePage.navigationBar.clickNavigationItemByName(NAVIGATION_ITEMS_NAMES.TUTORIALS)
            homePage.navigationBar.clickItemFromDropdownMenuByName(pageTitle)
            homePage.getCurrentUrl().should('eq', `${BASE_URL}${pageLink}`)
        })
    }

    for (const pageTitle in REFERENCES_PAGE_TITLES_MAP) {
        const pageLink = REFERENCES_PAGE_TITLES_MAP[pageTitle as keyof typeof REFERENCES_PAGE_TITLES_MAP]
        it(`Should navigate to the "${pageTitle}" page from "References" dropdown`, () => {
            homePage.navigationBar.clickNavigationItemByName(NAVIGATION_ITEMS_NAMES.REFERENCES)
            homePage.navigationBar.clickItemFromDropdownMenuByName(pageTitle)
            homePage.getCurrentUrl().should('eq', `${BASE_URL}${pageLink}`)
        })
    }

    for (const pageTitle in EXERCISES_PAGE_TITLES_MAP) {
        const pageLink = EXERCISES_PAGE_TITLES_MAP[pageTitle as keyof typeof EXERCISES_PAGE_TITLES_MAP]
        it(`Should navigate to the "${pageTitle}" page from "Exercises" dropdown`, () => {
            homePage.navigationBar.clickNavigationItemByName(NAVIGATION_ITEMS_NAMES.EXERCISES)
            homePage.navigationBar.clickItemFromDropdownMenuByName(pageTitle)
            homePage.getCurrentUrl().should('eq', `${BASE_URL}${pageLink}`)
        })
    }

    // it(`Should navigate to the "${pageTitle}" page from "Exercises" dropdown`, () => {
    //     homePage.navigationBar.clickNavigationItemByName(NAVIGATION_ITEMS_NAMES.EXERCISES)
    //     homePage.navigationBar.clickItemFromDropdownMenuByName(pageTitle)
    //     homePage.getCurrentUrl().should('eq', `${BASE_URL}${pageLink}`)
    // })


})