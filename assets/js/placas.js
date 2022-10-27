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
                    <th>Placa</th>
                </thead>`
    json.forEach((data) => {
        linha +=    `<tr>
                        <td>${data.nome}</td>
                        <td>${data.placaCarro}</td>
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