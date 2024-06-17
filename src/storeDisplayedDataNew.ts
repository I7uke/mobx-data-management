import {action, computed, makeObservable, observable} from "mobx";

type CurrentPageType = number | 'firstPage' | 'lastPage';
type NumberItemsPerPage = number | 'all';
type DataStatus = 'notSet' | 'empty' | 'installed';

type Pagination<TItem> = {
    /**
     * Максимальное количество доступных страниц
     */
    readonly maxPages: number;
    /**
     * Общее количество элементов
     */
    readonly totalItems: number;
    /**
     * Количество элементов на одной странице, отсчет идет с 1
     */
    readonly numberItemsPerPage: NumberItemsPerPage;
    /**
     * Текущая страница, отсчет идет с 1
     */
    readonly currentPage: number;
    /**
     * Элементы на текущей странице
     */
    readonly itemsOnCurrentPage: TItem[];
}

type InternalPagination<TItem> = {
    /**
     * Текущая страница, отсчет идет с 1
     */
    readonly currentPage: number;
    /**
     * Возможные количества элементов на странице
     */
    readonly numberItemsPerPage: NumberItemsPerPage;
    /**
     * Список всех элементов
     */
    readonly allItemsList: TItem[];
}

type Params<TItem> = {
    /**
     * Текущая страница, отсчет идет с 1
     */
    readonly currentPage?: CurrentPageType | undefined | null;
    /**
     * Возможные количества элементов на странице
     */
    readonly numberItemsPerPage?: NumberItemsPerPage | undefined | null;
    /**
     * Список всех элементов
     */
    readonly itemsList?: TItem[] | undefined | null;
}


export type InitStoreDisplayedData<TItem> = Params<TItem>;
type CallbackForceUpdate<TItem> = () => TItem[];

//#region validation
/**
 * Проверить корректность значения текущей страницы
 * @param currentPage - Текущая страница
 * @returns 
 */
function validationCurrentPageValue(currentPage: CurrentPageType | undefined | null): CurrentPageType | undefined  {
    if(typeof currentPage === 'number') {
        return validationNumber(currentPage, 0);
    }

    if (currentPage === 'firstPage') {
        return 'firstPage';
    }

    if (currentPage === 'lastPage') {
        return 'lastPage';
    }

    return undefined;
}

/**
 * Проверить значение количество элементов на странице
 * @param numberItemsPerPage - количество элементов на странице
 * @returns 
 */
function validationNumberItemsPerPageValue(numberItemsPerPage: NumberItemsPerPage | undefined | null): NumberItemsPerPage | undefined {
    if(typeof numberItemsPerPage === 'number') {
        return validationNumber(numberItemsPerPage, 0);
    }

    if (numberItemsPerPage === 'all') {
        return 'all';
    }

    return undefined;
}

/**
 * Проверить значение список элементов для пагинации
 * @param itemsList 
 * @returns 
 */
function validationItemsListValue<TItem>(itemsList: TItem[] | undefined | null): TItem[] | undefined {
    if(!Array.isArray(itemsList)) {
        return undefined;
    }

    return itemsList;
}

/**
 * Проверить число
 * @param value - Число для проверки
 * @param defaultValue - Значение по умолчанию если число не прошло проверку
 * @returns 
 */
function validationNumber(value: number | undefined | null, defaultValue: number ): number {
    if (typeof value !== 'number') {
        return defaultValue;
    }

    if (isNaN(value)) {
        return defaultValue;
    }

    if (value === Infinity) {
        return defaultValue;
    }

    if (value === -Infinity) {
        return defaultValue;
    }

    const integer = Math.trunc(value);

    if (integer < 0) {
        return defaultValue;
    }

    return integer;
}

/**
 * Проверить текущую страницу
 * @param currentPage - Текущая страница
 * @param maxPages - Максимальное количество страниц
 * @returns 
 */
function validationCurrentPage(currentPage: CurrentPageType | undefined | null, maxPages: number | undefined | null): CurrentPageType {
    const validCurrentPageValue = validationCurrentPageValue(currentPage);

    if(!validCurrentPageValue) {
        return 0;
    }
    
    if(typeof validCurrentPageValue === 'number') {
        const validMaxPages: number = validationNumber(maxPages, 0);

        if(validMaxPages <= 0) {
            return 0;
        }

        if (validCurrentPageValue > validMaxPages) {
            return validMaxPages;
        }

        if(validCurrentPageValue <= 0) {
            return 1;
        }
    }

    return validCurrentPageValue;
}

