function getrecepe(q) {


    url = "http://newsapi.org/v2/everything?q=bitcoin&from=2020-09-29&sortBy=publishedAt&apiKey=d6edc64bac4547a794a7012896052c9a";

    let ajax;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        ajax = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
        ajax = new ActiveXObject("Msxm12.XMLHTTP");
    }



    //document.getElementById("informacion").innerHTML = url;
    ajax.open('GET', url, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log(ajax.responseText);
            //let response = ajax.responseText;
            let responseJSON = JSON.parse(this.responseText);
            console.log(responseJSON);

            for (let i = 0; i < responseJSON.articles.length; i++) {
                //const element = array[i];

                console.log(responseJSON.articles[i].author);
                console.log(responseJSON.articles[i].urlToImage);
                document.getElementById("foto").innerHTML = "<img id='foto' class= 'img-fluid' width= '300' heigth='300' src='" + responseJSON.articles[i].urlToImage + "' >";
            }




            document.getElementById("informacion").innerHTML = responseJSON.responseText;
            //var data = JSON.parse(this.responseText);
            //totalPaginas = data.results.length;
            //totalPaginas /=5;
            //console.log(totalPaginas +'<--');
            //let parteEntera = parseInt(totalPaginas);
            //let parteDecimal = 5*( totalPaginas - parteEntera)
            //totalPaginas = Math.ceil(totalPaginas);
            //
            //callback(responseJSON);
            //document.getElementById("informacion").innerHTML = "<h1>" + responseJSON.id + "<h1>" + "</h1><br><img src='" + responseJSON.baseUri + responseJSON.image + "' width = '400'/><br>ready in" + responseJSON.readyInMinutes + "minutes";
            // document.getElementById("informacion").innerHTML =



        }

    }
}





function hacerPeticionAjax(url, callback) {
    let ajax;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        ajax = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }


    document.getElementById("informacion").innerHTML = url;
    ajax.open('GET', url, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log(ajax.responseText);
            let response = ajax.responseText;
            let responseJSON = JSON.parse(response);
            document.getElementById("informacion").innerHTML = ajax.responseText;
            callback(responseJSON);

        }
    };


}