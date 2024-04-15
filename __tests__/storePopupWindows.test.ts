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

    if(store.currentOpen?.popupWindowType === 'alert') {
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

    if(store.currentOpen?.popupWindowType === 'alert') {
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

    if(store.currentOpen?.popupWindowType === 'alert') {
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
    const popupId2 =  store.setAlert(alertParams2);
    const popupId3 = store.setAlert(alertParams3);
    store.closeById(popupId2);
    store.closeActive();

    let result: AlertParams | undefined = undefined;

    if(store.currentOpen?.popupWindowType === 'alert') {
        result = {
            testAlertBooloean: store.currentOpen.popupWindowParams.testAlertBooloean,
            testAlertNumber: store.currentOpen.popupWindowParams.testAlertNumber,
            testAlertString: store.currentOpen.popupWindowParams.testAlertString,
            text: store.currentOpen.popupWindowParams.text
        };
    }

    expect(result).toStrictEqual(alertParams3);
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
        eventConfirm: undefined as any
    };
    
    store.setConfirm(confirmParams);

    let result: ConfirmParams | undefined = undefined;

    if(store.currentOpen?.popupWindowType === 'confirm') {
        result = {
            text: store.currentOpen.popupWindowParams.text,
            testConfirmBooloean: store.currentOpen.popupWindowParams.testConfirmBooloean,
            testConfirmNumber: store.currentOpen.popupWindowParams.testConfirmNumber,
            testConfirmString: store.currentOpen.popupWindowParams.testConfirmString,
            eventConfirm: undefined as any
        };
    }

    console.log(result)
    console.log(confirmParams)

    expect(result).toStrictEqual(confirmParams);
});

// test('confirm setConfirm 3', () => {
//     const store = CREATE_TEST_STORE();

//     const alertParams: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         testAlertBooloean: false,
//         testAlertNumber: 1,
//         testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
//     };
    
//     store.setConfirm(alertParams);

//     store.setConfirm({
//         text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
//         testAlertBooloean: true,
//         testAlertNumber: 2,
//         testAlertString: 'Consectetur libero id faucibus nisl tincidunt eget',
//     });

//     store.setConfirm({
//         text: 'Ultrices neque ornare aenean euismod elementum nisi',
//         testAlertBooloean: false,
//         testAlertNumber: 3,
//         testAlertString: 'Nisl tincidunt eget nullam non nisi est sit',
//     });

//     let result: Parameters<typeof store['setConfirm']>[number] | undefined = undefined;

//     if(store.currentOpen?.popupWindowType === 'alert') {
//         result = {
//             testAlertBooloean: store.currentOpen.popupWindowParams.testAlertBooloean,
//             testAlertNumber: store.currentOpen.popupWindowParams.testAlertNumber,
//             testAlertString: store.currentOpen.popupWindowParams.testAlertString,
//             text: store.currentOpen.popupWindowParams.text
//         };
//     }

//     expect(result).toStrictEqual(alertParams);
// });

// test('confirm closeActive 1', () => {
//     const store = CREATE_TEST_STORE();

//     const alertParams: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         testAlertBooloean: false,
//         testAlertNumber: 5,
//         testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
//     };

//     store.setConfirm(alertParams);
//     store.closeActive();

//     expect(store.currentOpen).toStrictEqual(undefined);
// });

// test('confirm closeActive 2', () => {
//     const store = CREATE_TEST_STORE();

//     const alertParams1: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         testAlertBooloean: false,
//         testAlertNumber: 1,
//         testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
//     };

//     const alertParams2: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
//         testAlertBooloean: true,
//         testAlertNumber: 2,
//         testAlertString: 'Consectetur libero id faucibus nisl tincidunt eget',
//     };

//     const alertParams3: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Ultrices neque ornare aenean euismod elementum nisi',
//         testAlertBooloean: false,
//         testAlertNumber: 3,
//         testAlertString: 'Nisl tincidunt eget nullam non nisi est sit',
//     };

