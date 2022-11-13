export enum NAVIGATION_ITEMS {
    CATALOG = 'https://catalog.onliner.by',
    AUTO = 'https://ab.onliner.by',
    REALT = 'https://r.onliner.by/pk',
    TASKS = 'https://s.onliner.by/tasks',
    BARAHOLKA = 'https://baraholka.onliner.by/',
    FORUM = 'https://forum.onliner.by/'
}

export enum PAGES {
    HOME = 'HomePage',
    LOGIN = 'LoginPage',
    RESET_PASSWORD_PAGE = 'ResetPasswordPage'
}

export enum SEARCH_ITEMS {
    NEWS = 'в новостях',
    BARAHOLKA = 'на барахолке',
    FORUM = 'на форуме',
}

export const INVALID_EMAILS = {
    withInvalidCharacterPrefix: 'abc#def@mail.com',
    withInvalidTopDomain: 'abc.def@mail.c',
    withInvalidCharacterDomain: 'abc.def@mail#archive.com',
    withoutTopDomain: 'abc.def@mail',
    withTwoDotsInTopDomain: 'abc.def@mail..com',
}