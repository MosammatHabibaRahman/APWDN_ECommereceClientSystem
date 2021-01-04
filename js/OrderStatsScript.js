var d = new Date(),
    n = d.getMonth(),
    y = d.getFullYear();
$(document).ready(function(){
    $.ajax({
        url:"http://localhost:3001/api/orders/",
        method: "GET",
        complete:function(xmlhttp,status){
            if(xmlhttp.status==200)
            {
                var data=xmlhttp.responseJSON;
                var count=0,ordermonth=0, orderyear=0, delmonth=0, delyear=0, mydel=0,otherdel=0;
                for (var i = 0; i < data.length; i++)
                {
                    dateOrdered = new Date(data[i].dateOrdered);
                    dateDelivered = new Date(data[i].dateDelivered);
                    if(dateOrdered.getMonth()==n)
                    {
                        ordermonth++;
                    }
                    if(dateOrdered.getFullYear()==y)
                    {
                        orderyear++;
                    }
                    if(dateDelivered.getMonth()==n && data[i].dateDelivered!=null)
                    {
                        delmonth++;
                    }
                    if(dateDelivered.getFullYear()==y && data[i].dateDelivered!=null)
                    {
                        delyear++;
                    }
                    if(data[i].shipperId==2 && data[i].status!="To Be Delivered")
                    {
                        mydel++;
                    }
                    if(data[i].status!="To Be Delivered")
                    {
                        count++;
                    }
                    otherdel=count-mydel;
                }
                console.log(ordermonth);
                console.log(orderyear);
                console.log(delmonth);
                console.log(delyear);
                console.log(count);
                console.log(mydel);
                console.log(otherdel);

                var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: ['Orders made this month', 'Orders made this year', 'Orders delivered this month', 'Orders delivered this year'],
                            datasets: [{
                                label: 'Orders Statistics',
                                data: [ordermonth, orderyear, delmonth, delyear],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)'
                                ],
                                borderWidth: 1
                            }]
                        }
                    });

                    var ctx = document.getElementById('myChart2').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: ['My Shipments', 'Other Shipments'],
                            datasets: [{
                                label: 'My Orders Vs Others',
                                data: [mydel,otherdel],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)'
                                ],
                                borderWidth: 1
                            }]
                        }
                    });
            }
            else
            {
                $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
            }
        }
    });
});