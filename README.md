# TC_Backend

## API Endpoints

1. /e2_register

receives a JSON Object using POST request and registers a new data in MongoDB database in collection E2.

JSON example:

{
"name": "John",
"roll": "22118345",
"branch":"mechanical",
"semester":5,
"githubId":"JohnGithub"
}


2. /e3_register 

receives a JSON Object using POST request and registers a new data in MongoDB database in collection E3
.

JSON example:

{
"name": "John",
"roll": "22118345",
"branch":"mechanical",
"semester":5,
"pubgId":"Gunspykar"
}
## Developer

Use the latest version of node -> `v19.6.1`

Run the command to install all the dependencies:

`npm install`

To start the server locally:

`npm start`
