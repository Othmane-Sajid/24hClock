function sunPosition(){
    var today = new Date();
    var currentHour = today.getHours()
    var sectJour = "sect-jour"
    
    if((currentHour>= 22 && currentHour < 24) || (currentHour>= 0 && currentHour < 7)){
        changeDaytState(sectJour,"./Assets/night.jpg")
    }else if(currentHour>= 6 && currentHour < 12){
        changeDaytState(sectJour,"./Assets/sunrise.jpg")

    }else if(currentHour>= 12 && currentHour < 19){
        changeDaytState(sectJour,"./Assets/noon.jpg")

    }else if(currentHour>= 19 && currentHour < 22){
        changeDaytState(sectJour,"./Assets/sunset.jpg")
    }
}

function moonPhase(){

    var today = new Date();
    var sectLune = "sect-lune"

    var year = today.getFullYear()
    var month = today.getMonth()+1
    var day = today.getDay()+1

    if(month == 0 || month == 1 ){
        year-=1
        month+=12
    }

    a1 = year/100
    a2 = a1/4
    a3 = 2-a1+a2
    a4 = 365.25 * (year+4716)
    a5 = 30.6001 * (month+1)
    jd = a3+day+a4+a5-1524.5
    
    daySinceNewMoon = jd -2451549.5

    newMoon = daySinceNewMoon / 29.53

    cycle = Math.round( parseFloat( Number.parseFloat( newMoon % 1 ).toFixed(3) ) * 29.53)

    if(cycle == 0){
        changeDaytState(sectLune,"./Assets/newmoon.jpg")
    }else if(cycle > 0 && cycle < 7){
        changeDaytState(sectLune,"./Assets/waxmoon.jpg")

    }else if(cycle == 7){
        changeDaytState(sectLune,"./Assets/firstmoon.jpg")

    }else if(cycle > 7 && cycle < 15){
        changeDaytState(sectLune,"./Assets/waxgibmoon.jpg")
    }else if(cycle == 15){
        changeDaytState(sectLune,"./Assets/fullmoon.jpg")

    }else if(cycle > 15 && cycle < 22){
        changeDaytState(sectLune,"./Assets/wangibmoon.jpg")

    }else if(cycle == 22){
        changeDaytState(sectLune,"./Assets/lastmoon.jpg")

    }else if(cycle > 22 && cycle < 29.5){
        changeDaytState(sectLune,"./Assets/wanmoon.jpg")

    }else{
        changeDaytState(sectLune,"./Assets/newmoon.jpg")
    }

}

function changeDaytState(id,url){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var jour = document.getElementById(id)
        jour.style.backgroundImage="url('"+url+"')"
    }
    xhttp.open("GET", "");
    xhttp.send();
}









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
        if( h[i].temp>tmax ) tmax=h[i].temp;
        if( h[i].temp<tmin ) tmin=h[i].temp;
    }
    for(var i=0;i<24;i++) {
        var f=(h[i].temp-tmin)/(tmax-tmin); // 0  a  1
        console.log(i+" : "+(h[i].temp)+  " :  "+f);
        meteoTab[i].setAttribute("fill","rgb("+(f*255)+",0,"+(255-f*255)+")");
    }
    // affiche temperatures min et max

    // document.getElementById("mintemp").innerHTML=""+tmin;  $$$$$$$$$$$$$$$$$$$$$$$$$$$
    // document.getElementById("maxtemp").innerHTML=""+tmax;


    var sunrise=JsonMeteo.daily[0].sunrise;
    var sunset=JsonMeteo.daily[0].sunset;

    console.log("sunrise dans "+((sunrise-Date.now()/1000)/3600));
    console.log("sunset dans  "+((sunset-Date.now()/1000)/3600));

    console.log(sunrise);
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





meteo()

















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
        setInterval(sunPosition, 1000);
        moonPhase()
        setInterval(moonPhase, 86400);

    } 


    // Adjust the Hour handle and Minutes handle


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


    // var hoursHand = document.getElementById("hoursHand");
    var aig1 = document.querySelector('#aig1 > *');
    var newFromAttribute = [hoursAngle, 500, 500].join(" "); //500, 500 for the center of the circle/clock
    console.log(newFromAttribute);
    var newToAttribute = [hoursAngle+360, 500, 500].join(" ");
    console.log(newToAttribute);
    aig1.setAttribute('from',newFromAttribute); 
    aig1.setAttribute('to', newToAttribute); 

    }

}


init();

