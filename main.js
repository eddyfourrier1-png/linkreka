document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginMsg = document.getElementById('loginMsg');
  const googleLogin = document.getElementById('googleLogin');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMsg.textContent = 'Tentative de connexion...';
    // Dans la version déployée, le serveur proxy gérera le login
    loginMsg.textContent = 'Prototype local: opération non connectée au proxy';
  });

  googleLogin.addEventListener('click', () => {
    // Rediriger vers le backend HTTPS local pour l'authentification
    window.location.href = 'https://localhost:3000/auth/google';
  });
});


