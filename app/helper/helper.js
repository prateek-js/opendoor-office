/**
 *@ ##Helper.js
 *
 *
 */
var LRM_TAG='&lrm;';
var ENABLE_SPINNER_DELAY;
var SPINNER_DELAY=500;


var userName = '';
var userEmail = '';
var userGender = '';
var isloggedIn = '';
var user_Id = '1';
var serviceIdSelected = '';
var orderStartTime = '';
var userProfile = '';
/**
    * @method handleAuthResult
    * @param {authResult}
    * sucess handler from google 
*/
function handleAuthResult(authResult) {
    this.userDetails(authResult);
    TheOpenDoor.app.getController('TheOpenDoor.controller.LoginController').handleSignInDataSend(authResult);
}
/**
    * @method userDetails
    * @param {authResult}
    * details from google
*/
function userDetails(authResult){
    userName = authResult.displayName;
    userEmail = authResult.email;
    var displayImage = authResult.imageUrl;
    userGender = authResult.gender;
}

/**
 * @method showSpinner
 * show loading spinner
 * @param {String} msg The loading message.
 */
function showSpinner(msg) {
    function doShowSpinner(msg) {
    	var messageToDisplay;
    	if (msg === 'undefined' || msg === null){
    		messageToDisplay = 'Loading';
    	} else {
    		messageToDisplay = msg;
    	}
        Ext.Viewport.setMasked({
            xtype : 'loadmask',
            message : messageToDisplay,
            indicator : true,
            zIndex : 2000
        });
    }
    
    // JN: For Android a certain delay is enforced to allow the keyboard to be dismissed before the loading view kicks in
    if (ENABLE_SPINNER_DELAY ==='undefined'){
        ENABLE_SPINNER_DELAY = Ext.os.is.Android;        
    }
    if(ENABLE_SPINNER_DELAY) {
        Ext.defer(function(){
            doShowSpinner(msg); 
        },SPINNER_DELAY);
    } else {
        doShowSpinner(msg);
    }
}
/**
 * check for internet connection
 * @returns {boolean} 
 */
function isOnLine() {
    if(Ext.device.Connection !== undefined)
        return Ext.device.Connection.isOnline();   
    else return navigator.onLine;       
}

/**
 * hide loading spinner
 */
function hideSpinner() {
	//console.log('hideSpinner');
    // JN: The delay is also enforced on the hiding of the mask to avoid situation where the mask is hidden before it is shown (due to the delay) 
    if(ENABLE_SPINNER_DELAY) {
        Ext.defer(function(){
            Ext.Viewport.setMasked(false); 
        },SPINNER_DELAY);
    } else {
        Ext.Viewport.setMasked(false);
    }
}

/**
 * Display the Error popup dialog
 * @param errMsg
 * @param sessionTimeout
 * @param noInternetConnection
 * @param redirectToLogin
 */
function showErrorDialog(errMsg, redirectToLogin,noInternetConnection){
    var alertMsg = '';
    if(typeof redirectToLogin === "undefined"){
        redirectToLogin = false;
    }
    if(typeof noInternetConnection == "undefined"){
        noInternetConnection = false;
    }

    if(typeof errMsg !== "undefined" && errMsg !==''){
            //param errMsg message
            alertMsg = errMsg;
        }/*else if(noInternetConnection){
        alertMsg = localeString.errorMsg_noInternetConnection;
        redirectToLogin = true;
    }else if(sessionTimeout){
        alertMsg = localeString.session_timeout_error;
        redirectToLogin = true;
    }*/else{
        //default error message
        alertMsg = localeString.errorGenericMessage;
    }
    
    Ext.Msg.show({
        title: '',
        message: alertMsg,
        buttons: Ext.MessageBox.OK,
        cls: 'confirmation_box',
    });
    
}

/**
 * Native Android Back Button event handler
 * @param {Object} e event object 
 * @returns {Boolean}
 */
function onNativeBackKeyDown(e) {
      Ext.Msg.show({
            title: 'Exit',
            message: localeString.appExitErrorMessage,
            buttons: [{
                text: 'NO',
                ui: 'null'
            },{
                html: '<b>YES</b>',
                ui: 'null',
                text: 'YES'
            }],
            fn: function(buttonId) {
                buttonId = buttonId.toLowerCase();
                if(buttonId === 'no'){
                    //do nothing
                }else{
                    navigator.app.exitApp();
                }
            }
       });

      e.preventDefault();
      e.stopPropagation();
      return false;
}

/**
 * convert datestring to month name , date and year
 * @param date
 * @returns {date in month name format}
 */
function convertDateToTimestamp(date){
     //if (date === "")
     if(!date)
     {
        return null;
     }
    var dateItems = date.split('-');
    var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var month = months[dateItems[1]-1];
    var dateRet = dateItems[2]+' '+month+', '+dateItems[0];
    return dateRet;
}

/**
 * Converts time into 12 hours format with am/pm adding
 * @param time
 * @returns {time in 12 hours format}
 */

function convertTimeToTimestamp(time){
    if(!time){
       return '';
    }
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}

/**
 * Parse the lang query param from the URL
 * @returns {Boolean/String}
 */
function getLangParamFromURL(){
    // Check if the ?lang parameter is set in the URL
    var paramkey = 'lang', paramsString = window.location.search.substr(1),
        paramsArray = paramsString.split("&"),
        i, valuefound = false;

    for (i = 0; i < paramsArray.length; i++) {
        var tmpArray = paramsArray[i].split("=");
        if(tmpArray[0] && tmpArray[0] === paramkey){
            valuefound = tmpArray[1];
        }
    }
    return valuefound;
}

/**
 * Input full date and time and will convert it to separate time and date entity
  * and returns time
*/
function splitDateAndTimeRetTime(dateTime){
    var inp = dateTime
    var contime = convertTimeToTimestamp(inp.slice(11,19));
    return conTime;
}

/**
 * Input full date and time and will convert it to separate time and date entity
  * and returns time
*/
function splitDateAndTimeRetDate(dateTime){
    var inp = dateTime;
    var conDate = convertDateToTimestamp(inp.slice(0,9));
    return conDate;
}

function genericErrorCheck(responseObj) {
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
    }