/**
 * Проверить количество элементов на странице
 * @param numberItemsPerPage 
 * @param totalItems 
 * @returns 
 */
function validationNumberItemsPerPage(numberItemsPerPage: NumberItemsPerPage | undefined | null, totalItems: number | undefined | null): NumberItemsPerPage {
    const validNumberItemsPerPageValue = validationNumberItemsPerPageValue(numberItemsPerPage);

    if(!validNumberItemsPerPageValue) {
        return 0;
    }
    
    if(typeof validNumberItemsPerPageValue === 'number') {
        const validTotalItems: number = validationNumber(totalItems, 0);

        if (validNumberItemsPerPageValue > validTotalItems ) {
            return validTotalItems;
        }
    }

    return validNumberItemsPerPageValue;
}

//#endregion

//#region helpers
/**
 * Вычислить максимальное возможное количество страниц
 * @param numberItemsPerPage  - Количество элементов на одной странице
 * @param totalItems - Общее количество элементов
 * @returns 
 */
function countMaxPages(numberItemsPerPage: NumberItemsPerPage, totalItems: number): number {
    // Проверяем всего элементов
    const validTotalItems = validationNumber(totalItems, 0);

    if (!validTotalItems) {
        // Всего элементов 0, невозможно вычислить максимальное количество страниц
        return 0;
    }

    if (typeof numberItemsPerPage === 'string') {
        if (numberItemsPerPage === 'all') {
            // Показываем все элементы, может быть только 1 страница
            return 1;
        }
    }

    // Приводим количество элементов на странице к числу
    const numberItemsPerPageNumberOnly: number = convertNumberItemsPerPageToNumber(numberItemsPerPage, totalItems);

    if (!numberItemsPerPageNumberOnly) {
        // Количество элементов на странице 0, невозможно вычислить максимальное количество страниц
        return 0;
    }

    const remainder: number = validTotalItems % numberItemsPerPageNumberOnly;

    if (!remainder) {
        // Остатка нет, просто делим
        return validTotalItems / numberItemsPerPageNumberOnly;
    }

    // Остаток есть
    return (Math.trunc(validTotalItems / numberItemsPerPageNumberOnly)) + 1;
}

/**
 * Получить пустую пагинацию
 * @returns 
 */
function getEmptyPagination<TItem>(): Pagination<TItem> {
    return {
        numberItemsPerPage: 0,
        maxPages: 0,
        totalItems: 0,
        currentPage: 0,
        itemsOnCurrentPage: [],
    }
}

/**
 * Получить пустую внутреннюю пагинацию
 * @returns 
 */
function getEmptyInternalPagination<TItem> ():InternalPagination<TItem> {
    return {
        allItemsList: [],
        currentPage: 0,
        numberItemsPerPage: 0
    }
}

/**
 * Привести текущую страницу к числу
 * @param currentPage - Текущая страница
 * @param maxPages  - Максимальное количество страниц
 * @returns 
 */
function convertCurrentPageToNumber(currentPage: CurrentPageType, maxPages: number): number {
    if (maxPages <= 0) {
        return 0;
    }
    let resultCurrentPage: number = 0;

    if (typeof currentPage === 'number') {
        resultCurrentPage = currentPage;
    } else if (currentPage === 'firstPage') {
        resultCurrentPage = 1;
    } else if (currentPage === 'lastPage') {
        resultCurrentPage = maxPages;
    }

    if (resultCurrentPage > maxPages) {
        return maxPages;
    }

    if (resultCurrentPage <= 0) {
        return 1;
    }

    return resultCurrentPage;
}

/**
 * Привести количество элементов на странице к числу
 * @param numberItemsPerPage - Количество элементов на странице
 * @param totalItems - Всего элементов
 * @returns 
 */
function convertNumberItemsPerPageToNumber(numberItemsPerPage: NumberItemsPerPage, totalItems: number) {
    if (typeof numberItemsPerPage === 'number') {
        return numberItemsPerPage;
    }

    if (numberItemsPerPage === 'all') {
        return totalItems;
    }

    return 0;
}

