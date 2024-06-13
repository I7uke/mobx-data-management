import StoreDisplayedData from '../src/storeDisplayedDataNew';

interface TestDataType {
    readonly a: string;
    readonly b: number;
}

function GET_TEST_DATA(): TestDataType[] {
    return [
        { a: '0', b: 0 }, //1
        { a: '1', b: 1 }, //2
        { a: '2', b: 2 }, //3
        { a: '3', b: 3 }, //4
        { a: '4', b: 4 }, //5
        { a: '5', b: 5 }, //6
        { a: '6', b: 6 }, //7
        { a: '7', b: 7 }, //8
        { a: '8', b: 8 }, //9
        { a: '9', b: 9 }  //10
    ];
}

test('currentPage 1 numberItemsPerPage 2', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 1
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1]]);
});

test('currentPage 2 numberItemsPerPage 2', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[2], TEST_DATA[3]]);
});

test('currentPage 4 numberItemsPerPage 2', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[6], TEST_DATA[7]]);
});

test('currentPage 2 numberItemsPerPage 3', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[3], TEST_DATA[4], TEST_DATA[5]]);
});

test('currentPage 4 numberItemsPerPage 3', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[9]]);
});

test('currentPage 0 numberItemsPerPage 3', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 0
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('currentPage -1 numberItemsPerPage 3', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: -1
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('currentPage 100 numberItemsPerPage 3', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 100
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[9]]);
});

test('currentPage 4 numberItemsPerPage 0', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 0,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('currentPage 4 numberItemsPerPage -1', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: -1,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('currentPage 4 numberItemsPerPage 100', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 100,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual(TEST_DATA);
});

test('wrong init data type 1', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        // @ts-ignore
        numberItemsPerPage: undefined,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('wrong init data type 2', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        // @ts-ignore
        currentPage: undefined
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('wrong init data type 3', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        // @ts-ignore
        numberItemsPerPage: undefined,
        // @ts-ignore
        currentPage: undefined
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('currentPage 4', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(4);
});

test('currentPage -1', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: -1
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(0);
});

test('currentPage 100', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 100
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(5);
});

test('maxPages 5', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.maxPages).toStrictEqual(5);
});

test('maxPages 4', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.maxPages).toStrictEqual(4);
});

test('maxPages 4', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 5,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.maxPages).toStrictEqual(2);
});

test('numberItemsPerPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 5,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.numberItemsPerPage).toStrictEqual(5);
});

test('totalItems', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 5,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.totalItems).toStrictEqual(TEST_DATA.length);
});

test('eventShowNextPage 1', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[8], TEST_DATA[9]]);
});

test('eventShowNextPage 2', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(3);
});

test('eventShowNextPage 3', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[8], TEST_DATA[9]]);
});

test('eventShowPrevPage 1', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowPrevPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1], TEST_DATA[2], TEST_DATA[3]]);
});

test('eventShowPrevPage 2', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowPrevPage();

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('eventShowPrevPage 3', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowPrevPage();
    storeDataDisplay.eventShowPrevPage();
    storeDataDisplay.eventShowPrevPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1], TEST_DATA[2], TEST_DATA[3]]);
});

test('setOptions currentPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[2], TEST_DATA[3]]);
});


test('setOptions currentPage and numberItemsPerPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        currentPage: 1,
        numberItemsPerPage: 3
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1], TEST_DATA[2]]);
});

test('setOptions change', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        currentPage: 4,
        numberItemsPerPage: 3,
        itemsList: []
    });

    storeDataDisplay.setOptions({
        currentPage: 1,
        numberItemsPerPage: 5,
        itemsList: []
    });

    storeDataDisplay.setOptions({
        itemsList: TEST_DATA
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1], TEST_DATA[2], TEST_DATA[3], TEST_DATA[4]]);
});

test('setOptions setCurrentPage -1', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        currentPage: -1
    });
    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(3);
});

test('setOptions currentPage wrong type null', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        // @ts-ignore
        currentPage: null
    });
    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(3);
});

test('setOptions currentPage wrong type undefined', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        // @ts-ignore
        currentPage: undefined
    });
    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(3);
});

