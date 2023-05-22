/* Personal版块的Store */
import { observable, action } from 'mobx';

export default class PersonalStore {
    constructor(root) {
        this.root = root;
    }

    @observable info = null;
    @action.bound queryInfo() {
        // ...
    }
};