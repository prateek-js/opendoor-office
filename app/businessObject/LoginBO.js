
Ext.define('TheOpenDoor.businessObject.LoginBO', {
	extend: 'TheOpenDoor.businessObject.BaseBO',
	requires: [
	           'Ext.Ajax'
	     ],

	controllerObj: null,
	successCb: null,
	failureCb: null,
	inputDetails: null,
	authResult: null,
	inputDetails: null,
    userFbEmail: null,
	constructor: function (cObj) {
		if (Ext.isDefined (cObj)) {
			this.controllerObj = cObj;
		}
		return this;
	},
	doUserLogin: function(authResult, successCb, failureCb){
		this.authResult = authResult;
        this.successCb = successCb;
        this.failureCb = failureCb;
        
        this.inputDetails = {
       		"email_id": authResult.email,
       		"gender": authResult.gender,
       		"displayName": authResult.displayName
        };
        
        this.doLoginAjaxRequest();
	},
    doUserFbLogin: function(userFbEmail, successCb, failureCb){
        this.userFbEmail = userFbEmail;
        this.successCb = successCb;
        this.failureCb = failureCb;
        
        this.inputDetails = {
            "email_id": userFbEmail.email,
        };
        
        this.doLoginAjaxRequest();
    },
	doLoginAjaxRequest: function () {
    	/* Call Login API */
        this.doSendAjax({
            url: UrlHelper.getServerUrl().createUser,
            method:'POST',
			disableCaching: false ,
            jsonData: this.inputDetails,
            success: this.onLoginSuccess,
            failure: this.onLoginFailure,
            scope: this,
            timeout: 30000
        });        
    },

    onLoginSuccess: function(responseObj, opts){
    	try{
        	var createUserStore = Ext.getStore('CreateUserStore');
        	var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
            if (Ext.isObject(decodedObj)) {
            	createUserStore.addToStore(decodedObj);
                TheOpenDoor.app.getController('LoginController').handleSignInSucess();
    	    }
    	}catch(e){
			var errorText = localeString.errorMsg_defaultFailure;
			hideSpinner();
			//Display Error Message
			showErrorDialog(false, false, errorText);
		}
    },

    onLoginFailure: function(responseObj, opts){
    	var decodedObj = (responseObj.statusText);
        errorHandled = this.genericErrorCheck(responseObj, false);
        if(!errorHandled){
            var errorText = "Error";
            AppMessage.showMessageBox(4,null,null,localeString.errorInGettingResponse);
            hideSpinner();
        }
        hideSpinner();
    }
});
