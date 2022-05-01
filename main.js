var lune = document.getElementById("sect-lune")
lune.style.backgroundImage="url('./Assets/fullmoon.jpg')"

var jour = document.getElementById("sect-jour")
jour.style.backgroundImage="url('./Assets/night.jpg')"









// var hands = [];
// hands.push(document.getElementById("hoursHand"));
// hands.push(document.getElementById("minutesHand"));


// hands[0].setAttribute('from', shifter(secAngle));
// hands[0].setAttribute('to', shifter(secAngle + 360));
// hands[1].setAttribute('from', shifter(minuteAngle));
// hands[1].setAttribute('to', shifter(minuteAngle + 360));
// hands[2].setAttribute('from', shifter(hoursAngle));
// hands[2].setAttribute('to', shifter(hoursAngle + 360));



// Place the 24h numbers 

var svg=document.getElementById("monhorloge");
var ai=document.getElementById("aig1");
var gHeures=document.getElementById("heures");
// var gTics=document.getElementById("tics");
var gMeteo=document.getElementById("meteo");
var h=0;


function  txt(texte,rot)  {
    var e = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    // e.setAttribute("x",630);
    // e.setAttribute("y",500);
    // e.setAttribute("x",500);
    // e.setAttribute("y",375);
    e.setAttribute("x",500);
    e.setAttribute("y",640);
    e.setAttribute("fill","red");
    e.setAttribute("style","text-anchor:middle; font-family:Ubuntu; font-weight: bold; font-size:192;");
    e.setAttribute("transform","rotate("+rot+" 500 500)");
    var textNode = document.createTextNode(texte);
    e.appendChild(textNode);
    gHeures.appendChild(e);
}

function meteoDot(rot,id) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    e.setAttribute("id",id);
    // e.setAttribute("cx","675");
    // e.setAttribute("cy","500");
    e.setAttribute("cx","500");
    e.setAttribute("cy","670");
    e.setAttribute("r","12");
    e.setAttribute("transform","rotate(+"+rot+" 500 500)");
    e.setAttribute("fill","red");
    e.setAttribute("stroke","none");
    gMeteo.appendChild(e);
    return(e);
}

function ajuste()  {
    ai.setAttribute("transform","rotate("+h+" 200 200)");
    h=h+10.0;
}



// Populate te clock with the 24 numeric values (hours) and meteo dots 
for(var i=0;i<24;i++) txt(""+i,i*360/24);
var meteoTab = [];
for(var i=0;i<24;i++) meteoTab[i]=meteoDot(i*360/24,"meteoDot"+i);

//  change un meteodot
//var  md=document.getElementById("meteoDot4");
//md.setAttribute("fill","green");

//meteoTab[4].setAttribute("fill","rgb(255,255,0)");

for(var i=0;i<24;i++) meteoTab[i].setAttribute("fill","rgb("+(i*255/23)+","+(255-i*255/23)+",255)");
var meteoTab = [];

for(var i=0;i<24;i++) meteoTab[i]=meteoDot(i*360/24,"meteoDot"+i);

//  change un meteodot
//var  md=document.getElementById("meteoDot4");
//md.setAttribute("fill","green");

//meteoTab[4].setAttribute("fill","rgb(255,255,0)");

for(var i=0;i<24;i++) meteoTab[i].setAttribute("fill","rgb("+(i*255/23)+","+(255-i*255/23)+",255)");










