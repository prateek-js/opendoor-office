Ext.define('TheOpenDoor.store.OrderServiceStore', {
	extend : 'Ext.data.Store',
	requires: ['TheOpenDoor.model.OrderServiceModel'],
	config:{
    	model: "TheOpenDoor.model.OrderServiceModel",
    	storeId : 'OrderServiceStore'
	},
    
    load:function()
    {
    	
    },
        
    addToStore : function(orderServiceData){
    	this.removeAll(true);    	
    	this.add(orderServiceData);
    }
});

