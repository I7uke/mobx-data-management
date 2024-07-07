import StoreValue from '../src/storeValue';

test('1. boolean', () => {
    const store = new StoreValue({
        value: true
    });

    expect(store.value).toStrictEqual(true);
});


test('2. boolean', () => {
    const store = new StoreValue({
        value: true
    });

    store.setValue(false);
    expect(store.value).toStrictEqual(false);
});

test('function', () => {

    const testFunction = ()=>{}

    const store = new StoreValue({
        value: testFunction
    });

    expect(store.value).toStrictEqual(testFunction);
});

test('1. number', () => {
    const store = new StoreValue<number | undefined>({
        value: 5
    });

    expect(store.value).toStrictEqual(5);
});

test('2. number', () => {
    const store = new StoreValue<number | undefined>({
        value: undefined
    });

    store.setValue(5);
    expect(store.value).toStrictEqual(5);
});

test('1. object', () => {
    const testObject = {a: 1, b: 2};
    const store = new StoreValue<typeof testObject | undefined>({
        value: testObject
    });

    expect(store.value).toStrictEqual(testObject);
});

test('2. object', () => {
    const testObject = {a: 1, b: 2};
    const store = new StoreValue<typeof testObject | undefined>({
        value: undefined
    });

    store.setValue(testObject);
    expect(store.value).toStrictEqual(testObject);
});

test('1. string', () => {
    const store = new StoreValue<string | undefined>({
        value: 'string'
    });

    expect(store.value).toStrictEqual('string');
});

test('2. string', () => {
    const store = new StoreValue<string | undefined>({
        value: undefined
    });

    store.setValue('string');
    expect(store.value).toStrictEqual('string');
});

test('undefined', () => {
    const store = new StoreValue({
        value: undefined
    });

    expect(store.value).toStrictEqual(undefined);
});

test('null', () => {
    const store = new StoreValue({
        value: null
    });

    expect(store.value).toStrictEqual(null);
});

test('NaN', () => {
    const store = new StoreValue({
        value: NaN
    });

    expect(store.value).toStrictEqual(NaN);
});

test('1. array', () => {
    const testArray = [1, 2, 3];
    const store = new StoreValue<typeof testArray | undefined>({
        value: testArray
    });

    expect(store.value).toStrictEqual(testArray);
});

test('2. array', () => {
    const testArray = [1, 2, 3];
    const store = new StoreValue<typeof testArray | undefined>({
        value: undefined
    });

    store.setValue(testArray);
    expect(store.value).toStrictEqual(testArray);
});


test('1. date', () => {
    const testDate = new Date();
    const store = new StoreValue<Date | undefined>({
        value: testDate
    });

    expect(store.value).toStrictEqual(testDate);
});

test('2. date', () => {
    const testDate = new Date();
    const store = new StoreValue<Date | undefined>({
        value: undefined
    });

    store.setValue(testDate);
    expect(store.value).toStrictEqual(testDate);
});