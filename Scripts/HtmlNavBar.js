function HtmlNavBar(testDataProv, elemIds) {
    var testDataProv = testDataProv;
    var elemIds = elemIds;
    var testDataSets;
    var gridArrayClass;
    var htmlGrid;
    
    // initialization
    {
        // add # sign to all ids so we can easily refer them using jQuery
        for (var id in elemIds) {
            elemIds[id] = "#" + elemIds[id];
        }

        // get the test datasets and load them in the dropdown
        testDataSets = testDataProv.GetTestDataSets();
        loadTestDataDropDown();

        // bind the event for LoadTestDataButton click
        $(elemIds.LoadTestDataButton).bind("click", testDataSelected);

        // bind the event for CountIslandsButton click
        $(elemIds.CountIslandsButton).bind("click", countIslands);

        // bind the event for ClearHilightButton click
        $(elemIds.ClearHilightButton).bind("click", function () {
            htmlGrid.ClearHighlighting();
        });

        // bind the event for ExportGridButton click
        $(elemIds.ExportGridButton).bind("click", exportGridData);
    }

    //private methods
    function loadTestDataDropDown() {
        $(elemIds.TestDataDropDown).length = 0;
        var options = $(elemIds.TestDataDropDown)[0].options;
        for (var dsTitle in testDataSets) {
            options[options.length] = new Option(testDataSets[dsTitle].title, dsTitle);
        }
    }

    function testDataSelected() {
        var dsId = $(elemIds.TestDataDropDown).val();
        if (dsId && testDataSets[dsId]) {
            gridArrayClass = new GridArrayClass(testDataSets[dsId].data);
            htmlGrid = new HtmlGrid(elemIds.GridTable, gridArrayClass);

            // display the metadata in the UI
            $(elemIds.RowsLabel).html(gridArrayClass.Rows());
            $(elemIds.ColsLabel).html(gridArrayClass.Cols());
            $(elemIds.ExpectedCountLabel).html(testDataSets[dsId].islandCount);
            $(elemIds.CalculatedCountLabel).html("N/A");
        }
    }

    function countIslands() {
        console.log("Counting Started at ..." + new Date().toLocaleTimeString());
        var selAlgorithm = $(elemIds.AlgorithmDropDown).val();
        var counter;
        if (selAlgorithm === "1") {
            counter = new RecursionAlgorithm(gridArrayClass, htmlGrid);
        }
        else if (selAlgorithm === "2") {
            counter = new IterativeAlgorithm(gridArrayClass, htmlGrid);
        }
        var c = counter.CountIslands();
        console.log("Counting DONE at ..." + new Date().toLocaleTimeString());
        $(elemIds.CalculatedCountLabel).html(c);
    }

    function exportGridData() {
        var gridDataJSON = gridArrayClass.GetGridStateAsJSON();
        var winJSON = window.open();
        winJSON.document.write(gridDataJSON);
    }
}