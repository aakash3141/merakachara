//5-20-2025 edit -- i have to graduate
//var num = 0;
var negate = false;
var reading;
var needle;
var count = 0; //new var
var avgdata = []; //new stuff

const WINDOW = 120;

function average(data)
{
    var sum = 0;
    for (var i = 0; i < data.length; i++)
        {
            sum += data[i];
        }

    return sum / data.length; //integer division might fuck smth up -> nvm it doesn't
}

function magnitude(x, y, z)
{
    return Math.sqrt(x*x + y*y + z*z);
}

function definevars() //assign elements to variables when the thingy loads
{
    reading = document.getElementById("reading");
    needle = document.getElementById("needle");
}

function rotateneedle(a)
{
    if (a > 5)
    {
        needle.style.transform = "rotate(" + 150 + "deg)";
    }
    else if (a < -5)
    {
        needle.style.transform = "rotate(" + -150 + "deg)";
    }
    else
    {
        needle.style.transform = "rotate(" + (a * 30) + "deg)";
    }
}

function setup2()
{         
    var axis = document.getElementById("axis");
    
    window.removeEventListener("devicemotion", processx); //basically like remove all event handlers -- start fresh
    window.removeEventListener("devicemotion", processy);
    window.removeEventListener("devicemotion", processz);
    window.removeEventListener("devicemotion", ptotal);

    if (axis.value == "x")
    {
        window.addEventListener("devicemotion", processx); //add x event handler
    }
    else if (axis.value == "y")
    {
        window.addEventListener("devicemotion", processy); //y event
    }
    else if (axis.value == "z")
    {
        window.addEventListener("devicemotion", processz); //z event
    }
    else if (axis.value == "total")
    {
        window.addEventListener("devicemotion", ptotal); //total event
    }
    else if (axis.value == "null")
    {
        reading.innerHTML = "0.00 (no axis)";
        needle.style.transform = "rotate(0deg)";
    }
}

function setup1()
{
    document.getElementById("start").style.background = "#cccccc";
    count = 0; //new thing
    
    if (DeviceMotionEvent) //this might be what's fucking up androids -- there may not be requestPermission() method
    {
        if (typeof(DeviceMotionEvent.requestPermission) === "function") //request permission on iOS devices
        {
            DeviceMotionEvent.requestPermission().then((response) => {
                if (response == "granted")
                {
                    setup2();
                }
                else
                {
                    reading.innerHTML = "Permission was denied... :(";
                }
            });  
        }
        else
        {
            setup2(); //i hope this works -- the idea is that androids have DeviceMotionEvent but they lack requestPermission() method; this code should hopefully catch that......
        }
    }
    else
    {
        reading.innerHTML = "DeviceMotionEvent is not available";
    }
}

function processx(event)
{   
    var a = event.acceleration.x;
    if (negate == true)
    {
        a *= -1;
    }

    avgdata[count] = a;

    count = (count + 1) % WINDOW;
    
    a = average(avgdata);
    
    reading.innerHTML = Math.round(1000 * a)/1000;
    rotateneedle(a);
}

function processy(event) //copy this function again for processx if everything gets fucked up
{
    var a = event.acceleration.y;
    if (negate == true)
    {
        a *= -1;
    }

    avgdata[count] = a;

    count = (count + 1) % WINDOW;

    a = average(avgdata);
    
    reading.innerHTML = Math.round(1000 * a)/1000;
    rotateneedle(a);
}

function processz(event)
{
    var a = event.acceleration.z;
    if (negate == true)
    {
        a *= -1;
    }

    avgdata[count] = a;

    count = (count + 1) % WINDOW;

    a = average(avgdata);
    
    reading.innerHTML = Math.round(1000 * a)/1000;
    rotateneedle(a);
}

function ptotal(event)
{
    var a = magnitude(event.acceleration.x, event.acceleration.y, event.acceleration.z);
    if (negate == true)
    {
        a *= -1;
    }

    avgdata[count] = a;

    count = (count + 1) % WINDOW;
    
    a = average(avgdata);
    
    reading.innerHTML = Math.round(1000 * a)/1000;
    rotateneedle(a);
}

function negateaccl()
{
    negate = !negate;
}

/*function addangle()
{
    if(num + 10 <= 150)
    {
        num += 10;
    }
    else
    {
        num = 150;
    }
    document.getElementById("needle").style.transform = "rotate(" + num + "deg)";
}

function subtractangle()
{
    if(num - 10 >= -150)
    {
     	num -= 10;
    }
    else
    {
     	num = -150;
    }
    document.getElementById("needle").style.transform = "rotate(" + num + "deg)";
}*/
//Prototyping accelerometer needle movement
