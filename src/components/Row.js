import Cell from "./Cell.js";
import React from "react";
const Row = ({ rowModel }) => {
    return (React.createElement("div", { style: { display: "table-row" } },
        React.createElement("div", { className: "gridCell" }, rowModel.displayName),
        rowModel.columns.map((column, index) => index < 7 && React.createElement(Cell, { cellModel: rowModel.cells[column], key: column, isUpdated: rowModel.updatedCells[column] === true }))));
};
export default Row;
