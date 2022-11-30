import { PAGES } from '../types/enums'
import { HomePage } from './HomePage'
import { LoginPage } from './LoginPage'
import { ResetPasswordPage } from './ResetPasswordPage'
import { SignUpPage } from './SignUpPage'

export class PageFactory {
    public static getPage(pageName: PAGES) {
        switch (pageName) {
            case PAGES.HOME:
                return new HomePage()
            case PAGES.LOGIN:
                return new LoginPage()
            case PAGES.RESET_PASSWORD_PAGE:
                return new ResetPasswordPage()
            case PAGES.SIGN_UP_PAGE:
                return new SignUpPage()
            default:
                throw new Error('Incorrect page name is provided')
        }
    }
}