/*var opinion = {
  intelligence : 0,
  beauty : 0.2,
  courage : 0.5,
  money: 0.1
};*/
var composition = {} // Combinaisons d'attributs avec leur attribut
var attributeArray = []; // Tous les attribus simples sauf vide
var keysArray = []; // Combinaisons des attributs et vide

var computedArray = {}; // Combinaisons des attributs et leur poids

var set = new Set(); // Combinaisons des attributs uniques

setUp();

function recursiveTest(attributs, lastIndex, rank) {
  for (var i = 0 ; i < attributeArray.length ; i++) {
    if (attributeArray[i] == attributeArray[lastIndex] || i < lastIndex ) continue;
    set.add(attributs + ' and ' + attributeArray[i]);

    if (attributeArray.length > rank) {
      recursiveTest(attributs + ' and ' + attributeArray[i], i, rank + 1);
    }
  }
}

function compute() {
  var weightObject = {};
  var newComputedArray = {};
  for (var key in computedArray) {
    // skip loop if the property is from prototype
    if (!computedArray.hasOwnProperty(key)) continue;

    weightObject[key] = parseFloat(document.forms['test'][key].value);
    newComputedArray[key] = 0;
  }
  console.log(weightObject);
  var matrice = {};

  for (var weightKey in weightObject) {
    var obj = {};
    if (!weightObject.hasOwnProperty(weightKey)) continue;
    for (var computedKey in computedArray) {
      if (!computedArray.hasOwnProperty(computedKey)) continue;
      obj[computedKey] = computedArray[computedKey] * weightObject[weightKey];
      matrice[weightKey] = obj;

    }
  }

  console.log(matrice);

  for (var key in newComputedArray) {
    if (!newComputedArray.hasOwnProperty(key)) continue;
    var compositionOfKey = composition[key];
    var rank0 = compositionOfKey.length;

    for (var opinionKey in computedArray) {
      if (!computedArray.hasOwnProperty(opinionKey)) continue;
      var rank1 = composition[opinionKey].length;
      if (rank1 < rank0) continue;
      var included = true;
      for (var i = 0 ; i < rank0 ; i++) {
        if (!composition[opinionKey].includes(compositionOfKey[i])) {
          included = false;
          break;
        }
      }

      if (!included) continue;

      for (var weightKey in weightObject) {
        if (!weightObject.hasOwnProperty(weightKey)) continue;
        var rank2 = composition[weightKey].length;
        if (rank2 < rank0) continue;
        var included2 = true;
        for (var i = 0 ; i < rank0 ; i++) {
          if (!composition[weightKey].includes(compositionOfKey[i])) {
            included2 = false;
            break;
          }
        }

        if (!included2) continue;
        if (rank1 != rank0 && rank2 != rank0 && rank1 - rank2 != 0) continue;
        if (arraysEqual(composition[opinionKey], composition[weightKey]) && !arraysEqual(composition[key], composition[weightKey])) continue;
        // TODO dernière conditions
        newComputedArray[key] += matrice[weightKey][opinionKey];
        if (key === 'H1') console.log(weightKey, opinionKey);
      }

    }
  }

  console.log(newComputedArray);
  computedArray = newComputedArray;

  //TO DO : faire le vide;



  setUp();
}

// TODO sort by value length
function modal() {
  $(".modal-body br").remove();
  $(".modal-body label").remove();
  $(".modal-body input").remove();
  for (var i = 0 ; i < keysArray.length ; i++) {
    $(".modal-body").append("<label>" + keysArray[i] + "&nbsp</label><input type=\"text\" placeholder=\"0\" name=\"" + keysArray[i] + "\"></br>")
  }
}

function save() {
  for (var i = 0 ; i < keysArray.length ; i++) {
    computedArray[keysArray[i]] = parseFloat($(".modal-body input[name=\"" + keysArray[i] + "\"]").val());
    composition[keysArray[i]] = keysArray[i].split(' and ');
  }
  $('#exampleModal').modal('toggle');
  setUp();
  $('#form1').find('input[name="attribut_name"]').val('');
}

function setUp() {
  $("li").remove();
  $("#form label").remove();
  $("#form input").remove();

  for (var key in computedArray) {
    // skip loop if the property is from prototype
    if (!computedArray.hasOwnProperty(key)) continue;

    var obj = computedArray[key];
    $(".attributs").append("<li id=\""+ key + "\">" + key + " : " + obj + "</li>");
    $("#form").append("<label>" + key + "</label><input type=\"text\" placeholder=\"0\" name=\"" + key + "\">");
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

    if (document.getElementById("form1").addEventListener) {
        document.getElementById("form1").addEventListener("submit", function(evt) {
            evt.preventDefault();
            window.history.back();
            createNewAttribute();
        }, true);
    }
    else {
        document.getElementById("form1").attachEvent('onsubmit', function(evt){
            evt.preventDefault();
            window.history.back();
            createNewAttribute();
        });
      }

function createNewAttribute() {
  attributeArray.push($('#form1').find('input[name="attribut_name"]').val());

  for (var k = 0 ; k < attributeArray.length ; k++) {
    set.add(attributeArray[k]);
    recursiveTest(attributeArray[k], k, 2);
  }
  keysArray = Array.from(set);
  keysArray.unshift('vide');

  modal();
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
