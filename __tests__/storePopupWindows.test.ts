import { ParamsPopupWindowAlert, ParamsPopupWindowConfirm, ParamsPopupWindowLoading, StorePopupWindows } from "../src";

interface AlertProps extends ParamsPopupWindowAlert {
    readonly testAlertString: string;
    readonly testAlertNumber: number;
    readonly testAlertBooloean: boolean;
}

interface ConfirmProps extends ParamsPopupWindowConfirm {
    readonly testConfirmString: string;
    readonly testConfirmNumber: number;
    readonly testConfirmBooloean: boolean;
}

interface LoadingProps extends ParamsPopupWindowLoading {
    readonly testLoadingString: string;
    readonly testLoadingNumber: number;
    readonly testLoadingBooloean: boolean;
}

type AlertParams = Parameters<StorePopupWindows<AlertProps, ConfirmProps, LoadingProps>['setAlert']>[number];
type ConfirmParams = Parameters<StorePopupWindows<AlertProps, ConfirmProps, LoadingProps>['setConfirm']>[number];
type LoadingParams = Parameters<StorePopupWindows<AlertProps, ConfirmProps, LoadingProps>['setLoading']>[number];

function CREATE_TEST_STORE(): StorePopupWindows<AlertProps, ConfirmProps, LoadingProps> {
    return new StorePopupWindows<AlertProps, ConfirmProps, LoadingProps>();
}

//#region alert
test('alert setAlert wrong type number', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setAlert(0);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert setAlert wrong type string', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setAlert('test');
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert setAlert wrong type array', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setAlert([1, 2, 3]);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert setAlert wrong type undefined', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setAlert(undefined);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert setAlert wrong type null', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setAlert(null);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert setAlert 1', () => {
    const store = CREATE_TEST_STORE();

    const alertParams: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 5,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setAlert(alertParams);
    expect(store.currentOpen?.popupWindowType).toStrictEqual('alert');
});

test('alert setAlert 2', () => {
    const store = CREATE_TEST_STORE();

    const alertParams: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 5,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setAlert(alertParams);

    let result: AlertParams | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'alert') {
        result = {
            testAlertBooloean: store.currentOpen.popupWindowParams.testAlertBooloean,
            testAlertNumber: store.currentOpen.popupWindowParams.testAlertNumber,
            testAlertString: store.currentOpen.popupWindowParams.testAlertString,
            text: store.currentOpen.popupWindowParams.text
        };
    }

    expect(result).toStrictEqual(alertParams);
});

test('alert setAlert 3', () => {
    const store = CREATE_TEST_STORE();

    const alertParams: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 1,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setAlert(alertParams);

    store.setAlert({
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testAlertBooloean: true,
        testAlertNumber: 2,
        testAlertString: 'Consectetur libero id faucibus nisl tincidunt eget',
    });

    store.setAlert({
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testAlertBooloean: false,
        testAlertNumber: 3,
        testAlertString: 'Nisl tincidunt eget nullam non nisi est sit',
    });

    let result: AlertParams | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'alert') {
        result = {
            testAlertBooloean: store.currentOpen.popupWindowParams.testAlertBooloean,
            testAlertNumber: store.currentOpen.popupWindowParams.testAlertNumber,
            testAlertString: store.currentOpen.popupWindowParams.testAlertString,
            text: store.currentOpen.popupWindowParams.text
        };
    }

    expect(result).toStrictEqual(alertParams);
});

