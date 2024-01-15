console.log('Client-side code running');


// use react?
// POST GET PUT DELETE
// create read update delete (CRUD)

const username = document.getElementById('username');
const output = document.getElementById('output');

const buttonCreate = document.getElementById('buttonCreate');
buttonCreate.addEventListener('click', function (e) {
    // handle create
    console.log('create button clicked');
    console.log(`creating: ${username.value}`)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value })
    }
    fetch('/username', requestOptions)
        .then(function (response) {
            if (response.ok) {
                console.log("'create' was recorded");
                if (response.status == 201) {
                    output.value = `'${username.value}' was created!`
                    showAlert(0, `${username.value} was created!`)
                    updateDB()
                    return;
                }
                else if (response.status == 204) {
                    output.value = `'${username.value}' already exists. Nothing was added.`
                    showAlert(1, `${username.value} already exists.`)
                    return;
                }
                else {
                    output.value = `'ERROR: ${response.status}'`
                    showAlert(2, `'ERROR: ${response.status}'`)
                    return;
                }
            }
            throw new Error('Create request failed');
        })
        .catch(function (error) {
            console.log(error);
        });
});

const buttonRead = document.getElementById('buttonRead');
buttonRead.addEventListener('click', function (e) {
    // handle read
    console.log('read button clicked');

    const requestOptions = {
        method: 'GET'
        //GET should not have a body
    }
    fetch(`/username?search=${username.value}`, requestOptions)
        .then(function (response) {
            if (response.ok) {
                console.log("'read' was recorded");

                if (response.status == 200) {
                    // found
                    console.log("found in database!");
                    output.value = `'${username.value}' was found!`;
                    showAlert(0, `${username.value} was found!`)
                }
                else if (response.status == 204) {
                    // not found
                    console.log("not found in database");
                    output.value = `'${username.value}' was NOT found.`;
                    showAlert(1, `${username.value} not found`)
                }

                updateDB()
                return;
            }
            throw new Error('Read request failed');
        })
        .catch(function (error) {
            console.log(error);
        });
});

const buttonDelete = document.getElementById('buttonDelete');
buttonDelete.addEventListener('click', function (e) {
    // handle delete
    console.log('delete button clicked');

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value })
    }
    fetch('/username', requestOptions)
        .then(function (response) {
            if (response.ok) {
                console.log("'delete' was recorded");
                if (response.status == 200) {
                    output.value = `'${username.value}' was deleted.`
                    showAlert(0, `'${username.value}' was deleted.`)
                    updateDB()
                    return;
                }
                else if (response.status == 204) {
                    output.value = `'${username.value}' does not exist. No user deleted.`
                    showAlert(1, `'${username.value}' does not exist. No user deleted.`)
                    return;
                }
            }
            throw new Error('Delete request failed');
        })
        .catch(function (error) {
            console.log(error);
        });
});


function updateDB() {
    /*
        Updates display database on client side
        Requests full db from server
    */
    const dbOutput = document.getElementById('db-output');

    fetch('/get-db', { method: 'GET' })
        .then((response) => {
            if (response.ok) {
                return response.text();
            }
            throw new error('DB request failed');
        })
        .then((text) => {
            dbOutput.value = text;
        })
        .catch(function (error) {
            console.log(error);
        })
}

var alertTimer = setTimeout(null, null);

function showAlert(prio, message) {
    var alertDiv = document.getElementById("alert")
    // remove alert-success alert-warning alert-danger
    // 0 - success
    // 1 - warning
    // 2 - danger
    var priority = ['alert-success', 'alert-warning', 'alert-danger'][prio]
    //alertDiv.classList.remove('alert-success', 'alert-warning',  'alert-danger')
    hideAlert(false)
    alertDiv.style.display = "block";

    alertDiv.classList.add(priority)
    alertDiv.innerText = message

    clearTimeout(alertTimer)
    alertTimer = setTimeout(hideAlert, 3000)
}
function hideAlert(hideDisplay = true) {
    var alertDiv = document.getElementById("alert")
    alertDiv.classList.remove('alert-success', 'alert-warning', 'alert-danger')
    if (hideDisplay) {
        alertDiv.style.display = "none"
    }
}


window.onload = function () {
    updateDB();
}
