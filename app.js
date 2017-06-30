var constants = require('./constants');
var metadata = require('./model/metadata');
var datasources = require('./model/datasources');
var convert = require('./convert');
var fs = require("fs");

var msg = "Hello PDF Butler, the world is at your feet!"
console.log(msg);

//Setup you metadata:
//  userid: as you have one user with PDF Butler, it is possible that you want to keep track on who is generating which documents
//  organization: if your company exists of different departments. You can specify which department the user belongs to
//  stage: Stage is TEST of PROD. You can have the same document in these stages
//  targetname: if you want PDF Butler to create a name for your PDF, specify how it should look
//  version: PDF Butler API version 
var mt = new metadata("istuyver", "CloudCrossing.Sales", constants.STAGE.TEST, "[[!AccountName!]]_[[!StageName!]]", constants.CURRENT_VERSION, constants.CONVERTFILETYPE.PDF);

//Generate you datasource, setup the data PDF Butler should use to generate your PDF
var ds = new datasources();
var s1data = ds.addSingleDatasource("18393bdc-1445-4cf0-8e05-79fdb9e0d7ec");
s1data.OppOwner = "Igor Stuyver";
s1data.AccountName = "CloudCrossing";
s1data.StageName = "Closed Won";

var l1 = ds.addListDatasource("62dbb7d8-6c49-4f40-8d4b-8a60e1a00f23");
var l1_1 = l1.addRecord();
l1_1.ProdName = "Prod 1";
l1_1.ProdPrice = "1000";
l1_1.ProdQuantity = "2";
var l1_2 = l1.addRecord();
l1_2.ProdName = "Prod 2";
l1_2.ProdPrice = "500";
l1_2.ProdQuantity = "12";

var username = '<YOUR USERNAME>';
var password = '<YOUR PASSWORD>';
var docConfigId = '<YOUR DOC CONFIG ID>';
//for(var i=0;i<10;i++) {
    //Call PDF Butler and generate your PDF!!!
    var cd = convert(username, password, mt, docConfigId, ds, callback);
//}

//This callback makes that you can introduce any actions when the response is returned
//  Did not wanted to introduce promise libraries to make the JS plugin as easy as possible.
function callback(response) {
    console.log("body: " + response.result);
    //write to file (for example)
    
    fs.writeFile(response.metadata.targetName, response.base64, 'base64', function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("file written with name: " + response.metadata.targetName);
        }
    });
} 
