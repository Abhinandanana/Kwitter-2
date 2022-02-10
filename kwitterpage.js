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

room_name= localStorage.getItem("room_name");
user_name= localStorage.getItem("username");

function send(){
    msg= document.getElementById("message").value ;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("message").value= "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("messages").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
//<h4> name <img id="tick" src="blue tick.png"> </h4>
    blue_tick= "<h4>" + name + "<img id='tick' src='blue tick.png'> </h4>";
    message_2= "<h4>" + message + "</h4>";
    like_button= "<button class='btn btn warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)' >";
    span= "<span class='glyphicon glyphicon-thumbs-up'>Like:"+ like + "</span></button><hr>";

    row= blue_tick + message_2 + like_button + span;
    document.getElementById("messages").innerHTML += row;
} }); }); }
getData();

function updateLike(message_id){
    button_id= message_id;
    no_likes= document.getElementById(button_id).value;
    update_likes= Number(no_likes)+1;

    firebase.database().ref(room_name).child(message_id).update({
        like: update_likes
    });
}

function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location="login.html";
}

