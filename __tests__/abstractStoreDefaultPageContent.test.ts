import {
    AbstractStoreDefaultPageContent,
    InitBaseStoreDefaultContent,
} from "../src";


class TestClass extends AbstractStoreDefaultPageContent {
    private _testField: string;

    get testField(): string {
        return this._testField;
    }

    constructor(init: InitBaseStoreDefaultContent) {
        super(init);
        this._testField = '';
    }

    protected _serverRequestGetInitData(): void {
        this._testField = '_serverRequestGetInitData';
    }
    protected _beforeRemovingStore(): void {
        this._testField = '_beforeRemovingStore';
    }
    protected _init(): void {
        this._testField = '_init';
    }

    public setError(error: Parameters<AbstractStoreDefaultPageContent['_setError']>[number]){
        this._setError(error);
    }

    public removeError() {
        this._removeError();
    }

    public setRedirectLink(link: Parameters<AbstractStoreDefaultPageContent['_setRedirectLink']>[number]) {
        this._setRedirectLink(link);
    }

    public removeRedirectLink() {
        this._removeRedirectLink();
    }
}

function GET_TEST_STORE():TestClass {
    return new TestClass({
        uniquePageKey: 'test_uniquePageKey'
    });
}

//#region error
test('setError wrong type undefined', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setError(undefined);
    expect(store.error).toStrictEqual(undefined);
});

test('setError wrong type null', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setError(null);
    expect(store.error).toStrictEqual(undefined);
});

test('setError wrong type number', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setError(0);
    expect(store.error).toStrictEqual(undefined);
});

test('setError wrong type array', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setError([]);
    expect(store.error).toStrictEqual(undefined);
});

test('setError wrong type object', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setError({});
    expect(store.error).toStrictEqual(undefined);
});

test('setError empty string', () => {
    const store = GET_TEST_STORE();
    store.setError('');
    expect(store.error).toStrictEqual(undefined);
});

test('setError', () => {
    const store = GET_TEST_STORE();
    store.setError('error text');
    expect(store.error).toStrictEqual('error text');
});

test('removeError', () => {
    const store = GET_TEST_STORE();
    store.setError('error text');
    store.removeError();
    expect(store.error).toStrictEqual(undefined);
});
//#endregion

//#region redirectLink
test('setRedirectLink wrong type undefined', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setRedirectLink(undefined);
    expect(store.redirectLink).toStrictEqual(undefined);
});

test('setRedirectLink wrong type null', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setRedirectLink(null);
    expect(store.redirectLink).toStrictEqual(undefined);
});

test('setRedirectLink wrong type number', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setRedirectLink(0);
    expect(store.redirectLink).toStrictEqual(undefined);
});

test('setRedirectLink wrong type array', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setRedirectLink([]);
    expect(store.redirectLink).toStrictEqual(undefined);
});

test('setRedirectLink wrong type object', () => {
    const store = GET_TEST_STORE();
    //@ts-ignore
    store.setRedirectLink({});
    expect(store.redirectLink).toStrictEqual(undefined);
});

test('setRedirectLink empty string', () => {
    const store = GET_TEST_STORE();
    store.setRedirectLink('');
    expect(store.redirectLink).toStrictEqual(undefined);
});

test('setRedirectLink', () => {
    const store = GET_TEST_STORE();
    store.setRedirectLink('test1/test2');
    expect(store.redirectLink).toStrictEqual('test1/test2');
});

test('removeRedirectLink', () => {
    const store = GET_TEST_STORE();
    store.setRedirectLink('test1/test2');
    store.removeRedirectLink();
    expect(store.redirectLink).toStrictEqual(undefined);
});

//#endregion

//#region other
test('getUniquePageKey', () => {
    const store = GET_TEST_STORE();
    expect(store.getUniquePageKey()).toStrictEqual('test_uniquePageKey');
});

test('beforeRemovingStore', () => {
    const store = GET_TEST_STORE();
    store.beforeRemovingStore();
    expect(store.testField).toStrictEqual('_beforeRemovingStore');
});

test('init', () => {
    const store = GET_TEST_STORE();
    store.init();
    expect(store.testField).toStrictEqual('_init');
});

test('serverRequestGetInitData', () => {
    const store = GET_TEST_STORE();
    store.serverRequestGetInitData();
    expect(store.testField).toStrictEqual('_serverRequestGetInitData');
});
//#endregion