/**
 * Created by veronika on 09.11.16.
 */
var form = document.querySelector('form');

//submit.onsubmit = function() {
//    return validate(form);
//};
//
//
//
//function showError(container, errorMessage) {
//    container.className = 'error';
//    var msgElem = document.createElement('div');
//    msgElem.className = "error-message";
//    msgElem.innerHTML = errorMessage;
//    container.appendChild(msgElem);
//}
//
//function resetError(container) {
//    container.className = '';
//    if (container.lastChild.className == "error-message") {
//        container.removeChild(container.lastChild);
//    }
//}
//
//function validate(form) {
//    var elems = form.elements;
//
//    resetError(elems.name.parentNode);
//    if (!elems.name.value) {
//        showError(elems.name.parentNode, ' Please, write your first name');
//    return false;
//    }
//
//    resetError(elems.secondname.parentNode);
//    if (!elems.secondname.value) {
//        showError(elems.secondname.parentNode, ' Please, write your last name');
//        return false;
//    }
//
//    resetError(elems.email.parentNode);
//    if (!elems.email.value) {
//        showError(elems.email.parentNode, ' Please, write your email');
//        return false;
//    }
//
//    resetError(elems.gender.parentNode);
//    for(var i=0; i< elems.gender.options.length; i++) {
//        if (!elems.gender.options[i].selected) {
//            showError(elems.gender.options[i].parentNode, ' Check the gender');
//            return false;
//        }
//    }
//
//    resetError(elems.pass.parentNode);
//    if (!elems.pass.value) {
//        showError(elems.pass.parentNode, ' Please, write your password');
//        return false;
//    }
//
//    resetError(elems.agree.parentNode);
//    if (!elems.agree.checked) {
//        showError(elems.agree.parentNode, ' Check the agreement');
//        return false;
//    }
//
//
//
//}

$(function() {

    $(form).validate({

        // Specify the validation rules
        rules: {
            name: "required",
            secondname: "required",
            email: {
                required: true,
                email: true
            },
            gender: "required",
            pass: {
                required: true,
                minlength: 5
            },
            agree: "required"
        },

        // Specify the validation error messages
        messages: {
            name: "Please enter your first name",
            secondname: "Please enter your last name",
            pass: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address",
            gender: "Please enter you gender",
            agree: "Please accept our policy"
        },

        submitHandler: function(form) {
            form.submit();
        }
    });

});
