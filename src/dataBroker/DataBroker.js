import { CellModel, getNextNumber, GridModel } from "../model/GridModel.js";
export function loadInitialData(numColumns, numRows) {
    const model = new GridModel();
    for (let i = 0; i < numColumns; i++) {
        const colID = "col" + getNextNumber();
        model.addColumn(colID, colID, {});
    }
    for (let i = 0; i < numRows; i++) {
        const cells = {};
        for (const col of model.getColumns()) {
            cells[col] = new CellModel("starter cell " + getNextNumber());
        }
        const newId = "row" + getNextNumber();
        model.addRow(newId, newId, cells);
    }
    return model;
}
export function loadNewData(rows, columns) {
    const random = Math.random();
    let result;
    if (random < .5) {
        result = loadNewColumn(rows);
    }
    else {
        result = loadNewRow(columns);
    }
    return result;
}
export function loadNewColumn(rowKeys) {
    const newId = getNextNumber();
    const result = { type: LoadType.AddColumn, payload: { colId: "col" + getNextNumber(), header: "new header" + newId, cells: {} } };
    for (const key of rowKeys) {
        result.payload.cells[key] = new CellModel("new data " + newId);
    }
    return result;
}
export function loadNewRow(columnKeys) {
    const newKey = "row" + getNextNumber();
    const result = { type: LoadType.AddRow, payload: { rowID: newKey, displayName: newKey, cells: {} } };
    for (const key of columnKeys) {
        result.payload.cells[key] = new CellModel("new data " + getNextNumber());
    }
    return result;
}
export var LoadType;
(function (LoadType) {
    LoadType[LoadType["AddColumn"] = 0] = "AddColumn";
    LoadType[LoadType["AddRow"] = 1] = "AddRow";
    LoadType[LoadType["Remove"] = 2] = "Remove";
    LoadType[LoadType["Modify"] = 3] = "Modify";
})(LoadType || (LoadType = {}));
