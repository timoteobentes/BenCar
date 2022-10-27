function Cadastro() {
    $(".back-cad").toggle();
    $(".cadastro").toggle();
}

function hide() {
    $(".back-cad").hide();
    $(".cadastro").hide();
    $(".editar").hide();
    $(".deletar").hide();
}

const mobile = document.getElementById("menu-mobile");
const nav = document.getElementById("nav");
const main = document.getElementById("main");

mobile.addEventListener("click", function() {
    nav.classList.toggle("visivel");
    main.classList.toggle("res");
});



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
                    <th>Motorista</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </thead>`
    json.forEach((data) => {
        linha +=    `<tr>
                        <td>${data.nome}</td>
                        <td>${data.cpf}</td>
                        <td>${data.telefone}</td>
                        <td>
                            <button class="btn-editar" onclick="editar('${data.cpf}')"><ion-icon name="pencil"></ion-icon></button>
                            <button class="btn-deletar" onclick="deletar('${data.cpf}')"><ion-icon name="trash"></ion-icon></button>
                        </td>
                    </tr>`
    })

    document.getElementById("table").innerHTML = linha;
    ordenar();
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

    //console.log(cad)

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
            location.reload();
        }
    })
})



// PUT

function editar(cpf) {

    const cpfE = document.querySelector(".cpf");
    const nomeE = document.querySelector(".nomeE");
    const telefoneE = document.querySelector(".telefoneE");
    const placaE = document.querySelector(".placaE");

    fetch("https://api-bencar.herokuapp.com/consulta", {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(json => {
        json.forEach((data) => {
            if(cpf == data.cpf) {
                cpfE.value = data.cpf
                nomeE.value = data.nome
                telefoneE.value = data.telefone
                placaE.value = data.placaCarro
            }
        })
    })

    $(".back-cad").toggle();
    $(".editar").toggle();
}

const edit = document.getElementById("editar");
edit.addEventListener("submit", (e) => {
    e.preventDefault();
    //6353027b11800d8b4d405876

    const nomeE = document.querySelector(".nomeE").value;
    const cpfE = document.querySelector(".cpf").value;
    const telefoneE = document.querySelector(".telefoneE").value;
    const placaE = document.querySelector(".placaE").value;

    const edit = {
        "nome": nomeE,
        "cpf": cpfE,
        "telefone": telefoneE,
        "placaCarro": placaE
    }

    //console.log(cad)

    //const cad = JSON.parse(cadastro);
    fetch("https://api-bencar.herokuapp.com/editar", {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(edit)
    })
    .then(res => {
        if(res.status == 200) {
            alert("Motorista editado com sucesso");
            hide();
            location.reload();
        }
    })
})



// DELETE

function deletar(cpf) {

    const cpfD = document.querySelector(".cpfD");
    const nomeD = document.querySelector(".nomeD");

    fetch("https://api-bencar.herokuapp.com/consulta", {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(json => {
        json.forEach((data) => {
            if(cpf == data.cpf) {
                cpfD.value = data.cpf
                nomeD.value = data.nome
            }
        })
    })

    $(".back-cad").toggle();
    $(".deletar").toggle();
}

const delet = document.getElementById("deletar");
delet.addEventListener("submit", (e) => {
    e.preventDefault();

    const cpfD = document.querySelector(".cpfD").value;
    const nomeD = document.querySelector(".nomeD").value;

    const edit = {
        "cpf": cpfD,
        "nome": nomeD
    }

    //console.log(cad)

    //const cad = JSON.parse(cadastro);
    fetch("https://api-bencar.herokuapp.com/deletar", {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(edit)
    })
    .then(res => {
        if(res.status == 200) {
            alert("Motorista removido com sucesso");
            hide();
            location.reload();
        }
    })
})


function pesquisa() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("pesquisa");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tbody")[0].rows;
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function ordenar() {
    var values = [].slice.call(document.querySelectorAll('tbody tr')).map(function(el) {
        return '<tr>' + el.innerHTML + '</tr>';
    });
    values = values.sort();
    document.querySelectorAll('tbody').innerHTML = values.join('');
}