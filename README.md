# belly-button-challenge

[Click here to view Belly Button Biodiversity Page](https://87gru.github.io/belly-button-challenge/)

## Background
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Assignment Breakdown

    1. Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

    2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    3. Use sample_values as the values for the bar chart.

    4. Use otu_ids as the labels for the bar chart.

    5. Use otu_labels as the hovertext for the chart.

    6. Create a bubble chart that displays each sample.

    7. Use otu_ids for the x values.

    8. Use sample_values for the y values.

    9. Use sample_values for the marker size.

    10. Use otu_ids for the marker colors.

    11. Use otu_labels for the text values.

    12. Display the sample's metadata, i.e., an individual's demographic information.

    13. Loop through each key-value pair from the metadata JSON object and create a text string.

    14. Append an html tag with that text to the #sample-metadata panel.

    15. Update all the plots when a new sample is selected.

    16. Format the layout of the dashboard - in this assignment, I changed the colors of the metadata box and added a thin black line as a border.

## Included in this Repository

- `index.html`
- `README.md`
- `samples.json`
- static directory
    - js directory
        - `app.js` - contains the assignment requirements
