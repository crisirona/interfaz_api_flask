const URL_API = 'http://127.0.0.1:5000/api/instrumentos/';
const URL_API_STOCK = 'http://127.0.0.1:5000/api/instrumentos/sucursal/';

const spanError = document.getElementById('error');

async function loadInstrumentos(){
    const res= await fetch(URL_API);
    const data = await res.json();
    
    if (res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status +data.message;
    }else {
        console.log(data)
    }
}

async function lastId(suc,name){
    var requestOptions = {
        method: 'DELETE'
      }
      
    fetch("http://127.0.0.1:5000/api/instrumentos/venta/"+suc+"/"+name, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};

async function loadInstrumentosName(){
    var sucur = document.getElementById("sucur").value;
    const end = 'names/';
    const res= await fetch(URL_API+end+sucur);
    const data = await res.json();
    
    if (res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status +data.message;
        }
    else {
        const len = Object.keys(data).length;
        const k = Object.keys(data);
        const c = Object.values(data);
        var fila="";
        var fila2="<th scope='row'>"+sucur+"</th>";
        for (var i = 0; i < len; i++) {
            fila="<td>"+k[i]+"</td>"+"<td>"+c[i]+"</td>"+"<td><button class='btn btn-secondary' onclick='lastId("+toString(sucur)+','+toString(k[i])+")'>Venta</button></td>"
            var btn = document.createElement("TR");
   	        btn.innerHTML="<tr>"+fila2+fila+"</tr>";
            document.getElementById("tablita").appendChild(btn);
         };

    };
};



async function aumentarInst(){

    var suc = document.getElementById("insuc").value;
    var nom = document.getElementById("nstock").value;
    var cant = document.getElementById("inaum").value;

    //const res= await fetch(URL_API+end+suc);
    const res= await fetch(URL_API+'au/'+nom);
    const data = await res.json();

    var mar = data[1];
    var cat = data[2];
    var nomb = data[0];

    let _datos = {
        marca: mar,
        categoria: cat,
        name: nomb,
        sucursal: suc
      }
      for (let i = 0; i < cant; i++) {
        fetch('http://127.0.0.1:5000/api/instrumentos/add', {
            method: "POST",
            body: JSON.stringify(_datos),
            headers: {"Content-type": "application/json;"}
          })
          .then(response => response.json()) 
          .then(json => console.log(json));
          
      }
      
      
      
}


async function disminuirInst(){

    var suc = document.getElementById("insuc").value;
    var nom = document.getElementById("nstock").value;
    var cant = document.getElementById("indis").value;    
         
    const res= await fetch(URL_API+'di/'+nom+'/'+suc+'/'+cant);
    const data = await res.json();
      
    console.log(data.length)
    var requestOptions = {
        method: 'DELETE'
      };
    for (let i = 0; i < data.length  ; i++) {
        fetch("http://127.0.0.1:5000/api/instrumentos/delete/"+data[i], requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        
    }
    
}


async function consultaStock(){
    const s= document.getElementById("nstock").value;
    const res= await fetch(URL_API_STOCK+s);
    const data = await res.json();
    
    if (res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status +data.message;
    }else {
        const len = Object.keys(data).length;
        const ints = Object.values(data);
        var fila="";
        var fila2="<th scope='row'>"+s+"</th>";
        for (var i = 0; i < len; i++) {
            fila="<th scope='row'>"+ints[i]+"</th>";
            var btn = document.createElement("TR");
   	        btn.innerHTML="<tr>"+fila2+fila+"</tr>";
            document.getElementById("tablita").appendChild(btn);
         };
        
    }

   
}

function guardar(){
   
    var _nom = document.getElementById("nomb").value;
    var _cat = document.getElementById("cat").value;
    var _precio = document.getElementById("precio").value;
    var _stock = document.getElementById("stock").value;

    var fila="<tr><td>"+_nom+"</td><td>"+_cat+"</td><td>"+_precio+"</td><td>"+_stock+"</td></tr>";
    
    var btn = document.createElement("TR");
   	btn.innerHTML=fila;
    document.getElementById("tablita").appendChild(btn);
}


async function guardarInst(){

    var nomb = document.getElementById("nomb").value;
    var cat = document.getElementById("cat").value;
    var suc = document.getElementById("suc").value;
    var mar = document.getElementById("marca").value;

    let _datos = {
        marca: mar,
        categoria: cat,
        name: nomb,
        sucursal: suc
      }
      
      fetch('http://127.0.0.1:5000/api/instrumentos/add', {
        method: "POST",
        body: JSON.stringify(_datos),
        headers: {"Content-type": "application/json;"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json));
    
}

loadInstrumentos()