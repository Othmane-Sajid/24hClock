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




// Ticker 
function showTicker(calendrier) {  // findTickerToDisplay 
    var now=Math.round(Date.now()/1000); // a la seconde pres
    var ds=new Date(now*1000).toLocaleString();
    
    if( typeof(calendrier)=="undefined")  return;

    var e=document.getElementById("tickerMessage");
    var tickerToDisplay="";
    for(var i=0;i<calendrier.length;i++) {
        var c = calendrier[i]; 
        var boolActif=(c.debut<now && now<c.fin);
        if( boolActif ) tickerToDisplay = c.message;
    } 
    e.innerHTML=tickerToDisplay;

}

var cal;  //  le  calendrier
function lireCalendrier()  {
    const req = new XMLHttpRequest();
    const url='http://www.iro.umontreal.ca/~roys/ift1005/calendrier/test.php?cal=now%2C%2B30sec%2Cbonjour%0D%0A%2B2min%2C%2B5min%2Csalut%2C!%0D%0A%2B1hour%2C%2B30sec%2Callo%0D%0A';
    req.open("GET", url);
    req.send();
    req.onreadystatechange = function() {
        if( this.readyState!=4 ) return;
        if( this.status==200 )  {
            //success!
            cal=JSON.parse(this.responseText);
            showTicker(cal);
        }else{ console.log("Probleme lors de la récupération du calendrier JSON."); }
    };
}


function init() {
    lireCalendrier()
    window.onload=(showTicker(cal));
    window.onload=function() {
        setInterval(function() { showTicker(cal); },15000); // verify if ticker needs to be changed every 15 sec
    } 
    
    // showDateAndTimeNumericFormat()
    window.onload=function() {
        setInterval(function() { showDateAndTimeNumericFormat(); },1000); 
    } 
}


init();

