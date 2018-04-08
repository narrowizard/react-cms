export class TableColumn {
    constructor(title, dataIndex, key, render) {
        this.title = title;
        this.dataIndex = dataIndex;
        this.key = key;
        this.render = render;
    }
}