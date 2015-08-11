Ext.define('TheOpenDoor.view.phone.order.OrderPageView', {
    extend: 'Ext.Container',
    requires: [
    'Ext.DataView'
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'start',
            pack : 'start'
        },
        cls: 'order-view',
        id: "OpenDoorOrderPageView",
        items:[{
            xtype: 'container',
            layout : {
                type : 'vbox',
                align : 'start',
                pack : 'start'
            },
            cls: 'dataview-outercontainer',
            items:[
            // {
            //     xtype: 'rating',                        
            //     label : 'Star',
            //     itemId : 'ratingStar',
            //     itemsCount : 5,
            //     itemCls : 'x-rating-star',
            //     itemHoverCls : 'x-rating-star-hover',
            //     listeners: {
            //         change: {
            //             fn: function(ct, value, oldValue){
            //                 window.selectedRatingValue = value;
            //             }
            //         }
            //     }
            // },
            // {
            //     xtype: 'dataview',
            //     itemId: 'orderServicesDataView',
            //     width: '50%',
            //     height: '100%',
            //     scrollable: true,
            //     cls: 'order-services-dataview',
            //     store: 'OrderServiceStore',
            //     itemTpl: new Ext.XTemplate('<tpl>',
            //             '<div>',
            //                 '<div class="services-image" style="background-image: url({image})"></div>',
            //                 '<div class="rate-label">Rate per Hour: {price_per_hour}</div>',
            //             '</div>',
            //         '</tpl>')
            // },
            {
                xtype: 'label',
                itemId: 'serviceNameLabel',
                cls: 'service-name-label',
                html: 'Maid'
            },{
                xtype: 'image',
                src: 'resources/images/banner.jpg',
                cls: 'service-image'
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'service-button-container',
                items:[{
                    xtype: 'button',
                    itemId: 'rateCardBtn',
                    cls: 'rate-card-btn',
                    flex: 1,
                    text: localeString.rateCard
                },{
                    xtype: 'button',
                    itemId: 'bookNowBtn',
                    cls: 'book-now-btn',
                    flex: 1,
                    text: localeString.bookNow
                }]
            }]
        }]           
    }
});
