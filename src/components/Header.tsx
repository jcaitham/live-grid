import React from "react";
import Cell from "./Cell.js";
import { HeaderModel } from "../model/GridModel.js";


const Header = ({ headerModel }: { headerModel: HeaderModel; }) =>
{
	return (
		<div style={{ display: "table-row" }} >
			<div className="gridCell">Legend</div>
			{headerModel.columns.map((col, index) => index < 7 && <Cell cellModel={headerModel.headers[col]} key={col}></Cell>)}
		</div>
	);
};

export default Header;