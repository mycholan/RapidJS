var RapidToolbar = function(param){
	this.Param = param;
	this.ToolbarParent = null;
	this.Toolbar = null;
	
	this.Members = {
			ToolbarID : "",
			ToolbarName : "",
			ToolbarType : "",
			ToolbarVisible : "",
			ToolbarActive : "",
			ToolItem : null				
	};
	
	this.TypeT = {
			TOOLBAR : 1,
			DROPDOWN : 2,
			MENUBAR_H : 3,
			MENUBAR_V : 4,
			TOOLBAR_HYBRID : 5
	};
	
	this.SetToolbarObject = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.SetToolbarParent = function(toolbarParent){
		this.ToolbarParent = toolbarParent;
	};
	
	this.InitToolbar = function(){
		if(this.Members.ToolbarType == this.TypeT.TOOLBAR){
			this.CreateToolbar();
		}else if(this.Members.ToolbarType == this.TypeT.DROPDOWN){
			this.CreateDropdownBar();
		}else if(this.Members.ToolbarType == this.TypeT.MENUBAR_H){
			this.CreateMenuBar_Hrizontal();
		}else if(this.Members.ToolbarType == this.TypeT.MENUBAR_V){
			this.CreateMenuBar_Vertical();
		}else if(this.Members.ToolbarType == this.TypeT.TOOLBAR_HYBRID){
			this.CreateToolbar_Hybrid();
		}
	};
	
	this.CreateToolbar = function(){
		this.Toolbar = $('<ul class="RapidUL RapidToolbar"></ul>');
		this.ToolbarParent.append(this.Toolbar);
		
		var elemLI = null;
		var elemImg = null;
		
		for(var i = 0; i < this.Members.ToolItem.length; i++) {
			elemLI = $('<li class="RapidToolbarLI"></li>');
			
			if(this.Members.ToolItem[i].display == "false") {
				elemLI.css('display', 'none');
			}
			
			elemImg = $('<img src="'+this.Members.ToolItem[i].imageurl +'"></img>');						
			elemLI.append(elemImg);
			
			elemLI.click(function(){
				console.log('action handler');
			});
			
			this.Toolbar.append(elemLI);
		}
	};
	
	this.CreateDropdownBar = function(){
		
	};
	
	this.CreateMenuBar_Hrizontal = function(){
		
	};
	
	this.CreateMenuBar_Vertical = function(){
		
	};
	
	this.CreateToolbar_Hybrid = function(){
		
	};
	
	this.ShowToolbar = function(){
		this.Toolbar.show();
	};
	
	this.HideToolbar = function(){
		this.Toolbar.hide();
	};
	
	this.ExitToolbar = function(){
		this.Toolbar.remove();
	};
	
	this.ReloadToolbar = function(){
		
	};
};