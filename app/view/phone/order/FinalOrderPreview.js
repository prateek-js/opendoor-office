Ext.define('TheOpenDoor.view.phone.order.FinalOrderPreview', {
    extend: 'Ext.Container',
    //requires:[''],
    config: {
        itemId: 'finalOrderPreview',
        cls : ['final-order-preview'],
        items : [{
            xtype: 'headerPanel',
            width: '100%',
            itemId: 'headerPanel',
            flex: 1,
            useBackButton: true,
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
            cls: 'final-order-container',
            items:[{
                xtype: 'label',
                cls: 'selected-service-label',
                itemId: 'selectedServiceLabel',
                html : ''
            },{
                xtype: 'label',
                cls: 'selected-time-label',
                itemId: 'selectedTimeLabel',
                html: ''
            },{
                xtype: 'label',
                cls: 'selected-address-label',
                html: '',
                itemId: 'selectedAddressLabel'
            },{
                xtype: 'button',
                ui: 'plain',
                text: 'Place the Order',
                itemId: 'placeOrderButton',
                cls: 'place-order-button'
            }]                        
        }]
    }
});