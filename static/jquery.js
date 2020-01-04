function apiGetPosts(successCallback, errorCallback) {

    $.ajax({
        url: api_url + 'api/posts',
        success: successCallback,
        error : errorCallback
    });
    
}

function apiGetUsers(successCallback, errorCallback) {

    $.ajax({
        url: api_url + 'api/users',
        success: successCallback,
        error : errorCallback
    });
    
}

function apiGetComments(successCallback, errorCallback) {

    $.ajax({
        url: api_url + 'api/comments',
        success: successCallback,
        error : errorCallback
    });
    
}

function apiGetPostComments(successCallback, errorCallback) {

    $.ajax({
        url: api_url + 'api/comments/post/:id',
        success: successCallback,
        error : errorCallback
    });
    
}

function apiDeletePost(successCallback, errorCallback) {

    $.ajax({
        url: api_url + 'api/posts/:id',
        success: successCallback,
        error : errorCallback
    });
    
}

function apiUserPosts(successCallback, errorCallback) {

    $.ajax({
        url: api_url + '/api/users/posts/:id',
        success: successCallback,
        error : errorCallback
    });
    
}

function apiInsertPost(data, successCallback, errorCallback) {

    $.ajax({
        type: "POST",
        data : data,
        url: api_url + 'api/posts',
        success: successCallback,
        error : errorCallback
    });
}

function apiComments(id, successCallback, errorCallback) {  //not working //getting 404

    $.ajax({
        type: "GET",
        url: api_url + 'api/comment/' + id,
        success: successCallback,
        error : errorCallback
    });
}
function apiInsertComment(id, data, successCallback, errorCallback) {

    $.ajax({
        type: "POST",
        data : data,
        url: api_url + 'api/posts/comment/' + id,
        success: successCallback,
        error : errorCallback
    });
}

function apiRegister(data, successCallback, errorCallback) {

    $.ajax({
        type: "POST",
        data : data,
        url: api_url + 'api/register',
        success: successCallback,
        error : errorCallback
    });
}

function apiProfile(id, successCallback, errorCallback) {

    $.ajax({
        type: "GET",
        url: api_url + 'api/user/' + id,
        success: successCallback,
        error : errorCallback
    });
}

function apiProfileUpdate(id, data, successCallback, errorCallback) {

    $.ajax({
        type: "POST",
        data: data,
        url: api_url + 'api/user/' + id,
        success: successCallback,
        error : errorCallback
    });
}

function apiLogin(data, successCallback, errorCallback) {

    $.ajax({
        type: "POST",
        data : data,
        url: api_url + 'api/login',
        success: successCallback,
        error : errorCallback
    });
}