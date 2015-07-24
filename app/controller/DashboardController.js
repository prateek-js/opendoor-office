
Ext.define('TheOpenDoor.controller.DashboardController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
    ],
	config : {
        userProfile: '',
        refs:{
            dashboardView: 'DashboardView',
            slideNavigator: 'SlideNavigator',
            orderPageView: 'OrderPageView',
            mobileNumberField : 'DashboardView [itemId =mobileNumberField]',
            saveButton: 'DashboardView button[itemId = saveButton]',
            emailField: 'DashboardView [itemId = emailFieldId]',
            nameField: 'DashboardView [itemId = nameField]',
            mobileNumberField: 'DashboardView [itemId = mobileNumberField]'
        },

        control:{
            dashboardView:{
                initialize: 'handleDashboardViewInit'
            },
            saveButton:{
                tap: 'handleSaveButtonTap'
            }
        },
	},

    handleDashboardViewInit: function(){
        this.getEmailField().setValue(userEmail);
        this.getNameField().setValue(userName);
    },

    handleSaveButtonTap: function(){
        showSpinner(localeString.loading);        
        var dashboardAddressData = {};
        dashboardAddressData.phone_number = this.getMobileNumberField().getValue();
        dashboardAddressData.name = this.getNameField().getValue();
        dashboardAddressData.email = this.getEmailField().getValue();
        var dashboardStore = Ext.getStore('DashboardStore');
        dashboardStore.addToStore(dashboardAddressData);      
        Ext.Ajax.request({
            url: UrlHelper.getServerUrl().profile,
            method: 'PUT',          
            headers: {'Content-Type': 'text/json'},
            waitTitle: 'Connecting',
            waitMsg: 'Sending data...',                                     
            params: Ext.JSON.encode({
                "phone_number": dashboardAddressData.phone_number,
                "name": dashboardAddressData.name
            }),
            timeout: 30000,
            scope:this,
            success : function(responseObj) {
                try{
                    if (responseObj.status == 200 && responseObj.statusText == "OK") {
                        this.isloggedIn = true;
                        localStorage.removeItem('loggedInFlag');
                        localStorage.setItem('loggedInFlag', this.isloggedIn);
                        var dashboardView = this.getDashboardView();
                        if(dashboardView){
                            Ext.Viewport.remove(dashboardView, true);
                        }
                        this.addToViewPort({
                            xtype : 'SlideNavigator'
                        },true);
                        hideSpinner();
                    }
                }catch(e){
                    var errorText = localeString.errorMsg_defaultFailure;
                    hideSpinner();
                    //Display Error Message
                    showErrorDialog(false, false, errorText);
                }
                hideSpinner();
            },                                    
            failure : function(responseObj) {
                // var respObj = Ext.JSON.decode(response.responseText);
                // Ext.Msg.alert("Error", respObj.status.statusMessage);
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
    }
});
