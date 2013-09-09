var RapidContainer = function(param){
	this.ContainerParent = null;
	this.Container = null;
	this.LayoutObj = null;
	this.TempObj = null;
	this.Param = param;
	
	this.Members = {
			ID : "",
	        CONTAINER_TITLE : "",
	        DISPLAY : "",
	        ACTIVE : "",
	        LAYOUT : ""
	};
	
	this.SetContainerObject = function(){		
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.SetContainerParent = function(containerParent){
		this.ContainerParent = containerParent;
	};
	
	this.ShowContainer = function(){
		this.Container.show();
	};
	
	this.HideContainer = function(){
		this.Container.hide();
	};
	
	this.ExitContainer = function(){
		this.Container.remove();
	};
	
	this.ReloadContainer = function(){
		
	};

	this.ConstructContainer = function() {
		this.Container = $('<div id="container_'+this.Members.ID+'" class="RapidContainer RapidLayoutParent"></div>');
		this.ContainerParent.append(this.Container);
		this.StartLayout();	
	};	
	
	this.StartLayout = function(){		
		this.LayoutObj = new RapidLayout({
			LayoutID : this.Members.LAYOUT.ID,
			LayoutName : this.Members.LAYOUT.LAYOUT_NAME,
			LayoutType : this.Members.LAYOUT.LAYOUT_TYPE,			
			LayoutVisible : this.Members.LAYOUT.DISPLAY,
			LayoutActive :  this.Members.LAYOUT.ACTIVE,
			ToolbarObject :  this.Members.LAYOUT.ToolbarObject,
			ViewObject :  this.Members.LAYOUT.ViewObject
		});		
		
		this.LayoutObj.SetLayoutObject();
		this.LayoutObj.SetLayoutParent(this.Container);
		this.LayoutObj.InitLayout();
		
		RapidContext.Layout.push(this.LayoutObj);
	};
};