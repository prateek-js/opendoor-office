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
            layout: {
                type: 'vbox'
            },
            cls: 'final-order-container',
            items:[{
                xtype: 'label',
                cls: 'user-name-label',
                itemId: 'userNameLabel',
                html : ''
            },{
                xtype: 'label',
                cls: 'selected-service-label',
                itemId: 'selectedServiceLabel',
                html : localeString.yourRequest+ '' +localeString.requestCreated
            },{
                xtype: 'label',
                cls: 'maid-reach-label',
                itemId: 'maidReachLabel',
                html : localeString.maidReach
            },{
                xtype: 'label',
                cls: 'address-label',
                html: '',
                itemId: 'addressLineLabel'
            },{
                xtype: 'label',
                cls: 'landmark-label',
                html: '',
                itemId: 'landmarkCityLabel'
            },{
                xtype: 'label',
                cls: 'pincode-label',
                html: '',
                itemId: 'pincodeLabel'
            },{
                xtype: 'label',
                cls: 'mobile-label',
                html: '',
                itemId: 'mobileLabel'
            },{
                xtype: 'label',
                cls: 'time-label',
                html: '',
                itemId: 'timeLabel'
            }]                        
        },{
            xtype: 'button',
            ui: 'plain',
            docked: 'bottom',
            text: localeString.submit,
            itemId: 'placeOrderButton',
            cls: 'place-order-button'
        }]
    }
});