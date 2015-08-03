Ext.define('TheOpenDoor.view.phone.order.AddressOrderService', {
    extend: 'Ext.Container',
    requires:['TheOpenDoor.view.phone.order.AddressView'],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'start'
        },
        itemId: 'addressServiceOrder',
        cls : ['address-service-order'],
        items : [{
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
            flex: 9,
            hidden: true,
            layout: {
                type: 'vbox',
                align : 'center',
                pack : 'center'
            },
            cls: 'empty-address-container',
            itemId: 'emptyAddressContainer',
            items:[{
                xtype: 'image',
                src: '',
                cls: 'add-address-home-image',
                itemId: 'addAddressImage'
            },{
                xtype: 'button',
                itemId: 'addAddressLabel',
                ui: 'plain',
                html : localeString.addAddress,                
                cls: 'add-address-label'
            }]
        },{
            xtype: 'container',
            flex: 9,
            layout: {
                type: 'vbox',
                align: 'start',
                pack: 'start'
            },
            scrollable: {
                direction: 'vertical',
                directionLock: true
            },
            cls: 'address-detail-container',
            itemId: 'addressDetailContainer',
            items:[{
                xtype: 'label',
                cls: 'address-diff-label',
                html : localeString.addresses
            },{
                xtype: 'AddressView',
                cls: 'address-dataview-view'
            }]                        
        },{
            xtype: 'button',
            ui: 'plain',
            docked: 'bottom',
            cls: 'add-new-address-button',
            text: localeString.addNewAddress,
            itemId: 'addNewAddressBtn'
        }]
    }
});