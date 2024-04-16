import { action, computed, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { ParamsPopupWindowAlert, ParamsPopupWindowConfirm, ParamsPopupWindowLoading } from ".";

type MakePropertyOptional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] };

type BasePopupWindow<TPopupWindowType extends string, TParams> = {
    readonly popupWindowType: TPopupWindowType;
    readonly popupWindowParams: TParams;
}

type Alert<TParams extends ParamsPopupWindowAlert> = BasePopupWindow<'alert', TParams>;
type Confirm<TParams extends ParamsPopupWindowConfirm> = BasePopupWindow<'confirm', TParams>;
type Loading<TParams extends ParamsPopupWindowLoading> = BasePopupWindow<'loading', TParams>;

type PopupWindows<TParamsAlert extends ParamsPopupWindowAlert,
    TParamsConfirm extends ParamsPopupWindowConfirm,
    TParamsLoading extends ParamsPopupWindowLoading> =
    Alert<TParamsAlert> | Confirm<TParamsConfirm> | Loading<TParamsLoading>;

type SetAlertParams<TParams extends ParamsPopupWindowAlert> = Omit<MakePropertyOptional<TParams, 'eventClose'>, 'popupId'>;
type SetConfirmParams<TParams extends ParamsPopupWindowConfirm> = Omit<MakePropertyOptional<TParams, 'eventCancel'>, 'popupId'>;
type SetLoadingParams<TParams extends ParamsPopupWindowLoading> = Omit<TParams, 'popupId'>;

export default class StorePopupWindows<TParamsAlert extends ParamsPopupWindowAlert, TParamsConfirm extends ParamsPopupWindowConfirm, TParamsLoading extends ParamsPopupWindowLoading> {
    /**
     * Очередь окон
     */
    private _queuePopupWindows: PopupWindows<TParamsAlert, TParamsConfirm, TParamsLoading>[];

    //#region openPopupWindow
    /**
     * Текущее открытое всплывающее окно
     */
    private _openPopupWindow_observable?: PopupWindows<TParamsAlert, TParamsConfirm, TParamsLoading>;

    /**
     * Текущее открытое всплывающее окно
     */
    get currentOpen(): PopupWindows<TParamsAlert, TParamsConfirm, TParamsLoading> | undefined {
        return this._openPopupWindow_observable;
    }

    /**
     * Установить текущее открытое всплывающее окно
     * @param popup 
     */
    private _setOpenPopupWindow(popup: PopupWindows<TParamsAlert, TParamsConfirm, TParamsLoading>) {
        if (!popup) {
            return;
        }

        if (this._openPopupWindow_observable) {
            // Окно еще открыто, кладем диалог в очередь и выходим
            this._queuePopupWindows.push(popup);
            return;
        }

        this._openPopupWindow_observable = popup;
    }

    /**
     * Закрыть текущее открытое окно
     * @returns 
     */
    private _closeActive() {
        if (!this._openPopupWindow_observable) {
            // Окно не открыто, выходим
            return;
        }

        if (!Array.isArray(this._queuePopupWindows)) {
            // С очередью, что-то не так, закрываем окно и выходим
            this._openPopupWindow_observable = undefined;
            return;
        }

        if (!this._queuePopupWindows.length) {
            // Очередь пустая, просто закрываем окно и выходим
            this._openPopupWindow_observable = undefined;
            return;
        }

        // Получаем окно из очереди
        const popupFromQueue = this._queuePopupWindows.shift();

        if (popupFromQueue) {
            // Показываем окно из очереди
            this._openPopupWindow_observable = popupFromQueue;
        } else {
            // В очереди пусто, закрываем окно
            this._openPopupWindow_observable = undefined;
        }
    }

    private _closeById(popupId: string): boolean {
        const popupThatNeedsClosedId: string = this._validationString(popupId);

        // Проверяем текущее открытое окно
        if (this._openPopupWindow_observable) {
            const openCurrentPopupId = this._validationString(this._openPopupWindow_observable?.popupWindowParams?.popupId);
            if (openCurrentPopupId === popupThatNeedsClosedId) {
                // Окно из очереди
                let popupFromQueue: PopupWindows<TParamsAlert, TParamsConfirm, TParamsLoading> | undefined = undefined;

                if (Array.isArray(this._queuePopupWindows)) {
                    if (this._queuePopupWindows.length) {
                        // Получаем окно из очереди
                        popupFromQueue = this._queuePopupWindows.shift();
                    }
                }

                if (popupFromQueue) {
                    this._openPopupWindow_observable = popupFromQueue;
                } else {
                    this._openPopupWindow_observable = undefined;
                }

                return true;
            }
        }

        // Ищем в очереди окон
        if (Array.isArray(this._queuePopupWindows)) {
            if (this._queuePopupWindows.length) {
                const index: number = this._queuePopupWindows.findIndex((p) => p.popupWindowParams.popupId === popupThatNeedsClosedId);

                if (index > -1) {
                    this._queuePopupWindows.splice(index, 1);
                    return true;
                }
            }
        }

        return false;
    }
    //#endregion

