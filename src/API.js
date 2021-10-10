const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const worksheet = spreadsheet.getSheetByName("asistencia");

function sendJSON_(jsonResponse) {
  return ContentService
    .createTextOutput(JSON.stringify(jsonResponse))
    .setMimeType(ContentService.MimeType.JSON);
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
  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  
  worksheet.appendRow( [bodyJSON.Nombre, bodyJSON.Identificaion, bodyJSON.Fecha] );
}