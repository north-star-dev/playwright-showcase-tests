import {Component, ComponentAssertions} from '../../interfaces';
import {User} from '../../../data/interfaces';
import {expect, Locator, Page} from '@playwright/test';

export class LoginForm extends Component<LoginForm> {
    private readonly assertions: LoginFormAssertions

    readonly usernameFieldLocator: Locator;
    readonly passwordFieldLocator: Locator;
    readonly rememberMeCheckboxLocator: Locator;
    readonly loginButtonLocator: Locator;
    readonly signUpLinkLocator: Locator;
    readonly usernameHelperTextLocator: Locator;
    readonly passwordHelperTextLocator: Locator;

    constructor(page: Page) {
        super(page, 'form.SignInForm-form');
        this.assertions = new LoginFormAssertions(this);
        this.usernameFieldLocator = this.page.locator(`${this.prefix} input[name="username"][type="text"]`);
        this.passwordFieldLocator = this.page.locator(`${this.prefix} input[name="password"][type="password"]`);
        this.rememberMeCheckboxLocator = this.page.locator(`${this.prefix} input[name="remember"][type="checkbox"]`);
        this.loginButtonLocator = this.page.locator(`${this.prefix} button[type="submit"][data-test="signin-submit"]`);
        this.signUpLinkLocator = this.page.locator(`${this.prefix} a[data-test="signup"]`);
        this.usernameHelperTextLocator = this.page.locator(`${this.prefix} p#username-helper-text`);
        this.passwordHelperTextLocator = this.page.locator(`${this.prefix} p#password-helper-text`);
    }

    get expect(): LoginFormAssertions {
        return this.assertions;
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameFieldLocator.fill(username);
    }

    async focusUsername(): Promise<void> {
        await this.usernameFieldLocator.focus();
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordFieldLocator.fill(password);
    }

    async focusPassword(): Promise<void> {
        await this.passwordFieldLocator.focus();
    }

    async fillCredentials(user: User): Promise<void> {
        await this.fillUsername(user.username);
        await this.fillPassword(user.password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButtonLocator.click();
    }

    async login(user: User): Promise<void> {
        await this.fillCredentials(user);
        await this.clickLoginButton();
    }
}

class LoginFormAssertions extends ComponentAssertions<LoginForm> {
    constructor(form: LoginForm) {
        super(form);
    }

    async toHaveUsernameInput() {
        expect(await this.component.usernameFieldLocator.isVisible()).toBeTruthy();
        expect(await this.component.usernameFieldLocator.isEnabled()).toBeTruthy();
    }

    async toHavePasswordInput() {
        expect(await this.component.usernameFieldLocator.isVisible()).toBeTruthy();
        expect(await this.component.usernameFieldLocator.isEnabled()).toBeTruthy();
    }

    async toHaveRememberMeInput() {
        expect(await this.component.rememberMeCheckboxLocator.isVisible()).toBeTruthy();
        expect(await this.component.rememberMeCheckboxLocator.isEnabled()).toBeTruthy();
    }

    async assertSignUpLink(visible: boolean) {
        expect(await this.component.signUpLinkLocator.isVisible(), `Sign up link should${visible ? '' : ' not'} be visible`).toEqual(visible);
    }

    async toHaveSignUpLink() {
        await this.assertSignUpLink(true);
    }

    async toNotHaveSignUpLink() {
        await this.assertSignUpLink(false);
    }

    async assertLoginButton(enabled: boolean) {
        expect(await this.component.loginButtonLocator.isEnabled(), `Login button should${enabled ? '' : ' not'} be enabled`).toEqual(enabled);
    }

    async toHaveLoginButton() {
        await this.assertLoginButton(true);
    }

    async toNotHaveLoginButton() {
        await this.assertLoginButton(false);
    }

    async assertUsernameHelperText(visible: boolean) {
        expect(await this.component.usernameHelperTextLocator.isVisible(), `Sign up link should${visible ? '' : ' not'} be visible`).toEqual(visible);
    }

    async toNotHaveUsernameError() {
        await this.assertUsernameHelperText(false);
    }

    async toHaveUsernameError(error: string) {
        await this.assertUsernameHelperText(true);
        expect(await this.component.usernameHelperTextLocator.innerText()).toEqual(error);
    }

    async assertPasswordHelperText(visible: boolean) {
        expect(await this.component.passwordHelperTextLocator.isVisible(), `Sign up link should${visible ? '' : ' not'} be visible`).toEqual(visible);
    }

    async toNotHavePasswordError() {
        await this.assertPasswordHelperText(false);
    }

    async toHavePasswordError(error: string) {
        await this.assertPasswordHelperText(true);
        expect(await this.component.passwordHelperTextLocator.innerText()).toEqual(error);
    }

    async toHaveAllElements() {
        await this.toHaveUsernameInput();
        await this.toHavePasswordInput();
        await this.toHaveRememberMeInput();
        await this.toHaveSignUpLink();
    }

    async toHaveAllNoErrors() {
        await this.toNotHaveUsernameError();
        await this.toNotHavePasswordError();
    }
}
