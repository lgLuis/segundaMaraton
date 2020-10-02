// GET ALL BIKES

fetch('http://localhost:4000/compras').then(function(res){
    return res.json();
}).then(function(response){ //response
    const lista             =document.querySelector(".bikes-list");

    response.compras.forEach(function(compra){//response
        lista.innerHTML     +=`<li>${compra.clientId}</li>`
    });
})

//GET
const buscar                =document.querySelector("#buscar");
buscar.addEventListener("click", function(){
    const id_compra         =document.querySelector("#id_compra").nodeValue;

    fetch('http://localhost:4000/compras/ '+id_compra).then((res)=>{
        return res.json();
    }).then(function(response){
        const compraBuscada =document.querySelector("#compraBuscada");
        compraBuscada.innerText=response.compras.clientId

    })
});