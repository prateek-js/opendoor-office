/* 
 * File Name:       OrderDetailModel.js
 * Description:     Model which hold data related to 
 *      
 */
Ext.define('TheOpenDoor.model.OrderDetailModel', {
	extend : 'Ext.data.Model',
	config : {
		fields : [
		    {name : 'actual_end_time', type: 'string'},
		    {name : 'actual_start_time', type: 'string' },
	        {name : 'created_at', type: 'string'},
	        {name : 'slot_start_time', type: 'string'},
	        {name : 'status', type: 'string'},
		    {name : 'total_price', type: 'string' },
	        {name : 'order_id', type: 'string'},
	        {name : 'service_name', type: 'string'},
	        {name : 'address', type: 'auto'}
	   	]
   	}
});

