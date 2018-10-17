var opinion = {
  vide: 0,
  intelligence : 0,
  beauty : 0.2,
  courage : 0.5,
  iAndb : 0.1,
  iAndc : 0,
  bAndc: 0,
  all: 0
};

setUp();

function compute() {
  var vide = parseFloat(document.forms["test"]["vide"].value);
  var intelligence = parseFloat(document.forms["test"]["intelligence"].value);
  var beauty = parseFloat(document.forms["test"]["beauty"].value);
  var courage = parseFloat(document.forms["test"]["courage"].value);
  var iAndb = parseFloat(document.forms["test"]["iAndb"].value);
  var iAndc = parseFloat(document.forms["test"]["iAndc"].value);
  var bAndc = parseFloat(document.forms["test"]["bAndc"].value);
  var all = parseFloat(document.forms["test"]["all"].value);

  var matrice = [
    [opinion.vide * vide, opinion.intelligence * vide, opinion.beauty * vide, opinion.courage * vide, opinion.iAndb * vide, opinion.iAndc * vide, opinion.bAndc * vide, opinion.all * vide],
    [opinion.vide * intelligence, opinion.intelligence * intelligence, opinion.beauty * intelligence, opinion.courage * intelligence, opinion.iAndb * intelligence, opinion.iAndc * intelligence, opinion.bAndc * intelligence, opinion.all * intelligence],
    [opinion.vide * beauty, opinion.intelligence * beauty, opinion.beauty * beauty, opinion.courage * beauty, opinion.iAndb * beauty, opinion.iAndc * beauty, opinion.bAndc * beauty, opinion.all * beauty],
    [opinion.vide * courage, opinion.intelligence * courage, opinion.beauty * courage, opinion.courage * courage, opinion.iAndb * courage, opinion.iAndc * courage, opinion.bAndc * courage, opinion.all * courage],
    [opinion.vide * iAndb, opinion.intelligence * iAndb, opinion.beauty * iAndb, opinion.courage * iAndb, opinion.iAndb * iAndb, opinion.iAndc * iAndb, opinion.bAndc * iAndb, opinion.all * iAndb],
    [opinion.vide * iAndc, opinion.intelligence * iAndc, opinion.beauty * iAndc, opinion.courage * iAndc, opinion.iAndb * iAndc, opinion.iAndc * iAndc, opinion.bAndc * iAndc, opinion.all * iAndc],
    [opinion.vide * bAndc, opinion.intelligence * bAndc, opinion.beauty * bAndc, opinion.courage * bAndc, opinion.iAndb * bAndc, opinion.iAndc * bAndc, opinion.bAndc * bAndc, opinion.all * bAndc],
    [opinion.vide * all, opinion.intelligence * all, opinion.beauty * all, opinion.courage * all, opinion.iAndb * all, opinion.iAndc * all, opinion.bAndc * all, opinion.all * all]
  ];

  for(var i = 0; i < 8; i++) {
    opinion.vide = 0;
    opinion.vide += matrice[0][i];
    if (i >= 1) {
      opinion.vide += matrice[i][0];
    }
  }
  opinion.vide += matrice[1][2] + matrice[1][3] + matrice[1][6] + matrice[2][1] + matrice[2][3] + matrice[2][5] + matrice[3][1] + matrice[3][2] + matrice[3][4] + matrice[4][3] + matrice[5][2] + matrice[6][1];
  opinion.intelligence = matrice[1][1] + matrice[1][4] + matrice[1][5] + matrice[1][7] + matrice[4][1] + matrice[4][5] + matrice[5][1] + matrice[5][4] + matrice[7][1];
  opinion.beauty = matrice[2][2] + matrice[2][4] + matrice[2][6] + matrice[2][7] + matrice[4][2] + matrice[4][6] + matrice[6][2] + matrice[6][4] + matrice[7][2];
  opinion.courage = matrice[3][3] + matrice[3][5] + matrice[3][6] + matrice[3][7] + matrice[5][3] + matrice[5][6] + matrice[6][3] + matrice[6][5] + matrice[7][3];
  opinion.iAndb = matrice[4][4] + matrice[4][7] + matrice[7][4];
  opinion.iAndc = matrice[5][5] + matrice[5][7] + matrice[7][5];
  opinion.bAndc = matrice[6][6] + matrice[6][7] + matrice[7][6];
  opinion.all = matrice[7][7];

  setUp();
}

function setUp() {
  for (var key in opinion) {
    // skip loop if the property is from prototype
    if (!opinion.hasOwnProperty(key)) continue;

    var obj = opinion[key];
    document.getElementById(key).innerHTML = key + " : " + obj;
  }
}

if (document.getElementById("form").addEventListener) {
    document.getElementById("form").addEventListener("submit", function(evt) {
        evt.preventDefault();
        window.history.back();
        compute();
    }, true);
}
else {
    document.getElementById("form").attachEvent('onsubmit', function(evt){
        evt.preventDefault();
        window.history.back();
        compute();
    });
}
