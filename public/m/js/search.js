$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    function addHistory(){
        $('#btn').on('tap',function(){
            var search=$('#but').val().trim();
            if(search==''){
                return;
            }
            // console.log(111);
            // var arr = localStorage.getItem('searchHistory');
            // // console.log(arr==null)
            // if(arr == null){
            //     arr=[];
            //     // console.log(arr,"111")
            // }else{
            //     arr = JSON.parse(arr);
            // }
            var arr = getaddHistory();
            arr = uniq(arr);
            for(var i=0;i<arr.length;i++){
                if(arr[i] == search){
                    arr.splice(i, 1);
                    i--;
                }
            }
            // arr.unshift(search);
            arr.unshift(search);
            // console.log(arr);

            setaddHistory(arr);
            $('#but').val('');
            queryHistory();
            location='productlist.html?search='+search;
        })
    }

    function queryHistory(){
       var arr = getaddHistory();
       var html = template('queryHistory',{
           rows:arr
       })
       $('.mui-table-view').html(html);
    }
    
    function deleteHistory(){
        $('.mui-table-view').on('tap',' .fa-close',function(){
           console.log( $(this).data('index'));
           var colse = $(this).data('index');
           var arr = getaddHistory();
            arr.splice(colse, 1);
            setaddHistory(arr)
            queryHistory();
        })
    }
   
    function clearHistory(){
        $('.btn-clear').on('tap',function(){
            localStorage.removeItem('searchHistory');
            queryHistory();
        })
    }

    function getaddHistory(){
        var arr = localStorage.getItem('searchHistory');
        // console.log(arr==null)
        if(arr == null){
            arr=[];
            // console.log(arr,"111")
        }else{
            arr = JSON.parse(arr);
        }
        return arr;
    }

    function setaddHistory(arr){
        localStorage.setItem('searchHistory',JSON.stringify(arr));
    }
    function uniq(array) {
        var temp = [];
        for (var i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i]) == -1) {
                temp.push(array[i]);
            }
        }
        return temp;
    }
})