test('alert closeActive 1', () => {
    const store = CREATE_TEST_STORE();

    const alertParams: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 5,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setAlert(alertParams);
    store.closeActive();

    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert closeActive 2', () => {
    const store = CREATE_TEST_STORE();

    const alertParams1: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 1,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const alertParams2: AlertParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testAlertBooloean: true,
        testAlertNumber: 2,
        testAlertString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const alertParams3: AlertParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testAlertBooloean: false,
        testAlertNumber: 3,
        testAlertString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    store.setAlert(alertParams1);
    store.setAlert(alertParams2);
    store.setAlert(alertParams3);
    store.closeActive();

    let result: AlertParams | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'alert') {
        result = {
            testAlertBooloean: store.currentOpen.popupWindowParams.testAlertBooloean,
            testAlertNumber: store.currentOpen.popupWindowParams.testAlertNumber,
            testAlertString: store.currentOpen.popupWindowParams.testAlertString,
            text: store.currentOpen.popupWindowParams.text
        };
    }

    expect(result).toStrictEqual(alertParams2);
});

test('alert closeAll 1', () => {
    const store = CREATE_TEST_STORE();

    const alertParams: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 5,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setAlert(alertParams);
    store.closeAll();
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert closeAll 2', () => {
    const store = CREATE_TEST_STORE();

    const alertParams1: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 1,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const alertParams2: AlertParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testAlertBooloean: true,
        testAlertNumber: 2,
        testAlertString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const alertParams3: AlertParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testAlertBooloean: false,
        testAlertNumber: 3,
        testAlertString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    store.setAlert(alertParams1);
    store.setAlert(alertParams2);
    store.setAlert(alertParams3);

    store.closeAll();
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert closeById 1', () => {
    const store = CREATE_TEST_STORE();

    const alertParams: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 5,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const popupId = store.setAlert(alertParams);
    store.closeById(popupId);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('alert closeById 2', () => {
    const store = CREATE_TEST_STORE();

    const alertParams1: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 1,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const alertParams2: AlertParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testAlertBooloean: true,
        testAlertNumber: 2,
        testAlertString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const alertParams3: AlertParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testAlertBooloean: false,
        testAlertNumber: 3,
        testAlertString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    const popupId1 = store.setAlert(alertParams1);
    const popupId2 = store.setAlert(alertParams2);
    const popupId3 = store.setAlert(alertParams3);
    store.closeById(popupId2);
    store.closeActive();

    let result: AlertParams | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'alert') {
        result = {
            testAlertBooloean: store.currentOpen.popupWindowParams.testAlertBooloean,
            testAlertNumber: store.currentOpen.popupWindowParams.testAlertNumber,
            testAlertString: store.currentOpen.popupWindowParams.testAlertString,
            text: store.currentOpen.popupWindowParams.text
        };
    }

    expect(result).toStrictEqual(alertParams3);
});

test('alert eventClose', () => {
    const store = CREATE_TEST_STORE();

    const alertParams: AlertParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testAlertBooloean: false,
        testAlertNumber: 5,
        testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setAlert(alertParams);

    if (store.currentOpen?.popupWindowType === 'alert') {
        store.currentOpen.popupWindowParams.eventClose();
    }

    expect(store.currentOpen).toStrictEqual(undefined);
});
//#endregion

//#region confirm
test('confirm setConfirm wrong type number', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setConfirm(0);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm setConfirm wrong type string', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setConfirm('test');
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm setConfirm wrong type array', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setConfirm([1, 2, 3]);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm setConfirm wrong type undefined', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setConfirm(undefined);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm setConfirm wrong type null', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setConfirm(null);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm setConfirm 1', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 5,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams);
    expect(store.currentOpen?.popupWindowType).toStrictEqual('confirm');
});

test('confirm setConfirm 2', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 5,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams);

    let result: Omit<ConfirmParams, 'eventConfirm'> | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'confirm') {
        result = {
            text: store.currentOpen.popupWindowParams.text,
            testConfirmBooloean: store.currentOpen.popupWindowParams.testConfirmBooloean,
            testConfirmNumber: store.currentOpen.popupWindowParams.testConfirmNumber,
            testConfirmString: store.currentOpen.popupWindowParams.testConfirmString,
        };
    }

    const { eventConfirm, ...confirmParamsForComparison } = confirmParams;
    expect(result).toStrictEqual(confirmParamsForComparison);
});

