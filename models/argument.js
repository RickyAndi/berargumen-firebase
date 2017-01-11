function Argument(uid, title, content, type, top, right) {
	this.uid = uid;
	this.title = title;
	this.content = content;
	this.type = type;
	this.top = top;
	this.right = right;
	this.subscribeOnMouseChange = 0;
	this.relatedTo = null;
}

Argument.prototype.setType = function(type) {
	this.type = type;
}

Argument.prototype.getType = function() {
	return this.type;
}

Argument.prototype.setUid = function(uid) {
	this.uid = uid;
}

Argument.prototype.getUid = function() {
	return this.uid;
}

Argument.prototype.setTop = function(top) {
	this.top = top;
}

Argument.prototype.getTop = function() {
	return this.top;
}

Argument.prototype.setRight = function(right) {
	this.right = right;
}

Argument.prototype.getRight = function() {
	return this.right;
}

Argument.prototype.setSubscribeOnMouseChange = function(value) {
	this.subscribeOnMouseChange = value;
}

Argument.prototype.getSubscribeOnMouseChange = function() {
	return this.subscribeOnMouseChange;
}

Argument.prototype.setTitle = function(title) {
	this.title = title;
}

Argument.prototype.getTitle = function() {
	return this.title;
}

Argument.prototype.setContent = function(content) {
	this.content = content;
}

Argument.prototype.getContent = function() {
	return this.content;
}

Argument.prototype.setRelatedTo = function(argumentUid) {
	return this.relatedTo = argumentUid;
}

Argument.prototype.getRelatedTo = function() {
	return this.relatedTo;
}

Argument.prototype.toPlainObject = function() {
	return {
		title : this.getTitle(),
		content : this.getContent(),
		type : this.getType(),
		top : this.getTop(),
		right : this.getRight(),
		relatedTo : this.getRelatedTo()
	}
}