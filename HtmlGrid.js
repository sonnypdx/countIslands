function HtmlGrid(htmlGridId, rows, cols) {
    var htmlGridId = htmlGridId;
    var rows = rows;
    var cols = cols;

    this.Display = function () {
        // get the table element
        var tblElem = document.getElementById(htmlGridId);

        // add the rows and cols to the table elements
        for (var i = 0; i < rows; i++) {
            var trElem = document.createElement("tr");
            for (var j = 0; j < cols; j++) {
                var tdElem = document.createElement("td");
                tdElem.innerHTML = "&nbsp";
                tdElem.dataset.row = i;
                tdElem.dataset.col = j;
                trElem.appendChild(tdElem)
            }
            tblElem.appendChild(trElem);
        }

        // bind the click event to table which
        // will delegate it to the corresponding cell
        // at the cursor
        $("#grid").delegate("td", "click", function () {
            var $this = $(this);
            var i = parseInt($this.data("row"));
            var j = parseInt($this.data("col"));

            if ($this.html() === "X") {
                $this.html("");
            }
            else {
                $this.html("X");
            }

            console.log($this.data("row") + "," + $this.data("col"));
        });
    };

    this.GetGridArray = function () {
        var gridArray = [];

        // get the rows of table element
        var tblRows = $("#" + htmlGridId + " tr");

        // if the td has an "X" set the corresponding 
        // cell in the grid to true
        // otherwise false
        for (var i = 0; i < rows ; i++) {
            gridArray[i] = [];
            for (var j = 0; j < cols; j++) {
                var $tdElem = $(tblRows[i].children[j]);
                if ($tdElem.html() === "X") {
                    gridArray[i][j] = true;
                }
                else {
                    gridArray[i][j] = false;
                }
            }
        }

        return gridArray;
    };

    this.LoadTestData = function (testDataGrid) {
        if (!testDataGrid || testDataGrid.length !== rows ||
            testDataGrid[0].length !== cols) {
            throw "Test data provided is not of the same size as the current grid";
        };

        // get the rows of table element
        var tblRows = $("#" + htmlGridId + " tr");

        // cell in the grid is true, set "X" in td
        // otherwise empty
        for (var i = 0; i < rows ; i++) {
            for (var j = 0; j < cols; j++) {
                var $tdElem = $(tblRows[i].children[j]);
                if (testDataGrid[i][j]) {
                    $tdElem.html("X")
                }
                else {
                    $tdElem.html("");
                }
            }
        }
    };

    this.ClearHighlighting = function () {
        $("#" + htmlGridId + " tr td").removeClass();
    };

    this.ClearIslands = function () {
        $("#" + htmlGridId + " tr td").html("");
    };
}