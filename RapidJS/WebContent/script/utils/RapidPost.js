var RapidPost = function() {
	this.Post = {
			/*Admin (or) App*/
			Target : "",
			/*Primary action (LIST, NEW, CREATE, EDIT, UPDATE, SHOW, REMOVE)*/
			Action : "",
			/*On what table*/
			Tabel : "",
			/*Logged in user name*/
			User : "",
			/*List of column that should be included*/
			Projection : [],
			/*Select. can be where, between, in ( [{id:1}, {name:sark} ...] ) */
			SelectorKeys : [],
			/*Select. can be where, between, in ( [{id:1}, {name:sark} ...] ) */
			SelectorValues : [],
			/*Multiple selectors condition concatenation type (AND or OR) */
			SelectorType : "",
			/**/
			Operator : "",			
			/**/
			Range : "",
			/**/
			Contains : [],
			/*List of columns for sorting*/
			OrderByProjection : [],
			/*sorting order ASC | DSC*/
			OrderByType : "",
			/*used for pagination, page index*/
			Page : 0,
			/*number of rows should be returned*/
			Count : 0, 
			/*actual data*/
			Data : []	
	};
	
	/*
	 ****************************************************** 
	 ******************************************************
	 Post object data retrieve methods (after download)
	 ******************************************************
	 ******************************************************
	 */
	
	this.Current = -1;
	
	this.MoveToFirst = function(){
		if(this.Post.Data.size > 0) {
			this.Current = 0;
			return 0;
		}else {
			return -1;
		}
	};
	
	this.MoveToNext = function(){
		if(this.Post.Data.size > 0 && (parseInt(this.Current) + 1) < this.Post.Data.size) {
			this.Current = parseInt(this.Current) + 1;
			return this.Current;
		}else {
			return -1;
		}
	};
	
	this.MoveToPrev = function(){
		if(this.Post.Data.size > 0 && (parseInt(this.Current) - 1) > 0) {
			this.Current = parseInt(this.Current) - 1;
			return this.Current;
		}else {
			return -1;
		}
	};
	
	this.MoveToLast = function(){
		if(this.Post.Data.size > 0) {
			this.Current = this.Post.Data.size - 1;
			return this.Post.Data.size;
		}else {
			return -1;
		}
	};
	
	this.GetCount = function(){
		return this.Post.Data.size;
	};
	
	this.GetColumnIndex = function(column){
		if(this.Post.Projection.size > 0) {
			return this.Post.Projection.indexOf(column);
		}else {
			return -1;
		}
	};
	
	this.GetColumnName = function(index){
		if(this.Post.Projection.size > 0) {
			return this.Post.Projection[index];
		}else {
			return null;
		}
	};
	
	this.GetColumnNames = function(){	
		return this.Post.Projection;
	};
	
	this.GetCurrentPosition = function(){
		return this.Current;
	};
	
	this.MoveToPosition = function(pos){
		if(this.Post.Data.size > pos && pos >= 0) {
			this.Current = pos;
			return pos;
		} else {
			return -1;
		}
	};
	
	this.GetRecord = function(){
		if(this.Post.Data.size > this.Current && this.Current >= 0) {
			return this.Post.Data[this.Current];
		}else {
			return null;
		}		
	};
	
	/*
	 ****************************************************** 
	 ******************************************************
	 RapidPost's preparation methods (before upload)
	 ******************************************************
	 ******************************************************
	 */
	
	this.ResetPost = function() {
		this.Post = null;
	};
	
	this.PreparePost = function(post) {
		this.Post.Target = post.Target;
		this.Post.Tabel = post.Table;
		this.Post.Action = post.Action; 
		this.Post.User = post.User;
		this.Post.Projection = post.Projection;
		this.Post.Selector = post.Selector;
		this.Post.SelectorType= post.SelectorType;
		this.Post.OrderBy = post.OrderBy;
		this.Post.GroupBy = post.GroupBy;
		this.Post.Having = post.Having;
		this.Post.Page = post.Page;
		this.Post.Count = post.Count;
		this.Post.Data = post.Data;
	};
	
	this.SetTarget = function(target) {
		this.Post.Target = target;
	};
	
	this.SetTabel = function(table) {
		this.Post.Tabel = table;
	};
	
	this.SetAction = function(action) {
		this.Post.Action = action; 
	};
	
	this.SetUser = function(user) {
		this.Post.User = user;
	};
	
	this.SetProjection = function(projection) {
		this.Post.Projection = projection;
	};
	
	this.SetSelectorKeys = function(selectorKeys) {
		this.Post.SelectorKeys = selectorKeys;
	};
	
	this.SetSelectorValues = function(selectorValues) {
		this.Post.SelectorValues = selectorValues;
	};
	
	this.SetSelectorType = function(selectorType) {
		this.Post.SelectorType= selectorType;
	};
	
	this.SetOrderBy = function(orderBy) {
		this.Post.OrderBy = orderBy;
	};
	
	this.GroupBy = function(groupBy) {
		this.Post.GroupBy = groupBy;
	};
	
	this.SetHaving = function(having) {
		this.Post.Having = having;
	};
	
	this.SetPage = function(page) {
		this.Post.Page = page;
	};
	
	this.SetCount = function(count) {
		this.Post.Count = count;
	};
	
	this.SetData = function(data) {
		this.Post.Data = data;
	};
};