document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginMsg = document.getElementById('loginMsg');
  const googleLogin = document.getElementById('googleLogin');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMsg.textContent = 'Tentative de connexion...';
    // Appel au backend proxy local pour effectuer le login
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await fetch('https://localhost:3000/proxy/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        loginMsg.textContent = 'Échec: ' + (txt || ('status ' + res.status));
        return;
      }
      // try parse JSON response if any
      let data = null;
      try { data = await res.json(); } catch (e) { data = null; }
      if (data && data.ok === false) {
        loginMsg.textContent = 'Échec: ' + (data.error || 'erreur inconnue');
        return;
      }
      loginMsg.textContent = 'Connecté.';
      // Ouvrir la vue proxifiée sur le backend
      window.open('https://localhost:3000/proxy', '_blank');
    } catch (err) {
      loginMsg.textContent = 'Erreur réseau (vérifier que le serveur local tourne)';
    }
  });

  googleLogin.addEventListener('click', () => {
    // Rediriger vers le backend HTTPS local pour l'authentification
    window.location.href = 'https://localhost:3000/auth/google';
  });
});


