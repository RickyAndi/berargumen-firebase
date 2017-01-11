function Connection(uid, sourceArgumentUid, targetArgumentUid, connection) {
	this.uid = uid;
	this.source = sourceArgumentUid;
	this.target = targetArgumentUid;
	this.connection = connection;
}

Connection.prototype.setUid = function(uid) {
	this.uid = uid;
}

Connection.prototype.getUid = function() {
	return this.uid;
}

Connection.prototype.setSource = function(argumentUid) {
	this.source = argumentUid;
}

Connection.prototype.getSource = function() {
	return this.source;
}

Connection.prototype.setTarget = function(argumentUid) {
	this.target = argumentUid;
}

Connection.prototype.getSource = function() {
	return this.target;
}

Connection.prototype.setConnection = function(connection) {
	this.connection = connection;
}

Connection.prototype.getConnection = function() {
	return this.connection;
}