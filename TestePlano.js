$(document).ready(function () {

    var planos;
    var precos;

    fetch("./planos.json")
        .then(function (resp) {
            return resp.json();
        }).then(function (data) {
            planos = data;
            let nPlanos = Object.keys(planos).length;
            let html = "<option disabled selected value=0> -- Selecione Uma Opção -- </option>";
            let elem = $("#plano")

            console.log(planos);
            console.log(nPlanos);

            for (let i = 0; i < nPlanos; i++) {
                html += `
                    <option value="`+ (i + 1) + `">` + planos[i].nome + `</option>
                `;
            }

            elem.append(html);

        });

    fetch("./precos.json")
        .then(function (resp) {
            return resp.json();
        }).then(function (data) {
            precos = data;
            console.log(precos);
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
                <input class="textoObrigatorio" id="nBeneficiario`+ (i) + `" type = "text">
                <label for="nIdade`+ (i) + `">Idade:</label>
                <input id="nIdade`+ (i) + `" type = "number">
            </div>`;

            elem.append($(inputBeneficiario));
        }

        $("#planosSelector").show();

    });

    function stateBotao() {
        if($(".input").value === "") {
            $("calculaPreco").disabled = true;
        } else {
            $("calculaPreco").disabled = false;
        }
    }

    $(".input")

    $("#plano").change(function () {
        $("#calculaPreco").removeAttr("disabled");
    });


});


