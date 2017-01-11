Vue.component('argumen-panel', {
	template: '#argumen-panel-template',
	props: ['uid', 'title', 'message', 'type', 'index', 'right', 'top', 'relatedTo'],
	methods: {
		changePosition : function(event) {
			this.$emit('change-position', { index : this.index });
		},
		deleteArgument : function() {
			this.$emit('delete-argument', { index : this.index });
		},
		createRebuttal : function() {
			this.$emit('create-rebuttal', { index : this.index });	
		},
		createSupport : function() {
			this.$emit('create-support', { index : this.index });
		},
		view : function() {
			this.$emit('view-argument', { index : this.index });
		},
		editArgument : function() {
			this.$emit('edit-argument', { index : this.index });
		},
		createCoReason : function() {
			this.$emit('create-co-reason', { index : this.index });
		}
	},
	computed : {
	    supportLabel : function() {
	        if(this.type == 'contention') {
	             return 'Buat Reason';
	        }

	        if(this.type == 'reason') {
	             return 'Buat Reason';
	        }
	    },
	    opposeLabel : function() {
	    	if(this.type == 'contention') {
	    	     return 'Buat Counter Argument';
	    	}	
	    }
	},
});

new Vue({
	el : '#app',
	data : {
		user : null,
		boardKey : null,
		firebase : {
			database : null,
			auth : null,
			boardRef : null,
			argumentsBoardRef : null,
			connectionsBoardRef : null,
		},
		store : null,
		modals : {
			createArgumentModal : null,
			removeArgumentConfirmationModal : null
		},
		forms : {
			createArgument : new Argument(null,null,null,null,null,null)	
		},
		arguments : [],
		connections : [],
		status : 'create-contention',
		editor : null,
		temp : {
			toBeConnected : null,
			toBeDeleted : null
		},
		indexToBeConnected : null
	},
	methods : {
		logout: function() {
			this.firebase.auth.signOut();
		},
		openCreateArgumentModal : function() {
			this.modals.createArgumentModal.modal('show');
		},
		closeCreateArgumentModal : function() {
			this.modals.createArgumentModal.modal('hide');
		},
		openRemoveArgumentConfirmationModal : function() {
			this.modals.removeArgumentConfirmationModal.modal('show');
		},
		closeRemoveArgumentConfirmationModal : function() {
			this.modals.removeArgumentConfirmationModal.modal('hide');
		},
		openModalToCreateArgument : function(event) {
			this.status = 'create-contention';
			this.openCreateArgumentModal();
		},
		redirectToMyBoards : function() {
			window.location.href = 'my-boards.html';
		},
		createArgument : function(event) {
			var that = this;

			if(this.status == 'create-contention') {
				
				var content = this.editor.summernote('code');

				this.forms.createArgument.setContent(content);
				this.forms.createArgument.setTop((event.clientY).toString());
				this.forms.createArgument.setRight((event.clientX).toString());
				this.forms.createArgument.setType('contention');
				
				var newArgumentOfThisBoard = this.argumentsBoardRef.push();
				newArgumentOfThisBoard.set(this.forms.createArgument.toPlainObject());
				
				this.cleanCreateArgumentForm();
			}

			if(this.status == 'create-reason') {
				
				var content = this.editor.summernote('code');
				var reasonToUid = this.arguments[this.indexToBeConnected].getUid(); 

				this.forms.createArgument.setContent(content);
				this.forms.createArgument.setTop((event.clientY).toString());
				this.forms.createArgument.setRight((event.clientX).toString());
				this.forms.createArgument.setType('reason');
				this.forms.createArgument.setRelatedTo(reasonToUid);

				var newArgumentOfThisBoard = this.argumentsBoardRef.push();
				newArgumentOfThisBoard.set(this.forms.createArgument.toPlainObject());
				
				var newConnectionOfThisBoard = this.connectionsBoardRef.push();
				newConnectionOfThisBoard.set({ source : newArgumentOfThisBoard.key, target : reasonToUid, type : 'reason' });

				this.cleanCreateArgumentForm();
			}

			if(this.status == 'create-co-reason') {
				
				var content = this.editor.summernote('code');
				var reasonToUid = this.arguments[this.indexToBeConnected].getUid(); 

				this.forms.createArgument.setContent(content);
				this.forms.createArgument.setTop((event.clientY).toString());
				this.forms.createArgument.setRight((event.clientX).toString());
				this.forms.createArgument.setType('co-reason');
				this.forms.createArgument.setRelatedTo(reasonToUid);

				var newArgumentOfThisBoard = this.argumentsBoardRef.push();
				newArgumentOfThisBoard.set(this.forms.createArgument.toPlainObject());
				
				var newConnectionOfThisBoard = this.connectionsBoardRef.push();
				newConnectionOfThisBoard.set({ source : newArgumentOfThisBoard.key, target : reasonToUid, type : 'co-reason' });

				this.cleanCreateArgumentForm();

			}
			
			// if(this.status == 'create-rebuttal') {

			// 	var uuid = Math.random().toString(36).slice(2);
			// 	this.argument.setUuid(uuid);
			// 	this.argument.setTop((event.clientY).toString());
			// 	this.argument.setRight((event.clientX).toString());
			// 	this.argument.setType('rebuttal');

			// 	this.arguments.push(this.argument);
			// 	this.cleanArgumentForm();

			// 	var index = this.indexToBeConnected
			// 	var target =  this.arguments[index].uuid;
			// 	var source = uuid;
				
			// 	setTimeout(function() {
			// 		var conn = jsPlumb.connect({
			// 		    source: $('#' + source),
			// 		    target: $('#' + target),
			// 		    detachable: false,
			// 		    connector: [ "Flowchart", {}, { cssClass:"labelClass" }],
			// 		    overlays: [ 
			// 		        ["Arrow" , { width:12, length:12, location: 1 }],
			// 		        [ "Label", { cssClass:"labelClass" } ]
			// 		    ],
			// 		    paintStyle:{ stroke:"red", strokeWidth:2 },
			// 		    deleteEndpointsOnDetach:true,
			// 		    endpoint:"Blank",
			// 		    anchor : [
			// 		    	[ 0.2, 0, 0, -1], 
			// 		    	[ 1, 0.2, 1, 0],
			// 		    	[ 0.8, 1, 0, 1],
			// 		    	[ 0, 0.8, -1, 0]
			// 		    ]
			// 		});

			// 		that.connections.push({ source : source , target : target , connection : conn })
			// 	}, 1000);
			// }	
			
			// if(this.status == 'create-support') {
				
			// 	var uuid = Math.random().toString(36).slice(2);
			// 	this.argument.setType('support');
			// 	this.argument.setUuid(uuid);
			// 	this.argument.setTop((event.clientY).toString());
			// 	this.argument.setRight((event.clientX).toString());
			// 	this.arguments.push(this.argument);
			// 	this.cleanArgumentForm();

			// 	var index = this.indexToBeConnected
			// 	var target =  this.arguments[index].uuid;
			// 	var source = uuid;
				
			// 	var label;

			// 	if(this.arguments[index].getType() == 'conclussion') {
			// 		label = 'Kesimpulan';
			// 	} else {
			// 		label = 'Dan';
			// 	}

			// 	setTimeout(function() {
			// 		var conn = jsPlumb.connect({
			// 		    source: $('#' + source),
			// 		    target: $('#' + target),
			// 		    detachable: false,
			// 		    connector: [ "Flowchart"],
			// 		    overlays: [ 
			// 		        ["Arrow" , { width:12, length:12, location:1 }],
			// 		        ["Label", { label : label, cssClass : "connector-label" } ]
			// 		    ],
			// 		    paintStyle:{ stroke:"#22BE34", strokeWidth:2 },
			// 		    deleteEndpointsOnDetach: true,
			// 		    endpoint:"Blank",
			// 		    anchor : [ [ 0.2, 0, 0, -1 ],  [ 1, 0.2, 1, 0 ], [ 0.8, 1, 0, 1 ], [ 0, 0.8, -1, 0 ] ]
			// 		});

			// 		that.connections.push({ source : source , target : target , connection : conn })
			// 	}, 1000);
			// }

			// if(this.status == 'edit-argument') {
			// 	this.arguments[this.toBeEditedIndex].setMessage(this.argument.getMessage());
			// 	this.arguments[this.toBeEditedIndex].setTitle(this.argument.getTitle());
			// }

			this.modals.createArgumentModal.modal('hide');
		},
		removeArgumentByIndex : function() {

		},
		openModalToCreateContention : function() {
			this.status = 'create-contention';
			this.openCreateArgumentModal();
		},
		cleanCreateArgumentForm : function() {
			this.forms.createArgument.title = '';
			this.forms.createArgument.content = '';
		},
		changePositionByIndex : function(args) {
			var that = this;
			var index = args.index;

			if(!this.arguments[index].getSubscribeOnMouseChange()) {
				document.onmousemove = function(event) {
					that.arguments[index].setRight((event.pageX - 150).toString());
					that.arguments[index].setTop((event.pageY - 30).toString());
					
					jsPlumb.repaintEverything();
				}
				this.arguments[index].setSubscribeOnMouseChange(1);
			} else {
				document.onmousemove = null;
				this.arguments[index].setSubscribeOnMouseChange(0);

				var right = this.arguments[index].getRight();
				var top = this.arguments[index].getTop();
				var argumentUid = this.arguments[index].getUid();

				var boardArgumentRef = this.firebase.database.ref('arguments/' + this.boardKey + '/' + argumentUid);
				boardArgumentRef.update({ right : right, top : top });
			}
		},
		viewArgumentByIndex : function(args) {
			var argumentKey = this.arguments[args.index].getUid();
			window.open('view-argument.html?board=' + this.boardKey + '&argument=' + argumentKey);
		},
		getParameterByName : function(name, url) {
		    if (!url) {
		      url = window.location.href;
		    }
		    name = name.replace(/[\[\]]/g, "\\$&");
		    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		},
		openModalToCreateSupport : function(args) {
			var type = this.arguments[args.index].getType();

			if(type == 'contention') {
				this.status = 'create-reason';
			}

			if(type == 'premise') {
				this.status = 'create-reason';
			}
			
			this.indexToBeConnected = args.index;
			this.openCreateArgumentModal();
		},
		openModalToCreateCoReason : function(args) {
			var type = this.arguments[args.index].getType();

			this.status = 'create-co-reason';
			
			this.indexToBeConnected = args.index;
			this.openCreateArgumentModal();
		},
		openModalToDeleteArgument : function(args) {
			this.setToBeDeletedIndex(args.index);
			this.openRemoveArgumentConfirmationModal();
		},
		deleteArgument : function() {
			var argumentKeyToBeDeleted = this.arguments[this.getToBeDeletedIndex()].getUid();
			var toBeDeletedArgumentRef = this.firebase.database.ref('arguments/' + this.boardKey + '/' + argumentKeyToBeDeleted);
			toBeDeletedArgumentRef.remove();

			var connectionsToBeDeleted = this.connections.filter(function(connection) {
				return connection.source == argumentKeyToBeDeleted || connection.target == argumentKeyToBeDeleted;
			});

			var that = this;

			connectionsToBeDeleted.forEach(function(connection) {
				that.firebase.database.ref('connections/' + that.boardKey + '/' + connection.getUid()).remove();
			})

			this.closeRemoveArgumentConfirmationModal();
		},
		getToBeDeletedIndex : function() {
			return this.temp.toBeDeleted;
		},
		setToBeDeletedIndex : function(index) {
			this.temp.toBeDeleted = index;
		}
	},
	mounted : function() {
		
		this.editor = $('#content-editor');
		this.editor.summernote({
			height: 300,          
		  	minHeight: null,    
		  	maxHeight: null,
		  	focus: true,
		  	dialogsInBody: true
		});
		
		this.modals.createArgumentModal = $('#create-argument-modal');
		this.modals.removeArgumentConfirmationModal = $('#remove-argument-modal-notification');

		var config = {
		    apiKey: "AIzaSyCoeRfZ6Ds3pZBFFdAyhxCd74ZvA1wLdGA",
		    authDomain: "test-975e4.firebaseapp.com",
		    databaseURL: "https://test-975e4.firebaseio.com",
		    storageBucket: "test-975e4.appspot.com",
		    messagingSenderId: "690986657049"
		};

		firebase.initializeApp(config);

		this.store = store;
		this.firebase.database = firebase.database();
		this.firebase.auth = firebase.auth();

		var that = this;

		this.firebase.auth.onAuthStateChanged(function(user) {
		    if(null == user) {
		        that.user = null;
		    } else {
		        
		        that.user = new User(user.uid, user.displayName, user.email, user.photoURL);
		    	var userKey = that.user.getUid();

		    	that.boardKey = that.getParameterByName('boarduid');

		    	that.argumentsBoardRef = that.firebase.database.ref('arguments/' + that.boardKey);
		    	
		    	that.argumentsBoardRef.on('child_added', function(argumentSnapshot) {
		   	
		    		var uid = argumentSnapshot.key;
		    		var value = argumentSnapshot.val();
					
					var argument = new Argument(uid, value.title, value.content, value.type, value.top, value.right);
		    		
		    		if(!!value.relatedTo) {
		    			argument.setRelatedTo(value.relatedTo);
		    		}

		    		that.arguments.push(argument);
				});

				that.argumentsBoardRef.on('child_changed', function(argumentSnapshot) {
		    		
		    		console.log(argumentSnapshot.val());

		    		var value = argumentSnapshot.val();
		    		var toBeEditedIndex = R.findIndex(R.propEq('uid', argumentSnapshot.key), that.arguments);

		    		that.arguments[toBeEditedIndex].setTop(value.top);
		    		that.arguments[toBeEditedIndex].setRight(value.right);
		    		that.arguments[toBeEditedIndex].setContent(value.content);
		    		that.arguments[toBeEditedIndex].setTitle(value.title);

		    		setTimeout(function() {
		    			jsPlumb.repaintEverything();
		    		}, 100);
		    	});

		    	that.argumentsBoardRef.on('child_removed', function(argumentSnapshot) {
		    		var argumentKey = argumentSnapshot.key;
    	    		var toBeDeletedIndex = R.findIndex(R.propEq('uid', argumentKey), that.arguments);
    	    		that.arguments.splice(toBeDeletedIndex, 1);
		    	});

		    	that.connectionsBoardRef = that.firebase.database.ref('connections/' + that.boardKey);

		    	that.connectionsBoardRef.on('child_added', function(connectionSnapshot) {
		    		
		    		var connectionKey = connectionSnapshot.key;
		    		var value = connectionSnapshot.val();
					
					setTimeout(function() {
						
						if(value.type == 'reason' || value.type == 'co-reason') {
							var strokeColor = 'green';
						} 

						if(value.type == 'reason') {
							var labelContent = 'Jadi'
						}

						if(value.type == 'co-reason') {
							var labelContent = 'Dan'
						}

						var connection = jsPlumb.connect({
		    			    source: $('#' + value.source),
		    			    target: $('#' + value.target),
		    			    detachable: false,
		    			    connector: ["Flowchart"],
		    			    overlays: [ 
		    			        ["Arrow" , { width:12, length:12, location: 1 }],
		    			        [ "Label", { label : labelContent } ]
		    			    ],
		    			    paintStyle:{ stroke: strokeColor, strokeWidth:2 },
		    			    deleteEndpointsOnDetach:true,
		    			    endpoint:"Blank",
		    			    anchor : [
		    			    	[ 0.2, 0, 0, -1], 
		    			    	[ 1, 0.2, 1, 0],
		    			    	[ 0.8, 1, 0, 1],
		    			    	[ 0, 0.8, -1, 0]
		    			    ]
		    			});

		    			var connection = new Connection(connectionKey, value.source, value.target, connection);

		    			that.connections.push(connection);

					}, 1000);	
		    	})

    	    	that.connectionsBoardRef.on('child_removed', function(connectionSnapshot) {
    	    		var connectionKey = connectionSnapshot.key;
    	    		var toBeDeletedIndex = R.findIndex(R.propEq('uid', connectionKey), that.connections);
    	    		var connectionObjectToBeDeleted = that.connections[toBeDeletedIndex].getConnection();

					jsPlumb.detach(connectionObjectToBeDeleted);
					
    	    		that.connections.splice(toBeDeletedIndex, 1);
    	    	})
		    }
		})
	}
})