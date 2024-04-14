import { DataSourceItem } from ".";

export default abstract class AbstractValidationItems<TInvalidItem, TValidItem extends DataSourceItem> {
    public validationItemsList(itemsList?: TInvalidItem[] | undefined | null): TValidItem[] {
        const result: TValidItem[] = [];

        if (!Array.isArray(itemsList)) {
            return result;
        }

        if (!itemsList.length) {
            return result;
        }

        for (const item of itemsList) {
            const validItem: TValidItem | undefined = this.validationItem(item);
            if (validItem) {
                result.push(validItem);
            }
        }

        return result;
    }

    public abstract validationItem(item: TInvalidItem | undefined | null, existingUuid?: string): TValidItem | undefined;

    constructor() {}
}