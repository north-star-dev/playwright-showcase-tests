import {expect, Page as PwPage} from '@playwright/test';

export abstract class Component<T extends Component<T>> {
    private readonly playwrightPage: PwPage;
    private readonly componentPrefix: string;

    protected constructor(page: PwPage, prefix: string) {
        this.playwrightPage = page;
        this.componentPrefix = prefix;
    }

    get page() {
        return this.playwrightPage;
    }

    get prefix() {
        return this.componentPrefix;
    }

    abstract get expect(): ComponentAssertions<T>;
}

export abstract class ComponentAssertions<T extends Component<T>> {
    protected constructor(protected readonly component: T) {
    }
}

export abstract class CloseableComponent<T extends CloseableComponent<T>> extends Component<T> {
    protected constructor(page: PwPage, prefix: string) {
        super(page, prefix);
    }

    abstract close(): Promise<void>;
}

export abstract class Page<T extends Page<T>> extends Component<T> {
    protected constructor(page: PwPage) {
        super(page, '');
    }

    get title() {
        return this.page.title();
    }

    get url() {
        return this.page.url();
    }

    abstract get expect(): PageAssertions<T>;
}

export abstract class PageAssertions<T extends Page<T>> extends ComponentAssertions<T> {
    protected constructor(protected readonly page: T) {
        super(page);
    }

    async toHaveTitle(title: string) {
        expect(await this.page.title).toEqual(title);
    }

    async toHaveURL(url: RegExp) {
        expect(this.page.url).toMatch(url);
    }
}
