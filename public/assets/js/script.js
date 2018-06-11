var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 2500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader-wrapper").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
