import React, { useEffect, useRef, useState } from "react";
import { IResponse, loadInitialData, loadNewColumn, loadNewData, LoadType } from "./dataBroker/DataBroker.js";
import Grid from "./components/Grid.js";
import { CellModel, GridModel, HeaderModel } from "./model/GridModel.js";


const LiveGrid = () =>
{
	const [model, setModel] = useState(new GridModel());
	const tempRef = useRef<GridModel>(new GridModel());
	const [isPaused, setIsPaused] = useState<boolean>(false);

	useEffect(() =>
	{
		tempRef.current = loadInitialData(3, 10);
		console.log("initializing tempModel");
		setModel(tempRef.current);
	},
		[]);

	useEffect(() =>
	{
		const timer = setInterval(() => 
		{
			if (!isPaused)
			{
				loadData(tempRef.current);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [isPaused]);

	useEffect(() =>
	{
		const timer = setInterval(() => 
		{
			if (!isPaused)
			{
				setModel(tempRef.current.clone());
				console.log("flushing data");
			}

		}, 1000);

		return () => clearInterval(timer);
	}, [isPaused]);

	return (
		<div>
			<button onClick={() => setIsPaused(!isPaused)}>{isPaused ? "Unpause" : "Pause"}</button>
			<Grid model={model}></Grid>
		</div>
	);
};

/**
 * Get some new data and then merge it into our live grid model
 * @param model 
 */
const loadData = (model: GridModel) =>
{
	const result: IResponse = loadNewData(model.rowKeys, model.getColumns());

	switch (result.type)
	{
		case LoadType.AddColumn:
			model.addColumn(result.payload.colId, result.payload.header, result.payload.cells);
			break;
		case LoadType.AddRow:
			model.addRow(result.payload.rowID, result.payload.displayName, result.payload.cells);
			break;
		default:
			break;
	}
};

export default LiveGrid;