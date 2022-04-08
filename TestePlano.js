$(document).ready(function(){

    fetch("./planos.json")
        .then(function(resp){
            return resp.json();
        }).then(function(data){
            console.log(data);
        });

    $("#nBeneficiarios").ready(function(){
        let qtd = 4;
        let http = "<option disabled selected value> -- Selecione Uma Opção -- </option>";

        for (let i = 0; i < qtd; i++) {
            http +=`
                <option value="`+ i +`">`+ i +` Beneficiário</option>
            `
        }
   
        $(this).append(http);

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

            //elem.append($('<br>'));
            count++;
        }
      });


});


