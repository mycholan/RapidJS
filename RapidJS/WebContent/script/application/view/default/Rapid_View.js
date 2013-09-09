var RapidView = function(param){
	this.Param = param;
	this.ViewParent = null;
	this.View = null;
	this.ControlList = new Array();
	
	this.Members = {
			ViewID : "",
			ViewName : "",
			ViewType : "",
			ViewColumnCount : "",
			ViewRecordCount : "",
			ViewActive : "",
			ViewDisplay : "",
			ViewItem : null
	};
	
	this.ViewType = {
			GRID : 1,
			RECORDLIST : 2,
			LINKLIST : 3
	};
	
	this.SetViewObject = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.SetViewParent = function(viewParent){
		this.ViewParent = viewParent;
	};
	
	this.InitView = function(){
		if(this.Members.ViewType == this.ViewType.GRID) {
			this.CreateGridView();			
		}else if(this.Members.ViewType == this.ViewType.RECORDLIST) {
			this.CreateRecordListView();
		}else if(this.Members.ViewType == this.ViewType.LINKLIST) {
			this.CreateLinkListView();
		}
	};
	
	this.ShowView = function(){
		this.View.show();
	};
	
	this.HideView = function(){
		this.View.hide();
	};
	
	this.ExitView = function(){
		this.View.remove();
	};
	
	this.ReloadView = function(){
		
	};
	
	this.CreateGridView = function(){
		var ViewTable = $('<table id="view_"'+this.Members.ViewID+'" class="RapidTable RapidViewTable"></table>');
		var ViewTR = null;
		var ViewTD = null;
		var ControlIndex = 0;
		var ControlObj = null;
		
		var TotalControls = this.Members.ViewItem.length;
		var TotalRows = parseInt(TotalControls) / parseInt(this.Members.ViewColumnCount); 
		
		for(var i = 0; i < TotalRows; i++) {
			ViewTR = $('<tr></tr>');
			for(var j = 0; j < parseInt(this.Members.ViewColumnCount); j++) {
				ViewTD = $('<td></td>');
				
				ControlObj = new RapidControl({
					ControlID : this.Members.ViewItem[ControlIndex].ID,
					ViewID : "",            
		            XTYPE : this.Members.ViewItem[ControlIndex].XTYPE,
		            Mobile :"",
		            DataType : "",
		            Display : this.Members.ViewItem[ControlIndex].DISPLAY,            
		            Error : this.Members.ViewItem[ControlIndex].ERROR,
		            ReadOnly : this.Members.ViewItem[ControlIndex].READONLY,
		            Label : this.Members.ViewItem[ControlIndex].LABEL
				}, 1);
				ControlObj.SetControlObject();
				this.ControlList.push(ControlObj);
				
				ViewTD.append(ControlObj.GetControlObject());
				ViewTR.append(ViewTD);
				
				ControlIndex++;
			}
			
			ViewTable.append(ViewTR);
		}		
		
		this.ViewParent.append(ViewTable);
	};
	
	this.CreateRecordListView = function(){
		
	};
	
	this.CreateLinkListView = function(){
		
	};	
};

