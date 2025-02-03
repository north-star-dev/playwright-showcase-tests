import {Component, ComponentAssertions} from '../../interfaces';
import {Page as PwPage} from 'playwright-core';
import {expect, Locator} from '@playwright/test';

export class Transactions extends Component<Transactions> {
    private readonly assertions: TransactionsAssertions

    private readonly transactionsListPrefix: string;
    private readonly transactionsListItemLocator: Locator;

    constructor(page: PwPage, prefix: string) {
        super(page, `${prefix} div.TransactionList-paper`);
        this.assertions = new TransactionsAssertions(this);
        this.transactionsListPrefix = `${prefix} div[data-test="transaction-list"]`;
        this.transactionsListItemLocator = this.page.locator(`${this.transactionsListPrefix} li[data-test|="transaction-item"]`);
    }

    get expect(): TransactionsAssertions {
        return this.assertions;
    }

    get transactionItems() {
        return this.transactionsListItemLocator.all();
    }
}

class TransactionsAssertions extends ComponentAssertions<Transactions> {
    constructor(transactions: Transactions) {
        super(transactions);
    }

    async toHaveLengthGreaterThan(length: number) {
        await expect.poll(async () => (await this.component.transactionItems).length, {timeout: 10000})
            .toBeGreaterThan(length);
    }
}
