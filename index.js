//const Azure = require("@azure/storage-blob");

const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

let downloaded

async function main() {




// Enter your storage account name and shared key
const account = "srinistorage77";
const accountKey = "Rxruces1v7xH7ymJUouEZdYpAaOg//Do5oN5UtE7z48kSIJ0kwah8i9s7TGuS3ztRS1P8RbZu2Mmi6wXk5mM0g==";
 
// Use SharedKeyCredential with storage account and account key
// SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);


const containerClient = blobServiceClient.getContainerClient("myblob");

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

response.writeHead(200, {'Content-Type': 'text/html'});

response.end(downloaded);

   
//}).listen(8082);
}).listen(process.env.PORT||8080);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
	  

  }
  
  )
 