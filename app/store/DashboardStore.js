Ext.define('TheOpenDoor.store.DashboardStore', {
	extend : 'Ext.data.Store',
	requires: ['TheOpenDoor.model.DashboardModel'],
	config:{
    	model: "TheOpenDoor.model.DashboardModel",
    	storeId : 'DashboardStore'
	},
    
    load:function()
    {
    	//console.log("loginStore Loaded");
    },
        
    addToStore : function(dashboardUserData){
    	this.removeAll(true);    	
    	this.add(dashboardUserData);
    }
});