/**
 * Получить пагинацию
 * @param currentPage - Текущая страница, отсчет идет с 1
 * @param numberItemsPerPage - Количество элементов на одной странице
 * @param itemsList - Список всех элементов
 * @returns 
 */
function getPagination<TItem>(currentPage: CurrentPageType | undefined | null, numberItemsPerPage: NumberItemsPerPage | undefined | null, itemsList: TItem[] | undefined | null): Pagination<TItem> {
    if (!Array.isArray(itemsList)) {
        // Передан не массив, нельзя разбить элементы по страницам
        return getEmptyPagination<TItem>();
    }

    if (!itemsList.length) {
        // Массив пустой, нельзя разбить элементы по страницам
        return getEmptyPagination<TItem>();
    }

    // Всего элементов
    const totalItems: number = itemsList.length;
    // Валидное значение элементов на странице
    const validNumberItemsPerPage = validationNumberItemsPerPage(numberItemsPerPage, totalItems);

    if(typeof validNumberItemsPerPage === 'string') {
        if(validNumberItemsPerPage === 'all') {
            // Показываем все элементы что есть
            return  {
                currentPage: 1, // 1 страница, так как показываем все
                maxPages: 1, // Максимально станиц 1, так как показываем все
                itemsOnCurrentPage: itemsList, // Все доступные элементы
                numberItemsPerPage: 'all', // Элементов на странице "Все"
                totalItems: totalItems
            };
        }
    }

    if (!validNumberItemsPerPage) {
        // 0 элементов на странице, нельзя создать пагинацию
        return getEmptyPagination<TItem>();
    }

    // Максимальное доступное количество страниц
    const maxPages: number = countMaxPages(validNumberItemsPerPage, totalItems);

    if (!maxPages) {
        // Максимальное доступное количество страниц 0, нельзя создать пагинацию
        return getEmptyPagination<TItem>();
    }

    // Проверяем текущую страницу
    const validCurrentPage = validationCurrentPage(currentPage, maxPages);
    // Приводим текущую страницу к числу
    const currentPageNumberOnly = convertCurrentPageToNumber(validCurrentPage, maxPages);

    if (!currentPageNumberOnly) {
        // Текущая страница 0, нельзя создать пагинацию
        return getEmptyPagination<TItem>();
    }

    // Включая
    let startIndex: number = (currentPageNumberOnly - 1) * validNumberItemsPerPage;

    if (startIndex < 0) {
        startIndex = 0;
    }

    // Не включая
    let endIndex: number = startIndex + validNumberItemsPerPage;

    if (endIndex > itemsList.length) {
        endIndex = itemsList.length;
    }

    // Получаем элементы на текущей странице
    const itemsOnCurrentPage = itemsList.slice(startIndex, endIndex);

    return {
        maxPages: maxPages,
        totalItems: totalItems,
        numberItemsPerPage: validNumberItemsPerPage,
        currentPage: currentPageNumberOnly,
        itemsOnCurrentPage: itemsOnCurrentPage
    }
}

//#endregion

export default class StoreDisplayedData<TItem> {
    private _internalPagination: InternalPagination<TItem>;
    private _pagination_observable: Pagination<TItem>;
    private _callbackForceUpdate?: CallbackForceUpdate<TItem>;

    private _setPagination_action(pagination: Pagination<TItem>) {
        this._pagination_observable = pagination;
    }

    private _dataStatus_observable: DataStatus;

    /**
     * Установить список элементов без триггеров
     * Данная установка не вызовет обновления данных в визуальном представлении
     * @param itemsList
     */
    public setItemsListWithoutTriggers(itemsList: TItem[]) {
        if (!Array.isArray(!itemsList)) {
            return;
        }

        // Запоминаем новый список элементов
        this._changeInternalPagination({
            itemsList: itemsList
        });
    }

    /**
     * Применить принудительное обновление
     * После применения
     * @private
     */
    private _applyCallbackForceUpdate() {
        if (typeof this._callbackForceUpdate !== 'function') {
            // Нет функции принудительного обновления, выходим
            return;
        }

        // Получаем новый список элементов
        const newItemsList = this._callbackForceUpdate();
        // Забываем функцию принудительного обновления
        this._callbackForceUpdate = undefined;

        if (!Array.isArray(newItemsList)) {
            return;
        }

        // Запоминаем новый список элементов
        this._changeInternalPagination({
            itemsList: newItemsList
        });
    }

