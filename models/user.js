function User(uid, displayName, email, profilePictureURL) {
	this.uid = uid;
	this.displayName = displayName;
	this.email = email;
	this.profilePictureURL = profilePictureURL;
}

User.prototype.setUid = function(uid) {
	this.uid = uid;
}

User.prototype.getUid = function() {
	return this.uid;
}

User.prototype.setDisplayName = function(displayName) {
	this.displayName = displayName;
}

User.prototype.getDisplayName = function() {
	return this.displayName;
}

User.prototype.setEmail = function(email) {
	this.email = email;
}

User.prototype.getEmail = function() {
	return this.email;
}

User.prototype.setProfilePictureURL = function(profilePictureURL) {
	this.profilePictureURL = profilePictureURL;
}

User.prototype.getProfilePictureURL = function() {
	return this.profilePictureURL;
}

User.prototype.toPlainObject = function() {
	return {
		uid : this.getUid(),
		displayName : this.getDisplayName(),
		email : this.getEmail(),
		profilePictureURL : this.getProfilePictureURL()
	}
}