//     store.setAlert(alertParams1);
//     store.setAlert(alertParams2);
//     store.setAlert(alertParams3);
//     store.closeActive();

//     let result: Parameters<typeof store['setConfirm']>[number] | undefined = undefined;

//     if(store.currentOpen?.popupWindowType === 'alert') {
//         result = {
//             testAlertBooloean: store.currentOpen.popupWindowParams.testAlertBooloean,
//             testAlertNumber: store.currentOpen.popupWindowParams.testAlertNumber,
//             testAlertString: store.currentOpen.popupWindowParams.testAlertString,
//             text: store.currentOpen.popupWindowParams.text
//         };
//     }

//     expect(result).toStrictEqual(alertParams2);
// });

// test('confirm closeAll 1', () => {
//     const store = CREATE_TEST_STORE();

//     const alertParams: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         testAlertBooloean: false,
//         testAlertNumber: 5,
//         testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
//     };

//     store.setConfirm(alertParams);
//     store.closeAll();
//     expect(store.currentOpen).toStrictEqual(undefined);
// });

// test('confirm closeAll 2', () => {
//     const store = CREATE_TEST_STORE();

//     const alertParams1: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         testAlertBooloean: false,
//         testAlertNumber: 1,
//         testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
//     };

//     const alertParams2: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
//         testAlertBooloean: true,
//         testAlertNumber: 2,
//         testAlertString: 'Consectetur libero id faucibus nisl tincidunt eget',
//     };

//     const alertParams3: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Ultrices neque ornare aenean euismod elementum nisi',
//         testAlertBooloean: false,
//         testAlertNumber: 3,
//         testAlertString: 'Nisl tincidunt eget nullam non nisi est sit',
//     };

//     store.setConfirm(alertParams1);
//     store.setConfirm(alertParams2);
//     store.setConfirm(alertParams3);

//     store.closeAll();
//     expect(store.currentOpen).toStrictEqual(undefined);
// });

// test('confirm closeById 1', () => {
//     const store = CREATE_TEST_STORE();

//     const alertParams: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         testAlertBooloean: false,
//         testAlertNumber: 5,
//         testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
//     };

//     const popupId = store.setAlsetConfirmert(alertParams);
//     store.closeById(popupId);
//     expect(store.currentOpen).toStrictEqual(undefined);
// });

// test('confirm closeById 2', () => {
//     const store = CREATE_TEST_STORE();

//     const alertParams1: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         testAlertBooloean: false,
//         testAlertNumber: 1,
//         testAlertString: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
//     };

//     const alertParams2: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Est ultricies integer quis auctor elit sed vulputate mi sit',
//         testAlertBooloean: true,
//         testAlertNumber: 2,
//         testAlertString: 'Consectetur libero id faucibus nisl tincidunt eget',
//     };

//     const alertParams3: Parameters<typeof store['setConfirm']>[number] = {
//         text: 'Ultrices neque ornare aenean euismod elementum nisi',
//         testAlertBooloean: false,
//         testAlertNumber: 3,
//         testAlertString: 'Nisl tincidunt eget nullam non nisi est sit',
//     };

//     const popupId1 = store.setAlert(alertParams1);
//     const popupId2 =  store.setAlert(alertParams2);
//     const popupId3 = store.setAlert(alertParams3);
//     store.closeById(popupId2);
//     store.closeActive();

//     let result: Parameters<typeof store['setConfirm']>[number] | undefined = undefined;

//     if(store.currentOpen?.popupWindowType === 'alert') {
//         result = {
//             testAlertBooloean: store.currentOpen.popupWindowParams.testAlertBooloean,
//             testAlertNumber: store.currentOpen.popupWindowParams.testAlertNumber,
//             testAlertString: store.currentOpen.popupWindowParams.testAlertString,
//             text: store.currentOpen.popupWindowParams.text
//         };
//     }

//     expect(result).toStrictEqual(alertParams3);
// });

//#endregion






