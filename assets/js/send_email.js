import * as keys from '../keys/key.js'

(function(){
    emailjs.init(keys.id_email);
})();
const form = document.getElementById('cadastroForm');
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // ID do template e do serviço que você criou no EmailJS
    const templateParams = {
        nome:form.nome.value,
        email: form.email.value,
    };

    emailjs.send(keys.serviceID, keys.template_id, templateParams)
        .then(function(response) {
            console.log('Email enviado com sucesso! para ', response.status, response.text);
        }, function(error) {
            console.error('Erro ao enviar email:', error);
        });
}); 