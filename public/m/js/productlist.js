$(function () {
    var search;
    var page=1;
    addproductlist(search);
    queryProduct();
    sortProduct();
    pullrefresh();
    locationProduct();
    function addproductlist() {
        // console.log(search);
        search = getQueryString('search');
        ajaxProduct({
            proName: search
        })

    }

    function queryProduct() {
        $('#btn').on('tap', function () {
            // console.log(111);
            search = $('#but').val();
            ajaxProduct({
                proName: search
            })

        })
    }

    function ajaxProduct(product) {
        product.page = product.page || 1;
        product.pageSize = product.pageSize || 2;
        console.log(product);
        
        $.ajax({
            url: '/product/queryProduct',
            data:product,
            success: function (obj) {
                // console.log(obj);
                var html = template('tep', obj);
                $('.mui-card-content .mui-row').html(html);
                mui('#pullrefresh').pullRefresh().refresh(true);
                page = 1;
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

    function sortProduct() {
        $('.mui-card .mui-card-header a').on('tap', function () {
                //  console.log(this);
                var type = $(this).data('type');
                var sore = $(this).data('sore');
                //  console.log(type,sore);
                if (sore == 1) {
                    sore = 2;
                    $(this).find('i').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');

                } else {
                    sore = 1;
                    $(this).find('i').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
                }
                $(this).data('sore', sore)
                //    console.log(sore);
                var obj = {
                    page:1,
                    pageSize:2,
                    proName: search
                }
                $(this).addClass('active').siblings().removeClass('active');
                obj[type]=sore;
            // console.log(obj);
            
                ajaxProduct(obj);

        })
    }
    function pullrefresh(){
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    callback: pulldownRefresh
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pulldownRefresh() {
            setTimeout(function() {
                ajaxProduct({proName:search});
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            }, 1500)
        }

        /**
         * 上拉加载具体业务实现
         */
       
        function pullupRefresh() {
            setTimeout(function() {
                page++;
                $.ajax({
                    url: '/product/queryProduct',
                    data:{
                        page:page,
                        pageSize:2,
                        proName: search
                    },
                    success: function (obj) {
                        console.log(obj);
                        var arr = obj.data;
                        if( arr.length < 1){
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                        }else{
                            var html = template('tep', obj);
                            $('.mui-card-content .mui-row').append(html);
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                        }
                    }
                })
                 //参数为true代表没有更多数据了。
            }, 1500);
        }

    }

    function locationProduct(){
        $('.mui-card-content').on('tap','button',function(){
            // console.log(this);
            var id = $(this).data('id');
            // console.log(id);
            
            location='./detail.html?id='+id;
        })
    }
})