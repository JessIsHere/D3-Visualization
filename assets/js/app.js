
// Create 2 variables defining SVG area dimensions

var svgWidth = 960;
var svgHeight = 450; 

  console.log(svgWidth);
  console.log(svgHeight);



// Create a variable defining the chart's margins as an object

var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60,
};
  console.log(margin)



// Create 2 variables to define the dimensions of the chart area

var chartWidth = svgWidth - margin.left - margin.right;
                // 960 - 60 - 60
var chartHeight = svgHeight - margin.top - margin.bottom
                // 500 - 60 - 60
  console.log(chartHeight);
  console.log(chartWidth);



// Create a variable to store svg information - select the body of your html

var svg = d3.select('body')

  // add (append) the SVG area to it - define class

  .append('svg')

  // Set dimensions of svg - define class and call variables storing dimensions

  .attr('width', svgWidth)
  .attr('height', svgHeight);

  console.log(svg);



// Create variable for chart that adds(appends) an area to group elements

var g = svg.append('g')

  // move chart to within margin object

  .attr('transform', `translate(${margin.left}, ${margin.top})`);
  console.log(g)


// Load csv data
d3.csv('assets/data/data.csv').then(function(myData) {

  // create temporary function to cast string values to int 
  myData.forEach(function(castInt) {
    castInt.healthcare = +castInt.healthcare;
    castInt.poverty = +castInt.poverty;
    castInt.smokesLow = +castInt.smokesLow;
    castInt.smokesHigh = +castInt.smokesHigh;
  });
    console.log(myData)



  // scale data - Using sqrtScale (a specialize case of the powerscale useful for sizing circles by area vs radius)
  
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.healthcare)])
    .range([0, chartWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.poverty)])
    .range([chartHeight, 0]);

    var xxLinearScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.smokesLow)])
    .range([0, chartWidth]);

  var yyLinearScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.smokesHigh)])
    .range([chartHeight, 0]);


  // Step 3: Create axis functions

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  g.append('g')
    .attr('transform',`translate(0, ${chartHeight})`)
    .call(bottomAxis)

  g.append('g')
    .call(leftAxis)

  g.selectAll('dot')
    .data(myData)
    .enter()
    .append('circle')
    .attr('r', '5')
    .attr('cx', move => xLinearScale(move.healthcare))
    .attr('cy', move => yLinearScale(move.smokesLow))
    .attr('fill', 'yellow');
    // .attr('opacity', '.5');

    g.selectAll('dot')
    .data(myData)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cx', move => xxLinearScale(move.poverty))
    .attr('cy', move => yyLinearScale(move.smokesHigh))
    .attr('fill', 'pink');

    // function circleColour(d){
    //   if( d => myData(d.healthcare)){
    //     return "blue";
    //   } else {
    //     return "pink";
    //   }
    // }

});