var RapidOperation = function() {
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

var RapidControl = function(param, cDisplayType) {
	this.Param = param;
	this.ControlDisplayType = cDisplayType;
	this.Wrapper = $('<ul class="RapidUL RapidControlWrapper"></ul>');
	this.WrapperItem = null;
	this.CONTROL = null;
	
	this.Members = {
			ControlID : "",
			ViewID : "",            
            XTYPE : "",
            Mobile :"",
            DataType : "",
            Display : "",            
            Error : "",
            ReadOnly : "",
            Label : ""                
	};
	
	this.XTYPE ={
			TEXT : 1,
			PASSWORD : 2,
			TEXT_AREA : 3,
			BUTTON : 4,
			CHECK : 5,
			RADIO : 6,
			SELECT : 7,
			IMAGE : 8,
			LIST : 9,
			DATE_PICKER : 10,
			AUTO_SUGGEST : 11
	};
	
	this.DisplayType = {
			SINGLE_RECORD : 1,
			MULTI_RECORD : 2,
			LINK_RECORD : 3
	};
	
	this.SetControlObject = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.GetControlObject = function() {
		if(this.ControlDisplayType == this.DisplayType.SINGLE_RECORD) {
			this.SingleRow();
			return this.Wrapper;
		}else if(this.ControlDisplayType == this.DisplayType.SINGLE_RECORD) {
			
		}else if(this.ControlDisplayType == this.DisplayType.SINGLE_RECORD) {
			
		}
	};
	
	this.SingleRow = function(){
		if(this.Members.XTYPE == this.XTYPE.TEXT) {
			this.CONTROL = $('<input id="control_'+this.Members.ControlID+'" type="text" myview="'+this.Members.ViewID+'"></input>');
		}else if(this.Members.XTYPE == this.XTYPE.BUTTON) {
			this.CONTROL = $('<input id="control_'+this.Members.ControlID+'" type="button" value="'+this.Members.Label+'" myview="'+this.Members.ViewID+'"></input>');
			this.CONTROL.attr('value', this.Members.Label);
		}else if(this.Members.XTYPE == this.XTYPE.CHECK) {
			this.CONTROL = $('<input id="control_'+this.Members.ControlID+'" type="check" myview="'+this.Members.ViewID+'"></input>');
		}else if(this.Members.XTYPE == this.XTYPE.RADIO) {
			this.CONTROL = $('<input id="control_'+this.Members.ControlID+'" type="text" myview="'+this.Members.ViewID+'"></input>');
		}else if(this.Members.XTYPE == this.XTYPE.IMAGE) {
			this.CONTROL = $('<img id="control_'+this.Members.ControlID+'" myview="'+this.Members.ViewID+'"></img>');
			this.CONTROL.attr('src', '');
		}else if(this.Members.XTYPE == this.XTYPE.COMBO) {
			this.CONTROL = $('<select id="control_'+this.Members.ControlID+'" myview="'+this.Members.ViewID+'"></select>');
		}else if(this.Members.XTYPE == this.XTYPE.ANCHOR) {
			this.CONTROL = $('<a id="control_'+this.Members.ControlID+'" myview="'+this.Members.ViewID+'"></a>');
		}
		
		if(this.Members.XTYPE != this.XTYPE.BUTTON) {
			this.WrapperItem = $('<li></li>');
			this.WrapperItem.html(this.Members.Label);
			this.Wrapper.append(this.WrapperItem);
		}
		
		this.WrapperItem = $('<li></li>');
		this.WrapperItem.append(this.CONTROL);
		this.Wrapper.append(this.WrapperItem);		
	};	
	
	this.MultiRow = function(){
		
	};	
	
	this.set_Show = function(func) {
		this.Wrapper.show();
	};
	
	this.set_Hide = function(func) {
		this.Wrapper.hide();
	};
	
	this.set_Remove = function(func) {
		this.Wrapper.remove();
	};
	
	this.SetValue = function(_value) {
		if(this.Member.XTYPE == this.XTYPE.TEXT) {
			return this.CONTROL.val(_value);
		}else if(this.Member.XTYPE == this.XTYPE.PASSWORD) {
			return this.CONTROL.val(_value);
		}else if(this.Member.XTYPE == this.XTYPE.TEXT_AREA) {
			return this.CONTROL.val(_value);
		}else if(this.Member.XTYPE == this.XTYPE.BUTTON) {
			return this.CONTROL.val(_value);
		}else if(this.Member.XTYPE == 5) {
			
		}else if(this.Member.XTYPE == 6) {
			
		}else if(this.Member.XTYPE == 7) {
			
		}else if(this.Member.XTYPE == 8) {
			
		}
	};
	
	this.GetValue = function() {
		if(this.Member.XTYPE == this.XTYPE.TEXT) {
			return this.CONTROL.val();
		}else if(this.Member.XTYPE == this.XTYPE.PASSWORD) {
			return this.CONTROL.val();
		}else if(this.Member.XTYPE == this.XTYPE.TEXT_AREA) {
			return this.CONTROL.val();
		}else if(this.Member.XTYPE == this.XTYPE.BUTTON) {
			return this.CONTROL.val();
		}else if(this.Member.XTYPE == 5) {
			
		}else if(this.Member.XTYPE == 6) {
			
		}else if(this.Member.XTYPE == 7) {
			
		}else if(this.Member.XTYPE == 8) {
			
		}
	};
};