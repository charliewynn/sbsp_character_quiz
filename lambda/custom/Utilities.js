exports.arrRandom = function(arr){
	if(arr.length == 0) return undefined;
	return arr[Math.floor(Math.random()*arr.length)];
}