test('confirm setConfirm 3', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams1: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 1,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    const confirmParams2: ConfirmParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testConfirmBooloean: true,
        testConfirmNumber: 2,
        testConfirmString: 'Consectetur libero id faucibus nisl tincidunt eget',
        eventConfirm: () => { }
    };

    const confirmParams3: ConfirmParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testConfirmBooloean: false,
        testConfirmNumber: 3,
        testConfirmString: 'Nisl tincidunt eget nullam non nisi est sit',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams1);
    store.setConfirm(confirmParams2);
    store.setConfirm(confirmParams3);

    let result: Omit<ConfirmParams, 'eventConfirm'> | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'confirm') {
        result = {
            text: store.currentOpen.popupWindowParams.text,
            testConfirmBooloean: store.currentOpen.popupWindowParams.testConfirmBooloean,
            testConfirmNumber: store.currentOpen.popupWindowParams.testConfirmNumber,
            testConfirmString: store.currentOpen.popupWindowParams.testConfirmString,
        };
    }

    const { eventConfirm, ...confirmParamsForComparison } = confirmParams1;

    expect(result).toStrictEqual(confirmParamsForComparison);
});

test('confirm closeActive 1', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams1: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 1,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams1);
    store.closeActive();

    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm closeActive 2', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams1: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 1,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    const confirmParams2: ConfirmParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testConfirmBooloean: true,
        testConfirmNumber: 2,
        testConfirmString: 'Consectetur libero id faucibus nisl tincidunt eget',
        eventConfirm: () => { }
    };

    const confirmParams3: ConfirmParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testConfirmBooloean: false,
        testConfirmNumber: 3,
        testConfirmString: 'Nisl tincidunt eget nullam non nisi est sit',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams1);
    store.setConfirm(confirmParams2);
    store.setConfirm(confirmParams3);
    store.closeActive();

    let result: Omit<ConfirmParams, 'eventConfirm'> | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'confirm') {
        result = {
            text: store.currentOpen.popupWindowParams.text,
            testConfirmBooloean: store.currentOpen.popupWindowParams.testConfirmBooloean,
            testConfirmNumber: store.currentOpen.popupWindowParams.testConfirmNumber,
            testConfirmString: store.currentOpen.popupWindowParams.testConfirmString,
        };
    }

    const { eventConfirm, ...confirmParamsForComparison } = confirmParams2;
    expect(result).toStrictEqual(confirmParamsForComparison);
});

test('confirm closeAll 1', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams1: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 1,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams1);
    store.closeAll();

    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm closeAll 2', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams1: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 1,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    const confirmParams2: ConfirmParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testConfirmBooloean: true,
        testConfirmNumber: 2,
        testConfirmString: 'Consectetur libero id faucibus nisl tincidunt eget',
        eventConfirm: () => { }
    };

    const confirmParams3: ConfirmParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testConfirmBooloean: false,
        testConfirmNumber: 3,
        testConfirmString: 'Nisl tincidunt eget nullam non nisi est sit',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams1);
    store.setConfirm(confirmParams2);
    store.setConfirm(confirmParams3);
    store.closeAll();

    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm closeById 1', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams1: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 1,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    const popupId = store.setConfirm(confirmParams1);
    store.closeById(popupId);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm closeById 2', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams1: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 1,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    const confirmParams2: ConfirmParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testConfirmBooloean: true,
        testConfirmNumber: 2,
        testConfirmString: 'Consectetur libero id faucibus nisl tincidunt eget',
        eventConfirm: () => { }
    };

    const confirmParams3: ConfirmParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testConfirmBooloean: false,
        testConfirmNumber: 3,
        testConfirmString: 'Nisl tincidunt eget nullam non nisi est sit',
        eventConfirm: () => { }
    };

    const popupId1 = store.setConfirm(confirmParams1);
    const popupId2 = store.setConfirm(confirmParams2);
    const popupId3 = store.setConfirm(confirmParams3);
    store.closeById(popupId2);
    store.closeActive();

    let result: Omit<ConfirmParams, 'eventConfirm'> | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'confirm') {
        result = {
            text: store.currentOpen.popupWindowParams.text,
            testConfirmBooloean: store.currentOpen.popupWindowParams.testConfirmBooloean,
            testConfirmNumber: store.currentOpen.popupWindowParams.testConfirmNumber,
            testConfirmString: store.currentOpen.popupWindowParams.testConfirmString,
        };
    }

    const { eventConfirm, ...confirmParamsForComparison } = confirmParams3;
    expect(result).toStrictEqual(confirmParamsForComparison);
});

