import {Page, PageAssertions} from '../interfaces';
import {expect, Locator, Page as PwPage} from '@playwright/test';
import {LoginForm} from '../components/login/login-form';
import {SignUpForm} from '../components/login/sign-up-form';

export class LoginPage extends Page<LoginPage> {
    private readonly assertions: LoginPageAssertions
    private readonly loginFormComponent: LoginForm;
    private readonly signUpFormComponent: SignUpForm;

    readonly loginErrorLocator: Locator;

    constructor(page: PwPage) {
        super(page);
        this.assertions = new LoginPageAssertions(this);
        this.loginFormComponent = new LoginForm(page);
        this.signUpFormComponent = new SignUpForm(page);
        this.loginErrorLocator = this.page.locator('div[data-test="signin-error"]');
    }

    get expect() {
        return this.assertions;
    }

    get loginForm() {
        return this.loginFormComponent;
    }

    get signUpForm() {
        return this.signUpFormComponent;
    }
}

class LoginPageAssertions extends PageAssertions<LoginPage> {
    constructor(page: LoginPage) {
        super(page);
    }

    async toHaveLoginError(error: string) {
        await expect.poll(async () => await this.page.loginErrorLocator.isVisible(), {timeout: 10000}).toEqual(true);
        expect(await this.page.loginErrorLocator.innerText()).toBe(error);
    }
}
