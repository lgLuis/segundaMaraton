const express       =require('express');
const app           =express();
const cors          =require('cors');
//const morgan        =require('morgan');
//const uniqid        =require('uniqid');


app.listen('4000', function(){
    console.log("server up");
})
app.get('/', function(req, res){
    res.status(200).send('hola')
});

//MIDDLEWARES
app.use(express.json());
app.use(cors());
//app.use(morgan("combined"));
//app.use(uniqid());

//INICIO DE BDD COMPRAS
let compras = [
    {
        "id":0,
        "clientId":"A01",
        "products":"",
        "amount":1000,
        "paymentMethod":"Credit Card"
    },
    {
        "id":1,
        "clientId":"A02",
        "products":"",
        "amount":2500,
        "paymentMethod":"Credit Card"
    }

];

//GET COMPRAS
app.get('/compras', function(req, res){
//    res.status(200).send({"compras":compras}) // se puede abreviar
    res.status(200).send({compras})             //oki oki abreviado
})

//GET DE COMPRAS BY ID      FOREACH
app.get('/compras/:id', function(req, res){
    const id =req.params.id;
        console.log("id: ", id)
    let clienteEcontrado =undefined;
    compras.forEach(function(compra){
        if(compra.id ==id){
            clienteEcontrado=compra;
            return res.status(200).json({compra:clienteEcontrado});
        }
    })
    res.status(404).send({"message":"Cliente Not Found-404..."});
})
/*
//GET DE COMPRAS BY ID      FILTER
app.get('/compras/:id', function(req, res){
    const id =req.params.id;

    const resultado =compras.filter(function(compra){
        return compra.id===id;
    });
    if(resultado.length>0){
        res.status(200).send({resultado});
    }else{
        res.status(404).send({})
    }
});
*/

//POST DE CREAR COMPRAS
app.post('/compras', function(req, res){//POST TIENE BODY
    if(!req.body || !req.body.clientId || !req.body.products || !req.body.amount || !req.body.paymentMethod){
        return res.status(400).send({"message":"Bad Request"});
    }
    const newCliente={
        "id":getNextId(),// funcion pendiente
        "clienteId":req.body.clientId,
        "products":req.body.products,
        "amount":req.body.amount,
        "paymentMethod":req.body.paymentMethod
    }
    compras.push(newCliente);
    return res.status(201).send({"compra": newCliente});
})

//FUNCIÓN PARA GENERAR ID
function getNextId(){return (compras.reduce((a,b)=>{return a.id>b.id? a:b})).id+1;
};

//DELETE COMPRAS
app.delete('/compras/:id', function(req, res){
    const   ID  =req.params.id;
    let index   =null;
    compras.forEach(function(compra, i){    // parametro i=?????? 
        if(compra.id=ID){
            index=i;
        }
    })
    if(index!==null){
        compras.splice(index,1);
        res.status(200).send({"message":"Compra Eliminada"});
    }else{
        res.status(404).send({"message":"Compra No encontrada"});
    }
})

//PUT MODIFICAR COMPRAS
app.put('/compras/:id', function(req, res){
    if(!req.body || !req.body.clientId || !req.body.products || !req.body.amount || !req.body.paymentMethod){
        return res.status(400).send({"message":"NO SE PUDO MODIFICAR."});
    }else{
        compras ={

        }
    }

})
