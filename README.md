# Count Islands on a (M x N) Grid
An island is a connected set of cells that are isolated/separated by a border or empty cells.  Just a fun project to test the efficiency of Recursive and Iterative algorithmic approaches to solve this problem.

**Instructions**
* Simply clone the project and open the index.html to see the test harness in action.
* It automatically loads the biggest test data set (75X50 grid with 60 islands) that I have included in the project.
* It also defaults to solving it using Iterative Algorithm.
* Click on the "Count Islands" button and it should display 60 by the "Calculated # of Islands" label.
* Change the algorithm to Recursive and count it.  You can tell Recursive is slightly faster compared to Iterative approach. You can see the timers logged to the Console window. It would be interesting to see how Recursive performs on a very large data set compared to Iterative.
* Click on "Clear Highlighting" button to clear the highlighting but keep the islands on the grid.
* You can also click on any cell to toggle its state.

**Sample Output from Iterative Algorithm:**
![Sample Output from Iterative Algorithm](https://github.com/sonnypdx/countIslands/blob/master/images/countIslands_Iterative.png) 

**Sample Output from Recursive Algorithm:**
![Sample Output from Recursive Algorithm](https://github.com/sonnypdx/countIslands/blob/master/images/countIslands_Recursion.png)

**Future Improvements**   
*Some future improvements that I can think of.*
* Try it on few very large data sets to compare both algorithms.
* Try to improve the efficiency of Iterative algorithm.
* Convert the project to ReactJS optionally use NodeJS in the backend.
* Convert the project to AngularJS optionally use NodeJS in the backend.
* Add a feature to start with an empty grid for a given # of rows and columns.
* Add a feature to fill the grid with some random shapes.
