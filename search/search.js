/**
 * Created by dtx on 16/6/12.
 */
(function search () {
    var searchHistory = window.localStorage;
    var content = new Array();
    var historyShow = new Array();
    var searchContent = document.getElementById('search');
    var btn = document.getElementsByTagName('button');
    var div= document.getElementById('div');
    var ul = document.getElementById('ul');
    var li = [];
    searchContent.onclick = function () {
        if(ul.getElementsByTagName('li').length>0){
            console.log(li);
            for(var i=0;i<li.length;i++){
                ul.removeChild(li[i]);
            }
        }
        if(searchHistory.content){
            div.style.display = 'block';
            historyShow = searchHistory.content.split(",");
            for(let i=0;i<historyShow.length-1;i++){
                if(historyShow[i]!=[]){
                    li[i] = document.createElement('li');
                    li[i].onmouseover = function () {
                        li[i].style.color = "red";
                    };
                    li[i].onmouseout = function () {
                        li[i].style.color = "black";
                    };
                    li[i].innerHTML = historyShow[i];
                    ul.appendChild(li[i]);
                }

            }
        }
    };
    searchContent.onblur = function () {
        div.style.display = 'none';
    };
    var search = function search() {
        if(searchHistory.content){
            content = searchHistory.content.split(',');
            if(content.length<10) {
                for(var i=0;i<content.length;i++){
                    if(content[i]==searchContent.value){
                        content.splice(i,1);
                    }
                }
                content.splice(0,0,searchContent.value);
            }else{
                for(var i=0;i<content.length;i++){
                    if(content[i]==searchContent.value){
                        console.log("11");
                        content.splice(i,1);
                    }
                }
                if(content.length==10){
                    console.log('22');
                    content.pop();
                }
                content.splice(0,0,searchContent.value);
            }
        }else{
            content.splice(0,0,searchContent.value);
        }
        searchHistory.setItem('content',content);
        console.log(searchHistory.content);
    }
    btn[0].onclick = search;
    checkInfo = function() {
        var e = window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode == 13){
            div.style.display = 'none';
            search();
        }
    }
})();