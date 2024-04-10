export interface BaseStoreFilters<TItem extends Object> {
    readonly eventUpdateViewData: () => void;
    readonly setCallbackUpdateViewData: (callback: () => void) => void;
    readonly removeCallbackUpdateViewData: () => void;
    readonly applyFilters: (inputItems: TItem[]) => TItem[];
}