

function submitPost () {

    event.preventDefault() 
        if(!window.localStorage.getItem('user_id')) {
            alert("You must log in or register");
        } else {
            let content = $("#body");

            let image = $("#image_url");

            let date = (n," ",getDate(),", ",getFullYear());

            let data = {  
                user_id : window.localStorage.getItem('user_id'),
                //title : subject,
                body : content,
                image_url : image,
                post_date : date
            };
            
            var succcessInsert = function(response) {
                
                let item = createPostItem(response);
                insertIntoFeed(item);
                
                //Empty the input fields for the user
                $("#body").val('');
                $("#image_url").val('')
            };
            
            var errorInsert = function(xhr, error){
                console.log(error);
            }
            apiInsertPost(data, succcessInsert, errorInsert);
        }
    }

        //Populate the feed with initial data
        var successFunction = function(response){
        
            for(let i = 0; i< response.length; i++) {
                let item = createPostItem(response[i]);
                insertIntoFeed(item);
            }
        };
        var errorFunction = function(xhr, error){
            $('#errorMessage').html(response.responseText);
        }
        
        apiGetPosts(successFunction ,errorFunction );

    //convert number month to text
    let d = new Date();
    let month = new Array();
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
    let n = month[d.getMonth()];



    // if(imageContent) {
    //     //store the data
    //     //push data to server using ajax
    //     axios.post('http://localhost:3000/api/posts', {
    //         socialFeed: dataStorage
    //     })

        
    //     dataStorage.push({img : imageContent, name : userNameContent, reason: textContent, date_submitted : Date()});
    //     console.log("data", dataStorage);


    // } else {
    //     //alert("no image!");
    //     console.log('no image');
    // }
    // //create forEach to push to display function
    // var postSmiles = [];
    // dataStorage.forEach(function(item) {
    //     outputImage.append(imageOutput);
    //     outputText.append(nameOutput, n," ",dateSubmitted.getDate(),", ",dateSubmitted.getFullYear());
    // });

//}


///use to test
var api_url = 'http://localhost:3000/';
function getPosts(successCallback, errorCallback) {
    $.ajax({
        url: api_url + 'api/posts',
        success: successCallback,
        error : errorCallback
    });
}