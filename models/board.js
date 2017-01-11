function Board(uid, title, description) {
	this.uid = uid;
	this.title = title;
	this.description = description;
}

Board.prototype.getUid = function() {
	return this.uid;
}

Board.prototype.getTitle = function() {
	return this.title;
}

Board.prototype.getDescription = function() {
	return this.description;
}