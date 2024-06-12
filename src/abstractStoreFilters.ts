import { BaseStoreFilters } from "./models/baseStoreFilters";

type PrimitiveTypes = null | undefined | number | string | boolean;

type SearchStringParams<TItem extends Object> = {
    /**
     * Список элементов для поиска
     */
    readonly itemsList: TItem[];
    /**
     * Название полей по которым будет происходить поиск, только для string и number
     */
    readonly fieldsNames: (keyof TItem)[];
    /**
     * Поисковый запрос
     */
    readonly searchQuery: string;
}

type SearchStringDeepParams<TItem extends Object> = {
    /**
     * Список элементов для поиска
     */
    readonly itemsList: TItem[];
    /**
     * Получить значения по которым будет осуществлен поиск
     */
    readonly getValues: (item: TItem) => (string | null | undefined)[];
    /**
     * Поисковый запрос
     */
    readonly searchQuery: string;
}

type FilterByValuesFuncParams<TItem extends Object> = {
    /**
     * Список элементов для поиска
     */
    readonly itemsList: TItem[];
    /**
     * Получить значеня по которым будет осуществлен поиск
     */
    readonly getValues: (item: TItem) => PrimitiveTypes[];
    /**
     * Список искомых значений
     */
    readonly searchValuesList: PrimitiveTypes[];
}

type FilterByValuesListParams<TItem extends Object> = {
    /**
     * Список элементов для поиска
     */
    readonly itemsList: TItem[];
    /**
     * Список искомых значений
     */
    readonly searchValuesList: PrimitiveTypes[];
    /**
     * Название полей по которым будет происходить поиск
     */
    readonly fieldsNames: (keyof TItem)[];
}

type FilterByValueParams<TItem extends Object> = {
    /**
     * Список элементов для поиска
     */
    readonly itemsList: TItem[];
    /**
     * Искомое значение
     */
    readonly searchValue: PrimitiveTypes;
    /**
     * Название полей по которым будет происходить поиск
     */
    readonly fieldsNames: (keyof TItem)[];
}

type SortStringParams<TItem extends Object>  = {
    /**
     * Список элементов для поиска
     */
    readonly itemsList: TItem[];
    /**
     *  Название поля
     */
    readonly fieldName: keyof TItem;
    /**
     * Международный региональный стандарт
     */
    readonly locales?: Intl.LocalesArgument;
}

export default abstract class AbstractStoreFilters<TItem extends Object>  implements BaseStoreFilters<TItem> {
    private _callbackUpdateViewData?: () => void;

    /**
     * Событие обновить отображаемые данные
     */
    public eventUpdateViewData() {
        if (typeof this._callbackUpdateViewData === 'function') {
            this._callbackUpdateViewData();
        }
    }

    constructor() {
        this.applyFilters = this.applyFilters.bind(this);
        this.eventUpdateViewData = this.eventUpdateViewData.bind(this);
        this._callbackUpdateViewData = undefined;
    }

    /**
     * Установить callback обновления данных
     * @param callback
     */
    public setCallbackUpdateViewData(callback: () => void) {
        if(typeof callback === 'function') {
            this._callbackUpdateViewData = callback;
        }
    }

    /**
     * Удалить callback обновления данных
     */
    public removeCallbackUpdateViewData() {
        this._callbackUpdateViewData = undefined;
    }

    /**
     * Применить фильтры по порядку
     * @param inputData
     * @param filtersList
     * @protected
     */
    protected _applyFiltersInOrder(inputData: TItem[], filtersList: ((itemsList: TItem[]) => TItem[])[]): TItem[] {
        let result: TItem[] = inputData;

        for (const filter of filtersList) {
            result = filter(result);
        }

        return result;
    }

    /**
     * Применить фильтры
     * @param inputItems
     * @protected
     */
    protected abstract _applyFilters(inputItems: TItem[]): TItem[];

    public applyFilters(inputItems: TItem[]): TItem[] {
        return this._applyFilters(inputItems);
    }

    private _checkDate(date: any): Date | undefined {
        if (Object.prototype.toString.call(date) !== '[object Date]') {
            return undefined;
        }
    
        if(isNaN(Number(date))) {
            return undefined;
        }
    
        return date as Date;
    }

    //#region Сортировки
    /**
     * Сортировать по строковому полю от A до Z
     * @param itemsList
     * @param fieldNameStrType
     * @protected
     */
    protected _sortString_AZ(params: SortStringParams<TItem>): TItem[] {
        const {itemsList, fieldName, locales} = params;

        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        const collator = new Intl.Collator(locales, { sensitivity: 'base' });

        itemsList.sort((a: TItem, b: TItem) => {
            const itemTmpA = a[fieldName];
            const itemTmpB = b[fieldName];

            const itemA: string = (typeof itemTmpA === 'string') ? itemTmpA : String(itemTmpA);
            const itemB: string = (typeof itemTmpB === 'string') ? itemTmpB : String(itemTmpB);

            return collator.compare(itemA, itemB);
        });

        return itemsList;
    }