    //#region helpers

    /**
     * Проверить строку
     */
    private _validationString(str: string | undefined | null): string {
        if (typeof str !== 'string') {
            return '';
        }

        if (!str) {
            return '';
        }

        return str;
    }

    private _validationInputParams(params?: SetAlertParams<TParamsAlert> | SetConfirmParams<TParamsConfirm> | SetLoadingParams<TParamsLoading> | undefined | null): boolean {
        if (!params) {
            return false;;
        }

        if (Array.isArray(params)) {
            return false;
        }

        if (typeof params !== 'object') {
            return false;
        }

        return true;
    }
    //#endregion

    //#region Установить значения
    /**
     * Открыть окно alert
     * Вернет popupId
     * Если не передать eventCancel, событие закрытия будет установлено автоматически (closeById)
     * @param params 
     */
    public setAlert(params: SetAlertParams<TParamsAlert>): string {
        if (!this._validationInputParams(params)) {
            return '';
        }

        const popupId: string = uuidv4();

        this._setOpenPopupWindow({
            popupWindowType: 'alert',
            popupWindowParams: {
                ...params,
                popupId: popupId,
                text: this._validationString(params.text),
                eventClose: (typeof params.eventClose === 'function') ?
                    params.eventClose : () => {
                        this._closeById(popupId);
                    },
            } as TParamsAlert
        });

        return popupId;
    }

    /**
     * Открыть окно confirm
     * Вернет popupId
     * Если не передать eventCancel, событие закрытия будет установлено автоматически (closeById)
     * Событие eventConfirm будет модернизировано, после срабатывания переданного eventConfirm будет вызвано закрытие окна
     * @param params 
     */
    public setConfirm(params: SetConfirmParams<TParamsConfirm>): string {
        if (!this._validationInputParams(params)) {
            return '';
        }

        const popupId = uuidv4();

        this._setOpenPopupWindow({
            popupWindowType: 'confirm',
            popupWindowParams: {
                ...params,
                popupId: popupId,
                text: this._validationString(params.text),
                eventConfirm: () => {
                    // Вызываем событие confirm
                    params.eventConfirm();
                    // Закрываем текущее закрытое окно
                    this._closeById(popupId);
                },
                eventCancel: (typeof params.eventCancel === 'function') ?
                    params.eventCancel :
                    () => {
                        this._closeById(popupId);
                    }
            } as TParamsConfirm
        });

        return popupId;
    }

    /**
     * Открыть окно loading
     * Вернет popupId
     * @param params 
     */
    public setLoading(params: SetLoadingParams<TParamsLoading>): string {
        if (!this._validationInputParams(params)) {
            return '';
        }

        const popupId = uuidv4();
        this._setOpenPopupWindow({
            popupWindowType: 'loading',
            popupWindowParams: {
                ...params,
                popupId: popupId,
                text: this._validationString(params.text)
            } as TParamsLoading
        });

        return popupId;
    }
    //#endregion

    //#region Закрыть окно
    /**
     * Закрыть текущее открытое окно
     * Если очередь не пустая, будет извлечено следующее окно из очереди
     */
    public closeActive() {
        this._closeActive();
    }

    /**
     * Закрыть все окна
     * Активное открытое окно будет закрыто
     * Очередь будет очищена
     */
    public closeAll() {
        // Очищаем очередь
        this._queuePopupWindows = [];
        // Закрываем текущее открытое окно
        this._closeActive();
    }

    /**
     * Закрыть конкретное окно, используя его popupId
     * @param popupId 
     */
    public closeById(popupId: string): boolean {
        return this._closeById(popupId);
    }
    //#endregion

    constructor() {
        this._openPopupWindow_observable = undefined;
        this._queuePopupWindows = [];

        this.closeActive = this.closeActive.bind(this);
        this.closeAll = this.closeAll.bind(this);

        makeObservable<this,
            '_openPopupWindow_observable'
            | '_closeActive'
            | '_closeById'
            | '_setOpenPopupWindow'
        >(this, {
            _openPopupWindow_observable: observable.ref,
            _setOpenPopupWindow: action,
            _closeActive: action,
            _closeById: action,
            currentOpen: computed,
        });
    }
}