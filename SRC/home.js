window.onload = function (e) {

    var UsuarioGuid = localStorage.getItem("usuarioGuid");

    if (UsuarioGuid == null) {
        window.location.href = "login.html";
    }
    else {
        obterUsuario(UsuarioGuid);
    }

    var logout = document.getElementById("lnkSair");

    logout.onclick = function (e) {

        localStorage.removeItem("usuarioGuid");

        window.location.href = "login.html";
    }

    var icon = document.querySelector(".icon");

    icon.onclick = function (e) {

        var menu = document.querySelector(".topnav");

        if (menu.className == "topnav") {
            menu.className += "open";
        }
        else {
            menu.className = ".topnav";
        }

    }

    function obterUsuario(UsuarioGuid) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {

                    var spnMensagem = document.getElementById("spnMensagem");

                    spnMensagem.innerText = "Bem-vindo ao sistema " + result.nome;
                }
                else {
                    window.location.href = "login.html";
                }
            }
        });

        xhr.open("GET", "https://localhost:44332/api/usuario/ObterUsuario?UsuarioGuid=" + UsuarioGuid);

        xhr.send();
    }

} 