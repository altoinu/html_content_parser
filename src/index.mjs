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
      const rowData = [];

      // Iterate through each table cell (column) in the row
      $(row)
        .find("td")
        .each((colIndex, cell) => {
          rowData.push($(cell).text().trim());
        });

      gridData.push(rowData);
    });

    return gridData;
  } catch (error) {
    console.error("Error parsing grid data:", error);
  }
}

function orderGridData(gridData) {
  const newGridData = [];

  // Iterate through to arrange coordinates in order
  for (let i = 1; i < gridData.length; i++) {
    // Coordinates
    let x = Number(gridData[i][0]);
    let y = Number(gridData[i][2]);

    if (newGridData[y] == undefined) newGridData[y] = [];

    // Arrange by row (y) then column (x)
    newGridData[y][x] = gridData[i][1];
  }

  return newGridData;
}

function parseGridRowData(gridRow) {
  let rowChars = "";

  // Iterate each char. Use space if undefined
  for (let i = 0; i < gridRow.length; i++) {
    rowChars += gridRow[i] ? gridRow[i] : " ";
  }

  return rowChars;
}

const gridData = await parseGridData(docUrl);
const orderedGridData = orderGridData(gridData);

let outputText = "";

// Iterate from highest y coordinate to bottom
for (let i = orderedGridData.length - 1; i >= 0; i--) {
  outputText +=
    (orderedGridData[i] ? parseGridRowData(orderedGridData[i]) : "") + "\n";
}

console.log(outputText);
