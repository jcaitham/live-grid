import { CellModel, getNextNumber, GridModel, HeaderModel, RowModel } from "../model/GridModel.js";

export function loadInitialData(numColumns: number, numRows: number): GridModel
{
	const model = new GridModel();

	for (let i = 0; i < numColumns; i++)
	{
		const colID = "col" + getNextNumber();
		model.addColumn(colID, colID, {});
	}

	for (let i = 0; i < numRows; i++)
	{
		const cells: { [col: string]: CellModel; } = {};
		for (const col of model.getColumns())
		{
			cells[col] = new CellModel("starter cell " + getNextNumber());
		}

		const newId = "row" + getNextNumber();

		model.addRow(newId, newId, cells);
	}

	return model;
}

export function loadNewData(rows: string[], columns: string[]): IResponse
{
	const random = Math.random();
	let result: IResponse;

	if (random < .5)
	{
		result = loadNewColumn(rows);
	}
	else
	{
		result = loadNewRow(columns);
	}
	return result;
}

export function loadNewColumn(rowKeys: string[]): IAddColumnResponse
{
	const newId = getNextNumber();
	const result: IAddColumnResponse = { type: LoadType.AddColumn, payload: { colId: "col" + getNextNumber(), header: "new header" + newId, cells: {} } };

	for (const key of rowKeys)
	{
		result.payload.cells[key] = new CellModel("new data " + newId);
	}
	return result;
}

export function loadNewRow(columnKeys: string[]): IAddRowResponse
{
	const newKey = "row" + getNextNumber();

	const result: IAddRowResponse = { type: LoadType.AddRow, payload: { rowID: newKey, displayName: newKey, cells: {} } };
	for (const key of columnKeys)
	{
		result.payload.cells[key] = new CellModel("new data " + getNextNumber());
	}
	return result;
}

export interface IResponse
{
	type: LoadType;
	payload: any;
}

export interface IAddColumnResponse extends IResponse
{
	type: LoadType.AddColumn;
	payload: { colId: string, header: string, cells: { [rowID: string]: CellModel; }; };
}

export interface IAddRowResponse extends IResponse
{
	type: LoadType.AddRow;
	payload: { rowID: string, displayName: string, cells: { [colID: string]: CellModel; }; };
}

export enum LoadType
{
	AddColumn,
	AddRow,
	Remove,
	Modify
}