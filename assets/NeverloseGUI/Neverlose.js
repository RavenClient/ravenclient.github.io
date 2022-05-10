// Make the DIV element draggable:
dragElement(document.getElementById("draggable"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-interactive")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-interactive").onmousedown = dragMouseDown;
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

//Make the sections clickable:
const boxes = document.querySelectorAll(".section-button");

for (const box of boxes) {
  box.addEventListener("click", function handleClick() {
    if (box.classList.contains("section-selected")) {
      box.classList.remove("section-selected");
    } else {
      for (const box of boxes) {
        box.classList.remove("section-selected");
      }
      box.classList.add("section-selected");
    }
  });
}

//Make dropdowns toggle:
const boxes2 = document.querySelectorAll(".drop-down");

for (const box2 of boxes2) {
  box2.addEventListener("click", function handleClick() {
    if (box2.classList.contains("drop-on")) {
      box2.classList.remove("drop-on");
    } else {
      box2.classList.add("drop-on");
    }
  });
}


function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

var slider = document.getElementById("left-cps-slider");
var output = document.getElementById("left-cps-amount");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
}
var slider2 = document.getElementById("left-jitter-slider");
var output2 = document.getElementById("left-jitter-amount");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
  output2.innerHTML = this.value;
}
var slider3 = document.getElementById("break-delay-slider");
var output3 = document.getElementById("break-delay-amount");
output3.innerHTML = slider3.value;
slider3.oninput = function() {
  output3.innerHTML = this.value;
}
var slider4 = document.getElementById("right-cps-slider");
var output4 = document.getElementById("right-cps-amount");
output4.innerHTML = slider4.value;
slider4.oninput = function() {
  output4.innerHTML = this.value;
}
var slider5 = document.getElementById("right-jitter-slider");
var output5 = document.getElementById("right-jitter-amount");
output5.innerHTML = slider5.value;
slider5.oninput = function() {
  output5.innerHTML = this.value;
}
var slider6 = document.getElementById("right-delay-slider");
var output6 = document.getElementById("right-delay-amount");
output6.innerHTML = slider6.value;
slider6.oninput = function() {
  output6.innerHTML = this.value;
}
var slider7 = document.getElementById("speed-1-slider");
var output7 = document.getElementById("speed-1-amount");
output7.innerHTML = slider7.value;
slider7.oninput = function() {
  output7.innerHTML = this.value;
}
var slider8 = document.getElementById("speed-2-slider");
var output8 = document.getElementById("speed-2-amount");
output8.innerHTML = slider8.value;
slider8.oninput = function() {
  output8.innerHTML = this.value;
}
var slider9 = document.getElementById("aim-fov-slider");
var output9 = document.getElementById("aim-fov-amount");
output9.innerHTML = slider9.value;
slider9.oninput = function() {
  output9.innerHTML = this.value;
}
var slider10 = document.getElementById("aim-distance-slider");
var output10 = document.getElementById("aim-distance-amount");
output10.innerHTML = slider10.value;
slider10.oninput = function() {
  output10.innerHTML = this.value;
}
var slider11 = document.getElementById("reach-slider");
var output11 = document.getElementById("reach-amount");
output11.innerHTML = slider11.value / 10; 
slider11.oninput = function() {
  output11.innerHTML = this.value / 10;
}
var slider12 = document.getElementById("blockhit-distance-slider");
var output12 = document.getElementById("blockhit-distance-amount");
output12.innerHTML = slider12.value; 
slider12.oninput = function() {
  output12.innerHTML = this.value;
}
var slider13 = document.getElementById("blockhit-chance-slider");
var output13 = document.getElementById("blockhit-chance-amount");
output13.innerHTML = slider13.value; 
slider13.oninput = function() {
  output13.innerHTML = this.value;
}
var slider14 = document.getElementById("wtap-action-slider");
var output14 = document.getElementById("wtap-action-amount");
output14.innerHTML = slider14.value; 
slider14.oninput = function() {
  output14.innerHTML = this.value;
}