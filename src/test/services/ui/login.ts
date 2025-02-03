import {Page} from '@playwright/test';
import {LoginPage} from '../../pageobjects/pages/login-page';
import {User} from '../../data/interfaces';

export default class Login {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private async navigateIfNeeded() {
        // Navigate to login page if needed
        if (!this.page.url().startsWith(process.env.BASE_URL)) {
            await this.page.goto(process.env.BASE_URL);
        }
    }

    async login(user: User) {
        // Login with random user
        await this.navigateIfNeeded();
        await new LoginPage(this.page).loginForm.login(user);
    }
}
