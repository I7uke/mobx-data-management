import StoreValue from "../storeValue";

export type ErrorText = string | undefined;
export type RedirectLink = string | undefined;

export interface StorePageContent {
    readonly uniquePageKey: string;
    readonly itemDataAttribute: string;
    readonly error: StoreValue<ErrorText>
    readonly redirectLink: StoreValue<RedirectLink>;
    readonly serverRequestInit: () => void;
    readonly beforeRemoving: () => void;
    readonly init: () => void;
}