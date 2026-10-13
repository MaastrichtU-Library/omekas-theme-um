
let lastKnownScrollPosition = 0;
let ticking = false;
let dochead=null;
let msgdiv=null;
function doSomething(scrollPos) {
  if (document.readyState == 'complete')
  { 
	msgdiv=document.getElementById("MsgDiv");
    dochead=document.getElementsByTagName("HEADER");
	if(lastKnownScrollPosition>100)
	{
    dochead[0].classList.remove("not-scroll");
		dochead[0].classList.add("scroll");
	}
	else
	{
    dochead[0].classList.add("not-scroll");
		dochead[0].classList.remove("scroll");
	}
	msgdiv.innerHTML="Scrolled by " + lastKnownScrollPosition;
	
  }
}

document.onreadystatechange = function () {
    dragElement(document.getElementById("dragDiv"));
        //StartPlayer();
};






document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

//dragElement(document.getElementById("dragDiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}