$(function(){
    mui('.boxleft .mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false //是否显示滚动条 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    mui('.boxright .mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: true //是否显示滚动条 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    queryTopCategory();
    querySecondCategory(1);


    function queryTopCategory(){
        $.ajax({
            url: '/category/queryTopCategory',
            success: function (obj) {
                // console.log(obj);
                var html = template('boxleft', obj);
                $('.boxleft ul').html(html);
                $('.boxleft li').on('tap',function(){
                    // console.log(1111);
                    var id = $(this).data('id')
                    // console.log();
                    // this.data('id')
                    querySecondCategory(id);
                    $(this).addClass('active').siblings().removeClass('active');
                })
    
            }
        })
    }


    // $.ajax({
    //     url:'/category/querySecondCategory',
    //     data:{},
    //     success:function(obj){
    //         // console.log(obj);

    //     }
    // })
    function querySecondCategory(id){
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                'id': id
            },
            success: function (obj) {
                // console.log(obj);
                var html = template('boxright', obj);
                $('.boxright .mui-row').html(html);
            }
        })
        // console.log(1111);
    
    }

})