test('confirm eventCancel', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 5,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams);

    if (store.currentOpen?.popupWindowType === 'confirm') {
        store.currentOpen.popupWindowParams.eventCancel();
    }

    expect(store.currentOpen).toStrictEqual(undefined);
});

test('confirm eventConfirm', () => {
    const store = CREATE_TEST_STORE();

    const confirmParams: ConfirmParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testConfirmBooloean: false,
        testConfirmNumber: 5,
        testConfirmString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
        eventConfirm: () => { }
    };

    store.setConfirm(confirmParams);

    if (store.currentOpen?.popupWindowType === 'confirm') {
        store.currentOpen.popupWindowParams.eventConfirm();
    }

    expect(store.currentOpen).toStrictEqual(undefined);
});
//#endregion

//#region loading
test('loading setLoading wrong type number', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setLoading(0);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading setLoading wrong type string', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setLoading('test');
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading setLoading wrong type array', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setLoading([1, 2, 3]);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading setConfirm wrong type undefined', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setLoading(undefined);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading setLoading wrong type null', () => {
    const store = CREATE_TEST_STORE();
    //@ts-ignore
    store.setLoading(null);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading setLoading 1', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 5,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setLoading(loadingParams);
    expect(store.currentOpen?.popupWindowType).toStrictEqual('loading');
});

test('loading setLoading 2', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 5,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setLoading(loadingParams);

    let result: Omit<LoadingParams, 'popupId'> | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'loading') {
        result = {
            testLoadingBooloean: store.currentOpen.popupWindowParams.testLoadingBooloean,
            testLoadingNumber: store.currentOpen.popupWindowParams.testLoadingNumber,
            testLoadingString: store.currentOpen.popupWindowParams.testLoadingString,
            text: store.currentOpen.popupWindowParams.text,
        }
    }

    expect(result).toStrictEqual(loadingParams);
});

test('loading setLoading 3', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const loadingParams2: LoadingParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testLoadingBooloean: true,
        testLoadingNumber: 2,
        testLoadingString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const loadingParams3: LoadingParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testLoadingBooloean: false,
        testLoadingNumber: 3,
        testLoadingString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    store.setLoading(loadingParams1);
    store.setLoading(loadingParams2);
    store.setLoading(loadingParams3);

    let result: Omit<LoadingParams, 'popupId'> | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'loading') {
        result = {
            testLoadingBooloean: store.currentOpen.popupWindowParams.testLoadingBooloean,
            testLoadingNumber: store.currentOpen.popupWindowParams.testLoadingNumber,
            testLoadingString: store.currentOpen.popupWindowParams.testLoadingString,
            text: store.currentOpen.popupWindowParams.text,
        }
    }

    expect(result).toStrictEqual(loadingParams1);
});

