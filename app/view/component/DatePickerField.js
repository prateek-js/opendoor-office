Ext.define("TheOpenDoor.view.component.DatePickerField", {
    extend: "Ext.field.Text",
    xtype: "DatePickerField",
	config:{
			value:'',
			picker:'',
			readOnly:true,
			allowTap:true,
			listeners:{
				element:'element',
				tap:function(me, e, eOpts){
					if(this.getAllowTap()){
					 this.getPicker().showBy(this,'tr-br?');
					}
					
				}
				
			}
	},
    constructor: function (config) {

        var i,
            stringVal,
			dateArray=[],
			stringArray,
            datePicker = this,
			pickerCls=config.pickerCls,
			pickerHeight=config.pickerHeight;

        this.picker = Ext.create("Ext.Picker", {
            hidden: true,
            zIndex: 9999,
			cls:pickerCls,
			height:pickerHeight,
			useTitles: true,
			hideOnMaskTap:true,
			showAnimation:'',
			hideAnimation:'',
			id:'datePickerCreate',
    		slots : [{
	             name:'date',
	             store: Ext.getStore('GetSlotsStore'),
	             displayField: 'date',
	             valueField:'date',
	             align:'center',
	             title: 'Date'
    		}],

            listeners: {
				
				painted:function(){
					var value=datePicker.getValue();
					this.setValue(value);
				},
                change: function (picker, values) {
					datePicker.setValue(values.date);
					var store=Ext.getStore('GetSlotsStore');
					var index=store.find('date',values.date);
					var data=store.getAt(index);
					var timeArray=data.getData().start_times;
					var timeStore=Ext.getStore('TimeStore');
					timeStore.addToStore(timeArray);
					Ext.Viewport.remove(picker);
                }
            }
        });
		
		var viewportPicker=Ext.Viewport.add(this.picker); 
		config.picker=viewportPicker;
		var me=this;
        this.callParent(arguments);
    }
});