These are my Notes:

- We want to build a discGolfApp backend and here is what we want to support


- we want a route that will return all-of-the discs in our list
GET/ discs

- we want a route that will return a single disc, based on the id provided
GET/ discs /:id , :id is the id of the
disc to return if it exists,
otherwise null

- we want a route that will delete a single disc, based on the id provided
DELETE /discs/:id
:id is the id of the disc to delete
return the item that was deleted

- we want a route that will add a disc to the list
POST /discs
body should include an object, that has a description
ex body: {"description" : "plant the flowers"}
