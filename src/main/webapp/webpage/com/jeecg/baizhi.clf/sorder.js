$(function(){
	
	setTimeout(get, 1000);
	
})

function get(){
	
	var rows = $('#sorderList').datagrid('getRows');
	
	console.log(rows);
}