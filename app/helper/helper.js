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
var serviceIdSelected = '';
var orderStartTime = '';
var userProfile = '';
//window.user_Id = 5;
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
     var conDate = date.slice(0,10);
     if(!date)
     {
        return null;
     }
    var dateItems = conDate.split('-');
    var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var month = months[dateItems[1]-1];
    var dateRet = dateItems[2]+' '+month;
    return dateRet;
}


/**
 * convert datestring to find day name
 * @param date
 * @returns {day in name format}
 */
function convertDateforDay(date){
     //if (date === "")
     if(!date)
     {
        return null;
     }
    var dateItems = date.split('-');
    var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var month = months[dateItems[1]-1];
    var dateRet = dateItems[2]+' '+month+' '+dateItems[0];
    var d = new Date(dateRet);
    var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
    var dayName = weekday[d.getDay()];
    return dayName;
}

/**
 * convert datestring to month digit , date and year
 * @param date
 * @returns {date in month digit format}
 */
function convertDateToCalendarDate(date){
     //if (date === "")
     if(!date)
     {
        return null;
     }
    var dateItems = date.split('-');
    var months=["01","02","03","04","05","06","07","08","09","10","11","12"];
    var month = months[dateItems[1]-1];
    var dateRet = dateItems[2]+'/'+month+'/'+dateItems[0];
    var dayName = convertDateforDay(date);
    var displayDate = dateRet+','+dayName;
    return displayDate;
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
    var timeString = time;
    var H = +timeString.substr(0, 2);
    var h = (H % 12) || 12;
    var ampm = H < 12 ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
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
    return contime;
}

/**
 * Input full date and time and will convert it to separate time and date entity
  * and returns time
*/
function splitDateAndTimeRetDate(dateTime){
    var inp = dateTime;
    var conDate = convertDateToCalendarDate(inp.slice(0,10));
    //var conDate = convertDateToTimestamp(inp.slice(0,9));
    //var conDate = convertDateToTimestampTest(inp.slice(0,10));
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