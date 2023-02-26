let incNumber = 0;
export const getNextNumber = () => {
    return incNumber++;
};
;
;
;
export class GridModel {
    constructor() {
        this.rows = {};
        this.rowKeys = [];
        this.columnKeys = [];
        this.header = new HeaderModel(this.columnKeys);
        this.updatedCells = {};
    }
    clone() {
        const newModel = new GridModel();
        newModel.header = this.header;
        //newModel.header.headers = this.header.headers;
        //newModel.columns = [...this.columns];
        newModel.updatedCells = this.updatedCells;
        newModel.rowKeys = [...this.rowKeys];
        newModel.columnKeys = [...this.columnKeys];
        newModel.rows = {};
        for (const row of this.rowKeys) {
            newModel.rows[row] = this.rows[row].clone();
        }
        this.updatedCells = {};
        for (const row of this.rowKeys) {
            this.rows[row].updatedCells = {};
        }
        return newModel;
    }
    addColumn(columnKey, displayName, cells) {
        const newCol = columnKey;
        this.columnKeys.unshift(newCol);
        this.header.addCell(newCol, new CellModel(newCol));
        for (const key of this.rowKeys) {
            if (cells[key] !== undefined) {
                this.rows[key].addCell(columnKey, cells[key]);
                if (!this.updatedCells[key]) {
                    this.updatedCells[key] = {};
                    this.rows[key].updatedCells = this.updatedCells[key];
                }
                this.updatedCells[key][columnKey] = true;
            }
        }
    }
    addRow(rowKey, displayName, cells) {
        this.rows[rowKey] = new RowModel(rowKey, displayName, cells, this.columnKeys);
        this.rowKeys.push(rowKey);
        this.updatedCells[rowKey] = {};
        this.rows[rowKey].updatedCells = this.updatedCells[rowKey];
        for (const columnKey of this.columnKeys) {
            this.updatedCells[rowKey][columnKey] = true;
        }
    }
    /**
     * Probably should be for testing only, I don't know why anyone except the data model would usually need to mess with column ids
     * @returns
     */
    getColumns() {
        return this.columnKeys;
    }
}
export class HeaderModel {
    constructor(columns) {
        this.headers = {};
        this.columns = columns;
    }
    addCell(col, newCell) {
        this.headers[col] = newCell;
    }
}
export class RowModel {
    constructor(key, displayName, cells, columns) {
        this.rowKey = key;
        this.cells = cells;
        this.columns = columns;
        this.displayName = displayName;
        this.updatedCells = {};
    }
    addCell(columnKey, newCell) {
        this.cells[columnKey] = newCell;
    }
    clone() {
        const newRow = new RowModel(this.rowKey, this.displayName, Object.assign({}, this.cells), [...this.columns]);
        newRow.updatedCells = Object.assign({}, this.updatedCells);
        return newRow;
    }
}
export class CellModel {
    constructor(name) {
        if (name === undefined) {
            this.displayName = "hello";
        }
        else {
            this.displayName = name;
        }
    }
}
