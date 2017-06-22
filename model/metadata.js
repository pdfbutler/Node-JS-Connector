module.exports = function metadata(userId, organizationId, stage, targetName, version) {
    this.userId = userId;
    this.organizationId = organizationId;
    this.stage = stage;
    this.targetName = targetName;
    this.version = version;
}