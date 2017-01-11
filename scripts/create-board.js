Vue.component('argumen-panel', {
	template: '#argumen-panel-template',
	props: ['uid', 'title', 'message', 'type', 'index', 'right', 'top'],
	methods: {
		changePosition : function(event) {
			this.$emit('change-position', { index : this.index });
		},
		remove : function() {
			this.$emit('remove-argument', { index : this.index });
		},
		createRebuttal : function() {
			this.$emit('create-rebuttal', { index : this.index });	
		},
		createSupport : function() {
			this.$emit('create-support', { index : this.index });
		},
		viewArgument : function() {
			this.$emit('view-argument', { index : this.index });
		},
		editArgument : function() {
			this.$emit('edit-argument', { index : this.index });
		}
	}
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
		editor : null
	},
	methods : {
		logout: function() {
			this.firebase.auth.signOut();
		},
		openCreateArgumentModal : function() {
			this.modals.createArgumentModal.modal({
				backdrop: 'static',
				keyboard: false
			});
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
		createArgument : function(event) {
			var that = this;

			if(this.status == 'create-contention') {
				

				// this.forms.createArgument.setTop((event.clientY).toString());
				// this.forms.createArgument.setRight((event.clientX).toString());
				// this.forms.createArgument.setType('contention');
				
				// var newArgumentOfThisBoard = this.argumentsBoardRef.push();
				// newArgumentOfThisBoard.set(this.forms.createArgument.toPlainObject());
				
				// this.cleanCreateArgumentForm();
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

			//this.modals.createArgumentModal.modal('hide');
		},
		removeArgumentByIndex : function() {

		},
		openModalToCreateContenttion : function() {
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
		}
	},
	mounted : function() {
		
		this.editor = $('#content-editor');
		this.editor.summernote();

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
		    	that.firebase.boardRef = that.firebase.database.ref('boards/' + that.user.getUid());
				
				var newBoard = that.firebase.boardRef.push();
		    	that.boardKey = newBoard.key;
		    	newBoard.set(that.store.get('board-to-be-created'));
		    	that.store.remove('board-to-be-created');
		    	
		    	that.argumentsBoardRef = that.firebase.database.ref('arguments/' + that.boardKey);
		    	
		    	that.argumentsBoardRef.on('child_added', function(argumentSnapshot) {
		    		
		    		var uid = argumentSnapshot.key;
		    		var value = argumentSnapshot.val();

		    		var argument = new Argument(uid, value.title, value.content, value.type, value.top, value.right);
		    		that.arguments.push(argument);
		    	});

		    	that.connectionsBoardRef = that.firebase.database.ref('connections/' + that.boardKey);

		    	that.connectionsBoardRef.on('child_added', function(snapshot) {

		    	})
		    }
		})
	}
})