// Firebase'i Başlat
var firebaseConfig = {
    apiKey: "{YOUR_API_KEY}",
    authDomain: "{YOUR_AUTH_DOMAIN}",
    databaseURL:
      "{YOUR_DATABASE_URL}",
    projectId: "{YOUR_PROJECT_ID}",
    storageBucket: "{YOUR_STORAGE_BUCKET}",
    messagingSenderId: "{YOUR_MESSAGING_SENDER_ID}",
    appId: "{YOUR_APP_ID}",
  };
  firebase.initializeApp(firebaseConfig);
  
  var messagesRef = firebase.database().ref("messages");
  var historyFlagRef = firebase.database().ref("history_cleared");
  
  // Giriş formunu dinle
  document.getElementById("login-form").addEventListener("submit", loginUser);
  
  function loginUser(e) {
    e.preventDefault();
  
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
  
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Giriş başarılı
        document.getElementById("login-container").style.display = "none";
        document.getElementById("chat-container").style.display = "block";
        startListeningToMessages(); // Kullanıcı giriş yaptıktan sonra dinlemeye başla
      })
      .catch((error) => {
        // Hata durumunda mesaj göster
        document.getElementById("login-error").innerText =
          "Login failed: " + error.message;
      });
  }
  
  // Kullanıcı durumunu izleyin
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Kullanıcı giriş yapmış
      document.getElementById("login-container").style.display = "none";
      document.getElementById("chat-container").style.display = "block";
      startListeningToMessages(); // Kullanıcı giriş yapmışsa mesajları dinlemeye başla
    } else {
      // Kullanıcı çıkış yapmış
      document.getElementById("login-container").style.display = "block";
      document.getElementById("chat-container").style.display = "none";
    }
  });
  
  // Mesaj gönderme formunu dinle
  document.getElementById("message-form").addEventListener("submit", sendMessage);
  
  // Mesaj gönderme fonksiyonu
  function sendMessage(e) {
    e.preventDefault();
  
    // Değerleri al
    var username = document.getElementById("username").value;
    var message = document.getElementById("message").value;
    var timestamp = new Date().toLocaleString();
  
    // Mesajı kaydet
    messagesRef
      .push({
        username: username,
        message: message,
        timestamp: timestamp,
      })
      .then(() => {
        // Mesaj başarıyla kaydedildiğinde
        document.getElementById("message").value = ""; // Mesaj kutusunu temizle
      })
      .catch((error) => {
        console.error("Error saving message: ", error);
      });
  }
  
  // Mesajları dinle ve ekrana ekle
  function startListeningToMessages() {
    messagesRef.off(); // Daha önce eklenmiş dinleyicileri temizle, çifte tetiklenmeyi önlemek için
  
    // Tüm veritabanını dinleyerek her değişiklikte UI'yi güncelle
    messagesRef.on("value", function (snapshot) {
      var chatWindow = document.getElementById("chat-window");
      chatWindow.innerHTML = ""; // Mevcut tüm mesajları temizle
  
      // Firebase'deki her mesajı UI'ye yazdır
      snapshot.forEach(function (data) {
        var messageData = data.val();
        displayMessage(
          data.key,
          messageData.username,
          messageData.message,
          messageData.timestamp
        );
      });
    });
  
    // "Clear History" durumunu dinleyerek, tüm kullanıcıların UI'sini temizle
    historyFlagRef.on("value", function (snapshot) {
      var historyCleared = snapshot.val();
      if (historyCleared) {
        clearChatWindow();
      }
    });
  }
  
  // Mesajları ekrana yazdırma fonksiyonu
  function displayMessage(id, username, message, timestamp) {
    var chatWindow = document.getElementById("chat-window");
    var messageElement = document.createElement("div");
    messageElement.classList.add("message");
  
    // Kullanıcı adı eşleşiyorsa gönderilmiş mesaj, değilse alınmış mesaj olarak işaretle
    if (username === firebase.auth().currentUser.email) {
      messageElement.classList.add("sent");
    } else {
      messageElement.classList.add("received");
    }
  
    messageElement.id = id; // Her mesajı id ile ilişkilendiriyoruz
  
    messageElement.innerHTML = `
            <p>
                <span class="username">${username}</span>
                <span class="timestamp">[${timestamp}]</span>
            </p>
            <p>${message}</p>
        `;
  
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  
  // "Clear History" butonuna olay dinleyici ekle
  document
    .getElementById("clear-history")
    .addEventListener("click", clearHistory);
  
  function clearHistory() {
    if (confirm("Are you sure you want to clear the chat history?")) {
      messagesRef
        .remove()
        .then(function () {
          // Veritabanındaki flag'i güncelle
          historyFlagRef.set(true);
          alert("Chat history cleared.");
        })
        .catch(function (error) {
          console.error("Error clearing messages: ", error);
        });
    }
  }
  
  // Sohbet penceresini temizleme fonksiyonu
  function clearChatWindow() {
    var chatWindow = document.getElementById("chat-window");
    chatWindow.innerHTML = "";
  }
  
  // Çıkış yapma fonksiyonu
  document.getElementById("logout").addEventListener("click", function () {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Çıkış başarılı
        alert("You have successfully logged out.");
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  });
  