import Login from '../services/ui/login';
import {USERS} from '../data/users';
import {MainPage} from '../pageobjects/pages/main-page';
import {test} from '@playwright/test';

test.describe('User Settings tests', () => {
    test.beforeEach(async ({page}) => {
        await new Login(page).login(USERS[1]);
    });

    test.afterEach(async ({page}) => {
        await page.close();
    });

    test('Verify User Settings Page details at open', async ({page}) => {
        const mainPage = new MainPage(page);
        await mainPage.sideMenu.openUserSettings();
        await mainPage.userSettings.expect.toHaveAllElements();
        await mainPage.userSettings.expect.toHaveUserFirstName(USERS[1].firstName);
        await mainPage.userSettings.expect.toHaveUserLastName(USERS[1].lastName);
        await mainPage.userSettings.expect.toHaveUserEmail(USERS[1].email);
        await mainPage.userSettings.expect.toHaveUserPhoneNumber(USERS[1].phoneNumber);
    });

    test('Verify User Settings Page empty First Name error', async ({page}) => {
        const mainPage = new MainPage(page);
        await mainPage.sideMenu.openUserSettings();
        await mainPage.userSettings.fillUserFirstName('');
        await mainPage.userSettings.expect.toHaveFirstNameError('Enter a first name');
        await mainPage.userSettings.expect.toHaveSubmitButtonDisabled();
    });

    test('Verify User Settings Page empty Last Name error', async ({page}) => {
        const mainPage = new MainPage(page);
        await mainPage.sideMenu.openUserSettings();
        await mainPage.userSettings.fillUserLastName('');
        await mainPage.userSettings.expect.toHaveLastNameError('Enter a last name');
        await mainPage.userSettings.expect.toHaveSubmitButtonDisabled();
    });

    test('Verify User Settings Page empty Email error', async ({page}) => {
        const mainPage = new MainPage(page);
        await mainPage.sideMenu.openUserSettings();
        await mainPage.userSettings.fillUserEmail('');
        await mainPage.userSettings.expect.toHaveEmailError('Enter an email address');
        await mainPage.userSettings.expect.toHaveSubmitButtonDisabled();
    });

    test('Verify User Settings Page empty Phone Number error', async ({page}) => {
        const mainPage = new MainPage(page);
        await mainPage.sideMenu.openUserSettings();
        await mainPage.userSettings.fillUserPhoneNumber('')
        await mainPage.userSettings.expect.toHavePhoneNumberError('Enter a phone number');
        await mainPage.userSettings.expect.toHaveSubmitButtonDisabled();
    });
});
