let date = new Date().toISOString().
  replace(/T/, ' ').      
  replace(/\..+/, '') ;

$(document).ready(function(){
  
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    var loadInfo=function(){
        var customerId = parseInt(getUrlParameter('id'));
        console.log(customerId);

        $.ajax({
            url:"http://localhost:3001/api/customers/"+customerId,
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    str+="<tr><td><b>Username: </b></td><td>"+data.username+"</td></tr><tr><td><b>Name</b></td><td>"+(data.firstName+" "+data.lastname)+"</td></tr><tr><td><b>Address: </b></td><td>"+data.address+"</td></tr>";
                    $("#customerInfo").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    loadInfo();
});