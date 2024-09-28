var num = 0;

window.addEventListener("devicemotion", process);

function process(event)
{
    document.getElementById("reading").innerHTML = event.acceleration.x;
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
