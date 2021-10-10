const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const worksheet = spreadsheet.getSheetByName("asistencia");

function sendJSON_(jsonResponse) {
  return ContentService
    .createTextOutput(JSON.stringify(jsonResponse))
    .setMimeType(ContentService.MimeType.JSON);
}


function compareTwoArray_(arr1, arr2) {
  if(arr1.length !== arr2.length) return false;

  for(let i = 0; i < arr1.length; i++) {
    if(arr1[i] !== arr2[i]) return false;
  }

  return true;
}


function doGet() {
  const data = worksheet.getRange('A1').getDataRegion().getValues();
  const headers = data.shift();

  const jsonArray = data.map(row => {
    let obj = {};

    headers.forEach((header, i) => {
      obj[header] = row[i];
    });

    return obj;
  });

  const response = [{status: 200, data: jsonArray}];

  return sendJSON_(response);
}


function doPost(e){
  let jsonResponse;
  //Getting the spreadsheet's column names to ensure sending data matches
  const headers = worksheet.getRange(1, 1, 1, worksheet.getLastColumn()).getValues()[0];
  const headersOriginalOrder = headers.slice();
  headers.sort();
  //Check if incoming json matches with headers names
  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  const headerPassed = Object.keys(bodyJSON).sort();

  if(!compareTwoArray_(headers, headerPassed)) {
    jsonResponse = {status: 500, message: 'Invalid arguments passed'};

    return sendJSON_(jsonResponse);
  }

  const dataArray = headersOriginalOrder.map(header => bodyJSON[header]);
  
  worksheet.appendRow(dataArray);
}