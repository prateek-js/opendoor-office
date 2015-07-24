
/**
 *@ ##AppMessage
 * Singleton class to popup Ext.Msgbox with appropriate messages
 */
Ext.define('TheOpenDoor.helper.AppMessage', {
    singleton: true,
    alternateClassName : 'AppMessage',
    
    requires: [
        'Ext.MessageBox'
    ],
    
    MESSAGE_TYPES: {
        'error':'error',
        'success':'success',
        'failure':'failure',
        'warning':'warning',
        'cancel':'cancel',
        'warning_cancel':'warning_cancel',
        'warning_noTitle':'warning_noTitle',
        'success_noTitle':'success_noTitle',
        'error_login' : 'error_login'
    },
    MESSAGE_TYPES_LOCALES: {
        'error': "Error",
        'info': '',
        'warning': "Warning",
        'success': "Success",
        'failure': "Failure"
    },
    lastMessageType: null,
    
    /**
     * @method disableMask
     * @param config
     */
    disableMask: function(buttonId, value, opt)
    {
        Ext.Viewport.setMasked(null);
    },
    /*@method showConnectionError
    * method to show Connection error alert mesasge
    * @param {string} msg
    */
    showConnectionError: function (msg)
    {
        Ext.Viewport.setMasked(true);
        var me = this;
        if (msg && typeof msg === "string")
        {
            Ext.Msg.alert(localeString.appName,msg, function() {
                AppMessage.disableMask();
            }, window);
        }
        else{ 
            Ext.Msg.alert(localeString.appName,localeString.connectionerrormessage, function() {
                AppMessage.disableMask();
            }, window);
        }
    },
    /*@method showErrorMsg
    * method to show alert message
    * @param {string} msg
    */
    showErrorMsg:function(msg)
    {
        var me = this;

        Ext.Viewport.setMasked(true);
        if (msg /*&& typeof msg === "String"*/)
            Ext.Msg.alert(localeString.appName,msg, function() {AppMessage.disableMask();}, window);
         else
            Ext.Msg.alert(localeString.appName,localeString.failto_ConnectWithServer, function() {AppMessage.disableMask();}	, window);
    },
    /*@method showMessageBox
    * method to show and hide the alert messages depending on categories
    * @param {onject} responseObj
    * @param {method} callback
    * @param {object} scope
    * @param {string} message
    */
    showMessageBox: function (responseObj,callback,scope,message) 
    {

        if (Ext.Msg.isHidden() === null || Ext.Msg.isHidden() === true) {
            this.showMsg(responseObj,callback,scope,message);
        }
        else if( Ext.Msg.isHidden() === false ) {
            this.hideMessageBox(Ext.Msg);
            this.showMsg(responseObj,callback,scope,message);
        }
        else{
            Ext.Msg.destroy();
        }
    },
    /*@method showMsg
    * method to show the alert messages depending on categories
    * @param {onject} responseObj
    * @param {method} callback
    * @param {object} scope
    * @param {string} message
    */
    showMsg: function(responseObj,callback,scope,message){
        var errorcode;
        var errormessage = message;
        if (responseObj){
            if (typeof responseObj === 'number'){
                errorcode = responseObj;

            }
            var messageType = (ERROR_CODE[errorcode] && ERROR_CODE[errorcode].type) ? ERROR_CODE[errorcode].type : this.MESSAGE_TYPES.error;
            var messageTitle = (ERROR_CODE[errorcode] && ERROR_CODE[errorcode].title) ? ERROR_CODE[errorcode].title : this.MESSAGE_TYPES.error.toUpperCase();

            var messageText = errormessage ;
            Ext.Msg.defaultAllowedConfig.showAnimation = false;
            switch(messageType){
                case this.MESSAGE_TYPES.error:
                    Ext.Msg.alert(messageTitle,messageText, function(buttonId, value, opt) {
                        if( callback) 
                            callback.call(scope, buttonId, value, opt);
                        }, 
                        scope);
                    break;

                case this.MESSAGE_TYPES.warning:
                    Ext.Msg.confirm(messageTitle,messageText,function(buttonId, value, opt) {
                        if( callback )
                         callback.call(scope, buttonId, value, opt);
                    },scope);
                    Ext.Msg.addCls(this.MESSAGE_TYPES.warning);
                    break;
                 
                case this.MESSAGE_TYPES.success:
                    Ext.Msg.alert(messageTitle,messageText,function(buttonId, value, opt) {
                        if( callback) 
                            callback.call(scope, buttonId, value, opt);
                    },scope);
                    Ext.Msg.addCls(this.MESSAGE_TYPES.success);
                    break;                  
               
            }
            this.lastMessageType = messageType;
            }
    },
    /*@method hideMessageBox
    * method to hide any previous displayed alert
    * @param {object} msgBox
    * @param {object} eOpts
    */
    hideMessageBox: function (msgBox, eOpts) {
        var i;
        var msgBoxClass = msgBox.getCls();
        if (msgBoxClass) {
            for (i in msgBoxClass)
                msgBox.removeCls(msgBoxClass[i]);
                msgBox.hide();
        }
        if (msgBox === null || msgBox.isHidden() === true) {
            Ext.Viewport.setMasked(null);
        }
    }
});
