//3-1-2025 edit
var num = 0;
var negate = false;
var reading;
var needle;

function magnitude(x, y, z)
{
    return Math.sqrt(x*x + y*y + z*z);
}

function definevars() //assign elements to variables when the thingy loads
{
    reading = document.getElementById("reading");
    needle = document.getElementById("needle");
}

function setup()
{
    document.getElementById("start").style.background = "#cccccc";
    var axis = document.getElementById("axis");
    
    if (DeviceMotionEvent && typeof(DeviceMotionEvent.requestPermission) === "function")
    {
        DeviceMotionEvent.requestPermission().then((response) => {
            if (response == "granted")
            {
                window.removeEventListener("devicemotion", processx); //basically like remove all event handlers -- start fresh
                window.removeEventListener("devicemotion", processy);
                window.removeEventListener("devicemotion", processz);

                if (axis.value == "x")
                {
                    window.addEventListener("devicemotion", processx); //add x event handler
                    window.alert("Measuring along x-axis");
                }
                else if (axis.value == "y")
                {
                    window.addEventListener("devicemotion", processy); //y event
                    window.alert("Measuring along y-axis");
                }
                else if (axis.value == "z")
                {
                    window.addEventListener("devicemotion", processz); //z event
                    window.alert("Measuring along z-axis");
                }
                else if (axis.value == "null")
                {
                    window.alert("No measurement axis selected");
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
        reading.innerHTML = "Couldn't connect to accelerometer... :(";
    }
}

function processx(event)
{
    var a = 0;
    if (negate == true)
    {
        a = -1 * event.acceleration.x;
    }
    else
    {
        a = event.acceleration.x;
    }
    
    reading.innerHTML = Math.round(1000 * a)/1000;

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

function processy(event)
{
    var a = 0;
    if (negate == true)
    {
        a = -1 * event.acceleration.y;
    }
    else
    {
        a = event.acceleration.y;
    }
    
    reading.innerHTML = Math.round(1000 * a)/1000;

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

function processz(event)
{
    var a = 0;
    if (negate == true)
    {
        a = -1 * event.acceleration.z;
    }
    else
    {
        a = event.acceleration.z;
    }
    
    reading.innerHTML = Math.round(1000 * a)/1000;

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

function ptotal(event)
{
    var a = 0;

    a = magnitude(event.acceleration.x, event.acceleration.y, event.acceleration.z);

    if (negate == true)
    {
        a *= -1;
    }
    
    reading.innerHTML = Math.round(1000 * a)/1000;

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
