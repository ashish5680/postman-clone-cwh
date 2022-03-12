console.log('This is my PostMaster Project (PostMan Clone)');

console.log("\n");




// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}





/////////////////////////////////////////////////////////////////////////////////




// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';



// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
});



// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})







/////////////////////////////////////////////////////////////////



// Initialize no of parameters
let addedParamCount = 0;





// If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');

addParam.addEventListener('click', () => {

    let params = document.getElementById('params');

    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                  </div>`;

    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // To-do: add a confirmation box to confirm parameter deletion (Optional)
            e.target.parentElement.remove();                  // e.target means joo button click kiya gaya hai and phir .parentElement (uska parent element)
        })
    }
    addedParamCount++;

});











/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// If the user clicks on submit button
let submit = document.getElementById('submit');

submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
 
    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};  // make a blank object
        for (let i = 0; i < addedParamCount + 1; i++) {                        // // ed default wala aur baaki joo add kiye hai parameters
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {         // // joo param delete kar diya hai uski value too hogi nahi isiliye error naa aa je too isiliye ye condition lagai hai
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);      // convert object into string
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }





    // Log all the values in the console for debugging
    console.log('URL is : ', url);
    console.log('requestType is : ', requestType);
    console.log('contentType is : ', contentType);
    console.log('data is : ', data);







    // if the request type is get, invoke fetch api to create a post request
    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }

    //if the request is POST
    else{
        fetch(url, {
            method: 'POST', 
            body: data,        // // data is a string , isse ek string chaiye hoti hai
            headers: {            //  // headers and body only post request mai chaiye hote hai
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();      // it highlight all the json text
        });

    }


});

