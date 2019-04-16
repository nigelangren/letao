$(function(){
    logindetection()


    function logindetection(){
        $('.login-btn').on('tap',function(){
            var admin = $('.admin').val().trim();
            var password=$('.password').val().trim();
            // console.log(admin,password);
            var returnURL=getQueryString('returnURL');
            if(admin==''){
                mui.toast('用户名不能为空',{ duration:2000, type:'div' }) 
                return;
            }
            if(password==''){
                mui.toast('密码不能为空',{ duration:2000, type:'div' }) 
                return;
            }
            $.ajax({
                url:'/user/login',
                type:'post',
                data:{
                    username:admin,
                    password:password
                },
                success:function(obj){
                    // console.log(obj);
                    if(obj.error){
                        mui.toast(obj.message,{ duration:2000, type:'div' }) 
                    }else{
                        // console.log(111);
                        location=returnURL;
                    }
                    
                }
            })
        })
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        }

        
    }


})