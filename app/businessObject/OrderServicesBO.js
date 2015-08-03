Ext.define('TheOpenDoor.businessObject.OrderServicesBO', {
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
	doOrderServices: function(successCb, failureCb){
        this.successCb = successCb;
        this.failureCb = failureCb;
        this.inputDetails = {
        };
        this.doOrderServicesAjaxRequest();
	},

	doOrderServicesAjaxRequest: function () {
    	/* Call Login API */
        this.doSendAjax({
            url: UrlHelper.getServerUrl().getServices,
            method:'GET',
			disableCaching: false ,
            jsonData: this.inputDetails,
            success: this.onGetServiceSuccess,
            failure: this.onGetServiceFailure,
            scope: this,
            timeout: 30000
        });        
    },

    onGetServiceSuccess: function(responseObj, opts){
        try{
        	var orderServiceStore = Ext.getStore('OrderServiceStore');
            orderServiceStore.removeAll();
        	var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
            if (decodedObj) {
            	orderServiceStore.addToStore(decodedObj);                    	
    	    }
    	}catch(e){
			var errorText = localeString.errorMsg_defaultFailure;
			hideSpinner();
			//Display Error Message
			showErrorDialog(false, false, errorText);
		}
        hideSpinner();
    },

    onGetServiceFailure: function(responseObj, opts){
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
