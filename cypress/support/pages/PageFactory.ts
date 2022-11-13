import { PAGES } from '../types/types'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'
import { ResetPasswordPage } from './ResetPasswordPage'

export class PageFactory {
    public static getPage(pageName: PAGES) {
        switch (pageName) {
            case PAGES.HOME:
                return new HomePage()
            case PAGES.LOGIN:
                return new LoginPage()
            case PAGES.RESET_PASSWORD_PAGE:
                return new ResetPasswordPage()
            default:
                throw new Error('incorrect page name is provided')
        }
    }
}