/*
 * Wrapper for Ext.ajax to take care of Web service specification specific things
 */
var AjaxRequest = function() {
    var BASEURL = {
        "test": 'test url',
        "production":'production url',
        "UAT":'UAT url',
        "static": 'stubs'
    };
    var URI = {
        'Authenticate' : 'login.json',
        'logOut' : 'logout.json',
        'CreateUser' : 'dashboard.json',

    };

    //Added for bringing up the static screens when the server is down.
    //For this,  change the mode to 'static'from 'test'
    var STATIC_URI = {
        'Authenticate' : 'login.json',
        'logOut' : 'logout.json',
        'CreateUser' : 'dashboard.json',
        'OrderService' : 'orderService.json'
    };

    //test / production /UAT
    var mode = "static";

    var dummyModeSuccess = true;
    var authToken = '';
    var userId = '';
    var requestInProgress = false;

    var postMethods = ['authentication','CreateUser'];
    var deleteMethods = [];

    return {
        RESPONSE_CODES: {
            "SUCCESS" : 0,
            "FAILURE" : 1,
            "SESSION_TIMEOUT" : 2
        },
        /*@method makeJSONRequest
        * common method handler for making ajax calls from throughout the application
        * @param serverUrl
        * @param data
        * @param successCallBack
        * @param failureCallBack
        * @param responseAdditionalParam1
        * @param responseAdditionalParam2
        * Triggers the ajax call to the serverUrl and triggers the successCallBack or failureCallBack
        */
        makeJSONRequest: function(serverUrl, data, successCallBack, failureCallBack, thisscope, responseAdditionalParam1, responseAdditionalParam2)
        {
            /*check for internet connectivity before each ajax call ----start*/
            if(!isOnLine()) {
                hideSpinner();
            }
            /*check for internet connectivity before each ajax call ----end*/
            Ext.Ajax.defaultHeaders = {
                'Accept': 'application/json'
            };
            var me = this;
            var self = thisscope;
            var request = {
                method: (postMethods.indexOf(serverUrl) !== -1) ? 'POST' : ((deleteMethods.indexOf(serverUrl) !== -1)? 'DELETE':'GET'),
                timeout : 60000,
                headers: { 'Content-Type': 'application/json','Cache-Control' : 'no-cache,no-store' },
                disableCaching: false ,
                success: function(response, opts) {
                    //console.log("response",response.responseText);
                    requestInProgress = false;
                    var jsonResponse = Ext.JSON.decode(response.responseText);
                    var rootProperty = Object.keys(jsonResponse)[0];
                    var errorCode = jsonResponse[rootProperty].ResultCode;

                    if (errorCode === me.RESPONSE_CODES["SESSION_TIMEOUT"]) {
                        sessionManager.sessionExpireOnServerHandler();
                        return;
                    }
                    if(parseInt(errorCode) === me.RESPONSE_CODES["SUCCESS"]){
                        if(successCallBack){
                            successCallBack.call(self, jsonResponse);
                        }
                    }
                    else if(parseInt(errorCode) === me.RESPONSE_CODES["FAILURE"]){
                        if(failureCallBack){
                            var failuredecodedResponse = 'Json request failed';
                            failureCallBack.call(self, failuredecodedResponse);
                        }
                    }                    
                },
                failure: function(response, opts) {
                    //console.log("failure",response.responseText);
                    requestInProgress = false;
                    var failuredecodedResponse = 'Json request failed';
                    if (response.responseText) {
                        try {
                            failuredecodedResponse = Ext.JSON.decode(response.responseText);
                        } catch (ignore){
                            // do nothing
                            //console.log(e);
                        }

                        if (failuredecodedResponse.error_code === me.RESPONSE_CODES.SESSION_TIMEOUT) {
                            return;
                        }
                    }
                    if(failureCallBack)
                    {failureCallBack.call(self, failuredecodedResponse);}
                },
                scope : self
            };

            var url = BASEURL[mode] + '/' + ( ((mode === 'test') || (mode === 'production') || (mode === 'UAT')) ? URI[serverUrl] : STATIC_URI[serverUrl]);
            //console.log('url: '+ url);
            if (!url) {
                AppMessage.showMessageBox(99);
                return;
            }
            if(serverUrl === 'Authenticate') {
                var jsonObject = Ext.JSON.encode(data);
                request.jsonData = jsonObject;//removeMarkers(jsonObject);
            } else {
                request.headers.Authorization = authToken;
                url = url.replace('{user_id}', userId);
                if (data) {
                    if(request.method === 'GET')
                    {
                        url=url.replace('{param}',Ext.JSON.encode(data));
                    }
                    if(request.method === 'DELETE')
                    {
                        url=url.replace('{userBeneficiaryID}',data.userBeneficiaryID);
                    }
                    else // POST
                    {
                        var jsonObject = Ext.JSON.encode(data);
                        request.jsonData = jsonObject;

                    }
                }


            }
            request.url = url;//removeMarkers(url);
            //console.log("request.url",request.url);
            //console.log("request.params ",request.params);
            //console.log("request.method ",request.method);
            //console.log("request.jsonData",request.jsonData);
            Ext.Ajax.request(request);
            requestInProgress = true;
        },
        /*@method isRequestInprogress
        * method to return the value of variable requestInProgress
        * @returns {boolean} 
        */
        isRequestInprogress: function() {
            return requestInProgress;
        },
        /*@method setAuthToken
        * method to set the value of variable authToken
        * @param {string} token
        */
		setAuthToken: function(token) {
			authToken = token;
		},
        /*@method setApplicationMode
        * method to set the value of variable mode
        * @returns {string} appMode
        */
        setApplicationMode: function(appMode) {
            mode = appMode;
        },
         /*@method getApplicationMode
        * method to return the value of variable mode
        * @returns {string} 
        */
        getApplicationMode: function() {
            return mode;
        }
    };
} ();
