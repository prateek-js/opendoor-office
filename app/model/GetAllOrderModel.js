/* 
 * File Name:       GetSlotsModel.js
 * Description:     Model which hold data related to 
 *      
 */
Ext.define('TheOpenDoor.model.GetAllOrderModel', {
	extend : 'Ext.data.Model',
	config : {
		fields : [
		    {name : 'order_id', type: 'string'},
		    {name : 'slot_start_time',type: 'string'},
		    {name : 'status', type: 'string'},
		    {name : 'service_name', type: 'string'}
			// {
			// 	name: 'orderTime',
			// 	type: 'string',
			// 	convert: function(value, record){
			// 		debugger;
			// 		val = splitDateAndTimeRetTime(record.get('slot_start_time'));
			// 		return val;
			// 	}
			// },
			// {
			// 	name: 'orderDate',
			// 	type: 'string',
			// 	convert: function(value, record){
			// 		debugger;
			// 		val = splitDateAndTimeRetDate(record.get('slot_start_time'));
			// 		return val;
			// 	}
			// }
	   	]
   	}
});