test('loading closeActive 1', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setLoading(loadingParams1);
    store.closeActive();

    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading closeActive 2', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const loadingParams2: LoadingParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testLoadingBooloean: true,
        testLoadingNumber: 2,
        testLoadingString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const loadingParams3: LoadingParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testLoadingBooloean: false,
        testLoadingNumber: 3,
        testLoadingString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    store.setLoading(loadingParams1);
    store.setLoading(loadingParams2);
    store.setLoading(loadingParams3);
    store.closeActive();

    let result: Omit<LoadingParams, 'popupId'> | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'loading') {
        result = {
            testLoadingBooloean: store.currentOpen.popupWindowParams.testLoadingBooloean,
            testLoadingNumber: store.currentOpen.popupWindowParams.testLoadingNumber,
            testLoadingString: store.currentOpen.popupWindowParams.testLoadingString,
            text: store.currentOpen.popupWindowParams.text,
        }
    }

    expect(result).toStrictEqual(loadingParams2);
});

test('loading closeAll 1', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    store.setLoading(loadingParams1);
    store.closeActive();

    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading closeAll 2', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const loadingParams2: LoadingParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testLoadingBooloean: true,
        testLoadingNumber: 2,
        testLoadingString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const loadingParams3: LoadingParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testLoadingBooloean: false,
        testLoadingNumber: 3,
        testLoadingString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    store.setLoading(loadingParams1);
    store.setLoading(loadingParams2);
    store.setLoading(loadingParams3);
    store.closeAll();

    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading closeById 1', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const popupId = store.setLoading(loadingParams1);
    store.closeById(popupId);
    expect(store.currentOpen).toStrictEqual(undefined);
});

test('loading closeById 2', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const loadingParams2: LoadingParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testLoadingBooloean: true,
        testLoadingNumber: 2,
        testLoadingString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const loadingParams3: LoadingParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testLoadingBooloean: false,
        testLoadingNumber: 3,
        testLoadingString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    const popupId1 = store.setLoading(loadingParams1);
    const popupId2 = store.setLoading(loadingParams2);
    const popupId3 = store.setLoading(loadingParams3);
    store.closeById(popupId2);
    store.closeActive();

    let result: Omit<LoadingParams, 'popupId'> | undefined = undefined;

    if (store.currentOpen?.popupWindowType === 'loading') {
        result = {
            testLoadingBooloean: store.currentOpen.popupWindowParams.testLoadingBooloean,
            testLoadingNumber: store.currentOpen.popupWindowParams.testLoadingNumber,
            testLoadingString: store.currentOpen.popupWindowParams.testLoadingString,
            text: store.currentOpen.popupWindowParams.text,
        }
    }

    expect(result).toStrictEqual(loadingParams3);
});

//#endregion

//#region closeById
test('closeById wrong type undefined', () => {
    const store = CREATE_TEST_STORE();
    // @ts-ignore
    const result: boolean = store.closeById(undefined);
    expect(result).toStrictEqual(false);
});

test('closeById wrong type null', () => {
    const store = CREATE_TEST_STORE();
    // @ts-ignore
    const result: boolean = store.closeById(null);
    expect(result).toStrictEqual(false);
});

test('closeById wrong type array', () => {
    const store = CREATE_TEST_STORE();
    // @ts-ignore
    const result: boolean = store.closeById([]);
    expect(result).toStrictEqual(false);
});

test('closeById wrong type object', () => {
    const store = CREATE_TEST_STORE();
    // @ts-ignore
    const result: boolean = store.closeById({});
    expect(result).toStrictEqual(false);
});

test('closeById wrong type number', () => {
    const store = CREATE_TEST_STORE();
    // @ts-ignore
    const result: boolean = store.closeById(0);
    expect(result).toStrictEqual(false);
});

test('closeById wrong value empty string', () => {
    const store = CREATE_TEST_STORE();
    // @ts-ignore
    const result: boolean = store.closeById('');
    expect(result).toStrictEqual(false);
});

test('closeById 1', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const popupId = store.setLoading(loadingParams1);
    const result = store.closeById(popupId);
    expect(result).toStrictEqual(true);
});

