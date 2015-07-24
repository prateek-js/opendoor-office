/* 
 * File Name:       StartTimesModel.js
 * Description:     Model belongs to  GetSlotsModel
 *      
 */
Ext.define('TheOpenDoor.model.StartTimesModel', {
	extend : 'Ext.data.Model',
	config : {
		fields : [
		    {name : 'start_time', type: 'string'},
		   	{name : 'available', type: 'string'}
	   	],
	   	belongsTo:['TheOpenDoor.model.GetSlotsModel']
   	}
});

