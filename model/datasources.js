var constants = require('../constants');
var fs = require("fs");

module.exports = function datasources() {
    this.datasources = {};
    this.addSingleDatasource = function(name) {
        var ds = {};
        ds.type = constants.DATASOURCETYPE.SINGLE;
        ds.data = {};

        this.datasources[name] = ds;

        return ds.data;
    };
    this.addListDatasource = function(name) {
        var ds = {};
        ds.type = constants.DATASOURCETYPE.SINGLE;
        ds.name = name;
        ds.data = [];
        
        this.datasources[name] = ds;

        ds.addRecord = function() {
            var record = {};
            ds.data.push(record);
            return record;
        }

        return ds;
    };
    this.addPictureDatasource = function(name) {
        var ds = {};
        ds.type = constants.DATASOURCETYPE.LIST;
        ds.name = name;
        ds.data = [];
        
        this.datasources[name] = ds;

        ds.addPicture = function(base64, name, parentId) {
            var record = {"base64":base64,"name":name,"parentId":parentId};
            ds.data.push(record);
            return record;
        }

        ds.addPictureFromFile = function(file, name, parentId) {
            var bitmap = fs.readFileSync(file);
            var base64 = new Buffer(bitmap).toString('base64');
            this.addPicture(base64, name, parentId)
        }

        return ds;
    };
}