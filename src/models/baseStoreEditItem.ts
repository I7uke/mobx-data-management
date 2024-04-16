type ItemStatus = 'newItem' | 'existingItem';

interface EditorStatusBaseType<TStatus extends string> {
    readonly status: TStatus;
}

type EditorStatusHide = EditorStatusBaseType<'hide'>;

interface EditorStatusLoading extends EditorStatusBaseType<'loading'> {
    readonly loaderText: string;
}

interface EditorStatusError extends EditorStatusBaseType<'error'> {
    readonly errorText: string;
}

type EditorStatus = EditorStatusHide | EditorStatusLoading | EditorStatusError;

export interface BaseStoreEditItem<TItem extends Object, TModifiedItem extends Object = TItem> {
    readonly setItemStatus: (status: ItemStatus) => void;
    readonly itemStatus: ItemStatus;
    readonly setEditorStatus: (status?: EditorStatus | undefined) => void;
    readonly editorStatus: EditorStatus | undefined;
    readonly getItemToEditBeforeChanges: () => TItem;
    readonly eventSaveModifiedItem: () => void;
    readonly eventCancelEditItem: () => void;
}