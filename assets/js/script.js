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

// Consumo da API

// GET
fetch("https://api-bencar.herokuapp.com/consulta", {
    headers: {
        "Accept": "application/json"
    }
})
.then(res => res.json())
.then(json => {
    var linha = `<thead>
                    <th>ID</th>
                    <th>Motorista</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Placa</th>
                    <th>Ações</th>
                </thead>`
    json.forEach((data) => {
        linha +=    `<tr>
                        <td>${data._id}</td>
                        <td>${data.nome}</td>
                        <td>${data.cpf}</td>
                        <td>${data.telefone}</td>
                        <td>${data.placaCarro}</td>
                        <td>
                            <button class="btn-editar" onclick="Editar()"><ion-icon name="pencil"></ion-icon></button>
                            <button class="btn-deletar" onclick="Deletar()"><ion-icon name="trash"></ion-icon></button>
                        </td>
                    </tr>`
    })

    document.getElementById("table").innerHTML = linha
})




// POST

const cadastro = document.getElementById("cadastro");
cadastro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const placaCarro = document.getElementById("placaCarro").value;

    const cad = {
        "nome": nome,
        "cpf": cpf,
        "telefone": telefone,
        "placaCarro": placaCarro
    }

    console.log(cad)

    //const cad = JSON.parse(cadastro);
    fetch("https://api-bencar.herokuapp.com/cadastro", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(cad)
    })
    .then(res => {
        if(res.status == 201) {
            alert("Cadastrado com sucesso");
            hide();
        }
    })
})



// PUT