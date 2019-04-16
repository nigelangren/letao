$(function(){
    employeeLogin();


    function employeeLogin(){
        $('.btn-admin').on('click',function(){
            var admin = $('.admin').val();
            var password = $('.password').val();
            // console.log(1111);
            console.log(admin);
            
            if(admin == ''){
                alert('用户名不能为空');
                return;
            }
            if(password == ''){
                alert('密码不能为空');
                return;
            }
            $.ajax({
                url:'/employee/employeeLogin',
                type:'post',
                data:{
                    username:admin,
                    password:password
                },
                success:function(obj){
                    // console.log(obj);
                    if(obj.error){
                        alert(obj.message);
                    }else{
                        location='./index.html';
                    }
                }
            })
        })
    }
})