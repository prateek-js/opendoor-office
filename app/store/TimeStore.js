Ext.define('TheOpenDoor.store.TimeStore', {
	extend : 'Ext.data.Store',
	requires: ['TheOpenDoor.model.StartTimesModel'],
	config:{
    	model: "TheOpenDoor.model.StartTimesModel",
    	storeId : 'TimeStore',
        sorters : [
           {
               property: 'start_time',
               direction: 'ASC'
           }
        ]
	},
    load:function()
    {
    },
        
    addToStore : function(timeSlots){
        this.removeAll(true);       
        this.add(timeSlots);
    }
});

