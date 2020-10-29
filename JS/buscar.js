function getsource(id) {

    url = "https://api.spoonacular.com/recipes/" + id + "/information?apikey=35a167c622244301a1ac41e0994a0a42";

    document.getElementById('sourceLink').innerHTML = url;
    document.getElementById('sourceLink').href = url;
}





function getrecepe3(q) {

    url = "https://api.spoonacular.com/recipes/search?apikey=35a167c622244301a1ac41e0994a0a42$number=1&query=" + q;
    url.results[0].title + "</h1><br><img src='" + url.baseUri + url.results[0].image + "' width = '400'/><br>ready in" + url.results[0].readyInMinutes + "minutes"
}

function mostrar(res) {
    document.getElementById("ouput").innerHTML = "<h1>" + res.results[0].title + "</h1><br><img src='" + res.baseUri + res.results[0].image + "' width = '400'/><br>ready in" + res.results[0].readyInMinutes + "minutes"
    getsource(res.results[0].id)
}



function getrecepe(q) {
    url = "https://api.spoonacular.com/recipes/716429/information?apiKey=35a167c622244301a1ac41e0994a0a42&query=" + q;

    let ajax;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        ajax = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }


    //document.getElementById("informacion").innerHTML = url;
    ajax.open('GET', url, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            console.log(ajax.responseText);
            let response = ajax.responseText;
            let responseJSON = JSON.parse(response);
            //document.getElementById("informacion").innerHTML = ajax.responseText;
            //callback(responseJSON);
            document.getElementById("informacion").innerHTML = responseJSON.get;


        }
    };

    ajax.onload = function() {
        const superHeroes = responseJSON;
        populateHeader(superHeroes);
        showHeroes(superHeroes);
    };

    function populateHeader(jsonObj) {
        const myH1 = document.createElement('h1');
        myH1.textContent = jsonObj['squadName'];
        header.appendChild(myH1);

        const myPara = document.createElement('p');
        myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
        header.appendChild(myPara);
    }

    function showHeroes(jsonObj) {
        const heroes = jsonObj['members'];

        for (var i = 0; i < heroes.length; i++) {
            const myArticle = document.createElement('article');
            const myH2 = document.createElement('h2');
            const myPara1 = document.createElement('p');
            const myPara2 = document.createElement('p');
            const myPara3 = document.createElement('p');
            const myList = document.createElement('ul');

            myH2.textContent = heroes[i].name;
            myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
            myPara2.textContent = 'Age: ' + heroes[i].age;
            myPara3.textContent = 'Superpowers:';

            const superPowers = heroes[i].powers;
            for (var j = 0; j < superPowers.length; j++) {
                const listItem = document.createElement('li');
                listItem.textContent = superPowers[j];
                myList.appendChild(listItem);
            }

            myArticle.appendChild(myH2);
            myArticle.appendChild(myPara1);
            myArticle.appendChild(myPara2);
            myArticle.appendChild(myPara3);
            myArticle.appendChild(myList);

            section.appendChild(myArticle);
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