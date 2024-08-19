// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAOULGJ-s9x1gxG8lGLfXGx2zRnqV_-4yE",
  authDomain: "virtutisform.firebaseapp.com",
  projectId: "virtutisform",
  storageBucket: "virtutisform.appspot.com",
  messagingSenderId: "469441728660",
  appId: "1:469441728660:web:9165b1b322c64fdb646481"
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

      try {
        // Adiciona os dados ao Firestore
        await addDoc(collection(db, 'cadastros'), {
          doc: doc,
          nome: nome,
          email: email,
          telefone: telefone
        });
        alert('Cadastro realizado com sucesso!');
        form.reset(); // Limpa o formulário
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar, tente novamente.');
      }
    });
  }
});