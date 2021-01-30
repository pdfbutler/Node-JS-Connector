module.exports = function metadata(userId, organizationId, stage, targetName, version, targetType, alternativeName) {
    this.userId = userId;
    this.organizationId = organizationId;
    this.stage = stage;
    this.targetName = targetName;
    this.version = version;
    this.targetType = targetType;
    this.alternativeName = alternativeName;
    this.locale = {};
}