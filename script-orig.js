
var socialFeed = document.getElementById("socialFeed");
var displaySmiles = document.createElement("div");
var dataStorage = [];
//dataStorage.forEach(submitSmiles);

function createPostItem (item, index) {

    //gather the inputs
    var imageCreate = document.getElementById("image_url");
    var userText = document.getElementById("body");
    //var userName = document.getElementById("userName");

    //create the outputs to store and display
    var outputImage = document.getElementById("imageOutput");
    //var outputName = document.getElementById("textOutput");
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
    //var userNameContent = userName.value;


    if(imageContent) {
        //store the data
        //push data to server using ajax
        axios.post('http://localhost:3000/api/posts', {
            socialFeed: dataStorage
        })

        
        dataStorage.push({img : imageContent, name : userNameContent, reason: textContent, date_submitted : Date()});
        console.log("data", dataStorage);

        //for (var column = 0; column <1; column++) {
        var imageOutput = document.createElement("img");
        imageOutput.src = imageContent;

        var dateSubmitted = new Date();

        // var nameOutput = document.createElement("p");
        // nameOutput.innerHTML = userNameContent;

        var textOutput = document.createElement("p");
        textOutput.innerHTML = textContent;

        //reset image input 
        imageCreate.value = "";
        userText.value = "";
        //userName.value = "";

    } else {
        //alert("no image!");
        console.log('no image');
    }
    //create forEach to push to display function
    var postSmiles = [];
    dataStorage.forEach(function(item) {
        outputImage.append(imageOutput);
        outputText.append(nameOutput, n," ",dateSubmitted.getDate(),", ",dateSubmitted.getFullYear());
    });
    console.log("postsmiles", postSmiles);  
}


///use to test
var api_url = 'http://localhost:3000/';
function getPosts(successCallback, errorCallback) {
    $.ajax({
        url: api_url + 'api/posts',
        success: successCallback,
        error : errorCallback
    });
}