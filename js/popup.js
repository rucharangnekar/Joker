let submitBtn = document.getElementById("submitBtn");
console.log("sub", submitBtn);

function get_joke_of_the_day(jokeType, selected_num_of_parts) {


    var modal = document.getElementById("myModal");
    var content = document.getElementById("modal-content");
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const jokeLine1 = document.createElement('p');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
         // Access the result here
         modal.style.display = "block";
         var json_obj = JSON.parse(this.responseText);
         if(selected_num_of_parts == "single") {
             console.log("JOKE ", json_obj.joke);
             jokeLine1.textContent = json_obj.joke;
             content.appendChild(jokeLine1);
         }
         else { // two-part joke
            console.log("SETUP ", json_obj.setup);
            console.log("DELIVERY ", json_obj.delivery);
            const jokeLine2 = document.createElement('p');
            jokeLine1.textContent = json_obj.setup; 
            jokeLine2.textContent = json_obj.delivery;
            content.appendChild(jokeLine1);
            content.appendChild(jokeLine2);
         }
	 }
    };

    endpoint = "https://sv443.net/jokeapi/v2/joke/" + jokeType + "?blacklistFlags=religious,political,racist,sexist&type=" + selected_num_of_parts;
    console.log("endpoint", endpoint);
    xhttp.open("GET", endpoint, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("X-JokesOne-Api-Secret", "YOUR API HERE");
    xhttp.send();
}

window.onload=function(){
    submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", function(e){
        console.log("WELCOME");
        selected_val = document.getElementById("card-type").value;
        selected_num_of_parts = document.getElementById("joke-part").value;
        console.log("sel", selected_val, selected_num_of_parts);
        
        if(selected_val == "Random") {
            get_joke_of_the_day("Programming,Miscellaneous,Dark,Pun", selected_num_of_parts);
        }
        else {
            get_joke_of_the_day(selected_val, selected_num_of_parts);
        }
        return false;
    
      });
  }

  