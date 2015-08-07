
Ext.define('TheOpenDoor.businessObject.ProfileBO', {
	extend: 'TheOpenDoor.businessObject.BaseBO',
	requires: [
	           'Ext.Ajax'
	     ],

	controllerObj: null,
	successCb: null,
	dashboardAddressData : null,
	userId: null,
	failureCb: null,
	inputDetails: null,

	constructor: function (cObj) {
		if (Ext.isDefined (cObj)) {
			this.controllerObj = cObj;
		}
		return this;
	},
	doProfile: function(successCb, failureCb){
        this.successCb = successCb;
        this.failureCb = failureCb;
        this.inputDetails = {
        };
        this.doGetProfileAjaxRequest();
	},

	doGetProfileAjaxRequest: function () {
    	/* Call Login API */
        this.doSendAjax({
            url: BaseUrl.baseUrl+'users/'+window.user_Id+'/profile',
            method:'GET',
			disableCaching: false ,
            jsonData: this.inputDetails,
            success: this.onGetProfileSuccess,
            failure: this.onGetProfileFailure,
            scope: this,
            timeout: 30000
        });        
    },

    onGetProfileSuccess: function(responseObj, opts){
    	try{
        	var dashboardStore = Ext.getStore('DashboardStore');
        	var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
            if (Ext.isObject(decodedObj)) {
            	dashboardStore.addToStore(decodedObj);
                TheOpenDoor.app.getController('ProfileController').handleGetProfileSucess();                    	
    	    }
    	}catch(e){
			var errorText = localeString.errorMsg_defaultFailure;
			hideSpinner();
			//Display Error Message
			showErrorDialog(false, false, errorText);
		}
        hideSpinner();
    },

    onGetProfileFailure: function(responseObj, opts){
    	var decodedObj = (responseObj.statusText);
        errorHandled = genericErrorCheck(responseObj, false);
        if(!errorHandled){
            var errorText = "Error";
            AppMessage.showMessageBox(4,null,null,localeString.errorInGettingResponse);
            hideSpinner();
        }
        hideSpinner();
    }
});
