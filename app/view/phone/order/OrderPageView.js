Ext.define('TheOpenDoor.view.phone.order.OrderPageView', {
    extend: 'Ext.Container',
    requires: [
    'Ext.DataView'
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'center'
        },
        cls: 'order-view',
        items:[{
            xtype: 'container',
            layout : {
                type : 'vbox',
                align : 'center',
                pack : 'center'
            },
            cls: 'dataview-outercontainer',
            items:[{
                xtype: 'rating',                        
                label : 'Star',
                itemId : 'ratingStar',
                itemsCount : 5,
                itemCls : 'x-rating-star',
                itemHoverCls : 'x-rating-star-hover',
                listeners: {
                    change: {
                        fn: function(ct, value, oldValue){
                            window.selectedRatingValue = value;
                        }
                    }
                }
            },{
                xtype: 'dataview',
                itemId: 'orderServicesDataView',
                width: '50%',
                height: '100%',
                scrollable: true,
                cls: 'order-services-dataview',
                store: 'OrderServiceStore',
                itemTpl: new Ext.XTemplate('<tpl>',
                        '<div>',
                            '<div class="services-image" style="background-image: url({image})"></div>',
                            '<div class="rate-label">Rate per Hour: {price_per_hour}</div>',
                        '</div>',
                    '</tpl>')
            }]
        }]           
    }
});
