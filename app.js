var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=UXHvsDjM-KK0BzEFQsYAU7Kw_ldc5bEV7X0ZpeUhrLk";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      handleResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////

const handleResponse = (requestResponse) => {
  const jsonified = JSON.parse(requestResponse);
  const plantsArray = jsonified.data;
  const family = "Fagaceae"

  const plantsAfter1753 = plantsArray.filter((arrayItem) => {
    return arrayItem.family === family;
  })

  plantsAfter1753.map(console.log);

  displayDiv(plantsAfter1753, family)
  
}

const displayDiv = (content, family) => {
  const wrapper = document.createElement("div");
  const header = document.createElement("h1");
  header.innerText = "View Species of the Plant Family: ".concat(family);
  wrapper.appendChild(header);

  var i;
  for (i = 0; i < content.length; i++) {
    const imageBox = document.createElement("div");
    imageBox.innerHTML = content[i].scientific_name

    const image = document.createElement("img");
    image.src = content[i].image_url

    imageBox.appendChild(image);
    wrapper.appendChild(imageBox);
  
  }
  document.getElementById("plants").appendChild(wrapper);

}