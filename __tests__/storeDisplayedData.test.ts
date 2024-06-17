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

test('1. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 0
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1], TEST_DATA[2]]);
});

test('2. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 1
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1]]);
});

test('3. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[9]]);
});

test('4. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[3], TEST_DATA[4], TEST_DATA[5]]);
});

test('5. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[6], TEST_DATA[7]]);
});

test('6. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[2], TEST_DATA[3]]);
});

test('7. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: -1
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1], TEST_DATA[2]]);
});

test('8. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 100
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[9]]);
});

test('9. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 0,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('10. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: -1,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('11. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 100,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual(TEST_DATA);
});

test('11. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: -1
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('12. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(4);
});

test('13. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 100
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(5);
});

test('14. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 100
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[8], TEST_DATA[9]]);
});

test('15. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 100,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual(GET_TEST_DATA());
});


test('16. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 100,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('17. constructor', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 100,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.maxPages).toStrictEqual(1);
});

test('1. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        // @ts-ignore
        numberItemsPerPage: undefined,
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('2. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        // @ts-ignore
        currentPage: undefined
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1]]);
});

test('3. wrong data type', () => {
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

test('4. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        // @ts-ignore
        numberItemsPerPage: 'numberItemsPerPage',
        currentPage: 4
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('5. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        // @ts-ignore
        currentPage: 'currentPage'
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1]]);
});

test('6. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        // @ts-ignore
        numberItemsPerPage: 'numberItemsPerPage',
        // @ts-ignore
        currentPage: 'currentPage'
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('7. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>();
    storeDataDisplay.setOptions({
        // @ts-ignore
        currentPage: 'currentPage',
        itemsList: TEST_DATA,
        numberItemsPerPage: 2
    })

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('8. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>();
    storeDataDisplay.setOptions({
        currentPage: 1,
        itemsList: TEST_DATA,
        //@ts-ignore
        numberItemsPerPage: 'numberItemsPerPage'
    });

    expect(storeDataDisplay.pagination.numberItemsPerPage).toStrictEqual(0);
});

test('9. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>();
    storeDataDisplay.setOptions({
        itemsList: TEST_DATA,
        //@ts-ignore
        currentPage: 'currentPage',
        //@ts-ignore
        numberItemsPerPage: 'numberItemsPerPage'
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('10. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>();
    storeDataDisplay.setOptions({
        itemsList: TEST_DATA,
        currentPage: Infinity,
        numberItemsPerPage: 2
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('11. wrong data type', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>();
    storeDataDisplay.setOptions({
        itemsList: TEST_DATA,
        currentPage: -Infinity,
        numberItemsPerPage: 2
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});


test('1. maxPages', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.maxPages).toStrictEqual(5);
});

test('2. maxPages', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.maxPages).toStrictEqual(4);
});

test('3. maxPages', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 5,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.maxPages).toStrictEqual(2);
});

test('4. maxPages', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [],
        numberItemsPerPage: 5,
        currentPage: 2
    });

    expect(storeDataDisplay.pagination.maxPages).toStrictEqual(0);
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

test('1. eventShowNextPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[8], TEST_DATA[9]]);
});

test('2. eventShowNextPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(3);
});

test('3. eventShowNextPage', () => {
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

test('4. eventShowNextPage', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [],
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();
    storeDataDisplay.eventShowNextPage();

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(0);
});



test('1. eventShowPrevPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowPrevPage();

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1], TEST_DATA[2], TEST_DATA[3]]);
});

test('2. eventShowPrevPage', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowPrevPage();

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('3. eventShowPrevPage', () => {
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

test('4. eventShowPrevPage', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [],
        numberItemsPerPage: 4,
        currentPage: 2
    });

    storeDataDisplay.eventShowPrevPage();
    storeDataDisplay.eventShowPrevPage();
    storeDataDisplay.eventShowPrevPage();

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(0);
});


test('1. setOptions', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        numberItemsPerPage: 2
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[4], TEST_DATA[5]]);
});

