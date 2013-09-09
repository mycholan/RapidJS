var RapidApp = function(param){
	this.App = null;
	this.WindowManager = null;
	this.Param = param;
	this.Members = {
			AppName : "",
			AppID : "",
			AppType : "",
			AppActive : "",
			AppWindows : null
	};
	
	this.TypeA = {
			CRUD : 1,
			WORKFLOW : 2,
			CONTENTMANAGEMENT : 3
	};
	
	this.PrepareApplicationObject = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.SetWindowsObject = function(wObject) {
		this.Members.AppWindows = wObject;
	};
	
	this.GetApplication = function(){
		return this.App;
	};
	
	this.GetWindowObject = function(){
		return this.Members.AppWindows;
	};
	
	this.InitApp = function(){
		this.WindowManager = new RapidWindowManager({
			AppName : this.Members.AppName,
			AppID : this.Members.AppID,
			WindowMeta : this.Members.AppWindows
		});
		
		this.WindowManager.PrepareWindowManager();
		this.WindowManager.InitBaseWindow();	
		this.WindowManager.InitApplicationWindow();
		
		this.WindowManager.RegisterEvent();
	};
};