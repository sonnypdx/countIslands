function HtmlGrid(jqHtmlGridId, gridArrayClass) {
    var jqHtmlGridId = jqHtmlGridId;
    var gridArrayClass = gridArrayClass;

    // get the table element
    var tblElem = $(jqHtmlGridId)[0];

    // place holders for rows and columns of gridArray
    var gridArray, rows, cols;

    // initialization
    {
        // validate the GridArrayClass and the grid inside
        if (!gridArrayClass) throw "No GridArrayClass instance provided!";
        gridArray = gridArrayClass.Grid();
        rows = gridArrayClass.Rows();
        cols = gridArrayClass.Cols();

        if (!gridArray) throw "Invalid GridArrayClass instance provided!";

        buildHtmlTableGrid();
    }

    // helper private functions
    function getTableRows() {
        return $(jqHtmlGridId + " tr");
    }

    // build the html table along with the click event to make each cell toggle with an "X"
    function buildHtmlTableGrid() {
        $(tblElem).html("");

        // add the rows and cols to the table elements
        for (var i = 0; i < rows; i++) {
            var trElem = document.createElement("tr");
            for (var j = 0; j < cols; j++) {
                var tdElem = document.createElement("td");
                if (gridArray[i][j]) { tdElem.innerHTML = "X"; }
                else { tdElem.innerHTML = ""; }
                tdElem.dataset.row = i;
                tdElem.dataset.col = j;
                tdElem.title = "grid[" + i + "][" + j + "]";
                trElem.appendChild(tdElem)
            }
            tblElem.appendChild(trElem);
        }

        // bind the click event to table which
        // will delegate it to the corresponding cell
        // at the cursor
        $(tblElem).delegate("td", "click", function () {
            var $this = $(this);
            var i = parseInt($this.data("row"));
            var j = parseInt($this.data("col"));

            // keep the underlying grid array synchronized
            if ($this.html() === "X") {
                $this.html("");
                gridArray[i][j] = false;
            }
            else {
                $this.html("X");
                gridArray[i][j] = true;
            }

            //console.log($this.data("row") + "," + $this.data("col"));
        });
    }

    // we may not need this
    //function loadGridData() {
    //    // get the rows of table element
    //    var tblRows = getTableRows();

    //    // set td to "X" if the corresponding cell in data grid is true
    //    // otherwise empty
    //    for (var i = 0; i < rows ; i++) {
    //        for (var j = 0; j < cols; j++) {
    //            var $tdElem = $(tblRows[i].children[j]);
    //            if (gridArray[i][j]) {
    //                $tdElem.html("X")
    //            }
    //            else {
    //                $tdElem.html("");
    //            }
    //        }
    //    }
    //};

    this.HighlightCell = function (i, j, islandNum, clsName) {
        var cName = clsName || "green";
        var cell = $(jqHtmlGridId + " tr:nth-child(" + String(i + 1) + ") td:nth-child(" + String(j + 1) + ")")[0];

        // set the background to green if it is not already
        if (!$(cell).hasClass(cName)) $(cell).addClass(cName);

        // also set the number of island in the cell
        $(cell).html(String(islandNum));
    };

    this.HighlightCellByCssClass = function (i, j, clsName) {
        var cName = clsName || "gray";
        var cell = $(jqHtmlGridId + " tr:nth-child(" + String(i + 1) + ") td:nth-child(" + String(j + 1) + ")")[0];

        // set the background to green if it is not already
        if (!$(cell).hasClass(cName)) $(cell).addClass(cName);
    };

    //this.RemoveCellCssClass = function (i, j, clsName) {
    //    var cell = $(jqHtmlGridId + " tr:nth-child(" + String(i + 1) + ") td:nth-child(" + String(j + 1) + ")")[0];

    //    // set the background to green if it is not already
    //    if (!$(cell).hasClass(clsName)) $(cell).removeClass(clsName);
    //};

    //this.ShowIslandNo = function (i, j, islandNum) {
    //    var cell = $(jqHtmlGridId + " tr:nth-child(" + String(i + 1) + ") td:nth-child(" + String(j + 1) + ")")[0];

    //    $(cell).html(String(islandNum));
    //};

    this.ClearHighlighting = function () {
        buildHtmlTableGrid();
    };
}