"use strict";

import axios from "axios";
import * as cheerio from "cheerio";

//const docUrl =
//  "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub";
const docUrl =
  "https://docs.google.com/document/d/e/2PACX-1vSHesOf9hv2sPOntssYrEdubmMQm8lwjfwv6NPjjmIRYs_FOYXtqrYgjh85jBUebK9swPXh_a5TJ5Kl/pub";

async function parseGridData(docUrl) {
  try {
    // Fetch the published Google Doc's HTML content
    const response = await axios.get(docUrl);
    const html = response.data;

    // Load the HTML into Cheerio for parsing
    const $ = cheerio.load(html);

    // Find the table element (assuming the grid is in a table)
    const table = $("table");

    // Initialize an array to store the grid data
    const gridData = [];

    // Iterate through each table row
    table.find("tr").each((rowIndex, row) => {
      // Iterate through each table cell (column) in the row
      let x;
      let y;
      let char;

      $(row)
        .find("td")
        .each((colIndex, cell) => {
          if (colIndex === 0) {
            // x-coordinate
            x = $(cell).text().trim();
          } else if (colIndex === 1) {
            // character
            char = $(cell).text().trim();
          } else {
            // y-coordinate
            y = $(cell).text().trim();
          }
        });

      if (gridData[y] === undefined) gridData[y] = [];
      if (gridData[y][x] === undefined) gridData[y][x] = [];

      gridData[y][x] = char;
    });

    return gridData;
  } catch (error) {
    console.error("Error parsing grid data:", error);
  }
}

function parseGridRowData(gridRow) {
  let rowChars = "";

  // Iterate each char. Use space if undefined
  for (let i = 0; i < gridRow.length; i++) {
    rowChars += gridRow[i] ? gridRow[i] : " ";
  }

  return rowChars;
}

async function main(docUrl) {
  const gridData = await parseGridData(docUrl);

  let outputText = "";

  // Iterate from highest y coordinate to bottom
  for (let i = gridData.length - 1; i >= 0; i--) {
    outputText += (gridData[i] ? parseGridRowData(gridData[i]) : "") + "\n";
  }

  console.log(outputText);
}

main(docUrl);
