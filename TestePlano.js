$(document).ready(function(){

    fetch("./planos.json")
        .then(function(resp){
            return resp.json();
        }).then(function(data){
            console.log(data);
        });

    $("#nBeneficiarios").change(function() {
        var value = +$(this).val();
        var count = 0;
        var elem = $('#formBeneficiarios').empty();

        var inputBeneficiario = "";

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


