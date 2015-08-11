Ext.define('TheOpenDoor.businessObject.GetAllOrderBO', {
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
	doGetAllOrder: function(successCb, failureCb){
        this.successCb = successCb;
        this.failureCb = failureCb;
        this.inputDetails = {
        };
        this.doGetAllOrderAjaxRequest();
	},

	doGetAllOrderAjaxRequest: function () {
    	/* Call Login API */
        if(!isOnLine()) {
            hideSpinner();
            AppMessage.showMessageBox(4,null,null,localeString.noInternetConnection);
            return;
        }
        this.doSendAjax({
            url: BaseUrl.baseUrl+'orders?user_id='+window.user_Id,
            method:'GET',
			disableCaching: false ,
            jsonData: this.inputDetails,
            success: this.doGetAllOrderSuccess,
            failure: this.doGetAllOrderFailure,
            scope: this,
            timeout: 30000
        });        
    },

    doGetAllOrderSuccess: function(responseObj, opts){
        try{
        	var allOrderStore = Ext.getStore('GetAllOrderStore');
            allOrderStore.removeAll();
        	var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
            if (Ext.isObject(decodedObj)&& decodedObj.orders != null) {
            	allOrderStore.addToStore(decodedObj.orders);
                TheOpenDoor.app.getController('AllOrderController').handleGetAllOrderSucess();       	
    	    }
    	}catch(e){
			var errorText = localeString.errorMsg_defaultFailure;
			hideSpinner();
			//Display Error Message
			showErrorDialog(false, false, errorText);
		}
        hideSpinner();
    },

    doGetAllOrderFailure: function(responseObj, opts){
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
