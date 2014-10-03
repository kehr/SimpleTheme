
function startTime()
{
var today=new Date()
var basetime01=today.getTime()
var basetime02=Date.parse("Aug 2, 2012")
var basetime=Math.round((basetime01 - basetime02)/(1000*60*60))
var h=today.getHours()+basetime
var m=today.getMinutes()
var s=today.getSeconds()
// add a zero in front of numbers<10
m=checkTime(m)
s=checkTime(s)
document.getElementById('wait-time').innerHTML="2012.8  已坚守"+h+"小时"+m+"分钟"+s+"秒&nbsp;"
t=setTimeout('startTime()',1000)
}

function checkTime(i)
{
if (i<10) 
  {i="0" + i}
  return i
}
