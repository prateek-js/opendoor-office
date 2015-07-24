Ext.define('TheOpenDoor.view.phone.Main', {
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
            xtype: 'headerPanel',
            flex: 1,
            width: '100%'
        },{
            xtype: 'image',
            src: 'resources/images/bulletpoint.jpg',
            docked: 'top',
            itemId : 'centerLogo',
            cls: 'center-logo-image',
        },{
            xtype: 'carousel',
            direction: 'horizontal',
            flex: 9,
            height: '90%',
            width: '90%',
            cls: 'carousel-container',
            itemId : 'carouselContainer',
            defaults: {
              styleHtmlContent: true
            },
            items: [{
                xtype: 'image',
                src : "resources/images/images.jpeg"
            },{
                xtype: 'image',
                src : "resources/images/download.jpeg"
            },{
                xtype: 'image',
                src : "resources/images/images.jpeg"
            },{
                xtype: 'image',
                src : "resources/images/download.jpeg"
            }]
        },{
            xtype : 'spacer',
            flex: 1
        }]
    }
});
