Ext.define('TheOpenDoor.view.phone.order.AddressOrderService', {
    extend: 'Ext.Container',
    requires:['TheOpenDoor.view.phone.order.AddressView'],
    config: {
        itemId: 'addressServiceOrder',
        cls : ['address-service-order'],
        items : [{
            xtype: 'headerPanel',
            width: '100%',
            itemId: 'headerPanel',
            flex: 1,
            useBackButton: true,
            useNextButton: true
        },{
            xtype: 'image',
            src: 'resources/images/bulletpoint.jpg',
            docked: 'top',
            itemId : 'centerLogo',
            cls: 'center-logo-image',
        },{
            xtype: 'container',
            flex: 9,
            layout: {
                type: 'vbox'
            },
            cls: 'address-detail-container',
            items:[{
                xtype: 'button',
                ui: 'plain',
                cls: 'add-new-address-button',
                text: 'Add New Address',
                itemId: 'addNewAddressBtn'
            },{
                xtype: 'label',
                cls: 'address-diff-label',
                html : 'Or Select any address from below'
            },{
                xtype: 'AddressView',
                cls: 'address-dataview-view'
            }]                        
        }]
    }
});