    /**
     * Установить callback принудительного обновления
     * callback будет вызван при изменении данных в методах: setOptions, eventShowPrevPage, eventShowNextPage
     * @param callback
     */
    public setForceUpdate(callback: CallbackForceUpdate<TItem>) {
        if (typeof callback !== 'function') {
            return;
        }

        this._callbackForceUpdate = callback;
    }

    /**
     * Удалить callback принудительного обновления
     */
    public removeForceUpdate() {
        this._callbackForceUpdate = undefined;
    }

    /**
     * Очищает все переданные данные.
     * Store будет возвращен в первоначальное состояние
     */
    public destroy() {
        this._internalPagination = getEmptyInternalPagination<TItem>();
        this._pagination_observable = getEmptyPagination<TItem>();
        this._callbackForceUpdate = undefined;
        this._dataStatus_observable = 'notSet';
    }

    /**
     * Установить параметры
     * Будут учитываться только переданные поля
     * Если поле отсутствует то будет сохранено текущее значение этого поля
     * @param params
     */
    public setOptions(params: Params<TItem>) {
        const validCurrentPage = validationCurrentPageValue(params?.currentPage) ;
        const validItemsList = validationItemsListValue<TItem>(params?.itemsList);
        const validNumberItemsPerPage = validationNumberItemsPerPageValue(params?.numberItemsPerPage) ;

        if (validCurrentPage === undefined && validItemsList === undefined && validNumberItemsPerPage === undefined) {
            // Ничего не передано, выходим
            return;
        }

        // Пытаемся применить функцию принудительного обновления
        this._applyCallbackForceUpdate();
        // Устанавливаем новые данные
        this._changeInternalPagination({
            itemsList: validItemsList,
            currentPage: validCurrentPage,
            numberItemsPerPage: validNumberItemsPerPage
        });
        // Проверяем изменился список элементов или нет
        if (validItemsList !== undefined) {
            // Меняем статус данных
            this._dataStatus_observable = this._internalPagination.allItemsList.length ? 'installed' : 'empty';
        }
        // Создаем новую пагинацию
        this._pagination_observable = this._getPagination();
    }

    /**
     * Статус данных
     */
    get dataStatus(): DataStatus {
        return this._dataStatus_observable;
    }

    /**
     * Пагинация
     */
    get pagination() {
        return this._pagination_observable;
    }

    private _getPagination(): Pagination<TItem> {
        return getPagination<TItem>(this._internalPagination.currentPage, this._internalPagination.numberItemsPerPage, this._internalPagination.allItemsList);
    }

    private _changeInternalPagination(params?: Params<TItem>) {
        const validCurrentPageValue = validationCurrentPageValue(params?.currentPage) ;
        const validAllItemsListValue = validationItemsListValue<TItem>(params?.itemsList);
        const validNumberItemsPerPageValue = validationNumberItemsPerPageValue(params?.numberItemsPerPage) ;

        if (validCurrentPageValue === undefined && validAllItemsListValue === undefined && validNumberItemsPerPageValue === undefined) {
            // Ничего не передано, выходим
            return;
        }

        let allItemsList: InternalPagination<TItem>['allItemsList'] = this._internalPagination.allItemsList;
        let currentPage: InternalPagination<TItem>['currentPage'] = this._internalPagination.currentPage;
        let numberItemsPerPage: InternalPagination<TItem>['numberItemsPerPage'] = this._internalPagination.numberItemsPerPage;

        if(validAllItemsListValue) {
            allItemsList = validAllItemsListValue;
        }

        if(validNumberItemsPerPageValue) {
            numberItemsPerPage = validNumberItemsPerPageValue;
        }

        const totalItems: number = allItemsList.length;
        const maxPages: number = countMaxPages(numberItemsPerPage, totalItems);
        debugger;

        if(validAllItemsListValue || validNumberItemsPerPageValue) {
            if (validNumberItemsPerPageValue === 'all') {
                // Сбрасываем текущую страницу на 1
                currentPage = convertCurrentPageToNumber(1, maxPages);
            } else {
                // Проверяем можно ли оставить текущую страницу
                currentPage = convertCurrentPageToNumber(currentPage, maxPages);
            }
        }

        if(validCurrentPageValue) {
            if (typeof validCurrentPageValue === 'number') {
                currentPage = validCurrentPageValue;
            } else if(validCurrentPageValue === 'firstPage' || validCurrentPageValue === 'lastPage') {
                currentPage = convertCurrentPageToNumber(validCurrentPageValue, maxPages);
            }
        }

        this._internalPagination = {
            allItemsList: allItemsList,
            currentPage: currentPage,
            numberItemsPerPage: numberItemsPerPage
        };
    }

