var RapidWindowManager = function(param){
	this.BaseWindow = null;
	this.Window = null;
	this.Param = param;
	this.Members = {
			AppName : "",
			AppID : "",
			WindowMeta : null,
			WindowData : null
	};
	
	this.PrepareWindowManager = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.SetWindowData = function(data){
		this.Members.WindowData = data;
	};
	
	this.InitBaseWindow = function(){
		this.BaseWindow = new RapidBaseWindow();
		this.BaseWindow.InitBaseWindow();
	};
	
	this.InitApplicationWindow = function() {
		this.Window = new RapidWindows({
			WindowName : this.Members.WindowMeta.WINDOW_NAME,
			WindowTitle : this.Members.AppName + ' - ' +this.Members.WindowMeta.WINDOW_TITLE,
			WindowID : this.Members.WindowMeta.ID,
			WindowType : this.Members.WindowMeta.WINDOW_TYPE,			
			ContainerList : this.Members.WindowMeta.ContainerList
		}); 
		
		RapidContext.Window = this.Window;
		this.Window.SetWindowObject();
		
		/*Hiding other two primary containers*/
		this.BaseWindow.HideAppListContainer();
		this.BaseWindow.HideWindowListContainer();
		this.BaseWindow.ShowWindowContainer();
		this.Window.SetBaseWindowContainer(this.BaseWindow.GetWindowContainer());
		this.Window.InitWindow();
	};
	
	this.RegisterEvent = function() {
		ActionHandler = new RapidActionHandler();
		ActionHandler.RegisterAction();
	};
};