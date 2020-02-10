
// Create 2 variables defining SVG area dimensions

function makeResponsive() {

  // Load csv data
d3.csv('assets/data/data.csv').then(function(myData) {

  var body = d3.select("body").selectAll('svg');

  // clear svg is not empty
  if (!body.empty()) {
    body.ref();
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

var svg = d3.selectAll('body')

  // add (append) the SVG area to it - define class

  .append('svg')

  // Set dimensions of svg - define class and call variables storing dimensions

  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .attr("font-size", 5)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr('fill', 'white')
;
// Create variable for chart that adds(appends) an area to group elements

var g = svg.append('g')

  // f chart to within margin object

  .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // create temporary function to cast string values to int 
  myData.forEach(function(castInt) {
    // var valueKey = myData.columns
    // console.log(valueKey)
    // var columns = true
    //   if(columns==true){
    //     columns = columns.slice(2,51);
    //     console.log(myData)
    //   };
    castInt.healthcare= +castInt.healthcare;
    castInt.poverty = +castInt.poverty;
    castInt.smokesLow = +castInt.smokesLow;
    castInt.smokesHigh = +castInt.smokesHigh;
    
  });

  
  // scale data - Using sqrtScale (a specialize case of the powerscale useful for sizing circles by area vs radius)
  
  var xAxis = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.healthcare)]).nice()
    .range([0, w]);

  var yAxis = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.poverty)]).nice()
    .range([h, 0]);

  var xxAxis = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.smokesLow)]).nice()
    .range([0, w]);

  var yyAxis = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d.smokesHigh)])
    .range([h, 0]);
  
  // Step 3: Create axis functions

  var bottomAxis = d3.axisBottom(xAxis);
  var leftAxis = d3.axisLeft(yAxis);

  g.append('g')
    .attr('transform',`translate(0, ${h})`)
    .call(bottomAxis)
    .attr("stroke-width", '2')
    .selectAll('text')
      .attr("transform", "translate(-10,10)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", 12)
      .style("fill", "#182132");

  g.append('g')
    .call(leftAxis)
    .attr("stroke-width", '2')
    .selectAll("text")
      .attr("transform", "translate(-10,10)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", 12)
      .style("fill", "#182132");

    g.append("g")
    .selectAll('dot')
    .data(myData)
    .enter()
    .append('circle')
    .attr('r', 7)
    .attr('cx', f => xAxis(f.healthcare))
    .attr('cy', f => yAxis(f.poverty))
    .attr('fill', '#d52f4c')
    .attr("stroke-width", "1")
    .attr("stroke", "#ffbb00");
    

    g.append('g')
    .selectAll('dot')
    .data(myData)
    .enter()
    .append('circle')
    .attr('r', 7)
    .attr('cx', f => xxAxis(f.smokesLow))
    .attr('cy', f => yyAxis(f.smokesHigh))
    .attr('fill', '#69c0b8')
    .attr("stroke-width", "1")
    .attr("stroke", "#182132");
    
     

    // adding abbreviations to circles - cant fully figure it out
            g.selectAll("dots")
              .data(myData)
              .enter()
              .append("text")
              // Add your code below this line
              .attr("x", d => xAxis(d.healthcare))
              .attr("y", d => yAxis(d.poverty))
              .text(d => d.abbr);  

              g.selectAll("dots")
              .data(myData)
              .enter()
              .append("text")
              // Add your code below this line
              .attr("x", d => xxAxis(d.smokesLow))
              .attr("y", d => yyAxis(d.smokesHigh))
              .text(d => d.abbr); 
              
              

