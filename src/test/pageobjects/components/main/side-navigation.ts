import {CloseableComponent, ComponentAssertions} from '../../interfaces';
import Header from './header';
import {Page as PwPage} from 'playwright-core';
import {Locator} from '@playwright/test';

export default class SideNavigation extends CloseableComponent<SideNavigation> {
    private readonly assertions: SideNavAssertions

    private readonly balanceLocator: Locator;
    private readonly homeLinkLocator: Locator;
    private readonly userSettingsLinkLocator: Locator;
    private readonly bankAccountsLinkLocator: Locator;
    private readonly notificationLinkLocator: Locator;
    private readonly logOutLinkLocator: Locator;

    constructor(page: PwPage) {
        super(page, 'div[data-test="sidenav"]');
        this.assertions = new SideNavAssertions(this);
        this.balanceLocator = this.page.locator(`${this.prefix} h6[data-test="sidenav-user-balance"]`);
        this.homeLinkLocator = this.page.locator(`${this.prefix} a[data-test="sidenav-home"]`);
        this.userSettingsLinkLocator = this.page.locator(`${this.prefix} a[data-test="sidenav-user-settings"]`);
        this.bankAccountsLinkLocator = this.page.locator(`${this.prefix} a[data-test="sidenav-bankaccounts"]`);
        this.notificationLinkLocator = this.page.locator(`${this.prefix} a[data-test="sidenav-notifications"]`);
        this.logOutLinkLocator = this.page.locator(`${this.prefix} div[data-test="sidenav-signout"]`);
    }

    get expect(): SideNavAssertions {
        return this.assertions;
    }

    async close() {
        await new Header(this.page).clickSideMenuToggle();
    }

    async openUserSettings() {
        await this.userSettingsLinkLocator.click();
    }
}

class SideNavAssertions extends ComponentAssertions<SideNavigation> {
    constructor(nav: SideNavigation) {
        super(nav);
    }
}
