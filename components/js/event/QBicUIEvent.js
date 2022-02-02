export default class QBicUIEvent extends Event {
    constructor(type, init) {
        super(type, init);
    }

    static get CHANGE() {
        return 'onChanged';
    };
}