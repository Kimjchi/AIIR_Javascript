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


// Create inputs on the modal
function modal() {
  $(".modal-body br").remove();
  $(".modal-body label").remove();
  $(".modal-body input").remove();

  for (var i = 0 ; i < keysArray.length ; i++) {
    $(".modal-body").append("<label>" + keysArray[i] + "&nbsp</label><input type=\"text\" placeholder=\"0\" name=\"" + keysArray[i] + "\"></br>")
  }
}

// Save values of input and decompose keys into unique attribute
function save() {
  for (var i = 0 ; i < keysArray.length ; i++) {
    opinion[keysArray[i]] = parseFloat($(".modal-body input[name=\"" + keysArray[i] + "\"]").val());
    composition[keysArray[i]] = keysArray[i].split(' and ');
  }
  attributeArray.push($('#form1').find('input[name="attribut_name"]').val());
  $('#exampleModal').modal('toggle');
  setUp();
  $('#form1').find('input[name="attribut_name"]').val('');
}

// Create a form for the keys and a list
function setUp() {
  $("li").remove();
  $("#form label").remove();
  $("#form input").remove();

  for (var key in opinion) {
    // skip loop if the property is from prototype
    if (!opinion.hasOwnProperty(key)) continue;

    var obj = opinion[key];
    $(".attributs").append("<li id=\""+ key + "\">" + key + " : " + obj + "</li>");
    $("#form").append("<label>" + key + "</label><input type=\"text\" placeholder=\"0\" name=\"" + key + "\">");
  }
}

// function to sort array by string length
function sortByLength(a, b)
{
    // if they are equal, return 0 (no sorting)
    if (a.length == b.length) { return 0; }
    if (a.length > b.length)
    {
        // if a should come after b, return 1
        return 1;
    }
    else
    {
        // if b should come after a, return -1
        return -1;
    }
}
