var num = 0;
var negate = false;

function setup()
{
    var element = document.getElementById("dimension");
    
    if (DeviceMotionEvent && typeof(DeviceMotionEvent.requestPermission) === "function")
    {
        DeviceMotionEvent.requestPermission().then((response) => {
            if (response == "granted")
            {
                window.removeEventListener("devicemotion", processx);
                window.removeEventListener("devicemotion", processx);
                window.removeEventListener("devicemotion", processx);

                if (element.value == "x")
                {
                    window.addEventListener("devicemotion", processx);
                }
                else if (element.value == "y")
                {
                    window.addEventListener("devicemotion", processy);
                }
                else if (element.value == "z")
                {
                    window.addEventListener("devicemotion", processz);
                }
                else if (element.value == "null")
                {
                    window.alert("wtf");
                }
            }
            else
            {
                document.getElementById("reading").innerHTML = "Permission was denied... :(";
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
    var ax = event.acceleration.x;
    document.getElementById("reading").innerHTML = Math.round(1000 * ax)/1000;
    document.getElementById("needle").style.transform = "rotate(" + (ax * 50) + "deg)";
}

function processy(event)
{
    document.getElementById("reading").innerHTML = event.acceleration.y.toPrecision(3) + "y";
}

function processz(event)
{
    document.getElementById("reading").innerHTML = -1 * event.acceleration.z.toPrecision(3) + "z";
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
