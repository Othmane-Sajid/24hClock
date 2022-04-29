var lune = document.getElementById("sect-lune")
lune.style.backgroundImage="url('./Assets/fullmoon.jpg')"

var jour = document.getElementById("sect-jour")
jour.style.backgroundImage="url('./Assets/night.jpg')"
































// Date and time (numeric)

function whatDayOfTheWeek() { 
    var day = (new Date()).getDay();
    switch (day) {
        case 0 : return "dimanche"; break;
        case 1 : return "lundi"; break;
        case 2 : return "mardi"; break;
        case 3 : return "mercredi"; break;
        case 4 : return "jeudi"; break;
        case 5 : return "vendredi"; break;
        case 6 : return "samedi"; break;
    }
}

function showDateAndTimeNumericFormat() {
    var now=Math.round(Date.now()/1000); // Unix timestamp in seconds
    var dateToday=new Date(now*1000).toLocaleString();
    var dayOfTheWeek = whatDayOfTheWeek();

    var date = document.getElementById("date");
    var heure = document.getElementById("heureNumerique");

    sep = dateToday.indexOf(","); // Parse the date+time into separate date and time 
    date.innerHTML= "Date : " + dateToday.substring(0, sep) + " ("+dayOfTheWeek+")"; 
    heure.innerHTML= "Heure : " + dateToday.substring(sep+1,);
}

var cal;  //  le  calendrier

function lireCalendrier()  {
    // console.log("clic!");
    const req = new XMLHttpRequest();
    const url='http://www.iro.umontreal.ca/~roys/ift1005/calendrier/test.php?cal=now%2C%2B30sec%2Cbonjour%0D%0A%2B2min%2C%2B5min%2Csalut%2C!%0D%0A%2B1hour%2C%2B30sec%2Callo%0D%0A';

    // pour afficher l'url
    // var e=document.getElementById("monurl");
    // e.innerHTML=url;
    // e.setAttribute("href",url);
    
    req.open("GET", url);
    req.send();
    req.onreadystatechange = function() {
        if( this.readyState!=4 ) return;
        if( this.status==200 )  {
            //succes!
            cal=JSON.parse(this.responseText);
            traiteCalendrier(cal);  /////////////////////////
        }else{
            console.log("Problème pendant le chargement du calendrier JSON.");
        }
    };
}



// Ticker 
function traiteCalendrier(calendrier) {  // findTickerToDisplay 
    var now=Math.round(Date.now()/1000); // a la seconde pres
    // var e=document.getElementById("sect-ticker");
    var ds=new Date(now*1000).toLocaleString();
    // e.innerHTML=now+" ("+ds+")"; // a la seconde

    if( typeof(calendrier)=="undefined")  return;

    var e=document.getElementById("tickerMessage");
    var tickerToDisplay="";
    for(var i=0;i<calendrier.length;i++) {
        var c = calendrier[i]; 
        var boolActif=(c.debut<now && now<c.fin);
        if( boolActif ) tickerToDisplay = c.message; e.innerHTML=tickerToDisplay;

    // console.log(tickerToDisplay);    



    var info="";   
    for(var i=0;i<calendrier.length;i++) {
        var c=calendrier[i];
        // pour chaque message...
        var actif=(c.debut<now && now<c.fin);
        var x=(c.debut-now); console.log("x" + x);
        var y=(c.fin-now);  console.log("y" + y);
        info+=i+": De "+c.debut+" a "+c.fin+" : "+c.message;
        if( x>0 ) info+=" (dans "+x+" sec)";
        if( actif ) info+=" (ACTIF! Il reste "+y+" sec)";
        if( now>c.fin ) info+=" (inactif)";
        info+="<br/>";
    }
    // e.innerHTML=info;
}
}

var cal;  //  le  calendrier

function lireCalendrier()  {
    // console.log("clic!");
    const req = new XMLHttpRequest();
    const url='http://www.iro.umontreal.ca/~roys/ift1005/calendrier/test.php?cal=now%2C%2B30sec%2Cbonjour%0D%0A%2B2min%2C%2B5min%2Csalut%2C!%0D%0A%2B1hour%2C%2B30sec%2Callo%0D%0A';

    // pour afficher l'url
    // var e=document.getElementById("monurl");
    // e.innerHTML=url;
    // e.setAttribute("href",url);
    
    req.open("GET", url);
    req.send();
    req.onreadystatechange = function() {
        if( this.readyState!=4 ) return;
        if( this.status==200 )  {
            //succes!
            cal=JSON.parse(this.responseText);
            traiteCalendrier(cal);
        }else{ console.log("Probleme lors de la récupération du calendrier JSON."); }
    };
}


lireCalendrier()
window.onload=(traiteCalendrier(cal));

                     
// showDateAndTimeNumericFormat()
window.onload=function() {
    setInterval(function() { showDateAndTimeNumericFormat(); },1000); //reload every 55 seconds
} 


// window.onload=function ()  {
//     setInterval(function() { traiteCalendrier(cal); },1000);
// }
