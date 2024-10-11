var num = 0;
var negate = false;
var reading;
var needle;

function definevars()
{
    reading = document.getElementById("reading");
    needle = document.getElementById("needle");
}

function setup()
{
    var axis = document.getElementById("axis");
    
    if (DeviceMotionEvent && typeof(DeviceMotionEvent.requestPermission) === "function")
    {
        DeviceMotionEvent.requestPermission().then((response) => {
            if (response == "granted")
            {
                window.removeEventListener("devicemotion", processx);
                window.removeEventListener("devicemotion", processy);
                window.removeEventListener("devicemotion", processz);

                if (axis.value == "x")
                {
                    window.addEventListener("devicemotion", processx);
                    window.alert("Measuring along x-axis");
                }
                else if (axis.value == "y")
                {
                    window.addEventListener("devicemotion", processy);
                    window.alert("Measuring along y-axis");
                }
                else if (axis.value == "z")
                {
                    window.addEventListener("devicemotion", processz);
                    window.alert("Measuring along z-axis");
                }
                else if (axis.value == "null")
                {
                    window.alert("No measurement axis selected");
                    reading.innerHTML = "0.00 (no axis)";
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
        needle.style.transform = "rotate(" + (ax * 30) + "deg)";
    }
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
