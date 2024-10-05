var num = 0;

function setup()
{
    var element = document.getElementById("dimension");
    
    if (DeviceMotionEvent && typeof(DeviceMotionEvent.requestPermission) === "function")
    {
        DeviceMotionEvent.requestPermission().then((response) => {
            if (response == "granted")
            {
                if (element.value == "x")
                {
                    window.addEventListener("devicemotion", processx, true);
                    window.alert("x");
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
                    window.removeEventListener("devicemotion", processx);
                    window.removeEventListener("devicemotion", processy);
                    window.removeEventListener("devicemotion", processz);
                    document.getElementById("reading").innerHTML = "-- m/s^2";
                }
            }
        });
    }
    else
    {
        document.getElementById("reading").innerHTML = "There was an issue... :/";
    }
}

function processx(event)
{
    document.getElementById("reading").innerHTML = event.acceleration.x;
}

function processy(event)
{
    document.getElementById("reading").innerHTML = event.acceleration.y;
}

function processz(event)
{
    document.getElementById("reading").innerHTML = event.acceleration.z;
}

function optionchange()
{
    setup();
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
