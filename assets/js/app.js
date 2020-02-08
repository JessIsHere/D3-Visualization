// ** Unfortunatley they want us to use D3 because they hate us and think plotly is a luxury

// @TODO: YOUR CODE HERE!
d3.csv('assets/data/data.csv').then(function(myData) {

  myData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    console.log(myData)
  });
});

// I want to create a new object with the data casted correctly (string vs int)

// Then I need to pull two values to compare ex: healthcare and poverty

// When I pull the values - I also need the associated state abbreviations




// Set Up Chart

// Create SVG Wrapper

// Parse Data

// Format Data

// Create Scales

// Create Axis

// Append Axis to chartGroup

// When I create the scatterplot - I need to somehow be able to have the state abbreveations on the dots. 