import { BaseStoreFilters } from "./models/baseStoreFilters";
import { StorePageContent, ErrorText, RedirectLink } from "./models/storePageContent";
import StoreDataSource, { DataSourceItem } from "./storeDataSource";
import StoreDisplayedData from "./storeDisplayedDataNew";
import StoreValue from "./storeValue";


type DetailInfoAboutItem<TItem extends DataSourceItem> = TItem | undefined;

interface InitAbstractStorePageContent {
    readonly uniquePageKey: string;
    readonly itemDataAttribute?: string;
    readonly currentPage?: number;
}

export default abstract class AbstractStorePageContent<TItem extends DataSourceItem, TStoreFilters extends BaseStoreFilters<TItem> | undefined = undefined> implements StorePageContent{
    public readonly uniquePageKey: string;
    public readonly itemDataAttribute: string;
    public readonly error: StoreValue<ErrorText>;
    public readonly redirectLink: StoreValue<RedirectLink>;
    public readonly detailInfoAboutItem: StoreValue<DetailInfoAboutItem<TItem>>;
    
    protected readonly _storeDataSource: StoreDataSource<TItem>;
    public readonly storeDisplayedData: StoreDisplayedData<TItem>;
    public abstract readonly storeFilters?: TStoreFilters;

    //#region Действия над элементом (не события)
    /**
     * Получить информацию о элементе
     * @param id - id элемента
     */
    public setItemInfoById(id: string): void {
        const targetItem = this._storeDataSource.getItemByUuid(id);

        if (!targetItem) {
            return;
        }

        this.detailInfoAboutItem.setValue(targetItem);
    }
    //#endregion

    //#region События
    /**
     * Событие получить информацию об элементе
     * @param e
     */
    public eventGetItemInfo(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
        const targetItem = this._getItemByDataAttribute(e.currentTarget);

        if (!targetItem) {
            return;
        }

        this.detailInfoAboutItem.setValue(targetItem);
    }

    /**
     * Событие, забыть текущий выбранный элемент для детального просмотра
     */
    public eventResetDetailInfoAboutItem() {
        this.detailInfoAboutItem.setValue(undefined);
    }
    //#endregion


    //#region helpers
    protected _getItemByDataAttribute(element: HTMLElement): TItem | undefined {
        const uuid: string | null = element.getAttribute(this.itemDataAttribute);

        if (typeof uuid !== 'string') {
            return undefined;
        }

        const targetItem = this._storeDataSource.getItemByUuid(uuid);

        if (!targetItem) {
            return undefined;
        }

        return targetItem;
    }
    //#endregion

    //#region абстрактные методы
    public abstract serverRequestInit(): void;
    public abstract init(): void;
    public abstract beforeRemoving(): void;
    //#endregion





    constructor(init: InitAbstractStorePageContent) {
        this.eventGetItemInfo = this.eventGetItemInfo.bind(this);
        this.eventResetDetailInfoAboutItem = this.eventResetDetailInfoAboutItem.bind(this);
        this.serverRequestInit = this.serverRequestInit.bind(this);
        this.beforeRemoving = this.beforeRemoving.bind(this);
        this.init = this.init.bind(this);

        this.uniquePageKey = init.uniquePageKey;

        let itemDataAttribute: string = 'data-uuid';

        if (typeof init.itemDataAttribute === 'string') {
            if (init.itemDataAttribute.length > 5) {
                itemDataAttribute = init.itemDataAttribute;
            }
        }

        this.itemDataAttribute = itemDataAttribute;
        this._storeDataSource = new StoreDataSource<TItem>();
        this.storeDisplayedData = new StoreDisplayedData<TItem>();

        this.error = new StoreValue<ErrorText>({value: undefined});
        this.redirectLink = new StoreValue<RedirectLink>({value: undefined});
        this.detailInfoAboutItem = new StoreValue<DetailInfoAboutItem<TItem>>({value: undefined});
    }

}