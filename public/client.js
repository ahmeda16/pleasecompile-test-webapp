console.log('Client-side code running');


// use react?

const username = document.getElementById('username');


const buttonCreate = document.getElementById('buttonCreate');
buttonCreate.addEventListener('click', function(e) {

    // handle create
    console.log('create button clicked');
    console.log(`creating: ${username.value}`)

    fetch('/create', {method: 'POST'})
    .then(function(response) {
        if (response.ok) {
            console.log("'create' was recorded");
            return;
        }
        throw new Error('Create request failed');
    })
    .catch(function(error) {
        console.log(error);
    });

});
const buttonRead = document.getElementById('buttonRead');
buttonRead.addEventListener('click', function(e) {

    // handle read
    console.log('read button clicked');

    fetch('/read', {method: 'POST'})
    .then(function(response) {
        if (response.ok) {
            console.log("'read' was recorded");
            return;
        }
        throw new Error('Read request failed');
    })
    .catch(function(error) {
        console.log(error);
    });

});
const buttonDelete = document.getElementById('buttonDelete');
buttonDelete.addEventListener('click', function(e) {

    // handle delete
    console.log('delete button clicked');

    fetch('/delete', {method: 'POST'})
    .then(function(response) {
        if (response.ok) {
            console.log("'delete' was recorded");
            return;
        }
        throw new Error('Delete request failed');
    })
    .catch(function(error) {
        console.log(error);
    });

});