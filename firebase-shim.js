// Adaptador: expone window.claude.use("db"|"user") con la misma forma que usa el tablero
// pero respaldado por Firebase (Firestore + login anónimo). Así index.html casi no cambia.
(function () {
  const cfg = window.FIREBASE_CONFIG;
  const configured = cfg && cfg.apiKey && cfg.apiKey !== "REEMPLAZAR" && window.firebase;
  let ready = null;

  function init() {
    if (!ready) {
      ready = (async () => {
        firebase.initializeApp(cfg);
        const cred = await firebase.auth().signInAnonymously();
        return { db: firebase.firestore(), uid: cred.user.uid };
      })();
    }
    return ready;
  }

  window.claude = {
    use: async function (name) {
      if (!configured) return null; // sin config: el tablero cae a modo local y avisa
      try {
        const { db, uid } = await init();
        if (name === "db") return db;
        if (name === "user") {
          return {
            id: async () => uid,
            can: async () => true,
            profiles: async () => ({})
          };
        }
      } catch (e) {
        console.error("Firebase no disponible:", e);
      }
      return null;
    }
  };
})();
