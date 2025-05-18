//5-18-2025 edit -- i have to graduate
//var num = 0;
var negate = false;
var reading;
var needle;
var count = 0; //new var
var avgdata = []; //new stuff

const WINDOW = 3;

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

function setup()
{
    document.getElementById("start").style.background = "#cccccc";
    var axis = document.getElementById("axis");
    count = 0; //new thing
    
    if (DeviceMotionEvent && typeof(DeviceMotionEvent.requestPermission) === "function") //this might be what's fucking up androids -- there may not be requestPermission() method
    {
        DeviceMotionEvent.requestPermission().then((response) => {
            if (response == "granted")
            {
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
            else
            {
                reading.innerHTML = "Permission was denied... :(";
            }
        });
    }
    else
    {
        reading.innerHTML = "DeviceMotionEvent or requestPermission is not available";
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
