var planos;
var precos;

function botaoCalcula() {
    var idade = new Array();
    var nBeneficiarios = +$("#nBeneficiarios").val();
    var indexPlano = +$("#plano").val() - 1;
    var planoSelecionado = planos[indexPlano];

    var precoPlano = precos.filter(x => { return x.codigo === planoSelecionado.codigo; });

    console.log("indexPlano: " + indexPlano);
    console.log("Número de Beneficiários: " + nBeneficiarios);
    console.log(planoSelecionado);
    console.log(precoPlano);

    for (let i = 0; i < nBeneficiarios; i++) {

    }

}

$(document).ready(function () {

    fetch("https://edlog.github.io/planos.json")
        .then(function (resp) {
            return resp.json();
        }).then(function (data) {
            planos = data;
            let nPlanos = Object.keys(planos).length;
            let html = "<option disabled selected value=0> -- Selecione Uma Opção -- </option>";
            let elem = $("#plano")

            for (let i = 0; i < nPlanos; i++) {
                html += `
                    <option value="`+ (i + 1) + `">` + planos[i].nome + `</option>
                `;
            }

            elem.append(html);

        });

    fetch("https://edlog.github.io/precos.json")
        .then(function (resp) {
            return resp.json();
        }).then(function (data) {
            precos = data;
        });



    $("#nBeneficiarios").ready(function () {
        let qtd = 4;
        let html = "<option disabled selected value=0> -- Selecione Uma Opção -- </option>";
        let elem = $("#nBeneficiarios");

        console.log(planos);

        for (let i = 0; i < qtd; i++) {
            html += `
                <option value="`+ (i + 1) + `">` + (i + 1) + ` Beneficiário</option>
            `;
        }

        elem.append(html);
    });

    $("#nBeneficiarios").change(function () {
        let value = +$(this).val();
        // let count = 0;
        let elem = $('#formBeneficiarios').empty();

        let inputBeneficiario = "";

        for (let i = 0; i < value; i++) {
            inputBeneficiario = `
            <div class="Beneficiarios" style="margin: 10px">
                <label for="nBeneficiario`+ (i) + `">Beneficiario ` + (i + 1) + `:</label>
                <input id="nBeneficiario`+ (i) + `" type = "text">
                <label for="nIdade`+ (i) + `">Idade:</label>
                <input id="nIdade`+ (i) + `" class="inputIdade" type = "text">
            </div>`;

            elem.append($(inputBeneficiario));
        }

        $("#planosSelector").show();

    });

    $("#plano").change(function () {
        $("#calculaPreco").removeAttr("disabled");
    });

    $(document).on('click', '#calculaPreco', function () {
        botaoCalcula();
    });

});


