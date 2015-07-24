Ext.define('TheOpenDoor.store.OrderDetailStore', {
	extend : 'Ext.data.Store',
	requires: ['TheOpenDoor.model.OrderDetailModel'],
	config:{
    	model: "TheOpenDoor.model.OrderDetailModel",
    	storeId : 'OrderDetailStore',
        autoSync: true,
        autoLoad: true,
	},
    
    load:function()
    {
    	
    },
        
    addToStore : function(orderDetailData){
    	this.removeAll(true);    	
    	this.add(orderDetailData);
    }
});