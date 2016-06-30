// /**
//  * Created by dtx on 16/6/28.
//  */
//
// var btn1 = document.getElementById('btn1'),
// btn2 = document.getElementById('btn2'),
// btn3 = document.getElementById('btn3'),
// div1 = document.getElementById('home'),
// div2 = document.getElementById('l1'),
// div3 = document.getElementById('r2');
//
//
// btn1.onclick = function () {
//     div1.style.zIndex = "100";
//     div2.style.zIndex = "10";
//     div3.style.zIndex = "10";
// };
// btn2.onclick = function () {
//     div1.style.zIndex = "10";
//     div2.style.zIndex = "100";
//     div3.style.zIndex = "10";
// };
// btn3.onclick = function () {
//     div1.style.zIndex = "10";
//     div2.style.zIndex = "10";
//     div3.style.zIndex = "100";
// };
$(function ()
{
    $("#navtab1").ligerTab(
        {
            onAfterSelectTabItem: function(tabid){
                console.log(tabid);
                // $("#navtab1").ligerTab().reload(tabid);
                // $("#navtab1").ligerTab().setHeight(500);
                $("#home11").css("color","red");
                $("#idid").css("scrolling","yes");
                console.log($("#home11"))
                console.log($("#id"));
            }
        }
    );
    console.log($("#navtab1").ligerTab());
});