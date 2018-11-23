/*global $:false */
/*eslint-env browser*/
window.addEventListener("load", function (e) {
 // Wait until DOM has loaded before running this
  document.getElementById("registration").addEventListener("submit", validate);
    
  document.getElementById("registration").addEventListener("reset", clearErrors);   
     
    
});

// Add an error message to the #errors element
function addError(message) {
    var box = document.getElementById("user_message");
    //change class from info_box invisible to just info_box
    box.classList.remove("invisible");
    box.classList.add("error");
    var p = document.createElement("p");
    var text = document.createTextNode(message);
    p.appendChild(text);
    document.getElementById("user_message").appendChild(p);
}


// Clear all error messages from the #errors element
function clearErrors() {
    document.getElementById("user_message").innerHTML = "";
    var box = document.getElementById("user_message");
    box.classList.add("invsible");
    box.classList.remove("error");
}


// Validate the form, returning true if valid, false otherwise
function validate(e) {
    e.preventDefault();
    clearErrors(); 
    var success = true;
    var form = document.getElementById("registration");
    
    var name = form.elements["name"].value;
    if (name.length < 2 || name.length > 100){
        success = false;
        addError('Please enter a name (between 2 and 100 characters long)');
    } else if (!/^[a-zA-Z'-]+$/.test(name)){
        success = false;
        addError('Please only use letters, a hyphen or apostrophe');
    }
    
    var age = form.elements["age"].value;
    if (age.length === 0){
        success = false;
        addError('Please enter an age');
    } else if (!/^1[3-9]$|^[2-9][0-9]$|^1[0-2][0-9]$|^13[0]$/.test(age)){
        success = false;
        addError('Please enter an age between 13 and 130');
    }
    
    var email = form.elements["email"].value;
    if (email.length === 0){
        success = false;
        addError('Please enter an email');
    } else if (!/^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)[\w]+$/.test(email)){
        success = false;
        addError('Please enter a valid email')
    }
    
    var phone = form.elements["phone"].value;
    if (phone.length > 0 && phone.length !== 10){
        success = false;
        addError('Phone number must be 10 digits')
    } else if (phone.length > 0 && !/^04/.test(phone)){
        addError("Your number must start with 04.");
        success = false;
    }  else if(phone.length > 0 && !/^[0-9]+$/.test(phone)){
        success = false;
        addError("Please enter a valid number")
    }
    
    if (success == true){
        $.ajax({
            method: "POST",
            dataType: "json",
            url:   "http://turing.une.edu.au/~jbisho23/assignment2/register.php",
            data: {name: name, age: age, email: email,   phone: phone},
            success:  function(data){
                $('#user_id p').html("id: " + data.user_id);     //console.log(data);
                $('#registration').addClass("hidden");
                $('#quiz').removeClass("hidden");
                $('#welcome').addClass("hidden");
                $('#score').removeClass("hidden");
            },
            error: function(data){
                console.log(data.error);
            },   
        });
    }       
}
