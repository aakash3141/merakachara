var num = 0;
var negate = false;

function setup()
{
    window.alert("setup called");
    var element = document.getElementById("dimension");
    
    if (DeviceMotionEvent && typeof(DeviceMotionEvent.requestPermission) === "function")
    {
        window.alert("devicemotionevent exists");
        DeviceMotionEvent.requestPermission().then((response) => {
            window.alert("asked for permission");
            if (response == "granted")
            {
                window.alert("response granted");
                if (element.value == "x")
                {
                    window.alert("x");
                    window.addEventListener("devicemotion", processx, true);
                }
                else if (element.value == "y")
                {
                    window.addEventListener("devicemotion", processy, true);
                    window.alert("y");
                }
                else if (element.value == "z")
                {
                    window.addEventListener("devicemotion", processz, true);
                    window.alert("z");
                }
                else if (element.value == "null")
                {
                    //window.removeEventListener("devicemotion", processx);
                    //window.removeEventListener("devicemotion", processy);
                    //window.removeEventListener("devicemotion", processz);
                    document.getElementById("reading").innerHTML = "-- m/s^2";
                }
            }
            else
            {
                window.alert("Permission not granted.");
            }
        });
    }
    else
    {
        document.getElementById("reading").innerHTML = "Couldn't connect to accelerometer... :(";
    }
}

function processx(event)
{
    var accl = event.acceleration.x;
    if (negate == true)
    {
        document.getElementById("reading").innerHTML = -1 * accl.toPrecision(3);
        document.getElementById("needle").style.transform = "rotate(" + (accl * -50) + "deg)";
    }
    else
    {
        document.getElementById("reading").innerHTML = accl.toPrecision(3);
        document.getElementById("needle").style.transform = "rotate(" + (accl * 50) + "deg)";
    }
}

function processy(event)
{
    if (negate == true)
    {
        document.getElementById("reading").innerHTML = -1 * event.acceleration.y.toPrecision(3);
    }
    else
    {
        document.getElementById("reading").innerHTML = event.acceleration.y.toPrecision(3);
    }
}

function processz(event)
{
    if (negate == true)
    {
        document.getElementById("reading").innerHTML = -1 * event.acceleration.z.toPrecision(3);
    }
    else
    {
        document.getElementById("reading").innerHTML = event.acceleration.z.toPrecision(3);
    }
}

function optionchange()
{
    window.alert("changed");
    setup();
}

function negateaccl()
{
    negate = !negate;
}

function addangle()
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
}
