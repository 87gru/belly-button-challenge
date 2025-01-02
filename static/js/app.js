// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    var metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number.
    var filteredMetadata = metadata.filter(subject => subject.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    var metadataPanel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (const [key,value] of Object.entries(filteredMetadata[0])) {
      metadataPanel.append("p").text(`${key.toUpperCase()}: ${value}`)
    };
  });
};


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    var dataSamples = data.samples
    
    // Filter the samples for the object with the desired sample number
    var filteredSample = dataSamples.filter(subject => subject.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    var otuIDs = filteredSample[0].otu_ids
    var otuLabels = filteredSample[0].otu_labels
    var sampleValues = filteredSample[0].sample_values

    // Build a Bubble Chart
    var bubbleTrace = {
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: otuIDs,
        size: sampleValues,
      }
    }

    var bubbleData = [bubbleTrace];

    var bubbleLayout = {
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
    var yticks = otuIDs.map(id => {
      return `OTU ${id}`});
    
    // Build a Bar Chart
    var barTrace = {
      type: 'bar',
      orientation: 'h',
      x: sampleValues.slice(0,10).reverse(),
      y: yticks.slice(0,10).reverse(),
      text: otuLabels.slice(0,10).reverse()
    };

    var barData = [barTrace];

    var barLayout = {
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
    var names = data.names;
    console.log(data.names);

    // Use d3 to select the dropdown with id of `#selDataset`
    var dropdown = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (i = 0; i < names.length; i++) {
      dropdown.append("option").text(`${names[i]}`)
    };

    // Get the first sample from the list
    var firstSample = names[0]
    
    // Build charts and metadata panel with the first sample

      // Metadata panel:
      var defaultMeta = data.metadata;

      var filteredMetadata = defaultMeta.filter(subject => subject.id == firstSample);
      
      var firstPanel = d3.select("#sample-metadata")

      firstPanel.html("");

      for (const [key,value] of Object.entries(filteredMetadata[0])) {
        firstPanel.append("p").text(`${key.toUpperCase()}: ${value}`)
      };
  
      // Charts panel:
      var dataSamples = data.samples
      
      // Filter the samples for the object with the desired sample number
      var filteredSample = dataSamples.filter(subject => subject.id == firstSample);

      // Get the otu_ids, otu_labels, and sample_values
      var otuIDs = filteredSample[0].otu_ids
      var otuLabels = filteredSample[0].otu_labels
      var sampleValues = filteredSample[0].sample_values

      // Build a Bubble Chart
      var bubbleTrace = {
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          color: otuIDs,
          size: sampleValues,
        }
      }

      var bubbleData = [bubbleTrace];

      var bubbleLayout = {
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
      var yticks = otuIDs.map(id => {
        return `OTU ${id}`});
      
      // Build a Bar Chart
      var barTrace = {
        type: 'bar',
        orientation: 'h',
        x: sampleValues.slice(0,10).reverse(),
        y: yticks.slice(0,10).reverse(),
        text: otuLabels.slice(0,10).reverse()
      };

      var barData = [barTrace];

      var barLayout = {
        title: 'Top 10 Bacteria Cultures Found',
        xaxis: {
          title: 'Number of Bacteria'
        },
        autosize: true
      };

        // Render the Bar Chart
      Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
