function GridArrayClass(gridArray) {
    var gridArray = gridArray;
    var rows = gridArray.length;
    var cols = rows && rows > 0 ? gridArray[0].length : 0;

    // external facing methods
    this.Grid = function () {
        return gridArray;
    };

    this.Rows = function () {
        return rows;
    };

    this.Cols = function () {
        return cols;
    };

    this.GetGridStateAsJSON = function () {
        var gridRows = [];

        // create a string representation of each row
        // and store it in a string array, gridRows
        for (var i = 0; i < rows ; i++) {
            var str = "";
            for (var j = 0; j < cols; j++) {
                str += gridArray[i][j] ? ", 1" : ", 0";
            }
            gridRows[i] = "&nbsp;&nbsp;&nbsp;[ " + str.substr(2) + " ]";
        }

        // join the rows by a comma and newline char
        // so it will print each row on a separate line
        var result = gridRows.join(",<br/>");
        return "[<br/>" + result + "<br/>]";
    };

    this.Clone = function () {
        var newGridArray = [];

        // just traverse through the grid and copy the state
        for (var i = 0; i < rows ; i++) {
            newGridArray[i] = [];
            for (var j = 0; j < cols; j++) {
                newGridArray[i][j] = gridArray[i][j];
            }
        }

        return newGridArray;
    };
}