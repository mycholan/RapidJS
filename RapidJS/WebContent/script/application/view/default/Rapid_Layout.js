var RapidLayout = function(param){
	this.Param = param;
	this.LayoutParent = null;
	this.Layout = null;
	this.LayoutTable = null;
	this.ViewObj = null;
	this.ToolbarObj = null;
	
	this.Members = {
			LayoutID : "",
			LayoutName : "",
			LayoutType : "",
			LayoutClass : "",
			LayoutVisible : "",
			LayoutActive : "",
			ToolbarObject : null,
			ViewObject : null
	};
	
	this.TypeL = {
			TOP : 1,
			LEFT : 2,
			HYBRID : 3
	};
	
	this.SetLayoutObject = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.SetLayoutParent = function(layoutParent){
		this.LayoutParent = layoutParent;
	};
	
	this.InitLayout = function(){
		this.LayoutTable = $('<table id="layout_'+this.Members.LayoutID+'" class="RapidTable RapidLayoutTable"></table>');		
		this.LayoutParent.append(this.LayoutTable);
		if(this.Members.LayoutType == this.TypeL.TOP){
			this.LayoutTable.removeClass().addClass("RapidTable RapidLayoutTable-TOP");
			this.CreateTopLayout();
		}else if(this.Members.LayoutType == this.TypeL.LEFT){
			this.LayoutTable.removeClass().addClass("RapidTable RapidLayoutTable-LEFT");
			this.CreateLeftLayout();
		}else if(this.Members.LayoutType == this.TypeL.HYBRID){
			this.LayoutTable.removeClass().addClass("RapidTable RapidLayoutTable-HYBRID");
			this.CreateHybridLayout();
		}
	};
	
	this.CreateTopLayout = function(){
		var tableTR = $('<tr></tr>');
		var tableTD = $('<td></td>');
		
		/*Setting up Toolbar on TOP*/
		tableTR.append(tableTD);
		this.SetToolbar(tableTD, this.Members.ToolbarObject[0]);
		this.LayoutTable.append(tableTR);
		
		tableTR = 	$('<tr></tr>');
		tableTD = $('<td></td>');
		
		/*Setting up View*/
		tableTR.append(tableTD);
		this.SetView(tableTD, this.Members.ViewObject);
		this.LayoutTable.append(tableTR);
	};
		
	this.CreateLeftLayout = function(){
		var tableTR = $('<tr></tr>');
		var tableTD = $('<td></td>');
		
		/*Setting up Toolbar on LEFT*/
		tableTR.append(tableTD);
		this.SetToolbar(tableTD, this.Members.ToolbarObject[0]);
		this.LayoutTable.append(tableTR);		
		
		tableTD = $('<td></td>');
		
		/*Setting up View*/
		tableTR.append(tableTD);
		this.SetView(tableTD, this.Members.ViewObject);
		this.LayoutTable.append(tableTR);
	};
	
	this.CreateHybridLayout = function(){
		if(this.Members.ToolbarObject.length > 1) {
			var tableTR = $('<tr></tr>');
			var tableTD = $('<td rowspan="2"></td>');
			
			/*Setting up Toolbar on LEFT*/
			tableTR.append(tableTD);
			this.SetToolbar(tableTD);
			this.LayoutTable.append(tableTR);		
			
			tableTR = $('<tr></tr>');
			tableTD = $('<td></td>');
			
			/*Setting up Toolbar on TOP*/
			tableTR.append(tableTD);
			this.SetToolbar(tableTD);
			this.LayoutTable.append(tableTR);		
			
			tableTR = $('<tr></tr>');
			tableTD = $('<td></td>');
			
			/*Setting up View*/
			tableTR.append(tableTD);
			this.SetView(tableTD, this.Members.ViewObject);
			this.LayoutTable.append(tableTR);
		}		
	};
	
	this.ShowLayout = function(){
		this.Layout.show();
	};
	
	this.HideLayout = function(){
		this.Layout.hide();
	};
	
	this.ExitLayout = function(){
		this.Layout.remove();
	};
	
	this.ReloadLayout = function(){
		
	};
	
	this.SetToolbar = function(toolbarParent, toolbarObj){
		this.ToolbarObj = new RapidToolbar({
			ToolbarID : toolbarObj.ID,
			ToolbarName : toolbarObj.TOOLBAR_NAME,
			ToolbarType : toolbarObj.TOOLBAR_TYPE,
			ToolbarVisible : toolbarObj.DISPLAY,
			ToolbarActive : toolbarObj.ACTIVE,
			ToolItem : toolbarObj.ToolItem	
		});
		
		this.ToolbarObj.SetToolbarObject();
		this.ToolbarObj.SetToolbarParent(toolbarParent);
		this.ToolbarObj.InitToolbar();
	};
	
	this.SetView = function(viewParent, viewObj){
		this.ViewObj = new RapidView({
			ViewID : viewObj.ID,
			ViewName : viewObj.VIEW_NAME,
			ViewType : viewObj.VIEW_TYPE,
			ViewColumnCount : 1,
			ViewRecordCount : 0,
			ViewActive : viewObj.ACTIVE,
			ViewDisplay : viewObj.DISPLAY,
			ViewItem : viewObj.ViewItem
		});
		
		this.ViewObj.SetViewObject();
		this.ViewObj.SetViewParent(viewParent);
		this.ViewObj.InitView();
		
		RapidContext.View.push(this.ViewObj);
	};
};