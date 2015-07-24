Ext.define('TheOpenDoor.store.GetSlotsStore', {
	extend : 'Ext.data.Store',
	requires: ['TheOpenDoor.model.GetSlotsModel'],
	config:{
    	model: "TheOpenDoor.model.GetSlotsModel",
    	storeId : 'GetSlotsStore',
        sorters : [
           {
               property: 'date',
               direction: 'ASC'
           }
        ]
	},
    
    load:function()
    {
    },
        
    addToStore : function(getSlots){
    	this.removeAll(true);    	
    	this.add(getSlots);
    }
});


