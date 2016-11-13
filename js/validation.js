/**
 * Created by veronika on 09.11.16.
 */
var form = document.querySelector('form');
var message = document.querySelector('.error');

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

            var XHRReg = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

            var xhrReg = new XHRReg();

            xhrReg.open('GET', 'http://codeit.pro/frontTestTask/user/registration', true);

            xhrReg.onload = function () {

                console.log(xhrReg.statusText);

                if (xhrReg.statusText === 'OK') {
                    form.submit();
                    window.open("companies.html");
                }

                if (xhrReg.statusText === 'Form Error') {
                    message.innerHTML += 'Email already exists.';
                }

                if (xhrReg.statusText === 'Error') {
                    message.innerHTML += 'You have error in your form.';
                }
            };

            xhrReg.onerror = function () {
                alert('Ошибка ' + this.status);
            };

            xhrReg.send();

        }
    });

});




