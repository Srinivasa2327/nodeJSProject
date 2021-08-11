const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
var parse = require('papaparse');
let downloaded
let lastUpdateTime

async function main() {

// Enter your storage account name and shared key
//const account = "srinistorage77";

const account = "inlinemarketdata";
//const accountKey = "Rxruces1v7xH7ymJUouEZdYpAaOg//Do5oN5UtE7z48kSIJ0kwah8i9s7TGuS3ztRS1P8RbZu2Mmi6wXk5mM0g==";

const accountKey = "jbEyQqsONKXxZU0oOB/mXoSQU16y3vP3RG3GWqCjw42+pXuIcH/xDxqvo3b/mZRFn0dc1uxnBIba5MVowjPvww==";

// Use SharedKeyCredential with storage account and account key
// SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);


const containerClient = blobServiceClient.getContainerClient("customerdata");


for await (const item of containerClient.listBlobsByHierarchy("/")) {
  if (item.name === "us-500.csv") {
    //console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
	lastUpdateTime=`File Name : ${item.name} , last modified time : ${item.properties.lastModified}`
  }
}

const blobClient = containerClient.getBlobClient("us-500.csv");

// Get blob content from position 0 to the end
// In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
const downloadBlockBlobResponse = await blobClient.download();
downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);

//const downloadBlockBlobResponse = blobClient.download();
//const downloaded = streamToString(downloadBlockBlobResponse.readableStreamBody);

//console.log("+++++++++++++++++++++++++++++++++++++++++++", downloaded,"+++++++++++++++++++++++++++++++++++++");


// [Node.js only] A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}




}

main()
  .then(
  
  () => {
	  
	  
var http = require('http');
var url = require('url');

// Create a server
http.createServer( function (request, response) {  
/*
response.writeHead(200, {'Content-Type': 'text/html'});

response.end(downloaded);
*/
 
 response.writeHead(200, { 'Content-Type': 'text/html' });

        var html = createTable();

        response.end(html);

 
//}).listen(8082);
}).listen(process.env.PORT||8080);
// Console will print the message
console.log('Server running at http://127.0.0.1:8080/');
	  

  }
  
  )
 

 
 
 function createTable() {
  var results = parse.parse(downloaded, {
    delimiter: ",",
    skipEmptyLines: true
  });

  var output = results.data;

  var columns = output[0];

  // Create HTML's table structure
  var html = "<html>\n<head>\n<style>\ntable, th, td {\n  border: 1px solid black;\n  border-collapse: collapse;\n}\n</style>\n</head>\n<body>\n";

 html+="<p style=\"color:blue;text-align:center;font-size:140%\">"+lastUpdateTime+"</p>\n"


  html += "<table class=\"tablesorter\">\n";
  html += "\t<thead>\n";
  html += "\t\t<tr>\n";

  // Columns
  for (var i = 0; i < columns.length; i++) {
    html += "\t\t\t<th>" + columns[i] + "</th>\n";
  }

  html += "\t\t</tr>\n";
  html += "\t</thead>\n";

  html += "\t<tbody>\n";

  // Body
  for (i = 1; i < output.length; i++) {
    var rows = output[i];

    html += "\t\t<tr>\n";

    for (j = 0; j < rows.length; j++) {
      html += "\t\t\t<td>" + rows[j] + "</td>\n";
    }

    html += "\t\t</tr>\n";
  }

  html += "\t</tbody>\n";
  html += "</table>\n";
  html += "</body>\n";
  html += "</html>\n";
  return html;
}