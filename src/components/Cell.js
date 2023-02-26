import React from "react";
const Cell = ({ cellModel, isUpdated }) => {
    return React.createElement("div", { className: "gridCell" + (isUpdated ? " highlighted" : "") },
        " ",
        cellModel.displayName,
        " ");
};
export default Cell;
