import cloneDeep from "lodash.clonedeep";
import {action, computed, makeObservable, observable} from "mobx";
import {sha1} from "object-hash";
import { BaseStoreEditItem } from "./models/baseStoreEditItem";

export type ResultOfItemEditing<TItem extends Object> = {
    readonly item: TItem;
    readonly status?: ItemStatus;
    readonly other?: any;
}

type ItemStatus = BaseStoreEditItem<any, any>['itemStatus'];
type EditorStatus = NonNullable<BaseStoreEditItem<any, any>['editorStatus']>;

type CallbackSaveModifiedItem<TItem extends Object> = (params: ResultOfItemEditing<TItem>) => void;
type CallbackCancelEditItem = () => void;

export type InitAbstractStoreEditItem<TItem extends Object, TModifiedItem extends Object = TItem> = {
    readonly itemToEdit: TItem;
    readonly itemStatus: ItemStatus
    readonly editorStatus?: EditorStatus;
    readonly callbackSaveModifiedItem: CallbackSaveModifiedItem<TModifiedItem>;
    readonly callbackCancelEditItem: CallbackCancelEditItem;
}

export default abstract class AbstractStoreEditItem<TItem extends Object, TModifiedItem extends Object = TItem> implements BaseStoreEditItem<TItem, TModifiedItem> {
    private readonly _callbackSaveModifiedItem: CallbackSaveModifiedItem<TModifiedItem>;
    private readonly _callbackCancelEditItem: CallbackCancelEditItem;
    private readonly _itemToEditBeforeChanges: TItem;

    //#region Статус элемента
    private _itemStatus_observable: ItemStatus;

    /**
     * Установить статус элемента
     * @param status
     */
    public setItemStatus(status: ItemStatus) {
        this._itemStatus_observable = status;
    }

    /**
     * Статус элемента
     */
    get itemStatus(): ItemStatus {
        return this._itemStatus_observable;
    }

    /**
     * Получить статус элемента
     * @protected
     */
    protected _getItemStatus(): ItemStatus {
        return this._itemStatus_observable;
    }
    //#endregion

    //#region Статус редактора
    private _editorStatus_observable: EditorStatus | undefined;

    /**
     * Установить статус редактора
     * @param status
     */
    public setEditorStatus(status?: EditorStatus | undefined) {
        this._editorStatus_observable = status;
    }

    /**
     * Статус редактора
     */
    get editorStatus(): EditorStatus | undefined {
        return this._editorStatus_observable;
    }
    //#endregion

    /**
     * Получить исходный элемент для редактирования, без каких либо изменений
     * @protected
     */
    public getItemToEditBeforeChanges(): TItem {
        return cloneDeep(this._itemToEditBeforeChanges);
    }

    //#region Абстрактные методы
    /**
     * Проверить измененный элемент
     * Метод вызывается в eventSaveModifiedItem
     * @protected
     */
    protected abstract _validationModifiedItem(): void;
    //#endregion

    /**
     * Отменить редактирование элемента
     */
    protected _cancelEditItem() {
        if (typeof this._callbackCancelEditItem !== 'function') {
            throw new Error('_callbackCancelEditItem is not a function');
        }

        this._callbackCancelEditItem();
    }

    /**
     * Вызывать этот метод когда элемент прошел проверку и его нужно сохранить
     * @param params
     *  item - Элемент который нужно сохранить
     *  status - Статус элемента, если не передать, будет автоматически подставлен текущий статус
     *  other - Прочее. Может являться чем угодно
     * @protected
     */
    protected _saveModifiedItem(params: ResultOfItemEditing<TModifiedItem>) {
        const modifiedItem: TModifiedItem = params.item;
        const modifiedItemHash: string = sha1(modifiedItem);
        const itemToEditBeforeChangesHash: string = sha1(this.getItemToEditBeforeChanges());

        // Флаг элемент изменен
        let isItemChange: boolean = !(itemToEditBeforeChangesHash === modifiedItemHash);

        if(params.other) {
            // Если есть other считаем что элемент изменен
            isItemChange = true;
        }

        if (!isItemChange) {
            // Элемент не изменен, вызываем событие отмены и выходим
            this._cancelEditItem();
            return;
        }

        if (typeof this._callbackSaveModifiedItem !== 'function') {
            throw new Error('_callbackSaveModifiedItem is not a function');
        }

        this._callbackSaveModifiedItem({
            item: params.item,
            status:typeof params.status === 'string' ? params.status : this._itemStatus_observable,
            other: params.other
        });
    }

    /**
     * Событие сохранить измененный элемент
     * Если элемент не изменился, будет вызвано событие отмены редактирования
     */
    public eventSaveModifiedItem() {
        // Вызываем метод проверки элемента
        this._validationModifiedItem();
    }

    /**
     * Событие отменить редактирование элемента
     */
    public eventCancelEditItem() {
        this._cancelEditItem();
    }

    constructor(initData: InitAbstractStoreEditItem<TItem, TModifiedItem>) {
        this.eventSaveModifiedItem = this.eventSaveModifiedItem.bind(this);
        this.eventCancelEditItem = this.eventCancelEditItem.bind(this);

        this._callbackCancelEditItem = initData.callbackCancelEditItem;
        this._callbackSaveModifiedItem = initData.callbackSaveModifiedItem;

        this._itemToEditBeforeChanges = cloneDeep(initData.itemToEdit);
        this._itemStatus_observable = initData.itemStatus;
        this._editorStatus_observable = initData.editorStatus ? initData.editorStatus : undefined;

        makeObservable<this,
            '_itemStatus_observable'
            | '_editorStatus_observable'>(this, {
            _itemStatus_observable: observable.ref,
            _editorStatus_observable: observable.ref,
            setItemStatus: action,
            setEditorStatus: action,
            itemStatus: computed,
            editorStatus: computed
        });
    }
}
