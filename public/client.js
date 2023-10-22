console.log('Client-side code running');

const username = document.getElementById('username');


const buttonCreate = document.getElementById('buttonCreate');
buttonCreate.addEventListener('click', function(e) {

    // handle create
    console.log('create button clicked');
    console.log(`creating: ${username.value}`)

});
const buttonRead = document.getElementById('buttonRead');
buttonRead.addEventListener('click', function(e) {

    // handle read
    console.log('read button clicked');

});
const buttonDelete = document.getElementById('buttonDelete');
buttonDelete.addEventListener('click', function(e) {

    // handle delete
    console.log('delete button clicked');
    
});