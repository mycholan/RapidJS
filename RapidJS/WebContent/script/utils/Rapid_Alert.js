//RapidAlertBox.AlertUser("Tab Selected", "Youe have selected tab : "+index);
var RapidAlertBox = function(){
	this.AlertUser = function(title, message){
		$('<div title="'+title+'"><p>'+message+'</p></div>').dialog({
		      modal: true,
		      buttons: {
		        Ok: function() {
		          $( this ).dialog( "close" );
		        }
		      }
		 }).css("font-size", "12px");
	};
};