Ext.define('TheOpenDoor.store.AddressGetStore', {
	extend : 'Ext.data.Store',
	requires: ['TheOpenDoor.model.AddressGetModel'],
	config:{
    	model: "TheOpenDoor.model.AddressGetModel",
    	storeId : 'AddressGetStore',
        autoSync: true,
        autoLoad: true,
	},
    
    load:function()
    {
    	
    },
        
    addToStore : function(addressData){
    	this.removeAll(true);    	
    	this.add(addressData);
    }
});