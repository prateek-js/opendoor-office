Ext.define('TheOpenDoor.view.tablet.Main', {
    extend: 'Ext.Container',
    requires: [
        'Ext.fx.easing.EaseOut',
        'Ext.carousel.Item',
        'Ext.carousel.Indicator',
        'Ext.carousel.Carousel'
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'center'
        },
        cls: 'main-view-container',
        items:[{
            xtype: 'carousel',
            direction: 'horizontal',
            height: '90%',
            width: '90%',
            itemId: 'carouselId',
            items: [{
                html : 'Item 1',
                style: 'background-color: #759E60'
            },
            {
                html : 'Item 2',
                style: 'background-color: #5E99CC'
            }]
        },{
            xtype : 'button',
            ui : 'plain',
            cls : 'main-continue-button',
            itemId: 'mainContinueButton',
            html: 'Continue'
        }]
    }
});
