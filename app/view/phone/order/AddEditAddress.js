Ext.define('TheOpenDoor.view.phone.order.AddEditAddress', {
    extend: 'Ext.Container',
    requires: [
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'start'
        },
        cls: 'add-edit-address-view',
        items:[{
            xtype: 'headerPanel',
            width: '100%',
            itemId: 'headerPanel',
            flex: 1,
            useLeftImage: true
        },{
            xtype: 'image',
            src: 'resources/images/logo.png',
            docked: 'top',
            itemId : 'centerLogo',
            cls: 'center-logo-image',
        },{
            xtype: 'container',
            layout : {
                type : 'vbox',
                align: 'start',
                pack: 'start'
            },
            flex: 9,
            cls: 'dashboard-view-container',
            items:[{
                xtype: 'label',
                itemId : 'addEditAddressLabel',
                cls: 'add-edit-address-label',
                html: ''
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'icon-field-container',
                items:[{
                    xtype: 'image',
                    src: 'resources/images/slider/all-orders.png',
                    cls: 'name-icon'
                },{
                    xtype: 'textfield',
                    itemId: 'nameField',
                    placeHolder: 'Name',
                    cls: 'name-textfield'
                }]                
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'icon-field-container',
                items:[{
                    xtype: 'image',
                    src: 'resources/images/slider/all-orders.png',
                    cls: 'call-icon'
                },{
                    xtype: 'numberfield',
                    itemId: 'mobileNumberField',
                    placeHolder: '9876543210',
                    cls: 'name-textfield'
                }]                
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'icon-field-container',
                items:[{
                    xtype: 'image',
                    src: 'resources/images/slider/all-orders.png',
                    cls: 'address-icon'
                },{
                    xtype: 'textfield',
                    itemId: 'addresslineOne',
                    placeHolder: 'Line 1',
                    cls: 'name-textfield'
                }]                
            },{
                xtype: 'textfield',
                itemId: 'addresslineTwo',
                placeHolder: 'Line 2',
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
            }]
        },{
            xtype: 'button',
            ui: 'plain',
            text: localeString.saveAddress,
            docked: 'bottom',
            itemId: 'saveButtonId',
            cls: 'save-address-button'            
        }]           
    }
});