// METEO 
function traiteLaMeteo(JsonMeteo) {
    var h=JsonMeteo.hourly;
    var tmin=9999;
    var tmax=-9999;
    for(var i=0;i<24;i++) {
        if( h[i].feels_like>tmax ) tmax=h[i].feels_like;
        if( h[i].feels_like<tmin ) tmin=h[i].feels_like;
    }


    // affiche temperatures min et max


    function rotateTimeInBounds(hour) { // Utility function to stay in the 0-23 bounds for hours
        if (hour <24) return hour;
        else {
            var realHour = hour-24;
            return realHour;
        }
    }

    var currentHour = new Date().getHours();
    for (var i=0; i<24; i++) {
        var f=(h[i].feels_like-tmin)/(tmax-tmin); // 0  a  1
        meteoTab[rotateTimeInBounds(currentHour+ i)].setAttribute("fill","rgb("+(f*255)+",0,"+(255-f*255)+")");
    }


    // Show infos in the Legend Section 

    document.getElementById("tempMin").innerHTML=''+tmin + ' degrés celcius (bleu)';
    document.getElementById("tempMax").innerHTML=''+tmax + ' degrés celcius (rouge)';

    var sunriseUnixTimeStamp=JsonMeteo.daily[0].sunrise;
    var sunsetUnixTimeStamp=JsonMeteo.daily[0].sunset;
    
    var dateSunRise = new Date(sunriseUnixTimeStamp * 1000);
    var hoursSunRise = dateSunRise.getHours();
    if (dateSunRise.getMinutes()>=10)  var minutesSunRise = dateSunRise.getMinutes();
    else minutesSunRise = "0" + dateSunRise.getMinutes();

    var dateSunSet = new Date(sunsetUnixTimeStamp * 1000);
    var hoursSunSet = dateSunSet.getHours();
    if (dateSunSet.getMinutes()>=10)  var minutesSunSet = dateSunSet.getMinutes();
    else minutesSunSet = "0" + dateSunSet.getMinutes();


    document.getElementById("leverSoleil").innerHTML=''+hoursSunRise+'h'+minutesSunRise;
    document.getElementById("coucherSoleil").innerHTML=''+hoursSunSet+'h'+minutesSunSet;

    // console.log("sunrise dans "+((sunrise-Date.now()/1000)/3600));
    // console.log("sunset dans  "+((sunset-Date.now()/1000)/3600));

    // console.log(sunrise);
}


function meteo() {
    var  url="https://api.openweathermap.org/data/2.5/onecall?lat=45.5028&lon=-73.608&units=metric&lang=fr&appid=d58eb3ba8348bea274a21ef563bb6acb"

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var JsonMeteo=JSON.parse(this.responseText);
            traiteLaMeteo(JsonMeteo);
        }
    };
    req.open("GET", url, true);
    req.send();

}








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
    // var ds=new Date(now*1000).toLocaleString();
    
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



function adjustHourAndMinutesHands(){
    var date = new Date();
    var minutesAngle = 360 * date.getMinutes() / 60;
    var hoursAngle = 180 + 360 * date.getHours() / 24 + date.getMinutes() / 4;
    // var hoursAngle = 360 * date.getHours() / 24 + minutesAngle/60;
    // var hoursHand = document.getElementById("hoursHand");
    var hoursHand = document.querySelector('#hoursHand > *');
    var newFromAttribute = [hoursAngle, 500, 500].join(" "); //500, 500 for the center of the circle/clock
    var newToAttribute = [hoursAngle+360, 500, 500].join(" ");
    hoursHand.setAttribute('from',newFromAttribute); 
    hoursHand.setAttribute('to', newToAttribute); 

    // var minutesHand = document.getElementById("minutesHand");
    var minutesHand = document.querySelector('#minutesHand > *');
    var newFromAttribute = [minutesAngle, 500, 500].join(" ");
    var newToAttribute = [minutesAngle+360, 500, 500].join(" ");
    minutesHand.setAttribute('from',newFromAttribute);
    minutesHand.setAttribute('to', newToAttribute); 
}


function init() {
    lireCalendrier()
    window.onload=(showTicker(cal));
    window.onload=function() {
        setInterval(function() { showTicker(cal); },15000); // verify if ticker needs to be changed every 15 sec
    } 
    
    showDateAndTimeNumericFormat()
    window.onload=function() {
        setInterval(function() { showDateAndTimeNumericFormat(); },1000); 
    } 


    // Adjust the Hour handle and Minutes handle
    adjustHourAndMinutesHands()
    window.onload=function() {
        setInterval(function() { adjustHourAndMinutesHands(); },10000); // Adjust hour and minutes hands every 10 seconds 
    } 

    meteo();
    window.onload=function() {
        setInterval(function() { adjustHourAndMinutesHands(); },1000 * 60 * 60 ); // Update meteo every hour 
    } 

}

init();

