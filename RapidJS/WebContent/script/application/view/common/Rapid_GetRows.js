var RapidGetRows = function(param) {	
	this.Param = param;
	this.Rows = new Array();
	
	this.Members = {
		TargetElement : "",
		TargetType : ""
	};
	
	this.ELEMENT = {
		WINDOW : 1,
		CONTAINER : 2,
		LAYOUT : 3,
		VIEW : 4,
		CONTROL : 5				
	};
	
	this.SetGetRowsObject = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.GetRows = function() {
		var row = null;
		if(this.Members.TargetType == this.ELEMENT.WINDOW) {
			if(this.Members.TargetElement != null && this.Members.TargetElement.ContainerList != null) {
				var layoutObj = this.Members.TargetElement.LayoutObj;
				
				if(layoutObj.ViewObj != null) {
					var viewObj = layoutObj.ViewObj;
					row = new Array();
					for(var i = 0; i < viewObj.ControlList.length; i++) {
						row.push(this.GetAtomObject(viewObj.ControlList[i].Members.ControlID, viewObj.ControlList[i].Members.DataType, viewObj.ControlList[i].GetValue()));
					}
					this.Rows.push(row);
				}else {
					console.log('Some thing went wrong.!');
					return null;
				}
			}else {
				console.log('Some thing went wrong.!');
				return null;
			}
		}else if(this.Members.TargetType == this.ELEMENT.CONTAINER) {
			if(this.Members.TargetElement != null && this.Members.TargetElement.LayoutObj != null) {
				var layoutObj = this.Members.TargetElement.LayoutObj;
				
				if(layoutObj.ViewObj != null) {
					var viewObj = layoutObj.ViewObj;
					row = new Array();
					for(var i = 0; i < viewObj.ControlList.length; i++) {
						row.push(this.GetAtomObject(viewObj.ControlList[i].Members.ControlID, viewObj.ControlList[i].Members.DataType, viewObj.ControlList[i].GetValue()));
					}
					this.Rows.push(row);
				}else {
					console.log('Some thing went wrong.!');
					return null;
				}
			}else {
				console.log('Some thing went wrong.!');
				return null;
			}
		}else if(this.Members.TargetType == this.ELEMENT.LAYOUT) {
			if(this.Members.TargetElement != null && this.Members.TargetElement.ViewObj != null) {
				var viewObj = this.Members.TargetElement.ViewObj;
				row = new Array();
				for(var i = 0; i < viewObj.ControlList.length; i++) {
					row.push(this.GetAtomObject(viewObj.ControlList[i].Members.ControlID, viewObj.ControlList[i].Members.DataType, viewObj.ControlList[i].GetValue()));
				}
				this.Rows.push(row);
			}else {
				console.log('Some thing went wrong.!');
				return null;
			}
		}else if(this.Members.TargetType == this.ELEMENT.VIEW) {
			if(this.Members.TargetElement != null && this.Members.TargetElement.ControlList.length > 0) {
				row = new Array();
				for(var i = 0; i < this.Members.TargetElement.ControlList.length; i++) {
					row.push(this.GetAtomObject(this.Members.TargetElement.ControlList[i].Members.ControlID, this.Members.TargetElement.ControlList[i].Members.DataType, this.Members.TargetElement.ControlList[i].GetValue()));
				}
				this.Rows.push(row);
			}else {
				console.log('Some thing went wrong.!');
				return null;
			}
		}else if(this.Members.TargetType == this.ELEMENT.CONTROL) {
			
		}
		
		return this.Rows;
	};
	
	this.GetAtomObject = function(_id, _type, _value) {
		return {
			ID : _id,
			TYPE : _type,
			VALUE : _value
		};
	};
};