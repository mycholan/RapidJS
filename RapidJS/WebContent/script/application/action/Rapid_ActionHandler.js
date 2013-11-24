var RapidActionHandler = function(){
	this.CurrentActionObj = null;
	this.ActionElementID = null;
	this.ActionElementType = null;
	this.TargetElement = null;	
	this.TargetElementType = null;
	
	this.ServerActionObj = null;
	this.ClientActionObj = null;
	
	this.CLIENT_ACTION =  {			
			"CLIENT_1" : "mousedown",
			"CLIENT_2" : "mouseup",
			"CLIENT_3" : "click",
			"CLIENT_4" : "dblclick",
			"CLIENT_5" : "mouseover",
			"CLIENT_6" : "mouseout",
			"CLIENT_7" : "mousemove",
			"CLIENT_8" : "contextmenu",
			"CLIENT_9" : "keydown",
			"CLIENT_10" : "keyup",
			"CLIENT_11" : "keypress",
			"CLIENT_12" : "focus",
			"CLIENT_13" : "blur",
			"CLIENT_14" : "load",
			"CLIENT_15": "unload",
			"CLIENT_16" : "abort",
			"CLIENT_17" : "error",
			"CLIENT_18" : "submit",
			"CLIENT_19" : "reset",
			"CLIENT_20" : "change",
			"CLIENT_21" : "select",
			"CLIENT_22" : "input",
			"CLIENT_23" : "paint",
			"CLIENT_24" : "text",
			"CLIENT_25" : "popupShowing",
			"CLIENT_26" : "popupShown",
			"CLIENT_27" : "popupHiding",
			"CLIENT_28" : "popupHidden",
			"CLIENT_27" : "close",
			"CLIENT_28" : "command",
			"CLIENT_29" : "broadcast",
			"CLIENT_30" : "commandupdate",
			"CLIENT_31" : "dragenter",
			"CLIENT_32" : "dragover",
			"CLIENT_33" : "dragexit",
			"CLIENT_34" : "dragdrop",
			"CLIENT_35" : "draggesture",
			"CLIENT_36" : "resize",
			"CLIENT_37" : "scroll",
			"CLIENT_38" : "overflow",
			"CLIENT_39" : "underflow",
			"CLIENT_40" : "overflowchanged",
			"CLIENT_41" : "subtreemodified",
			"CLIENT_42" : "nodeinserted",
			"CLIENT_44" : "noderemoved",
			"CLIENT_45" : "noderemovedfromdocument",
			"CLIENT_46" : "nodeinsertedintodocument",
			"CLIENT_47" : "attrmodified",
			"CLIENT_48" : "characterdatamodified"
	};	
	
	this.ELEMENT = {
			"CONTROL_1" : "window",
			"CONTROL_2" : "container",
			"CONTROL_3" : "layout",
			"CONTROL_4" : "view",
			"CONTROL_5" : "control"				
	};
	
	
	
	this.SetTargetElement = function(target) {
		this.TargetElement = target;
	};	
	
	this.RegisterAction = function() {
		for(var i = 0; i < RapidAction.length; i++) {
			$( "#" +this.ELEMENT[ "CONTROL_" + RapidAction[i].CONTROL_TYPE ] + "_" + RapidAction[i].CONTROL_ID ).bind( this.CLIENT_ACTION[ "CLIENT_" + RapidAction[i].ACTION_CLIENT ], function() {
				ActionHandler.ActionListener($(this));
			});			
			$( "#" +this.ELEMENT[ "CONTROL_" + RapidAction[i].CONTROL_TYPE ] + "_" + RapidAction[i].CONTROL_ID ).attr("control_type", RapidAction[i].CONTROL_TYPE);			
		};
	};	
	
	this.ActionListener = function(element) {		
		var ClientTaskDone = false;
		
		this.ActionElementID = element.attr('id');
		this.ActionElementType = element.attr('control_type');		
		
		for(var  i =0; i < RapidAction.length; i++) {
			if(RapidAction[i].CONTROL_TYPE == type && this.ELEMENT[ "CONTROL_" + RapidAction[i].CONTROL_TYPE ] + "_" + RapidAction[i].CONTROL_ID == id) {
				
				this.CurrentActionObj = RapidAction[i];
				this.TargetElementType = this.ELEMENT[ "CONTROL_" +this.CurrentActionObj.TARGET_TYPE];
				
				if(this.CurrentActionObj.CLIENT_FIRST == "true") {
					this.DoClientTask();
					ClientTaskDone = true;
				}
				
				this.DoServerTask();
				
				if(!ClientTaskDone) {
					this.DoClientTask();
				}					
			}
		}
	};
	
	this.DoClientTask = function(ActionObj) {
		if(this.CurrentActionObj.CLIENT_TASK != null && this.CurrentActionObj.CLIENT_TASK != "") {
			
		}
	};
	
	this.DoServerTask = function(ActionObj) {
		if(this.CurrentActionObj.ACTION_SERVER != null && this.CurrentActionObj.ACTION_SERVER != "") {			
			this.GetTargetElement();
			this.ServerActionObj = new RapidServerAction({
				ActionObj : this.CurrentActionObj,
				ActionElementID : this.ActionElementID,
				ActionElementType : this.ActionElementType,
				TargetElement : this.TargetElement,	
				TargetElementType : this.TargetElementType
			});			
			this.ServerActionObj.SetServerActionObject();
			this.ServerActionObj.StartAction();
		}
	};
	
	this.GetTargetElement = function() {
		if(RapidContext != null) {
			if(this.TargetElementType == "window") {				
				this.TargetElement = RapidContext.Window;
				return;
			}else if(this.TargetElementType == "container") {
				if(RapidContext.Container != null && RapidContext.Container.length < 1) {
					for(var i = 0; i < RapidContext.Container.length; i++) {
						if(RapidContext.Container[i].ID == this.CurrentActionObj.TARGET_ID) {
							this.TargetElement = RapidContext.Container[i];
							return;
						}
					}
				}
			}else if(this.TargetElementType == "layout") {
				if(RapidContext.Layout != null && RapidContext.Layout.length < 1) {
					for(var i = 0; i < RapidContext.Layout.length; i++) {
						if(RapidContext.Layout[i].ID == this.CurrentActionObj.TARGET_ID) {
							this.TargetElement = RapidContext.Layout[i];
							return;
						}
					}
				}
			}else if(this.TargetElementType == "view") {
				if(RapidContext.View != null && RapidContext.View.length < 1) {
					for(var i = 0; i < RapidContext.View.length; i++) {
						if(RapidContext.View[i].ID == this.CurrentActionObj.TARGET_ID) {
							this.TargetElement = RapidContext.View[i];
							return;
						}
					}
				}
			}else if(this.TargetElementType == "control") {
				if(RapidContext.Container != null && RapidContext.Container.length < 1) {
					if(RapidContext.View != null && RapidContext.View.length < 1) {
						for(var i = 0; i < RapidContext.View.length; i++) {
							if(RapidContext.View[i].ID == $(this.ActionElementID).attr('myview')) {
								for(var j = 0; RapidContext.View[i].ViewItem.length; j++) {
									if("control_"+RapidContext.View[i].ViewItem[j].ID == this.ActionElementID) {
										this.TargetElement = RapidContext.View[i].ViewItem[j];
										return;
									}
								}
							}
						}
					}
				}
			}		
		}
		
		console.log('Target Element Not Found.!');
	};	
};


