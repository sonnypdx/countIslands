// Counts the Islands using Recursion algorithm
function RecursionAlgorithm(gridArrayClass, htmlGrid) {
    var gridArrayClass = gridArrayClass;
    var htmlGrid = htmlGrid;
    var gridArray, rows, cols;

    // initialization
    {
        gridArray = gridArrayClass.CopyGridArray();
        rows = gridArrayClass.Rows();
        cols = gridArrayClass.Cols();
    }

    var flipNeighborsBits = function (i, j, islandNum) {
        // if we are outside the boundary, just return
        if (i < 0 || j < 0 || i >= rows || j >= cols) return;

        // return if it is false
        if (!gridArray[i][j]) return;
        // otherwise, mark this as being visited
        else gridArray[i][j] = false;

        // visual feedback
        htmlGrid.HighlightCell(i, j, islandNum);

        // go north recursively
        flipNeighborsBits(i, j - 1, islandNum);
        // go north-west recursively
        flipNeighborsBits(i + 1, j - 1, islandNum);
        // go east recursively
        flipNeighborsBits(i + 1, j, islandNum);
        // go south-east recursively
        flipNeighborsBits(i + 1, j + 1, islandNum);
        // go south recursively
        flipNeighborsBits(i, j + 1, islandNum);
        // go south-west recursively
        flipNeighborsBits(i - 1, j + 1, islandNum);
        // go east recursively
        flipNeighborsBits(i - 1, j, islandNum);
        // go north-east recursively
        flipNeighborsBits(i - 1, j - 1, islandNum);
    };

    this.CountIslands = function () {
        var count = 0;

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                // cell is true
                if (gridArray[i][j]) {
                    count++;

                    // now flip all the neighboring cells to empty
                    flipNeighborsBits(i, j, count);
                };
            }
        }

        return count;
    };
}