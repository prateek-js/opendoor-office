Ext.define('TheOpenDoor.view.phone.order.AddEditAddress', {
    extend: 'Ext.Container',
    requires: [
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'stretch'
        },
        cls: 'add-edit-address-view',
        items:[{
            xtype: 'headerPanel',
            width: '100%',
            itemId: 'headerPanel',
            flex: 1
        },{
            xtype: 'image',
            src: 'resources/images/bulletpoint.jpg',
            docked: 'top',
            itemId : 'centerLogo',
            cls: 'center-logo-image',
        },{
            xtype: 'container',
            layout : {
                type : 'vbox',
            },
            flex: 9,
            cls: 'dashboard-view-container',
            items:[{
                xtype: 'label',
                itemId : 'addEditAddressLabel',
                cls: 'add-edit-address-label',
                html: ''
            },{
                xtype: 'textfield',
                itemId: 'nameField',
                placeHolder: 'Name',
                cls: 'other-textfield'
            },{
                xtype: 'textfield',
                itemId: 'addresslineOne',
                placeHolder: 'Address Line 1',
                cls: 'address-textfield'
			},{
                xtype: 'textfield',
                itemId: 'addresslineTwo',
                placeHolder: 'Address Line 2',
                cls: 'other-textfield'
            },{
                xtype: 'textfield',
                itemId: 'landmarkField',
                placeHolder: 'LandMark',
                cls: 'other-textfield'
            },{
                xtype: 'numberfield',
                itemId: 'pinField',
                placeHolder: 'Pin',
                cls: 'other-textfield'
            },{
                xtype: 'numberfield',
                cls: 'mobile-number-field',
                placeHolder: 'Phone Number',
                itemId : 'mobileNumberField'
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'save-cancel-btn-container',
                items:[{
                    xtype: 'button',
                    ui: 'plain',
                    text: 'Save',
                    itemId: 'saveButtonId',
                    flex: 1,
                    cls: 'save-address-button'
                },{
                    xtype: 'button',
                    ui: 'plain',
                    text: 'Cancel',
                    itemId: 'cancelButtonId',
                    flex: 1,
                    cls: 'cancel-address-button'
                }]
                
            }]
        }]           
    }
});
