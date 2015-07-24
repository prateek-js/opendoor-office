Ext.define('TheOpenDoor.store.GetAllOrderStore', {
	extend : 'Ext.data.Store',
	requires: ['TheOpenDoor.model.GetAllOrderModel'],
	config:{
    	model: "TheOpenDoor.model.GetAllOrderModel",
    	storeId : 'GetAllOrderStore',
        autoSync: true,
        autoLoad: true,
	},
    
    load:function()
    {
    	
    },
        
    addToStore : function(allOrderData){
    	this.removeAll(true);    	
    	this.add(allOrderData);
    }
});