    /**
     * Сортировать по строковому полю от Z до А
     * @param itemsList
     * @param fieldNameStrType
     * @protected
     */
    protected _sortString_ZA(params: SortStringParams<TItem>): TItem[] {
        const {itemsList, fieldName, locales} = params;

        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }
        
        const collator = new Intl.Collator(locales, { sensitivity: 'base' });

        itemsList.sort((a: TItem, b: TItem) => {
            const itemTmpA = a[fieldName];
            const itemTmpB = b[fieldName];

            const itemA: string = (typeof itemTmpA === 'string') ? itemTmpA : String(itemTmpA);
            const itemB: string = (typeof itemTmpB === 'string') ? itemTmpB : String(itemTmpB);

            return collator.compare(itemB, itemA);
        });

        return itemsList;
    }

    /**
     * Сортировать по логическому полю от true до false
     * @param itemsList
     * @param fieldNameStrType
     * @protected
     */
    protected _sortBoolean_TrueFalse(itemsList: TItem[], fieldNameStrType: keyof TItem): TItem[] {
        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        itemsList.sort((a: TItem, b: TItem) => {
            const itemA: boolean = !!a[fieldNameStrType];
            const itemB: boolean = !!b[fieldNameStrType];

            if (itemA > itemB) {
                return -1;
            }

            if (itemA < itemB) {
                return 1;
            }

            return 0;
        });

        return itemsList;
    }

    /**
     * Сортировать по логическому полю от false до true
     * @param itemsList
     * @param fieldNameStrType
     * @protected
     */
    protected _sortBoolean_FalseTrue(itemsList: TItem[], fieldNameStrType: keyof TItem): TItem[] {
        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        itemsList.sort((a: TItem, b: TItem) => {
            const itemA: boolean = !!a[fieldNameStrType];
            const itemB: boolean = !!b[fieldNameStrType];

            if (itemA > itemB) {
                return 1;
            }

            if (itemA < itemB) {
                return -1;
            }

            return 0;
        });

        return itemsList;
    }

    /**
     * Сортировать по дате, сначала старые
     * @param itemsList
     * @param fieldNameDateType
     * @protected
     */
    protected _sortDate_09(itemsList: TItem[], fieldNameDateType: keyof TItem): TItem[] {
        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        itemsList.sort((a: TItem, b: TItem) => {
            const itemTmpA = this._checkDate(a[fieldNameDateType]);
            const itemTmpB = this._checkDate(b[fieldNameDateType]);

            const itemA: number = itemTmpA ? Number(itemTmpA) : Infinity;
            const itemB: number = itemTmpB ? Number(itemTmpB) : Infinity;

            return itemA - itemB;
        });

        return itemsList;
    }

    /**
     * Сортировать по дате, сначала новые
     * @param itemsList
     * @param fieldNameDateType
     * @protected
     */
    protected _sortDate_90(itemsList: TItem[], fieldNameDateType: keyof TItem): TItem[] {

        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        itemsList.sort((a: TItem, b: TItem) => {
            const itemTmpA = this._checkDate(a[fieldNameDateType]);
            const itemTmpB = this._checkDate(b[fieldNameDateType]);

            const itemA: number = itemTmpA ? Number(itemTmpA) : -Infinity;
            const itemB: number = itemTmpB ? Number(itemTmpB) : -Infinity;

            return itemB - itemA;
        });

        return itemsList;
    }

    /**
     * Сортировать по числовому полю сначала меньше
     * @param itemsList
     * @param fieldNameStrType
     * @protected
     */
    protected _sortNumber_09(itemsList: TItem[], fieldNameStrType: keyof TItem): TItem[] {
        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        itemsList.sort((a: TItem, b: TItem) => {
            const itemTmpA = a[fieldNameStrType];
            const itemTmpB = b[fieldNameStrType];

            const itemA: number = (typeof itemTmpA === 'number') ? itemTmpA : 0;
            const itemB: number = (typeof itemTmpB === 'number') ? itemTmpB : 0;

            if (itemA > itemB) {
                return 1;
            }

            if (itemA < itemB) {
                return -1;
            }

            return 0;
        });

        return itemsList;
    }

    /**
     * Сортировать по числовому полю сначала больше
     * @param inputData
     * @param fieldNameStrType
     * @protected
     */
    protected _sortNumber_90(itemsList: TItem[], fieldNameStrType: keyof TItem): TItem[] {
        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        itemsList.sort((a: TItem, b: TItem) => {
            const itemTmpA = a[fieldNameStrType];
            const itemTmpB = b[fieldNameStrType];

            const itemA: number = (typeof itemTmpA === 'number') ? itemTmpA : 0;
            const itemB: number = (typeof itemTmpB === 'number') ? itemTmpB : 0;

            if (itemA > itemB) {
                return -1;
            }

            if (itemA < itemB) {
                return 1;
            }

            return 0;
        });

        return itemsList;
    }

    //#endregion

    //#region Поиск
    /**
     * Поиск по строке
     * @param param
     * @protected
     */
    protected _searchString(param: SearchStringParams<TItem>): TItem[] {
        if(!Array.isArray(param.itemsList)) {
            return [];
        }

        if(!param.itemsList.length) {
            return [];
        }

        if(typeof param.searchQuery !== 'string') {
            return param.itemsList;
        }

        if(!param.searchQuery) {
            return param.itemsList;
        }

        if(!Array.isArray(param.fieldsNames) ) {
            return param.itemsList;
        }

        if(!param.fieldsNames.length) {
            return param.itemsList;
        }

        const result: TItem[] = [];
        const itemsList = param.itemsList;
        const searchQuery: string = param.searchQuery.toLowerCase();
        const fieldsNamesForSearch = param.fieldsNames;

        for (const item of itemsList) {
            for (const fieldName of fieldsNamesForSearch) {
                const valueForSearch: any = item[fieldName];

                if (typeof valueForSearch !== 'string' && typeof valueForSearch !== 'number') {
                    continue;
                }

                const stringForSearch: string = (typeof valueForSearch === 'string') ? valueForSearch.toLowerCase() : String(valueForSearch).toLowerCase();
                if (stringForSearch.indexOf(searchQuery) > -1) {
                    result.push(item);
                    break;
                }
            }
        }

        return result;
    }

    /**
     * 
     * @param param 
     * @returns 
     */
    protected _searchStringFunc(param: SearchStringDeepParams<TItem>): TItem[] {
        if(!Array.isArray(param.itemsList)) {
            return [];
        }

        if(!param.itemsList.length) {
            return [];
        }

        if(typeof param.searchQuery !== 'string') {
            return param.itemsList;
        }

        if(!param.searchQuery) {
            return param.itemsList;
        }

        if(typeof param.getValues !== 'function') {
            return param.itemsList;
        }

        const result: TItem[] = [];
        const itemsList = param.itemsList;
        const searchQuery: string = param.searchQuery.toLowerCase();
        
        for (const item of itemsList) {
            const fieldsList = param.getValues(item);

            if (!Array.isArray(fieldsList)) {
                continue;
            }

            for (const field of fieldsList) {
                const valueForSearch: PrimitiveTypes = field;

                if(typeof valueForSearch !== 'string') {
                    continue;
                }

                if (!valueForSearch) {
                    continue;
                }

                const stringForSearch: string = valueForSearch.toLowerCase();
                if (stringForSearch.indexOf(searchQuery) > -1) {
                    result.push(item);
                    break;
                }
            }
        }

        return result;
    }

    protected _filterByValuesFunc(param: FilterByValuesFuncParams<TItem>): TItem[]  {
        const {itemsList, searchValuesList} = param;

        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        if(!Array.isArray(searchValuesList)) {
            return itemsList;
        }

        if(!searchValuesList.length) {
            return itemsList;
        }

        if(typeof param.getValues !== 'function') {
            return itemsList;
        }

        const result: TItem[] = [];
    
        for (const item of itemsList) {
            const itemValuesList = param.getValues(item);

            if (!Array.isArray(itemValuesList)) {
                continue;
            }

            for (const searchValue of searchValuesList) {
                if (itemValuesList.indexOf(searchValue) > -1) {
                    result.push(item);
                    break;
                }
            }
        }

        return result;
    }

    /**
     * Поиск по полям имеющим примитивный тип
     * Если значение поле совпадает хотя бы с одним искомым значением, элемент удовлетворяет поиску
     * @param param
     * @protected
     */
    protected _filterByValuesList(param: FilterByValuesListParams<TItem>): TItem[] {
        const {searchValuesList, fieldsNames, itemsList} = param;

        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        if (!Array.isArray(searchValuesList)) {
            return itemsList;
        }

        if (!searchValuesList.length) {
            return itemsList;
        }

        const result: TItem[] = [];

        for (const item of itemsList) {
            let isAddItem: boolean = false;
            for (const fieldName of fieldsNames) {
                const currentItemValue = item[fieldName];
                for (const value of searchValuesList) {
                    if (currentItemValue === value) {
                        result.push(item);
                        isAddItem = true;
                        break;
                    }
                }
                if (isAddItem) {
                    break;
                }
            }
        }

        return result;
    }

    /**
     * Поиск по полям имеющим примитивный тип
     * Если значение поля совпадает с искомым значением, элемент удовлетворяет поиску
     * @param param
     * @protected
     */
    protected _filterByValue(param: FilterByValueParams<TItem>): TItem[] {
        const {searchValue, fieldsNames, itemsList} = param;

        if(!Array.isArray(itemsList)) {
            return [];
        }

        if(!itemsList.length) {
            return [];
        }

        if(!Array.isArray(fieldsNames)) {
            return itemsList;
        }

        if(!fieldsNames.length) {
            return itemsList;
        }

        const result: TItem[] = [];

        for (const item of itemsList) {
            for (const fieldName of fieldsNames) {
                const currentItemValue = item[fieldName];
                if (currentItemValue === searchValue) {
                    result.push(item);
                    break;
                }
            }
        }

        return result;
    }
    //#endregion
}
