var api_url = 'http://localhost:3000/';

function createPostItem(data) {

    let item = `
        <div class="card card-body bg-light mb-4">
            <div class="lead">${data.body}</div>
            <p class="">${data.image_url}</p>
            <p class="card-subtitle">Left By: ${data.user_id} on ${data.createdAt}</p>
            
            <div class="small" id="post_id">${data.id}</div>
            <div class="card-header">
                <label for="userComment">Leave a comment<br />
                    <input type="textarea" data-index="" id="comment"></input><br />
                    <button class="btn btn-success" style="width:auto;" onclick="leaveComment(event, ${data.id})">Leave Comment</button>  
            </div>
            <div class="text-right">
                    <button class="btn btn-secondary" id=index onclick="updatePost()">update</button>
                    <button type=button class="btn btn-secondary" id=index onclick="apiDeletePost()">delete</button> 
                    
            </div>
            
        </div>
    `;
    
    return item;
}

function insertIntoFeed(item) {
    $('#feed').append(item);

}

// insert comment to post
function createCommentItem(data) { //include post_id here?

    let item = `
        <div class="card card-body bg-light mb-4">
            <div class="lead">${data.comment}</div>
        </div>
    `;
    
    return item;
}

function insertIntoCommentsFeed(item) {
    $('#commentsFeed').append(item);

}

// delete post
function deletePostItem() {

    let id = `
        ${'#post_id'}.val()
    `;
    
    return id;
}
//console.log('to delete', data);

function deleteFromFeed(id) {
    $('#feed').remove(id);

}
// list all users on one page
//var apiGetUsers = "";
function createUserList(data) {

    let user = `
        <div class="card card-body bg-light mb-2">
            <h3>${data.name}</h3>
            <div>${data.createdAt}</div>
            <div>Email: ${data.email}</div>

        </div>
    `;

    return user;
}

function insertUsers(user) {
    $('#userList').append(user);
        console.log('app', user);
}