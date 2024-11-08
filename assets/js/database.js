// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import * as keys from '../keys/key.js'

// Configuração do Firebase
const firebaseConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId,
  appId: keys.app
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função que será executada quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  // Captura a submissão do formulário
  const form = document.getElementById('cadastroForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Impede o envio padrão do formulário

      // Coleta os dados do formulário
      const doc = form.doc.value;
      const nome = form.nome.value;
      const email = form.email.value;
      const telefone = form.telefone.value;
      const senha = "virtutis1234";
      const dataEnvio = new Date(); // Obtém a data e hora atuais

      try {
        // Adiciona os dados ao Firestore
        await addDoc(collection(db, 'cadastros'), {
          doc: doc,
          nome: nome,
          email: email,
          telefone: telefone,
          senha: senha,
          dataEnvio: dataEnvio // Adiciona a data de envio
        });

        // Envia os dados para o endpoint
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({doc, nome, email, telefone})
        };

        const apiResponse = await fetch('https://back.flakeflow.beansoftwares.com.br/webhook/1ed7cdfb-daad-4e6c-a85e-79c7bcce6fd9/a6a81fee-f80e-4b1b-8a00-749275e7743b', options)
          .then(response => response.json());

        console.log('Resposta da API:', apiResponse);
        alert('Cadastro realizado com sucesso!');
        form.reset(); // Limpa o formulário
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar, tente novamente.');
      }
  
    });
  }
});
