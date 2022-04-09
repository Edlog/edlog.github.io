$(document).ready(function(){

    var planos  = new Array();
    var precos = new Array();

    // fetch("./planos.json")
    //     .then(function(resp){
    //         return resp.json();
    //     }).then(function(data){
    //         console.log(data);
    //         planos = data;
    // });

    $.getJSON("planos.json", function(result){
        console.log(result);
        console.log(Object.keys(result).length);
    });

    fetch("./precos.json")
        .then(function(resp){
            return resp.json();
        }).then(function(data){
            precos = data;
            console.log(precos);
    });

    $("#plano").ready(function(){
        for(let i = 0;i < planos.length; i++){

        }
    });





    $("#nBeneficiarios").ready(function() {
        let qtd = 4;
        let html = "<option disabled selected value> -- Selecione Uma Opção -- </option>";

        for (let i = 0; i < qtd; i++) {
            html = html + `
                <option value="`+ (i+1) +`">`+ (i+1) +` Beneficiário</option>
            `;
        }

        $("#nBeneficiarios").append(html);
    });

    $("#nBeneficiarios").change(function() {
        let value = +$(this).val();
        let count = 0;
        let elem = $('#formBeneficiarios').empty();

        let inputBeneficiario = "";

        while (count < value) {
            
            inputBeneficiario = `
            <div class="Beneficiarios" style="margin: 10px">
                <label for="nBeneficiario`+(count)+`">Beneficiario `+(count+1)+`:</label>
                <input id="nBeneficiario`+(count)+`" type = "text">
                <label for="nIdade`+(count)+`">Idade:</label>
                <input id="nIdade`+(count)+`" type = "text">
            </div>`;
        
            elem.append($(inputBeneficiario));

            count++;
        }
      });


});


