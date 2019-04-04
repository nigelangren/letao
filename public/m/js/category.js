mui('.boxleft .mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false //是否显示滚动条 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
mui('.boxright .mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: true //是否显示滚动条 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});