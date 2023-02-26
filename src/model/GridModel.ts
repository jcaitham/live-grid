
let incNumber: number = 0;

export const getNextNumber = () =>
{
	return incNumber++;
};


export interface GridModel
{
	header: HeaderModel;
	rows: { [rowID: string]: RowModel; };
	rowKeys: string[];
	columnKeys: string[];
	updatedCells: { [rowID: string]: { [columnID: string]: boolean; }; };
};

export interface HeaderModel
{
	headers: { [key: string]: CellModel; };
	columns: string[];
}

export interface RowModel
{
	//cells: CellModel[];
	cells: { [key: string]: CellModel; };
	//readonly columns: string[];
	displayName: string;
	rowKey: string;
	updatedCells: { [colID: string]: boolean; };
};

export interface CellModel
{
	displayName: string;
	isUpdated: boolean;
};


export class GridModel implements GridModel
{
	public constructor()
	{
		this.rows = {};
		this.rowKeys = [];
		this.columnKeys = [];
		this.header = new HeaderModel(this.columnKeys);
		this.updatedCells = {};

	}

	public clone(): GridModel
	{
		const newModel = new GridModel();
		newModel.header = this.header;
		//newModel.header.headers = this.header.headers;
		//newModel.columns = [...this.columns];
		newModel.updatedCells = this.updatedCells;
		newModel.rowKeys = [...this.rowKeys];
		newModel.columnKeys = [...this.columnKeys];
		newModel.rows = {};
		for (const row of this.rowKeys)
		{
			newModel.rows[row] = this.rows[row].clone();
		}

		this.updatedCells = {};
		for (const row of this.rowKeys)
		{
			this.rows[row].updatedCells = {};
		}
		return newModel;
	}

	public addColumn(columnKey: string, displayName: string, cells: { [row: string]: CellModel; }): void
	{
		const newCol = columnKey;
		this.columnKeys.unshift(newCol);
		this.header.addCell(newCol, new CellModel(newCol));

		for (const key of this.rowKeys)
		{
			if (cells[key] !== undefined)
			{
				this.rows[key].addCell(columnKey, cells[key]);
				if (!this.updatedCells[key])
				{
					this.updatedCells[key] = {};
					this.rows[key].updatedCells = this.updatedCells[key];
				}
				this.updatedCells[key][columnKey] = true;
			}
		}
	}

	public addRow(rowKey: string, displayName: string, cells: { [col: string]: CellModel; }): void
	{
		this.rows[rowKey] = new RowModel(rowKey, displayName, cells, this.columnKeys);
		this.rowKeys.push(rowKey);

		this.updatedCells[rowKey] = {};
		this.rows[rowKey].updatedCells = this.updatedCells[rowKey];

		for (const columnKey of this.columnKeys)
		{
			this.updatedCells[rowKey][columnKey] = true;
		}
	}

	/**
	 * Probably should be for testing only, I don't know why anyone except the data model would usually need to mess with column ids
	 * @returns 
	 */
	public getColumns(): string[]
	{
		return this.columnKeys;
	}
}

export class HeaderModel implements HeaderModel
{
	public constructor(columns: string[])
	{
		this.headers = {};
		this.columns = columns;
	}

	public addCell(col: string, newCell: CellModel)
	{
		this.headers[col] = newCell;
	}
}

export class RowModel implements RowModel
{
	public readonly columns: string[];  // if you want this to be read-only, you have to put it in the same actual class as the constructor apparently.  interface doesn't count
	public constructor(key: string, displayName: string, cells: { [col: string]: CellModel; }, columns: string[])
	{
		this.rowKey = key;
		this.cells = cells;
		this.columns = columns;
		this.displayName = displayName;
		this.updatedCells = {};
	}

	public addCell(columnKey: string, newCell: CellModel)
	{
		this.cells[columnKey] = newCell;
	}

	public clone(): RowModel
	{
		const newRow = new RowModel(this.rowKey, this.displayName, { ...this.cells }, [...this.columns]);
		newRow.updatedCells = { ...this.updatedCells };
		return newRow;
	}
}

export class CellModel implements CellModel
{
	public constructor(name?: string)
	{
		if (name === undefined)
		{
			this.displayName = "hello";
		}
		else
		{
			this.displayName = name;
		}
	}
}


