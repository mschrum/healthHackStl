export class VisitorData {
    constructor() {
    }

    data = [
        {
            name: 'Matt',
            BID: 'Matt\'s iPhone',
            active: false
        },
        {
            name: 'Peter',
            BID: 'Peter\'s iPhone',
            active: false
        },
        {
            name: 'Rob',
            BID: 'Rob\'s iPhone',
            active: false
        },
        {
            name: 'Melissa',
            BID: 'Melissa\'s iPhone',
            active: false
        },
    ];

    getVisitors() {
        return this.data;
    }
}
