// Counts the Islands using Recursion
function RecursionAlgorithm(gridArray, htmlGridId) {
    var gridArray = gridArray;
    var htmlGridId = htmlGridId;
    var rows = gridArray.length;
    var cols = rows && rows > 0 ? gridArray[0].length : 0;

    var flipNeighborsBits = function (i, j) {
        // if we are outside the boundary, just return
        if (i < 0 || j < 0 || i >= rows || j >= cols) return;

        var cell = $("#" + htmlGridId + " tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")")[0];

        // if it is an empty cell, 
        // set the background to red to help visualize the path - this would not be needed in a real algorithm
        // and return
        if (!gridArray[i][j]) {
            if (!($(cell).hasClass("red") || $(cell).hasClass("green"))) $(cell).addClass("red");
            return;
        };

        // otherwise, set the background to green, again this would not be needed in a real algorithm
        if (!($(cell).hasClass("red") || $(cell).hasClass("green"))) { $(cell).addClass("green"); }
        gridArray[i][j] = false;

        // go north recursively
        flipNeighborsBits(i, j - 1);
        // go north-west recursively
        flipNeighborsBits(i + 1, j - 1);
        // go east recursively
        flipNeighborsBits(i + 1, j);
        // go south-east recursively
        flipNeighborsBits(i + 1, j + 1);
        // go south recursively
        flipNeighborsBits(i, j + 1);
        // go south-west recursively
        flipNeighborsBits(i - 1, j + 1);
        // go east recursively
        flipNeighborsBits(i - 1, j);
        // go north-east recursively
        flipNeighborsBits(i - 1, j - 1);
    };

    this.CountIslands = function () {
        var count = 0;

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                // cell is true
                if (gridArray[i][j]) {
                    count++;

                    // now flip all the neighboring cells to empty
                    flipNeighborsBits(i, j);
                };
            }
        }

        return count;
    };
}