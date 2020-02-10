
// Create 2 variables defining SVG area dimensions

function makeResponsive() {

  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

// Create a variable defining the chart's margins as an object

var margin = {
  top: 125,
  right: 125,
  bottom: 125,
  left: 125,
};


// Create 2 variables to define the dimensions of the chart area

var chartWidth = svgWidth - margin.left - margin.right;

var chartHeight = svgHeight - margin.top - margin.bottom;

// Create a variable to store svg information - select the body of your html

var svg = d3.select('body')

  // add (append) the SVG area to it - define class

  .append('svg')

  // Set dimensions of svg - define class and call variables storing dimensions

  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .attr("font-size", 10)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr('fill', 'white')

// Create variable for chart that adds(appends) an area to group elements

var g = svg.append('g')

  // move chart to within margin object

  .attr('transform', `translate(${margin.left}, ${margin.top})`);


// Load csv data
d3.csv('assets/data/data.csv').then(function(myData) {

  // create temporary function to cast string values to int 
  myData.forEach(function(castInt) {
    castInt.healthcare = +castInt.healthcare;
    castInt.poverty = +castInt.poverty;
    castInt.smokesLow = +castInt.smokesLow;
    castInt.smokesHigh = +castInt.smokesHigh;
  });
  // scale data - Using sqrtScale (a specialize case of the powerscale useful for sizing circles by area vs radius)
  
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.healthcare)]).nice()
    .range([0, chartWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.poverty)]).nice()
    .range([chartHeight, 0]);

    var xxLinearScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.smokesLow)])
    .range([0, chartWidth]);

  var yyLinearScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.smokesHigh)])
    .range([chartHeight, 0]);
  
  // var stateAbbr = d3.select()



  // Step 3: Create axis functions

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  g.append('g')
    .attr('transform',`translate(0, ${chartHeight})`)
    .call(bottomAxis)
    .attr("stroke-width", '3')
    .selectAll('text')
      .attr("transform", "translate(-10,10)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", 16)
      .style("fill", "#182132");

  g.append('g')
    .call(leftAxis)
    .attr("stroke-width", '3')
    .selectAll("text")
      .attr("transform", "translate(-10,10)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", 16)
      .style("fill", "#182132");

  var dots = g.selectAll('dot')
    .data(myData)
    .enter()
    .append('circle')
    .attr('r', 15)
    .attr('cx', move => xLinearScale(move.healthcare))
    .attr('cy', move => yLinearScale(move.poverty))
    .attr('fill', '#d52f4c')
    .attr("stroke-width", "1")
    .attr("stroke", "#ffbb00")
    .on("mouseover", function() {
      d3.select(this)
        .transition()
        .duration(750)
        .attr("r", 20)
        .attr("fill", "#ffbb00");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .attr("r", 15)
          .duration(1000)
          .attr("fill", "#d52f4c");
      });
    

    g.selectAll('dot')
    .data(myData)
    .enter()
    .append('circle')
    .attr('r', 15)
    .attr('cx', move => xxLinearScale(move.smokesLow))
    .attr('cy', move => yyLinearScale(move.smokesHigh))
    .attr('fill', '#69c0b8')
    .attr("stroke-width", "1")
    .attr("stroke", "#182132")
    .on("mouseover", function() {
      d3.select(this)
        .transition()
        .duration(750)
        .attr("r", 20)
        .attr("fill", "#182132");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .attr("r", 15)
          .duration(1000)
          .attr("fill", "#69c0b8");
      });


    // adding abbreviations to circles - cant fully figure it out
            g.selectAll("dot")
              .data(myData)
              .enter()
              .append("text")
              // Add your code below this line
              .attr("x", d => xLinearScale(d.healthcare))
              .attr("y", d => yLinearScale(d.poverty))
              .text(d => d.abbr);   

              g.selectAll("dot")
              .data(myData)
              .enter()
              .append("text")
              // Add your code below this line
              .attr("x", d => xxLinearScale(d.smokesLow))
              .attr("y", d => yyLinearScale(d.smokesHigh))
              .text(d => d.abbr); 
              
              

// Adding axis titles - For some reason they aren't showing but I know the code works - They exist in the html


 var xtitles = g.append("text")
              .attr("transform", "rotate(-90)")
              .attr("text-anchor", "middle")  
              .style("font-size", "18px") 
              .style("text-decoration", "underline")
              .attr("fill", "black")  
              .attr("y", 0 - margin.left + 25)
              .attr("x", 0 - (chartHeight / 2))
              .attr("dy", "1em")
              .attr("class", "axisText")
              .text("Comparison");

  var ytitles = g.append("text")
              .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.bottom/2})`)
              .attr("text-anchor", "middle")  
              .style("font-size", "18pxpx") 
              .style("text-decoration", "underline")
              .attr("fill", "black")  
              .attr("class", "axisText")
              .text("Title");
      
    })
    
    .catch(function(error) {
      console.log(error);
    
    });
}

// // When the browser loads, makeResponsive() is called.
makeResponsive();

// // When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

    

    // function circleColour(d){
    //   if(d.healthcare = 'healthcare'){
    //     return "blue";
    //   } else {
    //     return "pink";
    //   }
    // }


