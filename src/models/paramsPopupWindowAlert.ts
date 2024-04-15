import { BaseParamsPopupWindow } from "./baseParamsPopupWindow";

export interface ParamsPopupWindowAlert extends BaseParamsPopupWindow {
    readonly eventClose: () => void;
}