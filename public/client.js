console.log('Client-side code running');


// use react?
// POST GET PUT DELETE
// create read update delete (CRUD)

const username = document.getElementById('username');


const buttonCreate = document.getElementById('buttonCreate');
buttonCreate.addEventListener('click', function(e) {

    // handle create
    console.log('create button clicked');
    console.log(`creating: ${username.value}`)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username.value})
    }
    fetch('/username', requestOptions)
    .then(function(response) {
        if (response.ok) {
            
            console.log("'create' was recorded");
            updateDB()
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

    const requestOptions = {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
        
    }
    fetch(`/username?search=${username.value}`, requestOptions)
    .then(function(response) {
        if (response.ok) {

            console.log("'read' was recorded");
            updateDB()
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

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username.value})
    }
    fetch('/username', requestOptions)
    .then(function(response) {
        if (response.ok) {
            
            console.log("'delete' was recorded");
            updateDB()
            return;

        }
        throw new Error('Delete request failed');
    })
    .catch(function(error) {
        console.log(error);
    });

});


function updateDB() {
    /*
        Updates display database on client side
        Requests full db from server
    */
    const dbOutput = document.getElementById('db-output');
    
    fetch('/get-db', {method: 'GET'})
    .then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw new error('DB request failed');
    })
    .then((text) => {
        dbOutput.value = text;
    })
    .catch(function(error) {
        console.log(error);
    })
}