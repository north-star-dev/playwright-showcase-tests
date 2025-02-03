import {test} from '@playwright/test';
import {LoginPage} from '../pageobjects/pages/login-page';
import {USERS} from '../data/users';
import {MainPage} from '../pageobjects/pages/main-page';

test.describe('Login Page tests', () => {
    test.beforeEach(async ({page, baseURL}) => {
        await page.goto(baseURL);
    });

    test.afterEach(async ({page}) => {
        await page.close();
    });

    test('Verify Login Page details at open', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.expect.toHaveTitle('Cypress Real World App');
        await loginPage.expect.toHaveURL(/\/signin$/);
        await loginPage.loginForm.expect.toHaveAllElements();
        await loginPage.loginForm.expect.toHaveAllNoErrors();
        await loginPage.loginForm.expect.toHaveLoginButton();
    });

    test('Verify Login Page details after credentials enter', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginForm.fillCredentials(USERS[0]);
        await loginPage.loginForm.expect.toHaveAllElements();
        await loginPage.loginForm.expect.toHaveAllNoErrors();
        await loginPage.loginForm.expect.toHaveLoginButton();
    });

    test('Verify Login Page details after just username enter', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginForm.fillUsername(USERS[0].username);
        await loginPage.loginForm.expect.toHaveAllElements();
        await loginPage.loginForm.expect.toHaveAllNoErrors();
        await loginPage.loginForm.expect.toNotHaveLoginButton();
    });

    test('Verify Login Page empty username error message', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginForm.focusUsername();
        await loginPage.loginForm.focusPassword();
        await loginPage.loginForm.expect.toHaveAllElements();
        await loginPage.loginForm.expect.toHaveUsernameError('Username is required');
        await loginPage.loginForm.expect.toNotHavePasswordError();
        await loginPage.loginForm.expect.toNotHaveLoginButton();
    });

    test('Verify Login Page short password error message', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginForm.fillUsername(USERS[0].username);
        await loginPage.loginForm.fillPassword('123');
        await loginPage.loginForm.focusUsername();
        await loginPage.loginForm.expect.toHaveAllElements();
        await loginPage.loginForm.expect.toNotHaveUsernameError()
        await loginPage.loginForm.expect.toHavePasswordError('Password must contain at least 4 characters');
        await loginPage.loginForm.expect.toNotHaveLoginButton();
    });

    test('Verify Login', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginForm.login(USERS[0]);
        const mainPage = new MainPage(page);
        await mainPage.transactions.expect.toHaveLengthGreaterThan(0);
    });

    test('Verify Login with invalid password', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginForm.fillUsername(USERS[0].username);
        await loginPage.loginForm.fillPassword('12345');
        await loginPage.loginForm.clickLoginButton();
        await loginPage.expect.toHaveLoginError('Username or password is invalid');
    });
});