var RapidServerAction = function(param) {
	this.Param = param;
	
	this.Members = {
		ActionObj : "",
		ActionElementID : "",
		ActionElementType : "",
		TargetElement : "",	
		TargetElementType : ""
	};
	
	this.InitiateMembers = function(actionObj, actionElementID, actionElementType, targetElement, targetElementType) {
		this.ActionObj = actionObj;
		this.ActionElementID = actionElementID;
		this.ActionElementType = actionElementType;
		this.TargetElement = targetElement;	
		this.TargetElementType = targetElementType;
	};
	
	this.SERVER_ACTION = {
			INIT : 1,
			LOGIN : 2,
			GET : 3,
			POST : 4,
			DELETE : 5,
			META : 6				
	};
	
	this.SetServerActionObject = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.StartAction = function() {
		if(this.CurrentActionObj.ACTION_SERVER == this.SERVER_ACTION.INIT) {
			
		}else if(this.CurrentActionObj.ACTION_SERVER == this.SERVER_ACTION.LOGIN) {
			
		}else if(this.CurrentActionObj.ACTION_SERVER == this.SERVER_ACTION.GET) {
			
		}else if(this.CurrentActionObj.ACTION_SERVER == this.SERVER_ACTION.POST) {
			
		}else if(this.CurrentActionObj.ACTION_SERVER == this.SERVER_ACTION.DELETE) {
			
		}else if(this.CurrentActionObj.ACTION_SERVER == this.SERVER_ACTION.META) {
			
		}
	};	
};

var RapidClientAction = function() {
	
};

var RapidBaseOperation = function() {
	this.show = null;
	
	this.hide = null;
	
	this.remove = null;
	
	this.getValue = null;
	
	this.setValue = null;
	
	this.reload = null;
	
	this.set_Show = function(func) {
		this.show = func;
	};
	
	this.set_Hide = function(func) {
		this.hide = func;
	};
	
	this.set_Remove = function(func) {
		this.remove = func;
	};
	
	this.set_SetValue = function(func) {
		this.setValue = func;
	};
	
	this.set_GetValue = function(func) {
		this.getValue = func;
	};
};