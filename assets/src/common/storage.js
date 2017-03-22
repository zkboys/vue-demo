const Storage = window.localStorage;
const sessionStorage = window.sessionStorage;

export const local = {
    setItem(key, value) {
        value = JSON.stringify(value);
        Storage.setItem(key, value);
    },
    getItem(key) {
        const value = Storage.getItem(key);
        return JSON.parse(value);
    },
    clear: Storage.clear,
    removeItem: Storage.removeItem,
    multiGet(keys) {
        const values = {};
        keys.forEach((key) => {
            values[key] = this.getItem(key);
        });
        return values;
    },
    multiRemove(keys) {
        keys.forEach(key => this.removeItem(key));
    },
};

export const session = {
    setItem(key, value) {
        value = JSON.stringify(value);
        sessionStorage.setItem(key, value);
    },
    getItem(key) {
        const value = sessionStorage.getItem(key);
        return JSON.parse(value);
    },
    clear: sessionStorage.clear,
    removeItem: sessionStorage.removeItem,
    multiGet(keys) {
        const values = {};
        keys.forEach((key) => {
            values[key] = this.getItem(key);
        });
        return values;
    },
    multiRemove(keys) {
        keys.forEach(key => this.removeItem(key));
    },
};
