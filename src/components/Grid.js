import Row from "./Row.js";
import React from "react";
import Header from "./Header.js";
import "../styles/Grid.scss";
const Grid = ({ model }) => {
    //const [model, setModel] = useState<GridModel>(new GridModel());
    return (React.createElement("div", { style: { display: "table" }, className: "gridControl" },
        React.createElement("div", { style: { display: "table-column", width: " 200px" } }),
        React.createElement(Header, { headerModel: model.header }),
        model.rowKeys.map((rowKey, index) => React.createElement(Row, { rowModel: model.rows[rowKey], key: rowKey }))));
};
export default Grid;
