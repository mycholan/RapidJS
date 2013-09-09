var RapidList = function(param) {
	this.Param = param;
	this.List = null;
	this.Members  = {
			ListName : "",
			ListID : "",
			ListClass : "",
			ListItem : null			
	};
	
	this.PrepareListObject = function(){
		for(var x in this.Param) {
			this.Members[x] = this.Param[x];
		}
	};
	
	this.CreateList = function(){
		this.List = $('<ul id="'+this.Members.ListID+'" class="RapidUL '+this.Members.ListClass+'"></ul>');
		var listItem = null;
		
		for(var i = 0; i < this.Members.ListItem.length; i++) {
			listItem = $('<li id="'+this.Members.ListItem[i].MenuID+'" handler="'+this.Members.ListItem[i].Handler+'" class="'+this.Members.ListClass+'-Normal" tooltip="'+this.Members.ListItem[i].ToolTip+'">'+this.Members.ListItem[i].DisplayName+'</li>');
			listItem.click(function(){
				$(this).parent().children().each(function(){
					var itemClass = $(this).attr('class');
					$(this).removeClass().addClass(itemClass.substring(0, itemClass.indexOf('-')+1)+'Normal');
				});
				
				var itemClass = $(this).attr('class');
				$(this).removeClass().addClass(itemClass.substring(0, itemClass.indexOf('-')+1)+'Active');
				
				if(window[$(this).attr('handler')] != null && window[$(this).attr('handler')] != 'undefined') {
					window[$(this).attr('handler')]();
				}else {
					//alert('Handler not found.!');
				}	
			});			
			this.List.append(listItem);
		}
		return this.List;
	};	
};