test('setCurrentPage wrong type string', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });
    // @ts-ignore
    storeDataDisplay.setOptions({
        // @ts-ignore
        currentPage: 'test'
    });
    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(3);
});


test('set itemsList', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        itemsList: TEST_DATA
    });
    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[4], TEST_DATA[5]]);
});

test('set itemsList empty', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        itemsList: []
    });
    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('set itemsList empty', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        itemsList: []
    });
    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(0);
});

test('setOptions numberItemsPerPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        numberItemsPerPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[4], TEST_DATA[5]]);
});

test('setOptions numberItemsPerPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        numberItemsPerPage: 3
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[6], TEST_DATA[7], TEST_DATA[8]]);
});


test('setOptions numberItemsPerPage wrong type null', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        // @ts-ignore
        numberItemsPerPage: null
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[4], TEST_DATA[5]]);
});

test('setOptions numberItemsPerPage wrong type undefined', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        // @ts-ignore
        numberItemsPerPage: undefined
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[4], TEST_DATA[5]]);
});

test('setOptions numberItemsPerPage wrong type string', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });
    // @ts-ignore
    storeDataDisplay.setOptions({
        // @ts-ignore
        numberItemsPerPage: 'test'
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[4], TEST_DATA[5]]);
});


test('dataStatus 1', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    expect(storeDataDisplay.dataStatus).toStrictEqual('installed');
});

test('dataStatus 2', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [],
        numberItemsPerPage: 2,
        currentPage: 3
    });

    expect(storeDataDisplay.dataStatus).toStrictEqual('notSet');
});

test('dataStatus 3', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [],
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        itemsList: []
    });

    expect(storeDataDisplay.dataStatus).toStrictEqual('empty');
});

test('setItemsListWithoutTriggers', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [],
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setItemsListWithoutTriggers([]);
    expect(storeDataDisplay.dataStatus).toStrictEqual('notSet');
});

test('setForceUpdate', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [TEST_DATA[0], TEST_DATA[1]],
        numberItemsPerPage: 1,
        currentPage: 1
    });

    storeDataDisplay.setForceUpdate(() => TEST_DATA);
    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[3]]);
});


test('setForceUpdate wrong type', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [TEST_DATA[0], TEST_DATA[1]],
        numberItemsPerPage: 1,
        currentPage: 1
    });

    // @ts-ignore
    storeDataDisplay.setForceUpdate(undefined);
    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[1]]);
});

test('removeForceUpdate', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [TEST_DATA[0], TEST_DATA[1]],
        numberItemsPerPage: 1,
        currentPage: 1
    });

    storeDataDisplay.setForceUpdate(() => TEST_DATA);
    storeDataDisplay.removeForceUpdate();
    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[1]]);
});

test('destroy 1', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 1
    });
    storeDataDisplay.destroy();
    expect(storeDataDisplay.dataStatus).toStrictEqual('notSet');
});

test('destroy 2', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 1
    });

    storeDataDisplay.destroy();
    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('goToFirstPage 1', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 2
    });

    storeDataDisplay.setOptions({
        itemsList: TEST_DATA,
        currentPage: 'firstPage'
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('goToFirstPage 2', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 2
    });

    storeDataDisplay.setOptions({
        itemsList: TEST_DATA,
        currentPage: 'firstPage'
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1]]);
});

test('goToLastPage 1', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 2
    });

    storeDataDisplay.setOptions({
        itemsList: TEST_DATA,
        currentPage: 'lastPage'
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(5);
});

test('goToLastPage 2', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 2
    });

    storeDataDisplay.setOptions({
        itemsList: TEST_DATA,
        currentPage: 'lastPage'
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[8], TEST_DATA[9]]);
});

test('numberItemsPerPage all 1', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 'all',
        itemsList: GET_TEST_DATA()
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual(GET_TEST_DATA());
});

test('numberItemsPerPage all 2', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 'all',
        itemsList: GET_TEST_DATA()
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('numberItemsPerPage all 3', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 'all',
        itemsList: TEST_DATA
    });

    storeDataDisplay.setOptions({
        numberItemsPerPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[4], TEST_DATA[5]]);
});