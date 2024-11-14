window.onload = function (e) {

    var btnEsqueceu = document.getElementById("btnEsqueceu");

    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    btnEsqueceu.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {
            exibirMensagemErro("Email obrigatório.");

        }
        else {
            esqueceuSenha(email);
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
    function esqueceuSenha(email) {

        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    alert("E-mail enviado com sucesso!");
                    
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }

                txtEmail.value = "";
            }
        });

        xhr.open("POST", "https://localhost:44332/api/usuario/Esqueceu");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}