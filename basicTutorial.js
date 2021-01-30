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
var alternativeName = "EN";
var mt = new metadata("istuyver", "CloudCrossing.Sales", constants.STAGE.TEST, "[[!AccountName!]]_[[!StageName!]]", constants.CURRENT_VERSION, constants.CONVERTFILETYPE.PDF, alternativeName);

//Generate you datasource, setup the data PDF Butler should use to generate your PDF
var ds = new datasources();
var account = ds.addSingleDatasource("<YOUR ACCOUNT DATASOURCE ID>");
account.OppOwner = "Igor Stuyver";
account.AccountName = "CloudCrossing";
account.StageName = "Closed Won";

var products = ds.addListDatasource("<YOUR PRODUCTS DATASOURCE ID>");
var l1_1 = products.addRecord();
l1_1.ProdName = "Gizmo 1";
l1_1.ProdPrice = "1000";
l1_1.ProdQuantity = "3";
var l1_2 = products.addRecord();
l1_2.ProdName = "Gizmo 2";
l1_2.ProdPrice = "500";
l1_2.ProdQuantity = "12";
var l1_3 = products.addRecord();
l1_3.ProdName = "Gizmo 3";
l1_3.ProdPrice = "10";
l1_3.ProdQuantity = "50";

var username = "<YOUR USERNAME>";
var password = "<YOUR PASSWORD>";
var docConfigId = "<YOUR DOC CONFIG ID>";

//Call PDF Butler and generate your PDF!!!
var cd = convert(username, password, mt, docConfigId, ds, callback);

//This callback makes that you can introduce any actions when the response is returned
//  Did not wanted to introduce promise libraries to make the JS plugin as easy as possible.
function callback(response) {
    console.log("result: " + response.result);
    //console.log("result: " + JSON.stringify(response));
    //write to file (for example)
    
	if(response.result === "SUCCESS") {
    fs.writeFile(response.metadata.targetName, response.base64, 'base64', function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("file written with name: " + response.metadata.targetName);
        }
    });
	} else {
		response.issues.forEach(function (issue) { 
            console.log(issue.level + " / " + issue.description);
        });
	}
} 
