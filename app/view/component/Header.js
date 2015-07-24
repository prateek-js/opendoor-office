Ext.define('TheOpenDoor.view.component.Header',{
    extend : 'Ext.Panel',
    xtype : 'headerPanel',
    requires : ['Ext.TitleBar'],
    config : {
        cls: '',
        title : '',
        useBackButton : false,
        useDoneButton : false,
        useNextButton : false,
        useConfirmButton : false,
        backButtonLabel:'',
        backButtonCls:'',
        ui: 'plain',
        rightImage: '',
        leftImage:'',
        useRightImage: false,
        useLeftImage: false,
        layout: {
            type: 'hbox',
            docked: 'top',
            pack: 'stretch'
        },
        items: [{
            xtype: 'titlebar',
            itemId: 'headerTitleBar',
            cls: 'common-header-background',
            docked: 'top',
            align: 'stretch',
            items: [{
                xtype: 'button',
                ui: 'plain',
                text: 'Back',
                itemId : 'backButtonId',
                iconCls: 'header-back',
                iconMask: true,
                align : 'left',
                cls: 'back-button-text',
                hidden : true           
            },{
                xtype: 'image',
                itemId: 'rightImage',
                src: '',
                align: 'right',
                cls: 'rightHeaderImageCls',
                hidden: true
            },
            {
                xtype: 'image',
                itemId: 'leftImage',
                src: '',
                align: 'left',
                cls: 'leftHeaderImageCls',
                hidden: true
            },
            {
                xtype: 'button',
                ui: 'plain',
                text: 'Done',
                itemId : 'doneButtonId',
                iconCls: 'header-done',
                iconMask: true,
                iconAlign: 'right',
                align : 'right',
                cls: 'done-button-text',
                hidden : true           
            },{
                xtype: 'button',
                ui: 'plain',
                text: 'Confirm',
                itemId : 'confirmButtonId',
                iconCls: 'header-done',
                align : 'right',
                cls: 'confirm-button-text',
                hidden : true           
            },{
                xtype: 'button',
                ui: 'plain',
                text: 'Next',
                itemId : 'nextButtonId',
                iconCls: 'header-done',
                iconMask: true,
                iconAlign: 'right',
                align : 'right',
                cls: 'done-button-text',
                hidden : true           
            }]
        }]
    },


    /**
     * @method applyTitle
     * Set the title in the header panel
     * @param title
     */
    applyTitle : function(title) {
        this.down('titlebar').setTitle(title);
    },

    /**
     * @method applyRightDataImage 
     * it will display the image on right side
     * pass the src
     */
    applyRightImage: function(rightImage){
        if(!Ext.isEmpty(rightImage)){
            this.down('#rightImage').setSrc(rightImage);
        }
    },

    /**
     * @method applyLeftImage 
     * it will display the image on left side
     * pass the src
     */
    applyLeftImage: function(leftImage){
        if(!Ext.isEmpty(leftImage)){
            this.down('#leftImage').setSrc(leftImage);
        }
    },
    /**
     * @method applyBackButtonCls
     * it will set css class to to the back button
     * pass the cls
     */
    applyBackButtonCls:function(backButtonCls){
        if(backButtonCls&&this.getUseBackButton())
          this.down('#backButtonId').setCls(backButtonCls);
        return backButtonCls;
    },
    /**
     * @method applyDoneButtonCls
     * it will set css class to to the done button
     * pass the cls
     */
    applyDoneButtonCls:function(doneButtonCls){
        if(doneButtonCls&&this.getUseDoneButton())
          this.down('#doneButtonId').setCls(doneButtonCls);
        return doneButtonCls;
    },
    applyNextButtonCls:function(doneButtonCls){
        if(nextButtonCls&&this.getUseNextButton())
          this.down('#nextButtonId').setCls(doneButtonCls);
        return doneButtonCls;
    },
    /**
     * @method initialize
     * it will initialize the header panel and will check for types of fields
     * to be displayed
     */
    initialize: function () {

        var me = this, useBackButton = false, useRightImage = false, useLeftImage = false, useDoneButton = false;
        me.callParent();

        useBackButton = me.getUseBackButton();
        useRightImage = me.getUseRightImage();
        useLeftImage = me.getUseLeftImage();
        useDoneButton = me.getUseDoneButton();
        useNextButton = me.getUseNextButton();
        useConfirmButton = me.getUseConfirmButton();
        if (useBackButton) {
            this.down('#backButtonId').show();
        }
        if(useDoneButton){
            this.down('#doneButtonId').show();
        }
        if (useRightImage){
            this.down('#rightImage').show();
        }
        if (useLeftImage) {
            this.down('#leftImage').show();
        }
        if(useNextButton) {
            this.down('#nextButtonId').show();
        }
        if(useConfirmButton) {
            this.down('#confirmButtonId').show();
        }
    }
});