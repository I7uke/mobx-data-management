import { action, computed, makeObservable, observable } from "mobx";
import { BaseStorePageContent } from "./models/baseStorePageContent";

export type InitBaseStoreDefaultContent = {
    readonly uniquePageKey: string;
}

export default abstract class AbstractStoreDefaultPageContent implements BaseStorePageContent {
    protected readonly _uniquePageKey: string;

    public getUniquePageKey(): string {
        return this._uniquePageKey;
    }

    //#region Ошибка
    private _error_observable: string | undefined;

    protected _setError(error: string) {
        if (typeof error !== 'string') {
            return;
        }

        if (!error) {
            return;
        }

        this._error_observable = error;
    }

    protected _removeError() {
        this._error_observable = undefined;
    }

    get error(): string | undefined {
        return this._error_observable;
    }
    //#endregion

    //#region Ссылка редиректа
    /**
     * Ссылка для перенаправления
     */
    private _redirectLink_observable: string | undefined;

    /**
     * Установить ссылку для перенаправления
     * @param link
     * @protected
     */
    protected _setRedirectLink(link: string) {
        if (typeof link !== 'string') {
            return;
        }

        if (!link) {
            return;
        }

        this._redirectLink_observable = link;
    }

    protected _removeRedirectLink() {
        this._redirectLink_observable = undefined;
    }

    /**
     * Ссылка для перенаправления
     */
    get redirectLink() {
        return this._redirectLink_observable;
    }
    //#endregion

    protected abstract _serverRequestGetInitData(): void;

    /**
    * Запрос на сервер, получить начальное состояние хранилища
    */
    public serverRequestGetInitData(): void {
        this._serverRequestGetInitData();
    }

    //#region beforeRemovingStore
    protected abstract _beforeRemovingStore(): void;

    /**
     * Вызывать перед удалением store
     */
    public beforeRemovingStore(): void {
        this._beforeRemovingStore();
    }
    //#endregion

    //#region init
    protected abstract _init(): void;

    /**
     * Вызывать для инициализации
     */
    public init(): void {
        this._init();
    }
    //#endregion

    constructor(initData: InitBaseStoreDefaultContent) {
        this.serverRequestGetInitData = this.serverRequestGetInitData.bind(this);
        this.beforeRemovingStore = this.beforeRemovingStore.bind(this);
        this.init = this.init.bind(this);
        this._redirectLink_observable = undefined;
        this._error_observable = undefined;
        this._uniquePageKey = initData.uniquePageKey;

        makeObservable<this,
            | '_redirectLink_observable'
            | '_setRedirectLink'
            | '_error_observable'
            | '_setError'
            | '_removeError'
            | '_removeRedirectLink'>(this, {
            _redirectLink_observable: observable.ref,
            _error_observable: observable.ref,
            _setRedirectLink: action,
            _setError: action,
            _removeError: action,
            _removeRedirectLink: action,
            redirectLink: computed,
            error: computed,
        });
    }
}