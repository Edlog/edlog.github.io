var planos;
var precos;

function selecionaPreco(objArray,n){
    let result;

    for(let i = 0; i < objArray.length;i++){
        if(objArray[i].minimo_vidas <= n){
            result = objArray[i];
        }
    }

    return result;
}

function checkInput(){
    let campos = $("input");
    let idades = $(".inputIdade");
    let bool = true;

    for(let i = 0; i < campos.length; i++){
        if($(campos[i]).val() == ''){
            bool = false;
        }
    }

    for(let i = 0; i < idades.length; i++){
        if($.isNumeric($(idades[i]).val())){
            bool = false;
        }
    }
    console.log(bool);
    return bool;
}

function botaoCalcula() {
    let idades = new Array();
    let html = "";
    let nBeneficiarios = +$("#nBeneficiarios").val();
    let indexPlano = +$("#plano").val() - 1;
    let planoSelecionado = planos[indexPlano];
    let precoPlano = precos.filter(x => { return x.codigo === planoSelecionado.codigo; });
    let precoTotal =  0;
    let elem = $("#resultPrecos").empty();

    precoPlano.sort((a, b) => {
        return a.minimo_vidas - b.minimo_vidas;
    });

    let precoFinal = selecionaPreco(precoPlano,nBeneficiarios);
    let faixa = 0;

    for (let i = 0; i < nBeneficiarios; i++) {
        idades.push($("#nIdade"+i).val());
        if(idades[i] < 18){
            faixa = precoFinal.faixa1;
        }else if(idades[i] > 17 && idades[i] < 41){
            faixa = precoFinal.faixa2;
        }else{
            faixa = precoFinal.faixa3;
        }

        precoTotal += faixa;

        const precoFormatado  = new Intl.NumberFormat(`pt-BR`, {
            currency: `BRL`,
            style: 'currency',
        }).format(faixa);

        html = `
            <div>
                <span>Beneficiario ` + (i+1) + ` Idade: ` + idades[i] + ` - ` + precoFormatado + `</span>
            </div>
        `;
        elem.append(html);
    }

    const precoTotalForm  = new Intl.NumberFormat(`pt-BR`, {
        currency: `BRL`,
        style: 'currency',
    }).format(precoTotal);

    html = `<div style="text-align: center ">
                <span id="precoTotal">Preço Total: ` + precoTotalForm + `</span>
            </div>`;
    
    elem.append(html);
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
        let html = `<option style="text-align: center" disabled selected value=0> ---- </option>`;
        let elem = $("#nBeneficiarios");

        for (let i = 0; i < qtd; i++) {
            html += `
                <option style="text-align: center" value="`+ (i + 1) + `">` + (i + 1) + `</option>
            `;
        }

        elem.append(html);
    });

    $("#nBeneficiarios").change(function () {
        let value = +$(this).val();
        // let count = 0;
        let elem = $("#formBeneficiarios").empty();

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
        $("#resultPrecos").empty();
    });

    $(document).on('click', '#calculaPreco', function () {
        let campos = $("input");
        let idades = $(".inputIdade");
        let bool = true;
    
        for(let i = 0; i < campos.length; i++){
            if($(campos[i]).val() == ''){
                bool = false;
            }
        }
    
        for(let i = 0; i < idades.length; i++){
            if(!$.isNumeric($(idades[i]).val())){
                bool = false;
            }
        }

        if(bool){
            botaoCalcula();
        }else{
            alert("Por favor, preencha todos os campos");
        }

    });

});


