let date = new Date().toISOString().
  replace(/T/, ' ').      
  replace(/\..+/, '') ;

$(document).ready(function(){
  
    var loadOrders=function(){
        $.ajax({
            url:"http://localhost:3001/api/orders",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++)
                    {
                        if(data[i].status=="To Be Delivered")
                        {
                            str+="<tr><td>"+data[i].orderId+"</td><td>"+data[i].dateOrdered+"</td><td>"+data[i].status+"</td><td>"+data[i].express+"</td><td>"+data[i].totalCost+"</td><td><a href="+""+">Customer Info</a></td><td><button id="+"deliverbtn"+">Deliver This</button></td></tr>";
                        }
                    }

                    $("#orderList tbody").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    loadOrders();

    var updateTable=function(){
        var selected = $("#selectList").val();

        $.ajax({
            url:"http://localhost:3001/api/orders",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++)
                    {
                        if(selected=="Orders on the way")
                        {
                            if(data[i].status=="On the Way")
                            {
                                str+="<tr><td>"+data[i].orderId+"</td><td>"+data[i].dateOrdered+"</td><td>"+data[i].status+"</td><td>"+data[i].express+"</td><td>"+data[i].totalCost+"</td><td><a href="+""+">Customer Info</a></td><td>N/A</td></tr>";
                            }
                            $("#tableHeader").html("Orders on the way");
                        }
                        else if(selected=="Orders Delivered")
                        {
                            if(data[i].status=="Delivered")
                            {
                                str+="<tr><td>"+data[i].orderId+"</td><td>"+data[i].dateOrdered+"</td><td>"+data[i].status+"</td><td>"+data[i].express+"</td><td>"+data[i].totalCost+"</td><td><a href="+""+">Customer Info</a></td><td>N/A</td></tr>";
                            }
                            $("#tableHeader").html("Orders Delivered");
                        }
                        else if(selected=="My Deliveries")
                        {
                            if(data[i].shipperId==1)
                            {
                                str+="<tr><td>"+data[i].orderId+"</td><td>"+data[i].dateOrdered+"</td><td>"+data[i].status+"</td><td>"+data[i].express+"</td><td>"+data[i].totalCost+"</td><td><a href="+""+">Customer Info</a></td><td>N/A</td></tr>";
                            }
                            $("#tableHeader").html("My Deliveries");
                        }
                    }

                    $("#orderList tbody").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    $("#selectList").change(function(){
        var selected = $("#selectList").val();

        if(selected=="Pending Orders")
        {
            loadOrders();
            $("#tableHeader").html("Pending Orders");
        }
        else
        {
            updateTable();
        }
    });
});