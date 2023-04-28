var connectedUsers = [];

// Fonction pour ajouter un utilisateur connecté à la liste
function addUser(ipAddress) {
  if (!connectedUsers.includes(ipAddress)) {
    connectedUsers.push(ipAddress);
  }
}

// Fonction pour supprimer un utilisateur déconnecté de la liste
function removeUser(ipAddress) {
  var index = connectedUsers.indexOf(ipAddress);
  if (index !== -1) {
    connectedUsers.splice(index, 1);
  }
}

// Fonction pour afficher le nombre d'utilisateurs connectés
function showConnectedUsers() {
  console.log('Nombre de personnes connectées : ' + connectedUsers.length);
  connectedUsers.forEach((user)=>{
    console.log(user)
  })

}

// Événement pour ajouter un utilisateur connecté à la liste
document.addEventListener("visibilitychange", function() {
  if (!document.hidden) {
    var ipAddress = getIPAddress();
    addUser(ipAddress);
    showConnectedUsers();
  }
});

// Événement pour supprimer un utilisateur déconnecté de la liste
window.addEventListener("beforeunload", function() {
  var ipAddress = getIPAddress();
  removeUser(ipAddress);
  showConnectedUsers();
});
function getIPAddress(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for'); 
    if (forwardedIpsStr) {
      var forwardedIps = forwardedIpsStr.split(',');
      ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
      ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
  }
  