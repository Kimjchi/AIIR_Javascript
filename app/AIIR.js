var composition = {} // Combinaisons d'attributs avec leur attribut
var attributeArray = []; // Tous les attribus simples sauf vide
var keysArray = []; // Combinaisons des attributs et vide

var computedArray = {}; // Combinaisons des attributs et leur poids

var set = new Set(); // Combinaisons des attributs uniques

setUp();

// Recursive function to check combinaisons
function checkCombinaisons(attributs, lastIndex, rank) {
  for (var i = 0 ; i < attributeArray.length ; i++) {
    if (attributeArray[i] == attributeArray[lastIndex] || i < lastIndex ) continue;
    set.add(attributs + ' and ' + attributeArray[i]);

    if (attributeArray.length > rank) {
      checkCombinaisons(attributs + ' and ' + attributeArray[i], i, rank + 1);
    }
  }
}

// TODO factoriser
function compute() {
  var weightObject = {};
  var newComputedArray = {};
  // On crée newComputedArray pour pour y stocker les nouveaux poids
  for (var key in computedArray) {
    if (!computedArray.hasOwnProperty(key)) continue;

    weightObject[key] = parseFloat(document.forms['test'][key].value);
    newComputedArray[key] = 0;
  }
  var matrice = {};

  for (var weightKey in weightObject) {
    if (!weightObject.hasOwnProperty(weightKey)) continue;
    var obj2 = {};
    for (var computedKey in computedArray) {
      if (!computedArray.hasOwnProperty(computedKey)) continue;
      var obj = {};
      obj['value'] = computedArray[computedKey] * weightObject[weightKey];
      obj['void'] = true;
      obj2[computedKey] = obj;
    }
    matrice[weightKey] = obj2;
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
        newComputedArray[key] += matrice[weightKey][opinionKey]['value'];
        matrice[weightKey][opinionKey]['void'] = false;
      }

    }
  }
  newComputedArray['vide'] = 0;
  for (var opinionKey in computedArray) {
    if (!computedArray.hasOwnProperty(opinionKey)) continue;
    for (var weightKey in weightObject) {
      if (!weightObject.hasOwnProperty(weightKey)) continue;
      if (matrice[weightKey][opinionKey]['void'] == true) {
        newComputedArray['vide'] += matrice[weightKey][opinionKey]['value'];
      }
    }
  }
  computedArray = newComputedArray;

  normalisation();
  setUp();
}

// Create a new attribute and check combinaisons of attributes with previous ones
function createNewAttribute() {
  attributeArray.push($('#form1').find('input[name="attribut_name"]').val());

  for (var k = 0 ; k < attributeArray.length ; k++) {
    set.add(attributeArray[k]);
    checkCombinaisons(attributeArray[k], k, 2);
  }
  attributeArray.splice(-1,1);
  keysArray = Array.from(set);
  keysArray.sort(sortByLength);
  keysArray.unshift('vide');

  modal();
}

// Normalisation après calcul de matrice
function normalisation() {
  
}

// Check if 2 arrays are equal
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
