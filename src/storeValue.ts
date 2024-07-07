import { action, computed, makeObservable, observable } from "mobx";

interface Init<TValue = undefined> {
    readonly value: TValue;
}

export default class StoreValue<TValue = undefined> {
    private _value_observable: TValue;

    public setValue(value: TValue) {
        this._value_observable = value;
    }

    get value() {
        return this._value_observable;
    }

    constructor(init: Init<TValue>) {
        this._value_observable = init.value;

        makeObservable<this, '_value_observable'>
            (this, {
                _value_observable: observable.ref,
                setValue: action,
                value: computed
            });
    }
}