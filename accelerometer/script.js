var num = 0;
var dimension = "null";

function setup()
{
    if (DeviceMotionEvent && typeof(DeviceMotionEvent.requestPermission) === "function")
    {
        DeviceMotionEvent.requestPermission().then((response) => {
            if (response == "granted")
            {
                window.addEventListener("devicemotion", process, true);
            }
        })
    }
    else
    {
        document.getElementById("reading").innerHTML = "There was an issue... :/"
    }
}

function process(event)
{
    document.getElementById("reading").innerHTML = event.acceleration.x;
}

function optionchange()
{
    var element = document.getElementById("dimension");
    if(element.value == "x")
    {
        window.alert("x");
    }
    else if (element.value == "y")
    {
        window.alert("y");
    }
    else if (element.value == "z")
    {
        window.alert("z");
    }
    else
    {
        window.alert("wtf");
    }
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
