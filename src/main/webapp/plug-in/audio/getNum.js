/**
 * 
 */

function getNum(value1,value2){
	//先检验能不能运行起来，能不能连上，自动推送数据，先不做数据显示 
	//客户端就会与服务器进行连接 
	//ws://localhost:8080/jeecg/websocket/1/2 ； (1,2 是传递的参数) /<%-- <%=u.getId() %>/<%=u.getCurrentDepart().getId() %> --%>
	var webSocket = new WebSocket("ws://localhost:8080/asiamarket_manager/websocket/"+value1+"/"+value2);   
	//这里只是调试用 
	//连接失败时回调        
	webSocket.onerror = function (event) { 
		makeDataOnWeb("0");   
		//makeDataOnWeb("error"); 
	};
	//这里只是调试用        
	//连接成功时回调         
	webSocket.onopen = function (event) {             
		makeDataOnWeb("0");                    
	};        
	webSocket.onmessage = function (event) {            
		makeDataOnWeb(event.data);        
	};        
	//这里只是调试用        
	webSocket.onclose = function (event) {        	
		makeDataOnWeb("0");           
		makeDataOnWeb("conn close");        
	};
}
function makeDataOnWeb(data) {
	if(data != $("#view").text() )
		document.getElementById("view").innerHTML=data;  
					
}; 