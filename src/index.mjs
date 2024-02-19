import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

//API Rest with GET method, basic example
app.get("/", (req, res)=>{
    res.status(201).send({ "msg": "Hello!"});
});
//GET Create API rest for users
app.get( "/api/users/", (req, res)=>{
    res.status(201).send(
        [
            {"id":1, "name":"Joseph", "LastName":"Contreras"},
            {"id":2, "name":"Noel", "LastName":"Flawers"},
            {"id":3, "name":"Robert", "LastName":"Smith"}
        ]
    );
} );
//GET, Create api for products
app.get( '/api/products', ( req, res )=>{
    res.status(201).send(
        [
            {'id':12, 'name':'Radio', 'price':12.2},
            {'id':13, 'name':'Tv', 'price':25.70},
            {'id':14, 'name':'Smartphone', 'price':50.69},
            {'id':15, 'name':'Headsets', 'price':8.5},
        ]        
    );
} );

app.listen( PORT, ()=>{
    console.log(`Runnig on port http://localhost:${PORT}`);
});