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
}