$(document).ready(function(){
  
    var loadPosts=function(){
        $.ajax({
            url:"http://localhost:59760/api/posts",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++)
                    {
                        //str+="<tr><td><b>Post #"+(i+1)+"</b></td></tr><tr><td>"+data[i].text+"</td></tr><tr><td><button id="+"commentbtn"+">See Comments</button></td></tr>";
                        str+="<tr><td><b>Post #"+(i+1)+"</b></td></tr><tr><td>"+data[i].text+"</td></tr><tr><td><a href="+"Comments.html?id="+data[i].postId+">See Comments</a></td></tr>";
                    }

                    $("#posts").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    loadPosts();
});