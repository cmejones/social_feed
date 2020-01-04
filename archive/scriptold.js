
var socialFeed = document.getElementById("socialFeed");
var displaySmiles = document.createElement("div");
var dataStorage = [];
//dataStorage.forEach(submitSmiles);

function submitSmiles (item, index) {

    //gather the inputs
    var imageCreate = document.getElementById("imageURL");
    var userText = document.getElementById("userText");
    var userName = document.getElementById("userName");

    //create the outputs to store and display
    var outputImage = document.getElementById("imageOutput");
    var outputName = document.getElementById("textOutput");
    var outputText = document.getElementById("textOutput");

    //convert number month to text
    var d = new Date();
    var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
    var n = month[d.getMonth()];

    //create variables to store the value of the input fields
    var imageContent = imageCreate.value;
    var textContent = userText.value;
    var userNameContent = userName.value;


    if(imageContent) {
        //store the data
        dataStorage.push({img : imageContent, name : userNameContent, reason: textContent, date_submitted : Date()});
        console.log("data", dataStorage);

        //for (var column = 0; column <1; column++) {
        var imageOutput = document.createElement("img");
        imageOutput.src = imageContent;
        //imageOutput.className = "border";
        // alert(imageContent);
    
        var dateSubmitted = new Date();

        var nameOutput = document.createElement("p");
        nameOutput.innerHTML = userNameContent;

        var textOutput = document.createElement("p");
        textOutput.innerHTML = textContent;

        //create function to display items
        //  function displaySmiles(item) {
            

        //       outputImage.append(item.img);
        //       outputText.append(item.name);
            //outputImage.append(imageOutput);
            //outputText.append(textOutput);
            //outputName.append(nameOutput, n," ",dateSubmitted.getDate(),", ",dateSubmitted.getFullYear());
        //  }
        //reset image input 
        imageCreate.value = "";
        userText.value = "";
        userName.value = "";

    //} 
    //dataStorage[row] = [];
    // }
    } else {
        alert("no image!");
    }
        //create forEach to push to display function
        var postSmiles = [];
        dataStorage.forEach(function(item) {
            //console.log("display function", item.name, item.img);
            //postSmiles.push(item);
            //displaySmiles.innerHTML = ("Submitted by: " + item.name);
            //socialFeed.append(displaySmiles);
            outputImage.append(imageOutput);
            outputText.append(nameOutput, n," ",dateSubmitted.getDate(),", ",dateSubmitted.getFullYear());
        });
        console.log("postsmiles", postSmiles);  //
    // console.log("smiles", displaySmiles);
}

// date_submitted: "Thu Dec 05 2019 18:43:14 GMT-0500 (Eastern Standard Time)"
// img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
// name: "you"
// reason: "because"

var button = document.getElementById('submit');
//var image = document.getElementById('imageOutput');
//var select = document.getElementById('selectBreed');

button.addEventListener('click', function (e) {
    e.preventDefault();
    axios.get('http://127.0.0.1:5500/socialTest.html')
    .then(function (response) {
        // image.src = response.data.message;
        //  document.body.append(image);
        console.log('response', response);
    })
})