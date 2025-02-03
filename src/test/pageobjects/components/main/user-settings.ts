import {Component, ComponentAssertions} from '../../interfaces';
import {Page as PwPage} from 'playwright-core';
import {expect, Locator} from '@playwright/test';

export class UserSettings extends Component<UserSettings> {
    private readonly assertions: UserSettingsAssertions

    readonly userSettingsFormPrefix: string;
    readonly userFirstNameFieldLocator: Locator;
    readonly userLastNameFieldLocator: Locator;
    readonly userEmailFieldLocator: Locator;
    readonly userPhoneNumberFieldLocator: Locator;
    readonly submitButtonLocator: Locator;
    readonly userFirstNameHelperTextLocator: Locator;
    readonly userLastNameHelperTextLocator: Locator;
    readonly userEmailHelperTextLocator: Locator;
    readonly userPhoneNumberHelperTextLocator: Locator;

    constructor(page: PwPage, prefix: string) {
        super(page, `${prefix} div.UserSettingsContainer-paper`);
        this.assertions = new UserSettingsAssertions(this);
        this.userSettingsFormPrefix = `${this.prefix} form[data-test="user-settings-form"]`;
        this.userFirstNameFieldLocator = this.page.locator(`${this.userSettingsFormPrefix} input#user-settings-firstName-input`);
        this.userLastNameFieldLocator = this.page.locator(`${this.userSettingsFormPrefix} input#user-settings-lastName-input`);
        this.userEmailFieldLocator = this.page.locator(`${this.userSettingsFormPrefix} input#user-settings-email-input`);
        this.userPhoneNumberFieldLocator = this.page.locator(`${this.userSettingsFormPrefix} input#user-settings-phoneNumber-input`);
        this.submitButtonLocator = this.page.locator(`${this.userSettingsFormPrefix} button[data-test="user-settings-submit"]`);
        this.userFirstNameHelperTextLocator = this.page.locator(`${this.userSettingsFormPrefix} p#user-settings-firstName-input-helper-text`);
        this.userLastNameHelperTextLocator = this.page.locator(`${this.userSettingsFormPrefix} p#user-settings-lastName-input-helper-text`);
        this.userEmailHelperTextLocator = this.page.locator(`${this.userSettingsFormPrefix} p#user-settings-email-input-helper-text`);
        this.userPhoneNumberHelperTextLocator = this.page.locator(`${this.userSettingsFormPrefix} p#user-settings-phoneNumber-input-helper-text`);
    }

    get expect(): UserSettingsAssertions {
        return this.assertions;
    }

    async fillUserFirstName(firstName: string) {
        await this.userFirstNameFieldLocator.fill(firstName);
    }

    async fillUserLastName(lastName: string) {
        await this.userLastNameFieldLocator.fill(lastName);
    }

    async fillUserEmail(email: string) {
        await this.userEmailFieldLocator.fill(email);
    }

    async fillUserPhoneNumber(phoneNumber: string) {
        await this.userPhoneNumberFieldLocator.fill(phoneNumber);
    }
}

class UserSettingsAssertions extends ComponentAssertions<UserSettings> {
    constructor(userSettings: UserSettings) {
        super(userSettings);
    }

    async toHaveUserFirstNameField() {
        expect(await this.component.userFirstNameFieldLocator.isVisible()).toBeTruthy();
        expect(await this.component.userFirstNameFieldLocator.isEnabled()).toBeTruthy();
    }

    async toHaveUserLastNameField() {
        expect(await this.component.userLastNameFieldLocator.isVisible()).toBeTruthy();
        expect(await this.component.userLastNameFieldLocator.isEnabled()).toBeTruthy();
    }

    async toHaveUserEmailField() {
        expect(await this.component.userEmailFieldLocator.isVisible()).toBeTruthy();
        expect(await this.component.userEmailFieldLocator.isEnabled()).toBeTruthy();
    }

    async toHaveUserPhoneNumberField() {
        expect(await this.component.userPhoneNumberFieldLocator.isVisible()).toBeTruthy();
        expect(await this.component.userPhoneNumberFieldLocator.isEnabled()).toBeTruthy();
    }

    async toHaveSubmitButton() {
        expect(await this.component.submitButtonLocator.isVisible()).toBeTruthy();
        expect(await this.component.submitButtonLocator.isEnabled()).toBeTruthy();
    }

    async toHaveSubmitButtonDisabled() {
        expect(await this.component.submitButtonLocator.isVisible()).toBeTruthy();
        expect(await this.component.submitButtonLocator.isDisabled()).toBeTruthy();
    }

    async toHaveUserFirstName(firstName: string) {
        expect(await this.component.userFirstNameFieldLocator.inputValue()).toEqual(firstName);
    }

    async toHaveUserLastName(lastName: string) {
        expect(await this.component.userLastNameFieldLocator.inputValue()).toEqual(lastName);
    }

    async toHaveUserEmail(email: string) {
        expect(await this.component.userEmailFieldLocator.inputValue()).toEqual(email);
    }

    async toHaveUserPhoneNumber(phoneNumber: string) {
        expect(await this.component.userPhoneNumberFieldLocator.inputValue()).toEqual(phoneNumber);
    }

    async toHaveAllElements() {
        await this.toHaveUserFirstNameField();
        await this.toHaveUserLastNameField();
        await this.toHaveUserEmailField();
        await this.toHaveUserPhoneNumberField();
        await this.toHaveSubmitButton();
    }

    async toHaveFirstNameError(error: string) {
        expect(await this.component.userFirstNameHelperTextLocator.isVisible()).toBeTruthy();
        expect(await this.component.userFirstNameHelperTextLocator.innerText()).toEqual(error);
    }

    async toHaveLastNameError(error: string) {
        expect(await this.component.userLastNameHelperTextLocator.isVisible()).toBeTruthy();
        expect(await this.component.userLastNameHelperTextLocator.innerText()).toEqual(error);
    }

    async toHaveEmailError(error: string) {
        expect(await this.component.userEmailHelperTextLocator.isVisible()).toBeTruthy();
        expect(await this.component.userEmailHelperTextLocator.innerText()).toEqual(error);
    }

    async toHavePhoneNumberError(error: string) {
        expect(await this.component.userPhoneNumberHelperTextLocator.isVisible()).toBeTruthy();
        expect(await this.component.userPhoneNumberHelperTextLocator.innerText()).toEqual(error);
    }
}
