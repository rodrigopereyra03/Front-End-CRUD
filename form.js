
let boton = document.getElementById("btnRegister");


boton.addEventListener("click", async evento =>{
    evento.preventDefault();
   await registrarProducto();
   limpiarCampos();
    listarProductos();
})

// Registrar un producto
let registrarProducto = async()=> { 

let campos = {};

campos.name = document.getElementById("name").value;
campos.description = document.getElementById("description").value;
campos.price = document.getElementById("price").value;
campos.amount = document.getElementById("amount").value;

if (!campos.name || !campos.description || !campos.price || !campos.amount) {
    document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos'; // Puedes cambiar esto a la forma en que deseas manejar el mensaje de error.
    return;
}
document.querySelector('#msgFormAdd').innerHTML = '';

const peticion = await fetch("http://localhost:8080/api/lamps",
{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(campos)
});
}

// Establece los valores de los campos en blanco o nulos después de registrar el producto
let limpiarCampos = () => {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("amount").value = "";
}

window.onload = function(){
    listarProductos();
}

// Trae todos los productos
let listarProductos = async()=>{
    const peticion = await fetch("http://localhost:8080/api/lamps",
    {
        method : 'GET',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const saveProduct = await peticion.json();

    let contentTable = "";

    for(let saveProducts of saveProduct){
        
    let contentRow = `<tr>
    <td>${saveProducts.id}</td>
    <td>${saveProducts.name}</td>
    <td>${saveProducts.description}</td>
    <td>${saveProducts.price}</td>
    <td>${saveProducts.amount}</td>
    <td>
        <i onClick = "editarProducto(${saveProducts.id})" class="material-icons button edit">edit</i>
        <i onClick = "borrarProducto(${saveProducts.id})" class="material-icons button delete">delete</i>
      </td>
      </tr>
    `
    contentTable += contentRow;
    }
    document.querySelector("#IdTabla tbody").outerHTML = contentTable;
}

// Elimina un producto
let borrarProducto = async(id)=>{
    const peticion = await fetch("http://localhost:8080/api/lamps/"+id,
    {
        method : 'DELETE',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    listarProductos();
}

// Actualizar un producto
let idEditar;
let editarProducto = async(id)=>{
    
    mostrarFormulario();

    idEditar = id;

    const peticion = await fetch("http://localhost:8080/api/lamps/"+id,
    {
        method : 'GET',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const product = await peticion.json();
    document.getElementById("name1").value = product.name
    document.getElementById("description1").value = product.description
    document.getElementById("price1").value = product.price
    document.getElementById("amount1").value = product.amount

    let btnModificar = document.getElementById("btnModificar");
    let btnCancelar = document.getElementById("btnCancelar");
   
}

btnModificar.addEventListener("click",evento =>{
    evento.preventDefault();
    actualizar(idEditar);
    location.reload();
});

btnCancelar.addEventListener("click",evento =>{
    evento.preventDefault();
    location.reload();
});


let actualizar = async(id)=>{
    let campos = {};
    campos.id = id;
    campos.name = document.getElementById("name1").value;
    campos.description = document.getElementById("description1").value;
    campos.price = document.getElementById("price1").value;
    campos.amount = document.getElementById("amount1").value;

    const peticion = await fetch("http://localhost:8080/api/lamps",
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
    });
     listarProductos();
}


function mostrarFormulario(){
    let formulario = document.getElementById("formulario").style.visibility="visible";
}

let ocultarFormulario = () => {

    let formulario = document.getElementById("formulario").style.display = "none";
}

