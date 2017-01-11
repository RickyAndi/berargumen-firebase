new Vue ({
    el: '#app',
    data : {
        firebase : {
            auth : null
        },
        user : null,
        modals : {
            createBoardModal : null
        },
        forms : {
            createBoardForm : {
                title : null,
                description : null
            }
        },
        store : null
    },
    methods : {
        facebookLogin : function() {
            var provider = new firebase.auth.FacebookAuthProvider();
            
            provider.addScope('email');
            provider.addScope('public_profile');

            provider.setCustomParameters({
              'display': 'popup'
            });

            var promise = this.firebase.auth.signInWithPopup(provider);

            promise.catch(function(e) {
                console.log(e.message)
            })
        },
        logout : function() {
            this.firebase.auth.signOut();
        },
        openCreateBoardModal : function() {
            this.modals.createBoardModal.modal('show');
        },
        closeCreateBoardModal : function() {
            this.modals.createBoardModal.modal('hide');
        },
        getCreateBoardFormTitle : function() {
            return this.forms.createBoardForm.title;
        },
        getCreateBoardFormDescription : function() {
            return this.forms.createBoardForm.description;
        },
        createBoard : function() {
            
            this.store.set('board-to-be-created', { 
                title : this.getCreateBoardFormTitle(),
                description : this.getCreateBoardFormDescription()
            });

            this.closeCreateBoardModal();
            this.cleanBoardForm();

            this.redirectToCrateBoardPage();
        },
        cleanBoardForm : function() {
            this.forms.createBoardForm.title = '';
            this.forms.createBoardForm.description = '';
        },
        redirectToCrateBoardPage : function() {
            window.location.href = 'create-board.html';
        },
        redirectToMyBoards : function() {
            window.location.href = 'my-boards.html';
        },
    },
    mounted : function() {
        var config = {
            apiKey: "AIzaSyCoeRfZ6Ds3pZBFFdAyhxCd74ZvA1wLdGA",
            authDomain: "test-975e4.firebaseapp.com",
            databaseURL: "https://test-975e4.firebaseio.com",
            storageBucket: "test-975e4.appspot.com",
            messagingSenderId: "690986657049"
        };

        firebase.initializeApp(config);

        this.firebase.auth = firebase.auth();
        
        var that = this;

        this.firebase.auth.onAuthStateChanged(function(user) {
            if(null == user) {
                that.user = null;
            } else {
                that.user = new User(user.uid, user.displayName, user.email, user.photoURL);
            }
        })

        this.modals.createBoardModal = $('#create-board-modal');

        this.modals.createBoardModal.on('hidden.bs.modal', function() {
            that.cleanBoardForm();
        })

        this.store = store; // storejs
    }
})