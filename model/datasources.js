var constants = require('../constants');

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
}