test('2. setOptions', () => {
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

test('3. setOptions', () => {
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

test('4. setOptions', () => {
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

test('5. setOptions1', () => {
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

test('6. setOptions', () => {
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

test('7. setOptions', () => {
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

test('8. setOptions', () => {
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

test('9. setOptions', () => {
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

test('10. setOptions', () => {
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

test('11. setOptions', () => {
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

test('12. setOptions', () => {
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

test('13. setOptions', () => {
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

test('14. setOptions', () => {
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

test('15. setOptions', () => {
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

test('16. setOptions', () => {
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

test('17. setOptions', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        numberItemsPerPage: 5
    });

    storeDataDisplay.setOptions({
        numberItemsPerPage: 3
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(2);
});

test('18. setOptions', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: GET_TEST_DATA(),
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        itemsList: [],
    });

    storeDataDisplay.setOptions({
        itemsList: GET_TEST_DATA()
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('19. setOptions', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: GET_TEST_DATA(),
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        numberItemsPerPage: 'all',
    });
    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('20. setOptions', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: GET_TEST_DATA(),
        numberItemsPerPage: 2,
        currentPage: 3
    });

    storeDataDisplay.setOptions({
        numberItemsPerPage: 'all',
    });
    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual(GET_TEST_DATA());
});

test('21. setOptions', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: GET_TEST_DATA(),
        numberItemsPerPage: 2,
        currentPage: NaN
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});


test('1. dataStatus', () => {
    const TEST_DATA = GET_TEST_DATA();

    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 2,
        currentPage: 3
    });

    expect(storeDataDisplay.dataStatus).toStrictEqual('installed');
});

test('2. dataStatus', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: [],
        numberItemsPerPage: 2,
        currentPage: 3
    });

    expect(storeDataDisplay.dataStatus).toStrictEqual('notSet');
});

test('3. dataStatus', () => {
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

test('1. destroy', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 1
    });
    storeDataDisplay.destroy();
    expect(storeDataDisplay.dataStatus).toStrictEqual('notSet');
});

test('2. destroy', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        itemsList: TEST_DATA,
        numberItemsPerPage: 3,
        currentPage: 1
    });

    storeDataDisplay.destroy();
    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([]);
});

test('1. firstPage', () => {
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

test('2. firstPage', () => {
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

test('3. firstPage', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 'firstPage',
        numberItemsPerPage: 2,
        itemsList: TEST_DATA
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[0], TEST_DATA[1]]);
});

test('4. firstPage', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 'firstPage',
        numberItemsPerPage: 2,
        itemsList: TEST_DATA
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('1. lastPage', () => {
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

test('2. lastPage', () => {
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

test('3. lastPage', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 'lastPage',
        numberItemsPerPage: 2,
        itemsList: TEST_DATA
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual([TEST_DATA[8], TEST_DATA[9]]);
});

test('4. lastPage', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 'lastPage',
        numberItemsPerPage: 2,
        itemsList: TEST_DATA
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(5);
});

test('1. numberItemsPerPage all', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 'all',
        itemsList: GET_TEST_DATA()
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual(GET_TEST_DATA());
});

test('2. numberItemsPerPage all', () => {
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>({
        currentPage: 3,
        numberItemsPerPage: 'all',
        itemsList: GET_TEST_DATA()
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});

test('3. numberItemsPerPage all', () => {
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

test('4. numberItemsPerPage all', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>();

    storeDataDisplay.setOptions({
        currentPage: 3,
        numberItemsPerPage: 'all',
        itemsList: TEST_DATA
    });

    expect(storeDataDisplay.pagination.itemsOnCurrentPage).toStrictEqual(TEST_DATA);
});

test('5. numberItemsPerPage all', () => {
    const TEST_DATA = GET_TEST_DATA();
    const storeDataDisplay: StoreDisplayedData<TestDataType> = new StoreDisplayedData<TestDataType>();

    storeDataDisplay.setOptions({
        currentPage: 3,
        numberItemsPerPage: 'all',
        itemsList: TEST_DATA
    });

    storeDataDisplay.setOptions({
        itemsList: TEST_DATA
    });

    expect(storeDataDisplay.pagination.currentPage).toStrictEqual(1);
});