function verifyIp(){
    var adress_entered = document.getElementById("ip_adress").value;
    console.log(adress_entered);

    if (adress_entered == "127.270.3.2"){
        document.querySelector(".result").style.visibility = "visible";

        function ipFailMessagePost(){
            window.parent.postMessage({type: 'failMessage'}, '*'); 
        }
        setTimeout(ipFailMessagePost, 3000);
    }else{
        alert("Veuillez rentrer une adresse ip valide.");
    }

}
