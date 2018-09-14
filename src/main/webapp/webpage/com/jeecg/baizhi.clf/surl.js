$(function(){
	
	

	
	$("#formobj").Validform({
        tiptype:2,
        datatype : {
            only:function(gets,obj,curform,regxp){
            	
            	var patt =  /^[a-z0-9]+$/;
            	
            	if(patt.test(gets)){
            		var url = "http://mainriversoft.com/asiamarketshop/toshop/"+gets;
            		var result;
            		$.ajax({
            			url: "surlController.do?findByUrl",
            	        type: 'POST',
            	        dataType: 'JSON',
            	        data:{url:url},
            	        async: false,
            			success:function(data){
            				console.log(data);
            				if(data == null){
            					$("#url").attr("value",url);
            					result = true;					
            				}else{
            					result = "地址已被占用！";
            				}
            			}
            		});
            	}else{
            		return false;
            	}
            	
            	return result;
          	},
          	update:function(gets,obj,curform,regxp){
          		
          		
          		
          		var oldUrl = $(obj).attr("ourl");
          		
          		console.log(oldUrl);
          		
          		var patt =  /^[a-z0-9]+$/;
            	
            	if(patt.test(gets)){
            		var url = "http://mainriversoft.com/asiamarketshop/toshop/"+gets;
            		var result;
            		$.ajax({
            			url: "surlController.do?findByUrl",
            	        type: 'POST',
            	        dataType: 'JSON',
            	        data:{url:url},
            	        async: false,
            			success:function(data){
            				
            				if(data == null){
            					$("#url").attr("value",url);
            					result = true;					
            				}else if(data.url == oldUrl){
            					result = true;
            				}else{
            					result = "地址已被占用！";
            				}
            			}
            		});
            	}else{
            		return false;
            	}
            	
            	return result;
          	}
        }
    });
        
    

});

//通用弹出式文件上传
function commonUpload(callback){
    $.dialog({
           content: "url:systemController.do?commonUpload",
           lock : true,
           title:"文件上传",
           zIndex:2100,
           width:700,
           height: 200,
           parent:windowapi,
           cache:false,
       ok: function(){
               var iframe = this.iframe.contentWindow;
               iframe.uploadCallback(callback);
                   return true;
       },
       cancelVal: '关闭',
       cancel: function(){
       } 
   });
}
function browseImages(inputId, Img) {// 图片管理器，可多个上传共用
}
function browseFiles(inputId, file) {// 文件管理器，可多个上传共用
}
function decode(value, id) {//value传入值,id接受值
	var last = value.lastIndexOf("/");
	var filename = value.substring(last + 1, value.length);
	$("#" + id).text(decodeURIComponent(filename));
}