test('closeById 2', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const loadingParams2: LoadingParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testLoadingBooloean: true,
        testLoadingNumber: 2,
        testLoadingString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const loadingParams3: LoadingParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testLoadingBooloean: false,
        testLoadingNumber: 3,
        testLoadingString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    const popupId1 = store.setLoading(loadingParams1);
    const popupId2 = store.setLoading(loadingParams2);
    const popupId3 = store.setLoading(loadingParams3);

    const result: boolean[] = [store.closeById(popupId2), store.closeById(popupId3), store.closeById(popupId1)]

    expect(result).toStrictEqual([true, true, true]);
});

test('closeById 3', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const loadingParams2: LoadingParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testLoadingBooloean: true,
        testLoadingNumber: 2,
        testLoadingString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const loadingParams3: LoadingParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testLoadingBooloean: false,
        testLoadingNumber: 3,
        testLoadingString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    const popupId1 = store.setLoading(loadingParams1);
    const popupId2 = store.setLoading(loadingParams2);
    const popupId3 = store.setLoading(loadingParams3);

    const result: boolean[] = [store.closeById(popupId1), store.closeById(popupId2), store.closeById(popupId3)];
    expect(result).toStrictEqual([true, true, true]);
});

test('closeById 4', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const loadingParams2: LoadingParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testLoadingBooloean: true,
        testLoadingNumber: 2,
        testLoadingString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const loadingParams3: LoadingParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testLoadingBooloean: false,
        testLoadingNumber: 3,
        testLoadingString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    const popupId1 = store.setLoading(loadingParams1);
    const popupId2 = store.setLoading(loadingParams2);
    const popupId3 = store.setLoading(loadingParams3);

    const result: boolean[] = [store.closeById(popupId2), store.closeById(popupId3), store.closeById(popupId2), store.closeById(popupId1), store.closeById(popupId3)];
    expect(result).toStrictEqual([true, true, false, true, false]);
});

test('closeById 5', () => {
    const store = CREATE_TEST_STORE();

    const loadingParams1: LoadingParams = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        testLoadingBooloean: false,
        testLoadingNumber: 1,
        testLoadingString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
    };

    const loadingParams2: LoadingParams = {
        text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
        testLoadingBooloean: true,
        testLoadingNumber: 2,
        testLoadingString: 'Consectetur libero id faucibus nisl tincidunt eget',
    };

    const loadingParams3: LoadingParams = {
        text: 'Ultrices neque ornare aenean euismod elementum nisi',
        testLoadingBooloean: false,
        testLoadingNumber: 3,
        testLoadingString: 'Nisl tincidunt eget nullam non nisi est sit',
    };

    const popupId1 = store.setLoading(loadingParams1);
    const popupId2 = store.setLoading(loadingParams2);
    const popupId3 = store.setLoading(loadingParams3);
    store.closeById(popupId1)

    let result1: Omit<LoadingParams, 'popupId'> | undefined = undefined;
    if (store.currentOpen?.popupWindowType === 'loading') {
        result1 = {
            testLoadingBooloean: store.currentOpen.popupWindowParams.testLoadingBooloean,
            testLoadingNumber: store.currentOpen.popupWindowParams.testLoadingNumber,
            testLoadingString: store.currentOpen.popupWindowParams.testLoadingString,
            text: store.currentOpen.popupWindowParams.text,
        }
    }

    let result2: Omit<LoadingParams, 'popupId'> | undefined = undefined;
    store.closeById(popupId2);

    if (store.currentOpen?.popupWindowType === 'loading') {
        result2 = {
            testLoadingBooloean: store.currentOpen.popupWindowParams.testLoadingBooloean,
            testLoadingNumber: store.currentOpen.popupWindowParams.testLoadingNumber,
            testLoadingString: store.currentOpen.popupWindowParams.testLoadingString,
            text: store.currentOpen.popupWindowParams.text,
        }
    }

    expect([result1, result2]).toStrictEqual([loadingParams2, loadingParams3]);
});
//#endregion

//#region other
test('closeActive empty', () => {
    const store = CREATE_TEST_STORE();
    const result = store.closeActive();
    expect(result).toStrictEqual(undefined);
});
//#endregion