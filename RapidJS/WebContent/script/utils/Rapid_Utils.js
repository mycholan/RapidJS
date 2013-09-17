var RapidUtils = function() {
	this.GetKeyCount = function(obj) {
		if (!Object.keys) {
		    Object.keys = function (obj) {
		        var keys = [], k = null;
		        for (k in obj) {
		            if (Object.prototype.hasOwnProperty.call(obj, k)) {
		                keys.push(k);
		            }
		        }
		        return keys.length;
		    };
		} else {
			return Object.keys(obj).length;
		}		
	};
	
	
};