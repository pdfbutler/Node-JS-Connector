module.exports = function convertdata(metadata, customerDocumentConfigId, datasources) {
    this.metadata = metadata;
    this.customerDocumentConfigId = customerDocumentConfigId;
    this.dataSources = JSON.stringify(datasources);
}