import React from "react";
import Cell from "./Cell.js";
const Header = ({ headerModel }) => {
    return (React.createElement("div", { style: { display: "table-row" } },
        React.createElement("div", { className: "gridCell" }, "Legend"),
        headerModel.columns.map((col, index) => index < 7 && React.createElement(Cell, { cellModel: headerModel.headers[col], key: col }))));
};
export default Header;
