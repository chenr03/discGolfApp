// bring the express framework into our application by defining it
let express = require("express");

//defining the PORT the application will be listening on.
let PORT = 5050;

// creat e the application server object
let discApp = express();

//localhost:5000/discApp.html
discApp.use(express.static("./public"));

// enable our app to parse json requests
//using the body-parser middleware
discApp.use(express.json());

// starts our application server, and prints out what PORT it is listening on
discApp.listen(PORT, function(){
    console.log('Disc App is Listening on PORT', PORT);
})

// this is our bag of discs
//when we learn about SQL we will work with a real database
let bag = [];

// gets all discs
discApp.get("/discs", function(request, response){
    console.log("GET /discs");
    response.json(bag);
})

// gets a specific disc by the id
discApp.get("discs/:id", function(request, response){
    console.log("GET /discs/:id");
    //get the id we are looking for from the route

    let myDiscID = request.params.id


    // find the item in our bag that matches the id

    let matchingDisc = bag.find(function(disc, index){
        return disc.id === myDiscID;
    })

    // you can use a bunch of different ways to find the item within the matching id from the array;
        //for loop
        //while-loop
        //higher order functions, etc.

    if(matchingDisc){
        response.json(matchingDisc);
    } else {
        response.json(undefined);
    }
})

//deletes a specific disc by the id
discApp.delete("/discs/:id", function(request, response){
    console.log("DELETE /discs/:id")

    //finds the id we want to delete
    let myDiscID = request.params.id;

    // we need to remove this item from our bag array
    // there is a lot of ways to do this
    // I am choosing to use .find, to find the disc, and then remove it from the array using splice.

    let matchingIndex = bag.find(function(disc, index){
        return disc.id === myDiscID;
    })

    // if the index is less than 0, that means there was no match to the id in the bag array
    if(matchingIndex < 0){
        response.json(undefined);
    } else {
        // removes the disc from the db array and returns it
        let deletedDisc = bag.splice(matchingIndex, 1)
        response.json(deletedDisc)
    }
});

// create a new item in the bag array
discApp.post("/discs", function(request, response){
    console.log("POST /discs");
    let description = request.body.description;
    let myDiscID = getRandomInt();
    let completed = false;

    // read the description from the request body,
    //and create a new disc item, with the description
    // and use a random number from the id - using the math.random, and math.floor function

    let newDisc = {};
    newDisc.description = description;
    newDisc.id = myDiscID;
    newDisc.completed = completed;

    // add the new disc item to the bag array
    bag.push(newDisc);

    // return the new Disc on the response
    response.json(newDisc);
});

//update a specific disc item by the id
discApp.put("/discs/:id", function(request, response){
    console.log("PUT /discs/:id");

    //get the id to update from the route
    let myDiscID = request.params.id;

    // get the new description from the body
    let description = request.body.description;

    // get the new completed flag from the body
    let completed = request.body.completed;

    // we need to get the item we want to update from the bag array
    let matchingItem = bag.find(function(disc, index){
        return disc.id === myDiscID;
    });

    // if we found a matching disc in the bag, update it
    // and return the updated item in the response
    // if not return undefined exclusively

    if(matchingItem){
        matchingItem.description = description;
        matchingItem.completed = completed;
        response.json(matchingItem);
    } else {
        response.json(undefined);
    }
});

// this function will return a random integer
// between 0 and 100

let getRandomInt = function(){
    let randomFloat = Math.random();
    let bigRandomFloat = randomFloat * 100;
    let randomInt = Math.floor(bigRandomFloat);
    return randomInt.toString();
}

