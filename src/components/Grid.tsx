import Row from "./Row.js";
import React, { useState } from "react";
import { CellModel, GridModel, RowModel } from "../model/GridModel.js";
import Header from "./Header.js";
import "../styles/Grid.scss";

const Grid = ({ model }: { model: GridModel; }) =>
{
	//const [model, setModel] = useState<GridModel>(new GridModel());


	return (
		<div style={{ display: "table" }} className="gridControl">
			<div style={{ display: "table-column", width: " 200px" }}></div>
			{/* {model.header.headers.map((header, index) => index < 7 && <div style={{display: "table-column", width: "120px"}}> </div>)} */}
			<Header headerModel={model.header}></Header>

			{model.rowKeys.map((rowKey, index) => <Row rowModel={model.rows[rowKey]} key={rowKey}></Row>)}
		</div>
	);
};

export default Grid;