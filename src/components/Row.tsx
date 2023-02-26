import Cell from "./Cell.js";
import React from "react";
import { RowModel } from "../model/GridModel.js";

const Row = ({ rowModel }: { rowModel: RowModel; }) =>
{
	return (
		<div style={{ display: "table-row" }}>
			<div className="gridCell">{rowModel.displayName}</div>
			{rowModel.columns.map((column, index) => index < 7 && <Cell cellModel={rowModel.cells[column]} key={column} isUpdated={rowModel.updatedCells[column] === true}></Cell>)}
		</div>
	);
};

export default Row;