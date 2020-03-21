$(document).ready(function() {

    /*Плавное появление элементов формы*/
    $(".form-item").each(function(index) {
        $(this).delay(600 * index).fadeIn(600);
    });

    /*Валидация*/
    let inputs = document.querySelectorAll("input[name]");
    let confirmBtn = document.querySelector(".registration-form__btn");
    
    
    for (let input of inputs) {

        /*Анимация кнопки*/
        confirmBtn.addEventListener("click", () => {
            if (input.checkValidity() == false) {
                confirmBtn.classList.add("swing");
                setTimeout(() => {
                    confirmBtn.classList.remove("swing");
                }, 500);
            }
        });

        input.addEventListener("blur", function() {
            let rule = this.name;
            let value = this.value;
            let check;
            switch (rule) {
                case 'firstName':
                    check = /[^\s]/gim.test(value);
                    break;
                case 'lastName':
                    check = /[^\s]/gim.test(value);
                    break;
                case 'email':
                    check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
                    break;
                case 'password':
                    check = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(value);
                    break;
                case 'confirmPassword':
                    check = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(value);
                    break;
                default:
                    break;
            }
    
            if (check) {
                this.classList.remove("warning-input");
                this.parentNode.classList.add("confirm-input");
            } else {
                this.classList.add("warning-input");
                this.parentNode.classList.remove("confirm-input");
            }
    
        });

    }

    /*Запись данных формы в json файл*/
    let form = document.querySelector("form");
    form.addEventListener("submit", function(e) {

        e.preventDefault();
        $.ajax({
            url: '../mail.php',
            type: 'POST',
            data: {
                myJson: JSON.stringify($('form').serializeArray().reduce((acc, f) => {
                    acc[f.name] = f.value;
                    return acc;
                }, 
                {}))
            },
            success: function() {
                $(".registration-form > *").fadeOut();
                $(".registration-form__success").fadeIn();
            },
            error: function (error) {
                alert('error; ' + eval(error));
            }
        });
        
    });

});
