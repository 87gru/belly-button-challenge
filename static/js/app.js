// function to build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number.
    let filteredMetadata = metadata.filter(subject => subject.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (const [key,value] of Object.entries(filteredMetadata[0])) {
      metadataPanel.append("p").text(`${key.toUpperCase()}: ${value}`)
    }
  })
};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let dataSamples = data.samples
    
    // Filter the samples for the object with the desired sample number
    let filteredSample = dataSamples.filter(subject => subject.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    let otuIDs = filteredSample[0].otu_ids
    let otuLabels = filteredSample[0].otu_labels
    let sampleValues = filteredSample[0].sample_values

    // Build a Bubble Chart
    let bubbleTrace = {
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuIDs,
        size: sampleValues,
      }
    };
    
    // Load bubbleTrace into bubbleData
    let bubbleData = [bubbleTrace];

    // Define layout for chart
    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      height: 500,
      width: 1250,
      xaxis: {
        title: "OTU ID",
      },
      yaxis: {
        title: "Number of Bacteria"
      },
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otuIDs.map(id => {
      return `OTU ${id}`});
    
    // Build a Bar Chart
    // Bar Trace
    let barTrace = {
      type: 'bar',
      orientation: 'h',
      x: sampleValues.slice(0,10).reverse(), // slice and reverse the input data appropriately so data is organized in descending order
      y: yticks.slice(0,10).reverse(),
      text: otuLabels.slice(0,10).reverse()
    };

    // Load barTrace into barData
    let barData = [barTrace];

    // Define the layout
    let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {
        title: 'Number of Bacteria'
      },
      autosize: true
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names
    
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (i = 0; i < names.length; i++) {
      dropdown.append("option").text(`${names[i]}`)
    };

    // Get the first sample from the list
    let firstSample = names[0]
    
    // Build charts and metadata panel with the first sample by calling the functions defined on lines 2 + 27
    buildMetadata(firstSample);
    buildCharts(firstSample);
  })
};

// Function for event listener
function optionChanged(newSample) {

  // log new selection to the console
  console.log("Test Subject ID " + newSample + " selected")

  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
};

// change background color and font color of metadata header box. Add thin black border around metadata box
d3.select(".card-header").attr("style", "outline: thin solid black;").style("background-color","#1f77b4").style("color","white")
d3.select("#sample-metadata").attr("style", "outline: thin solid black;")

// Initialize the dashboard
init();