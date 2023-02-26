import React from "react";
import { CellModel } from "../model/GridModel.js";

const Cell = ({ cellModel, isUpdated }: { cellModel: CellModel, isUpdated?: boolean; }) => 
{
	return <div className={"gridCell" + (isUpdated ? " highlighted" : "")}> {cellModel.displayName} </div>;
};

export default Cell;