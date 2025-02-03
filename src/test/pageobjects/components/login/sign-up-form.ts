import {Component, ComponentAssertions} from '../../interfaces';
import {Page} from '@playwright/test';

export class SignUpForm extends Component<SignUpForm> {
    private readonly assertions: SignUpFormAssertions

    constructor(page: Page) {
        super(page, 'form.SignUpForm-form');
        this.assertions = new SignUpFormAssertions(this);
    }

    get expect(): SignUpFormAssertions {
        return this.assertions;
    }
}

class SignUpFormAssertions extends ComponentAssertions<SignUpForm> {
    constructor(form: SignUpForm) {
        super(form);
    }
}
