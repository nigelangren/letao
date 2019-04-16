$(function () {
    var id = getQueryString('id');
    queryProductDetail();
    loginlist();

    function queryProductDetail() {

        // console.log(id);

        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                'id': id
            },
            success: function (obj) {
                // console.log(obj.size);
                // var arr = obj.size;
                // console.log(arr);
                // console.log(arr.split('-'));

                var arrleft = +obj.size.split('-')[0];
                var arrright = +obj.size.split('-')[1];
                obj.size = [];
                for (var i = arrleft; i <= arrright; i++) {
                    obj.size.push(i);
                }
                console.log(obj);
                var html = template('ProductDetail', obj);
                $('#main').html(html);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
                mui('.mui-numbox').numbox();
                $('.mui-btn').on('tap', function () {
                    $(this).addClass('mui-btn mui-btn-warning').siblings().removeClass('mui-btn-warning');
                })
            }
        })
    }

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }

    function loginlist() {
        $('.login').on('tap', function () {
            // console.log(111);
            var size = $('.mui-btn.mui-btn-warning').html();
            // console.log(btn);
            var num = $('.mui-numbox-input').val();
            // console.log(put);
            $.ajax({
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: id,
                    num: num,
                    size: size
                },
                success: function (obj) {
                    // console.log(obj);
                    // console.log(location.href);

                    if (obj.error) {
                        location = "./login.html?returnURL=" + location.href;
                    } else {
                        // var btnArray =;
                        mui.confirm('加入购物车是否去购物车查看', '温馨提示', ['是', '否'], function (e) {
                            if (e.index == 0) {
                                location = './cart.html';
                            } else {
                                mui.toast('请继续', {
                                    duration: 2000,
                                    type: 'div'
                                })
                            }
                        })

                    }
                }

            })
        })
    }

})