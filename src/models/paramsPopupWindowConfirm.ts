import { BaseParamsPopupWindow } from "./baseParamsPopupWindow";

export interface ParamsPopupWindowConfirm extends BaseParamsPopupWindow {
    readonly eventConfirm: () => void;
    readonly eventCancel: () => void;
}