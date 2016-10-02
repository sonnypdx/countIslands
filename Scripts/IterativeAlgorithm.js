// Counts the Islands using Iterative algorithm
function IterativeAlgorithm(gridArrayClass, htmlGrid) {
    var gridArrayClass = gridArrayClass;
    var htmlGrid = htmlGrid;
    var gridArray, rows, cols, trackerGrid;

    // initialization
    {
        gridArray = gridArrayClass.Clone();
        rows = gridArrayClass.Rows();
        cols = gridArrayClass.Cols();
        trackerGrid = getTrackerGrid();
    }

    function getTrackerGrid() {
        var trackerGrid = [];

        for (var i = 0; i < rows; i++) {
            trackerGrid[i] = [];
            for (var j = 0; j < cols; j++) {
                trackerGrid[i][j] = 0;
            }
        }

        return trackerGrid;
    }

    function getIslandNo(i, j) {
        // if we are outside the boundary, just return
        if (i < 0 || j < 0 || i >= rows || j >= cols) return -1;
        // otherwise return value
        return trackerGrid[i][j];
    }

    function setIslandNo(i, j, islandNo) {
        // if we are outside the boundary, just return
        if (i < 0 || j < 0 || i >= rows || j >= cols) return;

        // if the value in trackerGrid is higher than the islandNo being passed
        // set trackerGrid'cell with that value
        if (trackerGrid[i][j] > islandNo) {
            trackerGrid[i][j] = islandNo;
        }
    }

    // we will examine the immediate neighbor cells
    // to see if any of them has already been identified with an island
    // if so, just return that value
    // otherwise, return 0 to indicate it is a new island
    function getMaxIslandNoAround(i, j) {
        var maxIslandNo = 0, islandNo = 0;

        // check north adjacent cell
        if ((islandNo = getIslandNo(i, j - 1)) > 0 && islandNo > maxIslandNo) {
            maxIslandNo = islandNo;
        }
        //check north-west adjacent cell
        if ((islandNo = getIslandNo(i + 1, j - 1)) > 0 && islandNo > maxIslandNo) {
            maxIslandNo = islandNo;
        }
        //check east adjacent cell
        if ((islandNo = getIslandNo(i + 1, j)) > 0 && islandNo > maxIslandNo) {
            maxIslandNo = islandNo;
        }
        //check south-east adjacent cell
        if ((islandNo = getIslandNo(i + 1, j + 1)) > 0 && islandNo > maxIslandNo) {
            maxIslandNo = islandNo;
        }
        //check south adjacent cell
        if ((islandNo = getIslandNo(i, j + 1)) > 0 && islandNo > maxIslandNo) {
            maxIslandNo = islandNo;
        }
        //check south-west adjacent cell
        if ((islandNo = getIslandNo(i - 1, j + 1)) > 0 && islandNo > maxIslandNo) {
        }
        //check east adjacent cell
        if ((islandNo = getIslandNo(i - 1, j)) > 0 && islandNo > maxIslandNo) {
            maxIslandNo = islandNo;
        }
        //check north-east adjacent cell
        if ((islandNo = getIslandNo(i - 1, j - 1)) > 0 && islandNo > maxIslandNo) {
            maxIslandNo = islandNo;
        }

        return maxIslandNo;
    }

    // we will examine the immediate neighbor cells
    // to see if any of them has a different no. for the island
    // if so, then we take the minmum value
    // and update the trackerGrid
    // and return true
    // otherwise false
    function hasAdjacentCellWithDiffNo(i, j) {
        var minIslandNo = trackerGrid[i][j];
        var islandNo;

        // check north adjacent cell
        if ((islandNo = getIslandNo(i, j - 1)) > 0 && islandNo < minIslandNo) {
            minIslandNo = islandNo;
        }
        //check north-west adjacent cell
        if ((islandNo = getIslandNo(i + 1, j - 1)) > 0 && islandNo < minIslandNo) {
            minIslandNo = islandNo;
        }
        //check east adjacent cell
        if ((islandNo = getIslandNo(i + 1, j)) > 0 && islandNo < minIslandNo) {
            minIslandNo = islandNo;
        }
        //check south-east adjacent cell
        if ((islandNo = getIslandNo(i + 1, j + 1)) > 0 && islandNo < minIslandNo) {
            minIslandNo = islandNo;
        }
        //check south adjacent cell
        if ((islandNo = getIslandNo(i, j + 1)) > 0 && islandNo < minIslandNo) {
            minIslandNo = islandNo;
        }
        //check south-west adjacent cell
        if ((islandNo = getIslandNo(i - 1, j + 1)) > 0 && islandNo < minIslandNo) {
            minIslandNo = islandNo;
        }
        //check east adjacent cell
        if ((islandNo = getIslandNo(i - 1, j)) > 0 && islandNo < minIslandNo) {
            minIslandNo = islandNo;
        }
        //check north-east adjacent cell
        if ((islandNo = getIslandNo(i - 1, j - 1)) > 0 && islandNo < minIslandNo) {
            minIslandNo = islandNo;
        }

        // now compare the current cell's no. with the min no. of 
        // all the surrounding ids
        //if (minIslandNo != trackerGrid[i][j]) {
        if (trackerGrid[i][j] > minIslandNo) {
            // update all of the cells including 
            // the current one with the new #
            trackerGrid[i][j] = minIslandNo;
            setIslandNo(i, j - 1, minIslandNo);
            setIslandNo(i + 1, j - 1, minIslandNo);
            setIslandNo(i + 1, j, minIslandNo);
            setIslandNo(i + 1, j + 1, minIslandNo);
            setIslandNo(i, j + 1, minIslandNo);
            setIslandNo(i - 1, j + 1, minIslandNo);
            setIslandNo(i - 1, j, minIslandNo);
            setIslandNo(i - 1, j - 1, minIslandNo);

            return true;
        }
        else {
            return false;
        }
    }

    function collapseIslandsByDirection(args) {
        // get all of the arguments into local vars
        var rowStart = args.rowStart;
        var rowEnd = args.rowEnd;
        var colStart = args.colStart;
        var colEnd = args.colEnd;
        var rowStep = args.rowStep;
        var colStep = args.colStep;
        var dirName = args.dirName;

        var collapsedCount = 0;

        for (var i = rowStart; i != rowEnd; i = i + rowStep) {
            for (var j = colStart; j != colEnd; j = j + colStep) {
                //htmlGrid.HighlightCellByCssClass(i, j, "curr");

                //Stop here for debugging
                //if (i === 1 && j === 24) {
                //    console.log("debug");
                //}

                // cell has an island no.
                if (trackerGrid[i][j] > 0) {
                    // if any of the surrounding cells have a different no.
                    // then this hasAdjacentCellWithDiffNo will update
                    // them with the lower number and return true
                    // then we will increment the counter for # of collapses 
                    // - purely for debugging now, i do not know if there is anyway to 
                    // calculate the # of islands with this counter
                    // otherwise it will return  false;
                    if (hasAdjacentCellWithDiffNo(i, j)) {
                        collapsedCount++;
                    }

                    // update the island # on the HtmlGrid for visual feedback
                    htmlGrid.HighlightCell(i, j, trackerGrid[i][j], dirName);
                }
            }
        }

        return collapsedCount;
    }

    // count the unique ids count in the trackerGrid
    function countIslandsFromTrackerGrid() {
        var islandNumbers = {};
        var numAsKey = "";

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (trackerGrid[i][j] > 0) {
                    numAsKey = String(trackerGrid[i][j]);
                    if (!islandNumbers.hasOwnProperty(numAsKey)) {
                        islandNumbers[numAsKey] = null;
                    }
                }
            }
        }

        return Object.keys(islandNumbers).length;
    }

    // public facing methods
    this.CountIslands = function () {
        var count = 0;

        // TBLR
        // traverse from top-to-bottom and from left-to-right
        // this will mark two sections of islands with different no.
        // depending upon the layout of the island
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                //htmlGrid.HighlightCellByCssClass(i, j, "curr");

                //Stop here for debugging
                if (i === 37 && j === 5) {
                    console.log("debug");
                }

                // cell is true
                if (gridArray[i][j]) {
                    // if this is a brand new island (i.e. we have not identified it yet)
                    // then getMaxIslandNoAround will return 0
                    // we will increment the island count and update the tracker grid
                    var num = getMaxIslandNoAround(i, j);
                    if (num === 0) { num = ++count; }
                    trackerGrid[i][j] = num;

                    // visually highlight this grid
                    // show the island # on the HtmlGrid for visual feedback
                    htmlGrid.HighlightCell(i, j, trackerGrid[i][j], "TBLR");
                };
            }
        }

        // if after initial iteration, we do not have any islands simply return
        if (!count) return count;

        // TBRL
        // traverse from top-to-bottom and from right-to-left
        // to fix the multiple ids of adjacent islands
        var collapsedTBRL = 0;
        // row loop: i = 0; i < rows; i++
        // col loop: j = cols-1; j >= 0; j--
        var args = {
            rowStart: 0,
            rowEnd: rows,
            colStart: cols - 1,
            colEnd: -1,
            rowStep: 1,
            colStep: -1,
            dirName: "TBRL",
        };
        collapsedTBRL = collapseIslandsByDirection(args);

        // BTRL
        // traverse from bottom-to-top and from right-to-left
        // to fix the multiple ids of adjacent islands
        var collapsedBTRL = 0;
        // row loop: i = rows-1; i >= 0; i--
        // col loop: j = cols-1; j >= 0; j--
        var args = {
            rowStart: rows - 1,
            rowEnd: -1,
            colStart: cols - 1,
            colEnd: -1,
            rowStep: -1,
            colStep: -1,
            dirName: "BTRL",
        };
        collapsedBTRL = collapseIslandsByDirection(args);

        // BTLR
        // traverse from bottom-to-top and from left-to-right
        // to fix the multiple ids of adjacent islands
        var collapsedBTLR = 0;
        // row loop: i = rows-1; i >= 0; i--
        // col loop: j = 0; j < cols; j++
        var args = {
            rowStart: rows - 1,
            rowEnd: -1,
            colStart: 0,
            colEnd: cols,
            rowStep: -1,
            colStep: 1,
            dirName: "BTLR",
        };
        collapsedBTLR = collapseIslandsByDirection(args);

        // had to add this to catch one edge case in the test dataset - testData75x50a
        // TBLR
        // traverse from top-to-bottom and from left-to-right
        // to fix the multiple ids of adjacent islands
        var collapsedTBLR = 0;
        // row loop: i = 0; i < rows; i++
        // col loop: j = 0; j < cols; j++
        var args = {
            rowStart: 0,
            rowEnd: rows,
            colStart: 0,
            colEnd: cols,
            rowStep: 1,
            colStep: 1,
            dirName: "TBLR",
        };
        collapsedTBLR = collapseIslandsByDirection(args);

        return countIslandsFromTrackerGrid();
    };
}