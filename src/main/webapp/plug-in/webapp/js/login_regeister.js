$(function(){
	getVerificationCode();
	// 登录
	$("#btnLogin").on("touchend",function(){
		var username = $("#iptEmail").val();
		var pwd = $("#iptPwd").val();
		$.ajax({
			url: getHostName()+'/user/login',
			type: 'POST',
			dataType: 'text',
			timeout:10000,
			data: {
				username: username,
				password: pwd
			},
			success:function(data){
				if(data == "success"){
					window.location.href = "home.jsp";
				}else{
                    alert("您输入的账号或密码错误！")
                }
			}
		})
	})

	/**
	 * 获取验证码
	 * @return {[type]} [description]
	 */
	function getVerificationCode(){
		console.log()
		var srcVal = getHostName()+"/code/getCode?"+(new Date()).getTime();
		$("#VerCode").attr('src', srcVal);
	}

	$("#VerCode").on("touchend",function(){
		getVerificationCode();
	})


	// 检测用户名
	$("#iptUsername").blur(function () {
	    var  username = $("#iptUsername").val()
		$.ajax({
            url :  getHostName()+"/user/checkUsername",
            data :  {"username":username},
            type : "post",
            success :  function (result) {
                if(username.trim()==""){
                    $(".errorUsername").text("用户名不能为空")
                }else{
                    if(result=="success") {
                        $(".errorUsername").html("<font  color = 'green'>恭喜，用户名可以使用</font>")
                    }else{
                        $(".errorUsername").text("用户名已经被使用")
                    }
                }
            }
        })
    })

    // 邮箱检测
    $("#iptEmail").blur(function () {
	    var   mail   =   $("#iptEmail").val()
	    if(mail.trim()!=""){
	        var corr = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
			if(!corr.test(mail)){
				$(".errorEmail").text("邮箱格式错误")
			}else{
	            $(".errorEmail").empty()
			}
		}else{
	        $(".errorEmail").empty()
		}
	})

    // 密码
    $("#iptPwd").blur(function () {
        if($("#iptPwd").val().trim()==""){
			$(".errorPwd").text("密码不能为空")
        }else{
            $(".errorPwd").empty()
		}
    })

   $("#iptConfirmPwd").blur(function () {
         if($("#iptConfirmPwd").val()!=$("#iptPwd").val()){
            $(".errorConfirmPwd").text("两次密码不一致")
         }else{
             $(".errorConfirmPwd").empty()
		 }
    })

   // 手机号码
    $("#iptTel").blur(function () {
        var myreg=/^[0-9][0-9][0-9]{8,10}$/;
        if($("#iptTel").val().trim()==""){
            $(".errorTel").text("手机号不能为空")
        }else{
            if(!myreg.test($("#iptTel").val())){
                $(".errorTel").text("手机号不合法")
			}else{
                $(".errorTel").html("<font color = 'green'>手机号合法</font>")
			}
		}
    })

    // 验证码
    $("#iptCode").blur(function () {
            var   validate   =   $("#iptCode").val()
            $.ajax({
                url :  getHostName()+"/code/validateCheck",
                data :  {"validate":validate},
                type : "post",
                success :  function (result) {
                    if(result=="success"){
                        $(".errorCode").empty()
                    }else{
                        $(".errorCode").text("验证码错误");
                    }
                }
            })
    })

    $("#btnRegeister").click(function () {
        if($("#iptCode").val().trim()==""){
            alert("请输入验证码!")
			return false
		}else{
        var  flag = true
        $("#iptUsername").blur()
		$("#iptPwd").blur()
        $("#iptConfirmPwd").blur()
		$("#iptTel").blur()
        var  utip =  $(".errorUsername").text()
		var  ptip = $(".errorPwd").text()
        var retip = $(".errorConfirmPwd").text()
        var teltip = $(".errorTel").text()
		var mailtip = $(".errorEmail").text()

		if(utip!="恭喜，用户名可以使用"){
			flag =false
		}
        if(ptip!=""){
            flag =false
        }
        if(retip!=""){
            flag =false
        }
        if(teltip!="手机号合法"){
            flag =false
        }
        if(mailtip!=""){
            flag =false
		}

        if(flag == true){
        $("#iptCode").blur()
		var  tips = 	check()
		if(tips==""){
        var  username =  $("#iptUsername").val()
        var  password =  $("#iptPwd").val()
        var  tel =  $("#iptTel").val()
		var  email = $("#iptEmail").val()
        $.ajax({
            url :  getHostName()+"/user/register",
            data :  {"username":username,"password":password,"phone":tel,"email":email},
            type : "post",
            success :  function (result) {
            	if(result === "success"){
            		$(".regeister").empty().html("注册成功");
            		setTimeout(function(){
            			window.location.href = "home.jsp";
            		},3000);
            	}
            }
        })}else{
		    alert("请输入正确的验证码")
        }
        }else{
        	alert("您输入有误，请检查输入")
        }
        }
        })

    function  check(){
        var tips = $("#iptCode").text()
        return tips;
    }

})