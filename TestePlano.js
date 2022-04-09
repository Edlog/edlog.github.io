$(document).ready(function(){

    // fetch("./planos.json")
    //     .then(function(resp){
    //         return resp.json();
    //     }).then(function(data){
    //         console.log(data);
    //         planos = data;
    // });

    fetch("./precos.json")
        .then(function(resp){
            return resp.json();
        }).then(function(data){
            precos = data;
            console.log(precos);
    });

    $("#plano").ready(function(){
        $.getJSON("planos.json", function(planos){
            console.log(planos);
        });
        console.log(Object.keys(planos).length);
        for(let i = 0;i < planos.length; i++){

        }
    });





    $("#nBeneficiarios").ready(function() {
        let qtd = 4;
        let html = "<option disabled selected value> -- Selecione Uma Opção -- </option>";

        console.log(planos);

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


