
// Create 2 variables defining SVG area dimensions

function makeResponsive() {

  // Load csv data
d3.csv('assets/data/data.csv').then(function(myData) {

  
  var body = d3.select("#scatter").selectAll('svg');
  

  // clear svg is not empty
  if (!body.empty()) {
    body.remove();
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

var w = svgWidth - margin.left - margin.right;

var h = svgHeight - margin.top - margin.bottom;

// Create a variable to store svg information - select the body of your html

var svg = d3.selectAll('#scatter')

  // add (append) the SVG area to it - define class

  .append('svg')

  // Set dimensions of svg - define class and call variables storing dimensions

  .attr('width', svgWidth)
  .attr('height', svgHeight)
  

// Create variable for chart that adds(appends) an area to group elements

var g = svg
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);
 
  // create temporary function to cast string values to int 
  myData.forEach(function(castInt) {
   
    castInt.healthcare = +castInt.healthcare;
    castInt.poverty = +castInt.poverty;
    castInt.smokes = +castInt.smokes;
    castInt.age = +castInt.age;
    castInt.obesity = +castInt.obesity;
    castInt.income = +castInt.income;
    
  });
console.log(myData)
  
  // scale data - Using sqrtScale (a specialize case of the powerscale useful for sizing circles by area vs radius)
  
  var xAxis = d3.scaleLinear()
    .domain([d3.min(myData, d => d.healthcare) - 1, d3.max(myData, d => d.healthcare +1)]).nice()
    .range([0, w]);


  var yAxis = d3.scaleLinear()
    .domain([d3.min(myData, d => d.poverty) - 1, d3.max(myData, d => d.poverty + 1)]).nice()
    .range([h, 0]);
  

  var xaAxis = d3.scaleLinear()
    .domain([d3.min(myData, d => d.smokes) - 1, d3.max(myData, d => d.smokes + 1)]).nice()
    .range([0, w]);
  

  var yaAxis = d3.scaleLinear()
    .domain([d3.min(myData, d=> d.age) - 1, d3.max(myData, d => d.age + 1 )]).nice()
    .range([h, 0]);

  // // Step 3: Create axis functions

  var bottomAxis = d3.axisBottom(xAxis);
  var leftAxis = d3.axisLeft(yAxis);

  g.append('g')
    .attr('transform',`translate(0, ${h})`)
    .call(bottomAxis)
    .attr("stroke-width", '2')
    .selectAll('text')
      .attr("transform", "translate(-10,10)rotate(-45)")
      .classed('aText', true);

  g.append('g')
    .call(leftAxis)
    .attr("stroke-width", '2')
    .selectAll("text")
      .attr("transform", "translate(-10,10)rotate(-45)")
      .classed('aText', true);

    //   var toolTip = d3.select("circles")
    //   .append("div")
    //   .classed("tooltip", true);

    // // Step 2: Create "mouseover" event listener to display tooltip
    // g.on("mouseover", function(d) {
    //   toolTip.style("display", "block")
    //       .html(
    //         `<strong>${myData(d.healthcare)}<strong><hr>${d.poverty}
    //     medal(s) won`)
    //       .style("left", d3.event.pageX + "px")
    //       .style("top", d3.event.pageY + "px");
    // })
    //   // Step 3: Create "mouseout" event listener to hide tooltip
    //   .on("mouseout", function() {
    //     toolTip.style("display", "none");
    //   });

          // ADD .MOUSEOVER

  
      g.append('g')
      .attr('transform',`translate(0, ${h})`)
      .call(xaAxis)
      .attr("stroke-width", '2')
      .selectAll('text')
        .attr("transform", "translate(-10,10)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", 12)
        .style("fill", "#182132");
  
    g.append('g')
      .call(yaAxis)
      .attr("stroke-width", '2')
      .selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", 12)
        .style("fill", "#182132");


    g.selectAll('circle')
    .data(myData)
    .enter()
    .append('circle')
    .attr('r', 8)
    .attr('cx', f => xAxis(f.healthcare))
    .attr('cy', f => yAxis(f.poverty))
    .classed('stateCircle', true);

    g.selectAll('circles')
    .data(myData)
    .enter()
    .append('text')
    .text(d => d.abbr)
    .attr("x", d => xAxis(d.healthcare))
    .attr("y", d => yAxis(d.poverty))
    .classed('stateText', true);

    g.selectAll('dots')
    .data(myData)
    .enter()
    .append('circle')
    .attr('r', 8)
    .attr('cx', f => xaAxis(f.smokes))
    .attr('cy', f => yaAxis(f.age))
    .classed('stateCircle', true);

    g.selectAll('circles')
    .data(myData)
    .enter()
    .append('text')
    .text(d => d.abbr)
    .attr("x", d => xaAxis(d.smokes))
    .attr("y", d => yaAxis(d.age))
    .classed('stateText', true);
    
    

              g.append("text")
              .classed('yrotate', true)
              .attr("y", 15 - margin.left + 50)
              .attr("x", 0 - (h / 2))
              .text("Poverty");
              
              
              g.append('text')
              .classed('yrotate', true)
              .attr("y", 20 - margin.left + 25)
              .attr("x", 10 - (h / 2))  
              .text("Age");


              g.append("text")
              .attr("transform", `translate(${w / 2}, ${h + margin.bottom/2})`)
              .attr("text-anchor", "middle")  
              .style("font-size", "16px")
              .attr("fill", "darkslategrey")  
              .classed("aText", true)
              .text("Healthcare");

              g.append("text")
              .attr("transform", `translate(${w / 2}, ${h + margin.bottom/1.5})`)
              .attr("text-anchor", "middle")  
              .style("font-size", "16px")
              .attr("fill", "darkslategrey")  
              .classed('aText', true)
              .text("Smokes");

    })
    
    .catch(function(error) {
      console.log(error);
    
    });
}

// // When the browser loads, makeResponsive() is called.
makeResponsive();

// // When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
