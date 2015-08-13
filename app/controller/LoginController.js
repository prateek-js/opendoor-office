
Ext.define('TheOpenDoor.controller.LoginController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
     'TheOpenDoor.businessObject.LoginBO'
    ],
	config : {
        loginBO : 'TheOpenDoor.businessObject.LoginBO',
        userData: '',
        refs:{
            loginView: 'LoginView',
            googleBtnContainer : 'LoginView container[itemId = googleBtnContainer]',
            slideNavigator: 'SlideNavigator',
            dashboardView: 'DashboardView',
        },

        control:{
            slideNavigator:{
                logoutyes: 'handleLogoutYes',
                logoutno: 'handleLogoutNo'
            },
        },
	},

    applyLoginBO: function(boName) {
        return Ext.create(boName, this);
    },

    init: function(application) {
        window.fbAsyncInit = function() {
            FB.init({
              appId      : 991073507583251,
              xfbml      : true,
              version    : 'v2.3'
            });
        };

        (function(d, s, id){
            var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "http://connect.facebook.net/en_US/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
        }(document));


    },

    handleSignInFbDataSend: function(userFbEmail){
        showSpinner("Signing In...");
        var me = this,
        successCb = this.handleSignInSucess,
        failureCb = this.handleSignInFailure;
        this.getLoginBO().doUserFbLogin(userFbEmail, successCb, failureCb);
    },
    handleSignInDataSend: function(authResult){
        showSpinner("Signing In...");
        var me = this,
        successCb = this.handleSignInSucess,
        failureCb = this.handleSignInFailure;
        this.getLoginBO().doUserLogin(authResult,successCb, failureCb);
    },
    handleSignInSucess: function(){
        var loginView = this.getLoginView();
        if(loginView){
            Ext.Viewport.remove(loginView, true);
        }
        this.addToViewPort({
            xtype : 'DashboardView'
        },true);
        hideSpinner();
    },

    handleSignInFailure: function(errObj, noInternetConnection, errMsg){
        hideSpinner();        
    },
    handleGoogleSignIn: function() {
        showSpinner("Connecting to Google...");
        window.plugins.googleplus.login(
            {
              'iOSApiKey': '370422909165-4sr8egh09qdm62av5sh2npmi3emb076i.apps.googleusercontent.com'
            },
            function (obj) {
                console.log(obj);
            },
            function (obj1){
                console.log(obj1);
            }
        )
    },
    handleFacebookSignIn: function(){
        showSpinner("Connecting to facebook...");
        facebookConnectPlugin.login(["email"], 
            function(response){
                if (response.authResponse) {
                    facebookConnectPlugin.api('/me', null,function(response){
                        this.handleFbAuthResult(response);
                    },function(error){hideSpinner();});
                }
            },
            function (error) { 
                facebookConnectPlugin.login(["email"],function(response){
                    if (response.authResponse) {
                        facebookConnectPlugin.api('/me', null,function(response){
                            this.handleFbAuthResult(response);
                        },function(error){hideSpinner();});
                    }
                },function(response){console.log(JSON.stringify(response))});
                hideSpinner(); 
            }
        );
        //window.facebookConnectPlugin.api("/me?fields=id,email", ["user_birthday"],this.fbsuccess,function (error) {alert("Failed: " + error);});
    },
    handleLogoutYes: function() {
        showSpinner("Signing Out...");
        window.plugins.googleplus.logout(
            function (msg) {
                
            }
        );
        this.disconnect();
        this.isloggedIn = false;
        localStorage.removeItem('loggedInFlag');
        localStorage.setItem('loggedInFlag', this.isloggedIn);
        user_Id = null;
        localStorage.removeItem('user_Id');
        localStorage.setItem('user_Id', user_Id);
        var slideNavigator = this.getSlideNavigator();
        if(slideNavigator){
            Ext.Viewport.remove(slideNavigator, true);
        }
        this.addToViewPort({
            xtype : 'LoginView'
        },true);
        hideSpinner();
    },

    handleLogoutNo: function(){
        return false;
    },
    
    disconnect: function() {
        window.plugins.googleplus.disconnect(
            function (msg) {
            
            }
        );
    }

});
