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
            xtype: 'carousel',
            direction: 'horizontal',
            cls: 'carousel-container',
            itemId : 'carouselContainer',
            defaults: {
              styleHtmlContent: true
            },
            items: [{
                xtype: 'image',
                src : "resources/images/carousel/how-it-works.jpg",
                cls: 'carousel-images'
            },{
                xtype: 'image',
                src : "resources/images/carousel/on-demand.jpg",
                cls: 'carousel-images'
            },{
                xtype: 'image',
                src : "resources/images/carousel/that's-it.jpg",
                cls: 'carousel-images'
            }]
        }]
    }
});
