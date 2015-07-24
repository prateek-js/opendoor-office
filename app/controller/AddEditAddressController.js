
Ext.define('TheOpenDoor.controller.AddEditAddressController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
        'TheOpenDoor.businessObject.GetAddressBO',
        'TheOpenDoor.businessObject.AddEditAddressBO',
        'TheOpenDoor.businessObject.DeleteAddressBO'
    ],
	config : {
        addressIdSelected: '',
        addressToEdit: '',
        clickedAddressId: '',
        btnRef : '',
        addressBO: 'TheOpenDoor.businessObject.GetAddressBO',
        addEditAddressBO: 'TheOpenDoor.businessObject.AddEditAddressBO',
        deleteAddressBO: 'TheOpenDoor.businessObject.DeleteAddressBO',
        refs:{
            addressOrderService: 'AddressOrderService',
            baseNavigationView: 'BaseNavigationView',
            addressView: 'AddressView',
            addEditAddress : 'AddEditAddress',
            addressBackButton: 'AddressOrderService [itemId=headerPanel] button[itemId=backButtonId]',
            addressNextButton: 'AddressOrderService [itemId=headerPanel] button[itemId=nextButtonId]',
            addressEditCancelButton: 'AddEditAddress button[itemId=cancelButtonId]',
            addressEditSaveButton : 'AddEditAddress button[itemId=saveButtonId]',
            nameField : 'AddEditAddress [itemId=nameField]',
            addresslineOne : 'AddEditAddress [itemId=addresslineOne]',
            addresslineTwo : 'AddEditAddress [itemId=addresslineTwo]',
            landmarkField : 'AddEditAddress [itemId=landmarkField]',
            pinField : 'AddEditAddress [itemId=pinField]',
            mobileNumberField : 'AddEditAddress [itemId=mobileNumberField]',
            addNewAddressBtn: 'AddressOrderService [itemId=addNewAddressBtn]',
            addEditAddressLabel: 'AddEditAddress [itemId=addEditAddressLabel]'
        },

        control:{
             addressOrderService:{
                initialize: 'handleAddressOrderServiceInit'
            },
            addressBackButton:{
                tap: 'handleAddressBackButtonTap'
            },
            addressView:{
                itemtap:'addressViewDataItemTap'
            },
            addressNextButton:{
                tap : 'handleAddressNextButton'
            },
            addressEditCancelButton:{
                tap : 'handleAddressBackButtonTap'
            },
            addressEditSaveButton:{
                tap : 'handleAddressEditSaveButtonTap'
            },
            addEditAddress : {
                initialize : 'handleAddEditAddressInit'
            },
            addNewAddressBtn: {
                tap: 'handleAddEditAddress'
            }
        },
	},
    
    applyAddressBO: function(boName) {
        return Ext.create(boName, this);
    },
    applyAddEditAddressBO: function(boName) {
        return Ext.create(boName, this);
    },
    applyDeleteAddressBO: function(boName){
        return Ext.create(boName, this);
    },

    handleAddressOrderServiceInit: function(){
        showSpinner(localeString.loading);
        var me = this;
        successCb = this.handleGetAddressSucess,
        failureCb = this.handleGetAddressFailure;
        this.getAddressBO().doGetAddress(successCb, failureCb);
    },
    handleGetAddressSucess: function(){
        hideSpinner();
    },
    handleGetAddressFailure: function(){
        hideSpinner();
    },
    handleAddressBackButtonTap: function(){
        this.getBaseNavigationView().onNavBack();
    },
    addressViewDataItemTap:function(dataview,index,dataitem){
        btnRef = this.getAddressView().down('#addressItemCnt').getBtnRef();
        clickedAddressId = dataitem.getRecord().getData().id;
        if(btnRef=="edit"){
            //open edit and add address field
            addressToEdit = dataitem.getRecord().getData();
            this.getBaseNavigationView().pushtoNavigationView('AddEditAddress');
            this.getAddEditAddressLabel().setHtml("Edit Existing Address");          
        }
        else if(btnRef=="delete"){
            //send data to server and refresh the view
            this.handleAddressDelete(clickedAddressId);
        }
        else if(btnRef=="radio"){
            //keep the address id of clicked one
            this.addressIdSelected = clickedAddressId;
        }
        else if(btnRef==""|| btnRef==" "|| btnRef== null){

        }
    },
    handleAddressNextButton: function(){
        if(this.addressIdSelected == "" ||this.addressIdSelected == null||this.addressIdSelected == " "|| this.addressIdSelected == undefined){
            //goto next view
            alert("no address selected")
        }
        else{
            //tell user to select the address
           this.getBaseNavigationView().pushtoNavigationView('FinalOrderPreview');
        }
    },
    handleAddressDelete: function(clickedAddressId){
        showSpinner("Loading");
        this.getDeleteAddressBO().doAddressDelete(clickedAddressId,successCb, failureCb);
    },
    handleAddressViewRefresh: function(){
        this.getAddressView().refresh();
        this.getAddressBO().doGetAddress(successCb, failureCb);
    },
    handleAddEditAddressInit: function(){
        if(btnRef == "edit"){
            this.getNameField().setValue(addressToEdit.name);
            this.getAddresslineOne().setValue(addressToEdit.line1);
            this.getAddresslineTwo().setValue(addressToEdit.line2);
            this.getLandmarkField().setValue(addressToEdit.landmark);
            this.getPinField().setValue(addressToEdit.pincode);
            this.getMobileNumberField().setValue(addressToEdit.phone_number);
        }
        else{
            //else if open view blank
            this.getNameField().setValue();
            this.getAddresslineOne().setValue();
            this.getAddresslineTwo().setValue();
            this.getLandmarkField().setValue();
            this.getPinField().setValue();
            this.getMobileNumberField().setValue();
        }
    },
    handleAddEditAddress: function(){
        btnRef = null;
        clickedAddressId = null;
        this.getBaseNavigationView().pushtoNavigationView('AddEditAddress');
        this.getAddEditAddressLabel().setHtml("Add New Address");
    },
    handleAddressEditSaveButtonTap: function(){
            var newdAddressData = {};
            
            var newdAddressDataFields = {};
            newdAddressDataFields.name = this.getNameField().getValue();
            newdAddressDataFields.line1 = this.getAddresslineOne().getValue();
            newdAddressDataFields.line2 = this.getAddresslineTwo().getValue();
            newdAddressDataFields.landmark = this.getLandmarkField().getValue();
            newdAddressDataFields.pincode = this.getPinField().getValue();
            newdAddressDataFields.phone_number = this.getMobileNumberField().getValue();
            newdAddressDataFields.city = "Bangalore"
            newdAddressDataFields.state = "Karnataka";
            newdAddressDataFields.country = "India";
            newdAddressData.address = newdAddressDataFields;
            var validateErrMsg = '';
        
            if(Ext.isEmpty(newdAddressDataFields.name)){
                validateErrMsg = "name empty";
            }else if(Ext.isEmpty(newdAddressDataFields.line1)){
                validateErrMsg = "line1 empty";
            }else if(Ext.isEmpty(newdAddressDataFields.landmark)){
                validateErrMsg = "landmark empty";
            }else if(Ext.isEmpty(newdAddressDataFields.pincode)){
                validateErrMsg = "pincode empty";
            }else if(Ext.isEmpty(newdAddressDataFields.phone_number)){
                validateErrMsg = "phone_number empty";
            }
            if(!Ext.isEmpty(validateErrMsg)){
                Ext.Msg.show({
                    title: '',
                    message: validateErrMsg,
                    buttons: Ext.MessageBox.OK,
                    cls: ''
                });
            }else{
                showSpinner();
                if(btnRef == "edit"){
                    newdAddressData.id = clickedAddressId;
                    Ext.Ajax.request({
                        url: UrlHelper.getServerUrl().updateAddress,
                        method: 'PUT',          
                        headers: {'Content-Type': 'text/json'},
                        waitTitle: 'Connecting',
                        waitMsg: 'Sending data...',                                     
                        params: Ext.JSON.encode({
                            "address_id": newdAddressData.id,
                            "address": newdAddressData.address
                        }),
                        scope:this,
                        timeout: 30000,
                        success : function(responseObj) {
                            try{
                                var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
                                if (Ext.isObject(decodedObj)) {
                                    //this.handleAddressOrderServiceInit();
                                    this.getAddressView().refresh();
                                    this.getAddressBO().doGetAddress(successCb, failureCb);
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
                            errorHandled = this.genericErrorCheck(responseObj, false);
                            if(!errorHandled){
                                var errorText = "Error";
                                AppMessage.showMessageBox(4,null,null,localeString.errorInGettingResponse);
                                hideSpinner();
                            }
                            hideSpinner();
                        }    
                    });
                }
                else{
                    newdAddressData.id = null;
                    Ext.Ajax.request({
                        url: UrlHelper.getServerUrl().addAddress,
                        method: 'POST',          
                        headers: {'Content-Type': 'text/json'},
                        waitTitle: 'Connecting',
                        waitMsg: 'Sending data...',                                     
                        params: Ext.JSON.encode({
                            "address": newdAddressData.address
                        }),
                        scope:this,
                        success : function(responseObj) {
                            try{
                                var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
                                if (Ext.isObject(decodedObj)) {
                                    this.getAddressView().refresh();
                                    //this.handleAddressOrderServiceInit();
                                    this.getAddressBO().doGetAddress(successCb, failureCb);
                                    
                                }else
                                {
                                    var errorText = localeString.errorMsg_invalid_userId_password;
                                    this.invokeCb (this.failureCb, [null, false, false, errorText]);
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
                            errorHandled = this.genericErrorCheck(responseObj, false);
                            if(!errorHandled){
                                var errorText = "Error";
                                AppMessage.showMessageBox(4,null,null,localeString.errorInGettingResponse);
                                hideSpinner();
                            }
                            hideSpinner();
                        }                             
                    });
                }
                this.getBaseNavigationView().onNavBack();
            }           
    }    
});
