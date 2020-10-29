var desde = 0;
var hasta = 0;

function elegirCategoria(c) {

    switch (c) {
        case 'NEGOCIO':
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
            url0 = "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d6edc64bac4547a794a7012896052c9a";
            //business
            getrecepe(url0)
            break;

        case 'BITCOIN':
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
            url1 = "http://newsapi.org/v2/everything?q=bitcoin&from=2020-09-29&sortBy=publishedAt&apiKey=d6edc64bac4547a794a7012896052c9a";
            //bitcoin
            getrecepe(url1)
            break;


        case 'APPLE':
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
            url2 = "http://newsapi.org/v2/everything?q=apple&from=2020-10-28&to=2020-10-28&sortBy=popularity&apiKey=d6edc64bac4547a794a7012896052c9a";
            //apple 
            getrecepe(url2)
            break;

        case 'TECHCRUNCH':
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
            url3 = "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=d6edc64bac4547a794a7012896052c9a";
            //tecnologia
            getrecepe(url3)
            break;


        case 'TWSJ':
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
            url4 = "http://newsapi.org/v2/everything?domains=wsj.com&apiKey=d6edc64bac4547a794a7012896052c9a";
            //The Wall Street Journal
            getrecepe(url4)
            break;


        default:
            //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            document.getElementById("informacion").innerHTML = "No coicide";
            break;

    }

}



function getrecepe(urlFinal) {

    url = urlFinal;

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
            guardaDatos = [];
            for (let i = 0; i < responseJSON.articles.length; i++) {
                //const element = array[i];
                guardaDatos.push(responseJSON.articles[i]);
                //document.getElementById("informacion").innerHTML = responseJSON.responseText;
                console.log(responseJSON.articles[i].author);
                console.log(responseJSON.articles[i].urlToImage);
                //document.getElementById("foto").innerHTML = "<img id='foto' class= 'img-fluid' width= '300' heigth='300' src='" + responseJSON.articles[i].urlToImage + "' >";
            }

            console.log(guardaDatos);
            crearTabla(guardaDatos);



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


function crearTabla(datos) {
    let keys = ['author', 'content', 'description', 'publishedAT', 'title', 'url', 'urlToImage'];

    console.log("keys " + keys);
    //console.log("datos primero "+datos[0].track.track_name);


    let table = "";
    for (let i = 0; i < keys.length; i++) {
        table += "<th> " + keys[i] + "</th>";
    }
    console.log(datos.length)
    for (let i = 0; i < datos.length; i++) {
        let art = datos[i];
        table = table + "<tr>";

        console.log("dat " + art.author);


        for (let j = 0; j < keys.length; j++) {

            if (keys[j] == "author") {

                table += "<td> " + art.author + "</td>";

            } else if (keys[j] == "content") {

                table += "<td>" + art.content + "</td>";

            } else if (keys[j] === "description") {

                table += "<td>" + art.description + "</td>";

            } else if (keys[j] == "publishedAT") {
                table += "<td>" + art.publishedAT + "</td>";
            } else if (keys[j] == "title") {
                table += "<td>" + art.title + "</td>";

            } else if (keys[j] == "url") {
                table += "<td width= '200' heigth='200'> <a href=" + url + ">" + art.url + "</a></td>";

            } else if (keys[j] == "urlToImage") {
                table += "<td>  <IMG width= '200' heigth='200' SRC=" + art.urlToImage + "></td>";

            }
        }
        table = table + "</tr>";
    }

    document.getElementById('output').innerHTML = table;
}




function cargarUltimoIndex() {
    getPeliculasNombPagina(paginas);
}

function regresarUnaPelicula() {
    if (actualizarBotones(1) === 0) {
        pagina_actual = parseInt(pagina_actual) - 1;
        getPeliculasNombPagina(pagina_actual);
    }
}

function aumentarUnaPelicula() {
    if (actualizarBotones(2) === 0) {
        pagina_actual = parseInt(pagina_actual) + 1;
        getPeliculasNombPagina(pagina_actual);
    }
}

function actualizarBotones(btn) {
    scroll(0, 0);
    document.getElementById('btn_avanzar').disabled = false;
    document.getElementById('btn_regresar').disabled = false;
    if (pagina_actual === 1 && btn === 1) {
        document.getElementById('btn_regresar').disabled = true;
        alert("Ya esta en la primera pagina");
        return 1; //ERROR En caso de que se quiera regresar y ya este en el inicio
    } else if (pagina_actual === paginas && btn === 2) {
        document.getElementById('btn_avanzar').disabled = true;
        alert("Ya esta en la ultima pagina");
        return 2; //ERROR En caso de que se quiera avanzar y ya este en el final;
    } else {
        return 0; // No pasa nada :v
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