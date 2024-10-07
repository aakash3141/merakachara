var num = 0;
var negate = false;

function setup()
{
    var element = document.getElementById("dimension");
    
    if (DeviceMotionEvent && typeof(DeviceMotionEvent.requestPermission) === "function")
    {
        DeviceMotionEvent.requestPermission().then((response) => {
            window.addEventListener("devicemotion", processx, true);
        });
    }
    else
    {
        document.getElementById("reading").innerHTML = "Couldn't connect to accelerometer... :(";
    }
}

function processx(event)
{
    document.getElementById("reading").innerHTML = "hello";
    document.getElementById("needle").style.transform = "rotate(" + (event.acceleration.x * 50) + "deg)";
}

function processy(event)
{
    document.getElementById("reading").innerHTML = -1 * event.acceleration.y.toPrecision(3);
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