    /**
     * Показать следующую страницу
     */
    public eventShowNextPage() {
        this._applyCallbackForceUpdate();

        if (!this._internalPagination.allItemsList.length) {
            return;
        }

        const maxPages: number = this._pagination_observable.maxPages;
        const currentPage: number = this._pagination_observable.currentPage;
        const nextPage: CurrentPageType = validationCurrentPage(currentPage + 1, maxPages);
        
        if (!nextPage) {
            return;
        }

        if (nextPage === currentPage) {
            return;
        }

        this._changeInternalPagination({
            currentPage: nextPage
        });

        const newPagination = this._getPagination();
        this._setPagination_action(newPagination);
    }

    /**
     * Показать предыдущую страницу
     */
    public eventShowPrevPage() {
        this._applyCallbackForceUpdate();

        if (!this._internalPagination.allItemsList.length) {
            return;
        }

        const maxPages: number = this._pagination_observable.maxPages;
        const currentPage: number = this._pagination_observable.currentPage;
        const prevPage = validationCurrentPage(currentPage - 1, maxPages);

        if (!prevPage) {
            return;
        }

        if (prevPage === currentPage) {
            return;
        }

        this._changeInternalPagination({
            currentPage: prevPage
        });

        const newPagination = this._getPagination();
        this._setPagination_action(newPagination);
    }

    constructor(init?: InitStoreDisplayedData<TItem>) {
        this.eventShowPrevPage = this.eventShowPrevPage.bind(this);
        this.eventShowNextPage = this.eventShowNextPage.bind(this);
        let dataStatus: DataStatus = 'notSet';
        let allItemsList: InternalPagination<TItem>['allItemsList'] = [];
        let currentPage: InternalPagination<TItem>['currentPage'] = 0;
        let numberItemsPerPage: InternalPagination<TItem>['numberItemsPerPage'] = 0;

        if (init) {
            const validCurrentPageValue = validationCurrentPageValue(init?.currentPage);
            const validNumberItemsPerPageValue = validationNumberItemsPerPageValue(init?.numberItemsPerPage);

            if(Array.isArray(init.itemsList)) {
                if(init.itemsList.length) {
                    allItemsList = init.itemsList;
                    dataStatus = 'installed'; 
                }
            }

            if(validNumberItemsPerPageValue) {
                numberItemsPerPage = validNumberItemsPerPageValue;
            }

            if(typeof validCurrentPageValue === 'number'){
                currentPage = validCurrentPageValue;
            }else if(validCurrentPageValue === 'firstPage' || validCurrentPageValue === 'lastPage') {
                const totalItems: number = allItemsList.length;
                const maxPages: number = countMaxPages(numberItemsPerPage, totalItems);
                currentPage = convertCurrentPageToNumber(validCurrentPageValue, maxPages);
            }
        }
        this._internalPagination = {
            allItemsList: allItemsList,
            currentPage: currentPage,
            numberItemsPerPage: numberItemsPerPage ? numberItemsPerPage: 0
        };

        this._pagination_observable = getPagination(init?.currentPage, init?.numberItemsPerPage, allItemsList);
        this._dataStatus_observable = dataStatus;
        this._callbackForceUpdate = undefined;

        makeObservable<this,
            '_pagination_observable' |
            '_dataStatus_observable' |
            '_setPagination_action'>(this, {
            _pagination_observable: observable.ref,
            _dataStatus_observable: observable.ref,
            _setPagination_action: action,
            setOptions: action,
            destroy: action,
            pagination: computed
        });
    }
}