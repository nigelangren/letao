$(function () {
    var currentPage = 1;
    var totalPages = 1;
    // var isDelete=0;
    // var isDelete;
    queryProductDetailList();
    Delete();
    qinqiu();

    //查询用户
    function queryProductDetailList() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: 5
            },
            success: function (data) {
                console.log(data);
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

    // 页码
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
                currentPage = page;
                // totalPages=Math.ceil(page/5);
                // console.log(totalPages);
                console.log(page);
                queryProductDetailList();
            }
        });
    }
    var file;
    //点击事件
    function qinqiu() {
        $('.btn-baocun').on('click', function () {
            // console.log(111);
            // console.dir($('.form-control'));
            var select =  $('.select-category').val();
            var ipt = $('.form-control ').val();
            // console.log(select,ipt,file);
            $.ajax({
                url:'/category/addSecondCategory',
                type:'post',
                data:{
                    brandName:select,
                    categoryId:ipt,
                    brandLogo:file,
                    hot:1
                },
                success:function(data){
                    // console.log(data);
                    if(data.success){
                        queryProductDetailList();
                    }
                }
            })
        })
        $('.yjfl').on('click', function () {
            location = 'categoryFirst.html';
        })
        $('.ejfl').on('click', function () {
            location = 'categorySecond.html';
        })

        $('.select-img').on('change',function(){
            console.dir(this);
            var files = this.files[0];
            if(!files){
                alert('请选择图片');
                return;
            }
            var formData= new FormData();
            formData.append('pic1',files);
            $.ajax({
                url:'/category/addSecondCategoryPic',
                data:formData,
                type:'post',
                processData:false,
                contentType:false,
                success:function(data){
                    console.log(data);
                    file = data.picAddr;
                    $('.show-img').attr('src',data.picAddr);
                }
            })
            
        })
    }
})