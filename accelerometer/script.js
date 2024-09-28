var num = 0;

window.alert("hello");

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
