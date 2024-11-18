function togglePassword() {
    let texto = document.getElementById('pass');
    if(texto.type == 'password') {
        texto.type = 'text';
    } else {
        texto.type = 'password';
    }
}

function onLogin(){
    let senha = document.getElementById('pass')
    let usuario = document.getElementById('user')

    if(usuario.value == "aira" && senha.value == "123") {
        document.location.href = 'http://127.0.0.1:5500/features/initialPage.html';
    }
}

function onCancel(){
    
}