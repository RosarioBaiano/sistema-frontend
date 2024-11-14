﻿window.onload = function (e) {

    var btnEntrar = document.getElementById("btnEntrar");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    btnEntrar.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        var senha = txtSenha.value;

        if (email == "") {
            exibirMensagemErro("Campo email obrigatório.");

        }
        else if (senha == "") {
            exibirMensagemErro("Campo senha obrigatório.");
        }
        else {
            realizarLogin(email, senha);
        }
    };

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }
    function realizarLogin(email, senha) {

        var data = JSON.stringify({
            "email": email,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var LoginResult = JSON.parse(this.responseText);

                if (LoginResult.sucesso) {

                    localStorage.setItem("usuarioGuid", LoginResult.usuarioGuid);

                    window.location.href = 'home.html';
                }
                else {
                    exibirMensagemErro(LoginResult.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44332/api/usuario/Login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
    function exibirMensagemErro(mensagem) {

    }

}