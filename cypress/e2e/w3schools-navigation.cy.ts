import { BASE_URL, EXERCISES_PAGE_TITLES_MAP, THEMES } from 'cypress/support/types/constants'
import { HomePage } from '../support/pages/HomePage'
import { PageFactory } from '../support/pages/PageFactory'
import { NAVIGATION_ITEMS_NAMES, PAGES } from '../support/types/enums'
import { REFERENCES_PAGE_TITLES_MAP, TUTORIALS_PAGE_TITLES_MAP, OUTER_PAGE_TITLES_MAP } from '../support/types/constants'

const homePage: HomePage = PageFactory.getPage(PAGES.HOME) as HomePage

describe('W3shools navigation bar tests', () => {

    beforeEach(() => {
        homePage.visitPage()
    })

    describe('Navigation tests', () => {
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

        for (const pageTitle in OUTER_PAGE_TITLES_MAP) {
            const pageLink = OUTER_PAGE_TITLES_MAP[pageTitle as keyof typeof OUTER_PAGE_TITLES_MAP]
            it(`Should navigate to the "${pageTitle}" page by clicking on button with outer link`, () => {
                homePage.navigationBar.clickOnButtonWithOuterLink(pageTitle)
                homePage.getCurrentUrl().should('eq', pageLink)
            })
        }
    })

    describe('Theme changing tests', () => {
        for (const theme in THEMES) {
            const themeIndicator = THEMES[theme as keyof typeof THEMES]
            it(`Should change the theme of the page to "${theme}"`, () => {
                homePage.navigationBar.switchThemeByName(theme)
                homePage.navigationBar.getPageByTheme(themeIndicator).should('be.visible')
            })
        }

        it(`Should change the theme of the page to "Dark mode and Dark code" by clicking on theme switcher`, () => {
            homePage.navigationBar.clickThemeSwitcher()
            homePage.navigationBar.getPageByTheme('darktheme darkpagetheme').should('be.visible')
        })

        it(`Should change the theme of the page back to default by clicking on theme switcher`, () => {
            homePage.navigationBar.clickThemeSwitcher()
            homePage.navigationBar.getPageByTheme('darktheme darkpagetheme').should('be.visible')
            homePage.navigationBar.clickThemeSwitcher()
            homePage.navigationBar.getPageByTheme(' ').should('be.visible')
        })

        it(`Should add the "Dark code" theme after "Dark mode" has been selected by clicking on theme switcher`, () => {
            homePage.navigationBar.switchThemeByName('Dark mode')
            homePage.navigationBar.getPageByTheme(THEMES['Dark mode']).should('be.visible')
            homePage.navigationBar.clickThemeSwitcher()
            homePage.navigationBar.getPageByTheme('darktheme darkpagetheme').should('be.visible')
        })
    })
})