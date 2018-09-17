'use strict'
var Server = {
    NODE_ENV: '"production"',
    url: 'https://forums.sparkcloud.io/api',
    test: 'http://10.76.3.74:8081'
}
module.exports = Server.url || Server.test; //获取的是线上还是测试的地址
// scollFix();
// function scollFix(){
//     var scrollDom = $('.content')[0];
//     hasChangeFix = false;
//     scrollDom.onscroll = function(e){
//         if(!hasChangeFix){
//             if(scrollDom.scrollTop>185){
//                 $('#fixtab').addClass('fixtab');
//                 $('.tab-content').css('margin-top','60px');
//                 hasChangeFix = true;   
//             }
//         }else{

//             if(scrollDom.scrollTop<180){
//                 $('#fixtab').removeClass('fixtab');
//                 $('.tab-content').css('margin-top','0px');
//                 hasChangeFix = false;
//             }
//         } 
//         $('.tab').removeClass('tab-active');
//         if(scrollDom.scrollTop>$('#base')[0].offsetTop-50&&scrollDom.scrollTop<=$('#partners')[0].offsetTop-50){
//             $('#baseTab').addClass('tab-active');
//         }else if(scrollDom.scrollTop>$('#partners')[0].offsetTop-50&&scrollDom.scrollTop<=$('#employees')[0].offsetTop-50){
//             $('#partnersTab').addClass('tab-active');
//         }else if(scrollDom.scrollTop>$('#employees')[0].offsetTop-50&&scrollDom.scrollTop<=$('#changeRecord')[0].offsetTop-50){
//             $('#employeesTab').addClass('tab-active');
//         }else if(scrollDom.scrollTop>$('#changeRecord')[0].offsetTop-50){
//             $('#changeRecordTab').addClass('tab-active');
//         }

//     }
// }

// function boxScroll(tabBox){
//     $('.content').scrollTo(tabBox,{
//         duration: 500,
//         offset:-46
//     });
// }