// Adding axis titles - For some reason they aren't showing but I know the code works - They exist in the html


              g.append("text")
              .attr("transform", "rotate(-90)")
              .attr("text-anchor", "middle")  
              .style("font-size", "16px") 
              .style("text-decoration", "underline")
              .attr("fill", "black")  
              .attr("dy", "1em")
              .attr("class", "axisText")
              .attr("y", 15 - margin.left + 50)
              .attr("x", 0 - (h / 2))
              .text("Healthcare")
              
              g.append('text')
              .attr("transform", "rotate(-90)")
              .attr("text-anchor", "middle")  
              .style("font-size", "16px") 
              .style("text-decoration", "underline")
              .attr("fill", "black")  
              .attr("dy", "1em")
              .attr("class", "axisText")
              .attr("y", 15 - margin.left + 25)
              .attr("x", 0 - (h / 2))
              .text("Title one")
              .text("Smokes Low")

              g.append('text')
              .attr("transform", "rotate(-90)")
              .attr("text-anchor", "middle")  
              .style("font-size", "16px") 

              .attr("fill", "black")  
              .attr("dy", "1em")
              .attr("class", "axisText")
              .attr("y", 15 - margin.left)
              .attr("x", 0 - (h / 2))
              .text("Title one")
              .text("Title 3")

  var ytitles = g.append("text")
              .attr("transform", `translate(${w / 2}, ${h + margin.bottom/2})`)
              .attr("text-anchor", "middle")  
              .style("font-size", "16px") 
              .style("text-decoration", "underline")
              .attr("fill", "black")  
              .attr("class", "axisText")
              .text("Poverty");

              var ytitles = g.append("text")
              .attr("transform", `translate(${w / 2}, ${h + margin.bottom/2})`)
              .attr("text-anchor", "middle")  
              .style("font-size", "16px") 
              .style("text-decoration", "underline")
              .attr("fill", "black")  
              .attr("class", "axisText")
              .text("SmokesHigh");
   
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


    // trying to create loop for casting integers

            // myData.forEach(function(castInt) {
            //   var valueKey = myData.columns
            //   console.log(valueKey)
            //   var columns = true
            //     if(columns==true){
            //       columns = columns.slice(2,51);
            //       console.log(myData)
            //     };
            // };

      
    // want to create variables to store scatterplot formatting
            // var dots = g.selectAll('dot')
            // .data(myData)
            // .enter()
            // .append('circle')
            // .attr('r', 15)
            // .attr('cx', f => xAxis(f.healthcare))
            // .attr('cy', f => yAxis(f.poverty))
            // .attr('fill', '#d52f4c')
            // .attr("stroke-width", "1")
            // .attr("stroke", "#ffbb00")
            // .on("mouseover", function() {
            //   d3.select(this)
            //     .transition()
            //     .duration(100)
            //     .attr("r", 20)
            //     .attr("fill", "#ffbb00");
            //   })
            //   .on("mouseout", function() {
            //     d3.select(this)
            //       .transition()
            //       .attr("r", 15)
            //       .duration(100)
            //       .attr("fill", "#d52f4c");
            //   });
            

            // g.selectAll('dot')
            // .data(myData)
            // .enter()
            // .append('circle')
            // .attr('r', 15)
            // .attr('cx', f => xxAxis(f.smokesLow))
            // .attr('cy', f => yyAxis(f.smokesHigh))
            // .attr('fill', '#69c0b8')
            // .attr("stroke-width", "1")
            // .attr("stroke", "#182132")
            // .on("mouseover", function() {
            //   d3.select(this)
            //     .transition()
            //     .duration(100)
            //     .attr("r", 20)
            //     .attr("fill", "#182132");
            //   })
            //   .on("mouseout", function() {
            //     d3.select(this)
            //       .transition()
            //       .attr("r", 15)
            //       .duration(100)
            //       .attr("fill", "#69c0b8");
            //   });


            // // adding abbreviations to circles - cant fully figure it out
            //         g.selectAll("dot")
            //           .data(myData)
            //           .enter()
            //           .append("text")
            //           // Add your code below this line
            //           .attr("x", d => xAxis(d.healthcare))
            //           .attr("y", d => yAxis(d.poverty))
            //           .text(d => d.abbr);   

            //           g.selectAll("dot")
            //           .data(myData)
            //           .enter()
            //           .append("text")
            //           // Add your code below this line
            //           .attr("x", d => xxAxis(d.smokesLow))
            //           .attr("y", d => yyAxis(d.smokesHigh))
            //           .text(d => d.abbr); 

