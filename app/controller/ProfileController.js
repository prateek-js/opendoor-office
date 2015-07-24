Ext.define('TheOpenDoor.controller.ProfileController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
        'TheOpenDoor.businessObject.ProfileBO'
    ],
	config : {
        profileBO: 'TheOpenDoor.businessObject.ProfileBO',
        refs:{
            profileView: 'ProfileView',
            slideNavigator: 'SlideNavigator',
            mobileNumberProfileField : 'ProfileView [itemId =mobileNumberProfileField]',
            saveProfileButton: 'ProfileView button[itemId = saveProfileButton]',
            emailProfileField: 'ProfileView [itemId = emailProfileFieldId]',
            nameProfileField: 'ProfileView [itemId = nameProfileField]'
        },

        control:{
            profileView:{
                initialize: 'handleProfileViewInit'
            },
            saveProfileButton:{
                tap: 'handleSaveProfileButtonTap'
            }
        },
	},

    applyProfileBO: function(boName) {
        return Ext.create(boName, this);
    },

    handleProfileViewInit: function(){
        showSpinner(localeString.loading);
        var me = this;
        successCb = this.handleGetProfileSucess,
        failureCb = this.handleGetProfileFailure;
        this.getProfileBO().doProfile(successCb, failureCb);
    },

    handleGetProfileSucess: function(){
        var dashboardStore = Ext.getStore('DashboardStore');
        this.getMobileNumberProfileField().setValue(dashboardStore.data.items[0].data.phone_number);
        this.getEmailProfileField().setValue(dashboardStore.data.items[0].data.email_id);
        this.getNameProfileField().setValue(dashboardStore.data.items[0].data.name);
    },

    handleSaveProfileButtonTap: function(){
        showSpinner(localeString.loading);
        var profileData = {};
        profileData.phone_number = this.getMobileNumberProfileField().getValue();
        profileData.name = this.getNameProfileField().getValue();
        profileData.email = this.getEmailProfileField().getValue();   
        Ext.Ajax.request({
            url:  UrlHelper.getServerUrl().profile,
            method: 'PUT',          
            headers: {'Content-Type': 'text/json'},
            waitTitle: 'Connecting',
            waitMsg: 'Sending data...',
            timeout: 30000,                                     
            params: Ext.JSON.encode({
                "phone_number": profileData.phone_number,
                "name": profileData.name
            }),
            scope:this,
            success : function(responseObj) {
                try{
                    if (responseObj.status == 200 && responseObj.statusText == "OK") {
                        AppMessage.showMessageBox(6,null,null,localeString.profileSaveSuccess);
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
