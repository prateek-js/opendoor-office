/* 
 * File Name:       BaseBO.js
 * Description:     Base Business Logic class to handle common functionalities to 
                    all Business objects.  All BOs derives from this Base BO
 *
 * Copyrights:      
 */
Ext.define('TheOpenDoor.businessObject.BaseBO', {

	//requires: ['TheOpenDoor.helper.BaseUrl'],
	/**
     * @property {Boolean} ajaxRequestInProcess flag the denotes is there any pending ajax request in Async Mode
     */
	ajaxRequestInProcess : false,
	
    /**
     * 
     * @property {Object} commonRequestHeader common ajax request header object
     */
	commonRequestHeader : {
        disableCaching: false,
        'Content-Type': 'application/json',
        'Cache-Control' : 'no-cache,no-store'
    },
    /**
     * @property {Object} controllerObj it refers the controllers class obj that invokes this BO classes
     */
    controllerObj: null,
    /**
     * @property {Function} successCb success callback function when ajax request response computation succeed
     */
    successCb: null,
    /**
     * @property {Function} failureCb failure callback function when ajax request response computation fails
     */
    failureCb: null,
    /**
     * @property {Object} inputDetails Object that contains the ajax request input parameters
     */
    inputDetails: {},
    /**
     * @property {String} responseType the api response type
     */
    responseType: 'json',

    /**
     * ajax request header parameter objects
     * @param {String} sessionId the session ID
     * @return {Object} the request header parameters
     */
    getInputHeaderReqParams : function(userId){
        var inp_req_params = {};
        if(userId !== null && userId !== undefined){
            inp_req_params.access_token = userId;
        }
        return inp_req_params;
    },
    /**
     * invoke the callback method based on scope object
     * @param {Function} cbFunction callback function
     * @param {Array} args Function arguments
     */
    invokeCb: function (cbFunction, args) {
        if (this.controllerObj && cbFunction) {
            cbFunction.apply (this.controllerObj, args);
        }
    },
    doSendAjax: function (requestObj) {
    	//console.log('doSendAjax');
        // if (isOnLine()) {
        	requestObj = Ext.applyIf(requestObj, this.commonRequestHeader); 
            Ext.Ajax.request(requestObj);
        // }
        // else {
        // 	//Display Error Message, if no internet connection
        //     showErrorDialog(null, true, true);
        // }
    },
    
    genericErrorCheck: function (responseObj) {
        var errorHandled = false,
            errorText = localeString.unable_process_error;
        if (responseObj.status != null && responseObj.status == 401) {
            errorText = localeString.session_timeout_error;
            errorHandled = true;
        }
        
        
        if (errorHandled) {
            showErrorDialog(null, true, true);
        }
        
        return errorHandled;
    },

    /**
     * method will decode the api response based on responseType property
     * @param {Object} responseObj api response object
     * @return {Object} decoded response object 
     */
    decodeAPIresponse: function(responseObj){
        var me = this, decodedObject = null;
        if(me.responseType == 'json'){
            decodedObject = (responseObj.responseText && responseObj.responseText.length) ? 
                    Ext.decode (responseObj.responseText, true) : null;
        }
        return decodedObject;
    },
    /**
     * failure Base BO callback
     * @param {Array/Object} responseObj api response data
     * @param {Boolean} userLogin user logged in
     * @param {String} errorText error message
     */
    failureBaseBOCallback: function(responseObj, errorText){
        var me = this, decodedObj = null, errorHandled = false;
        decodedObj = me.decodeAPIresponse(responseObj);        
        if(typeof errorText === 'undefined'){
            errorText = localeString.errorGenericMessage;
        }
        //errorHandled = this.genericErrorCheck(decodedObj, userLogin, bypassDefaultErrorCheck);
        //if(!errorHandled){
            this.invokeCb (this.failureCb, [decodedObj, errorText, false]);
        //}
    },
});
