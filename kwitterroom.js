var firebaseConfig = {
    apiKey: "AIzaSyDPEAHO-Jpy7E1dQSF2T-zJVocqH6EuBl8",
    authDomain: "kwitter-5dfb5.firebaseapp.com",
    databaseURL: "https://kwitter-5dfb5-default-rtdb.firebaseio.com",
    projectId: "kwitter-5dfb5",
    storageBucket: "kwitter-5dfb5.appspot.com",
    messagingSenderId: "526049919293",
    appId: "1:526049919293:web:651efda1a55988581e8554",
    measurementId: "G-FW0KQYXCKN"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name= localStorage.getItem("username");

  document.getElementById("welcome").innerHTML= "Welcome " + user_name + "!";

  function addRoom(){
      room_name= document.getElementById("room_name").value ;

      firebase.database().ref("/").child(room_name).update({
          purpose: "adding room name"
      });

      localStorage.setItem("room_name", room_name);

      window.location="kwitterpage.html";
  }
  function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
    Room_names = childKey;
    console.log("Room Name - " + Room_names);
   row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
   document.getElementById("output").innerHTML += row;
 });
});

}

getData();

function redirectToRoomName(name)
{
    localStorage.setItem("room_name", name);
    window.location="kwitterpage.html";

}
function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location="login.html";
}