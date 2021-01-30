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
var mt = new metadata("istuyver", "CloudCrossing.Sales", constants.STAGE.TEST, "PdfButlerAdvanced", constants.CURRENT_VERSION, constants.CONVERTFILETYPE.PDF, alternativeName);

//Generate you datasource, setup the data PDF Butler should use to generate your PDF
var ds = new datasources();
var account = ds.addSingleDatasource("<YOUR ACCOUNT DATASOURCE ID>");
account.Id = "Acc1";
account.OppOwner = "Igor Stuyver";
account.Phone = "555/12345678";
account.Fax = "555/87654321";

var opportunities = ds.addListDatasource("<YOUR OPPORTUNITIES DATASOURCE ID>");
var opp1 = opportunities.addRecord();
opp1.Id = "Opp1";
opp1.OppName = "500.000 widgets";
opp1.StageName = "Ready to sign";
opp1.AccountId = "Acc1";
var opp2 = opportunities.addRecord();
opp2.Id = "Opp2";
opp2.OppName = "200.000 widgets";
opp2.StageName = "Closed Won";
opp2.AccountId = "Acc1";
var opp3 = opportunities.addRecord();
opp3.Id = "Opp3";
opp3.OppName = "5.000 widgets";
opp3.StageName = "Closed Lost";
opp3.AccountId = "Acc1";

var opportunityProducts = ds.addListDatasource("<YOUR OPPORTUNITY PRODUCTS DATASOURCE ID>");
var oppProd1 = opportunityProducts.addRecord();
oppProd1.ProductName = "Widget 1";
oppProd1.Quantity = "200.000";
oppProd1.OpportunityId = "Opp1";
oppProd1.UnitPrice = "50";
oppProd1.ProductCode = "100";
oppProd1.TemplateId = "<MOTOR TEMPLATE ID>";
var oppProd2 = opportunityProducts.addRecord();
oppProd2.ProductName = "Widget 2";
oppProd2.Quantity = "300.000";
oppProd2.OpportunityId = "Opp1";
oppProd2.UnitPrice = "70";
oppProd2.ProductCode = "200";
oppProd2.TemplateId = "<OPTIONS TEMPLATE ID>";
var oppProd3 = opportunityProducts.addRecord();
oppProd3.ProductName = "Widget 2";
oppProd3.Quantity = "200.000";
oppProd3.OpportunityId = "Opp2";
oppProd3.UnitPrice = "70";
oppProd3.ProductCode = "200";
oppProd3.TemplateId = "<MOTOR TEMPLATE ID>";
var oppProd4 = opportunityProducts.addRecord();
oppProd4.ProductName = "Widget 3";
oppProd4.Quantity = "5.000";
oppProd4.OpportunityId = "Opp3";
oppProd4.UnitPrice = "1000";
oppProd4.ProductCode = "300";
oppProd4.TemplateId = "<OPTIONS TEMPLATE ID>";


var logo = ds.addPictureDatasource("<YOUR OPPORTUNITY PRODUCTS DATASOURCE ID>");
logo.addPictureFromFile("C:/Users/istuyver/Pictures/pdfbutlerlogo.png", "Pdf Butler Logo", null);

var logoAccount = ds.addPictureDatasource("<YOUR OPPORTUNITY PRODUCTS DATASOURCE ID>");
logoAccount.addPictureFromFile("C:/Users/istuyver/Pictures/cadmus_arch.png", "Pdf Butler Architecture", "Acc1");

var username = "<YOUR USERNAME>";
var password = "<YOUR PASSWORD>";
var docConfigId = "<YOUR DOC CONFIG ID>";

//Call PDF Butler and generate your PDF!!!
var cd = convert(username, password, mt, docConfigId, ds, callback);

//This callback makes that you can introduce any actions when the response is returned
//  Did not wanted to introduce promise libraries to make the JS plugin as easy as possible.
function callback(response) {
    console.log("result: " + response.result);
    //write to file (for example)
    
    fs.writeFile(response.metadata.targetName, response.base64, 'base64', function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("file written with name: " + response.metadata.targetName);
        }
    });
} 
