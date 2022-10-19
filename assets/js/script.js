$(".master").hide();

setTimeout(() => {
    $(".start").fadeOut(800);
    $(".master").show(500);
}, 3000)

function Cadastro() {
    $(".back-cad").toggle();
    $(".cadastro").toggle();
}

function Editar() {
    $(".back-cad").toggle();
    $(".editar").toggle();
}

function Deletar() {
    $(".back-cad").toggle();
    $(".deletar").toggle();
}

function hide() {
    $(".back-cad").hide();
    $(".cadastro").hide();
    $(".editar").hide();
    $(".deletar").hide();
}

const cadastro = document.getElementById("cadastro");
cadastro.addEventListener("submit", (e) => {
    e.preventDefault();
    const cad = new FormData(cadastro);
    fetch("localhost:3000/cliente", {
        method: "POST",
        body: cad
    })
    .then(res => {
        if(res.status == 200) {
            alert("Cadastrado com sucesso");
        }
    })
})