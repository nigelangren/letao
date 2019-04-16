$(function () {
    inquirecart();
    deleteCart();
    updateCart();
 
    function inquirecart() {

        // $.ajax({
        //     url:'/cart/queryCart',
        //     success:function(obj){
        //         console.log(obj);
        //         var html = template('queryCart',{data:obj})
        //         $('.mui-table-view').html(html);
        //         // pulldownRefresh();

        //     }
        // })


    }

    var page = 1;
    /**
     * 下拉刷新具体业务实现
     */
    mui.init({
        pullRefresh: {
            container: '.mui-content',
            down: {
                callback: pulldownRefresh,
                auto: true,
            },
            up: {
                contentrefresh: '正在加载...',
                callback: pullupRefresh
            }
        }
    });

    function pulldownRefresh() {
        setTimeout(function () {
            // console.log(1111);

            queryCartPaging();


        }, 1500);
    }
    // var count = 0;
    /**
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {
        setTimeout(function () {
            page++;
            $.ajax({
                url: '/cart/queryCartPaging',
                data: {
                    page: page,
                    pageSize: 4
                },
                success: function (obj) {
                    // console.log(obj);
                    if (obj.data) {
                        var html = template('queryCart', obj)
                        $('.mui-table-view').append(html);
                        // pulldownRefresh();
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                    } else {
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                    }

                }
            })

        }, 1500);
    }


    function queryCartPaging(){
        page = 1;
        $.ajax({
            url: '/cart/queryCartPaging',
            data: {
                page: page,
                pageSize: 4
            },
            success: function (obj) {
                // console.log(obj);
                var html = template('queryCart', obj)
                $('.mui-table-view').html(html);

                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                mui('#pullrefresh').pullRefresh().refresh(true);
                getsum();
            }
        })
    }
    var id = '';
    function deleteCart() {
        $('.mui-table-view').on('tap', '.btn-delete', function () {
            var btn = this;
            // console.log(1111);
            id = $(this).data('id');
            // console.log(id);
            $.ajax({
                url: '/cart/deleteCart',
                data: {
                    id: id
                },
                success: function (data) {
                    // console.log(data);
                    if (data.success) {
                        mui.confirm('确认删除该条记录？', 'Hello MUI', ['确认', '取消'], function(e) {
                            if (e.index == 0) {
                                // console.log(111);
                                queryCartPaging();
                            } else {
                                var li = btn.parentNode.parentNode;
                                // 2. 调用官方的滑动关闭函数
                                mui.swipeoutClose(li);
                            }
                        });
                    }
                }
            })
        })
    }
    var data;
    function updateCart(){
        $('.mui-table-view').on('tap', '.btn-edit', function () {
            // console.log(1111);
            var btn = this ;
            data = $(this).data('table');

            var arrleft = +data.productSize.split('-')[0];
            var arrright = +data.productSize.split('-')[1];
            data.productSize = [];
            for (var i = arrleft; i <= arrright; i++) {
                data.productSize.push(i);
            }
            console.log(data);
            var html = template('ProductDetail',data);
            html = html.replace(/[\r\n]/g, '');
            mui('.mui-numbox').numbox();

            mui.confirm(html, 'Hello MUI', ['确认', '取消'], function(e) {
                var size = $('.mui-btn.mui-btn-warning').data('size');
                var num  =  $('.mui-numbox-input').val();
                if (e.index == 0) {
                    
                    $.ajax({
                        url:'/cart/updateCart',
                        type:'post',
                        data:{
                            id:data.id,
                            size:size,
                            num:num
                        },
                        success:function(obj){
                            // console.log(obj);
                            if(obj.success){
                                queryCartPaging();
                            }
                        }
                    })
                } else {
                    // setTimeout(function() {
                    //     $.swipeoutClose(li);
                    // }, 0);
                    var li = btn.parentNode.parentNode;
                    // 2. 调用官方的滑动关闭函数
                    mui.swipeoutClose(li);
                }
            });
            mui('.mui-numbox').numbox();
            $('.mui-btn').on('tap', function () {
                $(this).addClass('mui-btn mui-btn-warning').siblings().removeClass('mui-btn-warning');
            })
        })
    }
    // var arr=0;
    function getsum(){
        // $('.mui-table-view').on('tap','.checkbox1:checked',function(){
        //     // console.log(this);
        //     // console.log($('.checkbox1').());
        //     // $(this).checked(true);
        //     var price = $(this).data('price');
        //     console.log(price);
        //     var num = price.price * price.num;
        //     arr += num;
            
        //     // console.log(price.price , price.num);
        //     console.log(arr);
            
            
            
        // })
        var checkeds= $('.mui-input-row input:checked');
        console.log(checkeds);
        var sum=0;
        checkeds.each(function(index,value){
            // console.log(index);
            // console.log(value);
            var price = $(value).data('price').price;
            var num = $(value).data('price').num;
            // console.log(price,num);
            var count = num * price;
            sum += count;
            console.log(sum);

        })
        sum =sum.toFixed(2);
        $('.order-total span').html(sum);
    }
})