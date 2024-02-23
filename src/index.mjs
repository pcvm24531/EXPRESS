import express from "express";

const app = express();

app.use(express.json());

const logginMiddleware = ( request, response, next )=>{
    console.log(`${request.method} - ${request.url}`);
    next();
};

const resolveIndexByUserId = (req, res, next)=>{
    const {
        params: { id },
    } = req;
    const parseId = parseInt( id );
    
    if( isNaN(parseId) ) return res.status(400).send();
    const findUserIndex = mockUsers.findIndex( (user)=>user.id===parseId );
    if( findUserIndex=== -1 ) return res.status(404).send();

    req.findUserIndex = findUserIndex;
    next();
};

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {"id":1, "name":"Joseph", "lastName":"Contreras"},
    {"id":2, "name":"Noel", "lastName":"Flawers"},
    {"id":3, "name":"Robert", "lastName":"Smith"}
];

const mockProducts = [
    {'id':11, 'name':'Walckman', 'price':7.2},
    {'id':12, 'name':'Radio', 'price':12.2},
    {'id':13, 'name':'Tv', 'price':25.70},
    {'id':14, 'name':'Smartphone', 'price':50.69},
    {'id':15, 'name':'Headsets', 'price':8.5},
    {'id':16, 'name':'Smartwatch', 'price':10.5},
];

app.listen( PORT, ()=>{
    console.log(`Runnig on port http://localhost:${PORT}`);
});

/**
 * INICIO METHOD GET REQUEST
 */
app.get( "/", (req, res)=>{
        res.status(201).send({ "msg": "Hello!"});    
    }
);



//GET Create API rest for users
app.get( "/api/users", (req, res)=>{
    res.status(201).send( mockUsers );
} );


//GET, Create api for products
app.get( '/api/products', ( req, res )=>{
    res.status(201).send( mockProducts );
} );
/**
 * INICIO ROUTE PARAMS
 * Recibir parametros en la ruta
 * Se puede usar varios parámetros -> Ej:  app.get( '/api/users/:id/:name', ( req, res )=>{
 */
app.get( '/api/users/:id', resolveIndexByUserId, ( req, res )=>{
    const { findUserIndex } = req;
    const findUser = mockUsers[findUserIndex];
    if( !findUser ) return res.status(400).send();
    return res.status(200).send(findUser);
} );
/**
 * INICIO QUERY PARAMS 
 * localhost:3000/productos?field=value&field2=value2
 */
app.get( '/api/productos', (req, res)=>{    
    const { 
        query:{ field, value } 
    } = req;
    
    //Si field y value tiene valores procesamos
    if( field && value ){
        return res.send(
            mockProducts.filter( (product) => product[field].includes(value) )
        );
    }
    return res.send( mockProducts );
} );
//FIN METHOD GET REQUEST


//INICIO METHOD POST REQUEST
app.post( '/api/users', ( req, res, next )=>{
    const { body } = req;
    const newUser = { id:mockUsers[mockUsers.length-1].id + 1, ...body};
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
    next();
} );
//FIN METHOD POST REQUEST

//INICIO METHOD PUT
app.put( '/api/users/:id', resolveIndexByUserId, ( req, res )=>{
    const { body, findUserIndex } = req;
    mockUsers[ findUserIndex ] = { id: mockUsers[findUserIndex].id, ...body};
    return res.status(200).send();
} );
//FIN METHOD PUT

//INICIO METHOD PATCH REQUEST
app.patch( '/api/users/:id', resolveIndexByUserId , (request, response)=>{
    const{ body, findUserIndex } = request;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    console.log(mockUsers[findUserIndex]);
    return response.status(200).send();
} );
//FIN METHOD PATCH REQUEST

//INICIO METHOD DELETE REQUEST
app.delete( '/api/users/:id', resolveIndexByUserId , ( request, response )=>{
    const { findUserIndex } = request;   
    mockUsers.splice(findUserIndex, 1);
    return response.status(200).send();
} );
//FIN METHOD DELETE REQUEST