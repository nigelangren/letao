$(function () {
    var currentPage = 1;
    var totalPages = 1;
    // var isDelete=0;
    // var isDelete;
    queryProductDetailList();
    Delete();

    //查询用户
    function queryProductDetailList() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: 5
            },
            success: function (data) {
                console.log(data);
                // isDelete = data.isDelete;
                // data.rows[0].isDelete=isDelete;
                totalPages = Math.ceil(data.total / data.size);
                var html = template('userInfoTpl', data);
                // console.log(html);
                $('.tby').html(html);
                yema();
            }
        })
    }


    //改变点击状态
    function Delete() {
        $('.tby').on('click', '.btn', function () {
            // console.log(11111);
            // console.log(isDelete);
            var isdelete = $(this).data('is-delete');
            var id = $(this).data('id')
            if (isdelete == 0) {
                isdelete = 1;
            } else {
                isdelete = 0;
            }
            $.ajax({
                url: '/user/updateUser',
                type: 'post',
                data: {
                    id: id,
                    isDelete: isdelete
                },
                success: function (data) {
                    console.log(data);
                    if (data.success) {
                        queryProductDetailList();
                    }

                }

            })
            // console.log(isdelete , id);


        })
    }

    function yema() {
        $("#page").bootstrapPaginator({
            bootstrapMajorVersion: 3, //对应的bootstrap版本
            currentPage: currentPage, //当前页数
            numberOfPages: 10, //每次显示页数
            totalPages: totalPages, //总页数
            shouldShowPage: true, //是否显示该按钮
            useBootstrapTooltip: true,
            //点击事件
            onPageClicked: function (event, originalEvent, type, page) {
                currentPage=page;
                // totalPages=Math.ceil(page/5);
                // console.log(totalPages);
                console.log(page);
                queryProductDetailList();
            }
        });
    }


    $('.btn-baocun').on('click',function(){
        console.log(1111111111111111);
        // return;
        var contr=$('.form-control').val();
        // console.log(contr);
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:{
                categoryName:contr
            },
            success:function(data){
                // console.log(data);
                if(data.success){
                    queryProductDetailList();
                }
            }
        })
    })
    $('.yjfl').on('click',function(){
        location='categoryFirst.html';
    })
    $('.ejfl').on('click',function(){
        location='categorySecond.html';
    })
})