import {Component, ComponentAssertions} from '../../interfaces';
import {Page as PwPage} from 'playwright-core';
import {Locator} from '@playwright/test';

export default class Header extends Component<Header> {
    private readonly assertions: HeaderAssertions

    private readonly sideNavToggleLocator: Locator;
    private readonly newTransactionLinkLocator: Locator;

    constructor(page: PwPage) {
        super(page, 'header');
        this.assertions = new HeaderAssertions(this);
        this.sideNavToggleLocator = this.page.locator(`${this.prefix} button[data-test="sidenav-toggle"]`);
        this.newTransactionLinkLocator = this.page.locator(`${this.prefix} a[data-test="nav-top-new-transaction"]`);
    }

    get expect(): HeaderAssertions {
        return this.assertions;
    }

    async clickSideMenuToggle() {
        await this.sideNavToggleLocator.click();
    }
}

class HeaderAssertions extends ComponentAssertions<Header> {
    constructor(nav: Header) {
        super(nav);
    }
}
