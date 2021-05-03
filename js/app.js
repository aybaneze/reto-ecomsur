

 function datosJson() {
    fetch('http://www.omdbapi.com/?i=tt0944947&Season=1&apikey=a0a37bfb')
    .then( (respuesta) => {
        return respuesta.json();
    })
    .then(datos =>{
            
        console.log(datos);
            let html='';
                let indice = 0;
                for(let i of datos["Episodes"]){
                    console.log(indice);
                    console.log(i)
                    html += `
                    <div class="movie">
                        <div class="movie-container">
                            <div class="movie__image">
                                <img src="http://img.omdbapi.com/?i=tt0944947&Season=1&apikey=a0a37bfb" alt="">
                            </div>
                            <div class="movie__description">
                                <div class="description">
                                    <h3>${i.Title}</h3>
                                </div>
                                <div class="fecha">
                                    <p class="fe">Fecha de estreno:  ${i.Released}</p>
                                    <p > S/  <span class='price'>45</span> </p>
                                </div>
                                <div class="btn">
                                    <button id="${i.Episode}">AGREGAR</button>
                                </div>
                            </div>
                        </div>
                    </div>  
                `;
                ++indice;
               
                            }
            // console.log(datos.portafolio[0].titulo); 
          
        document.querySelector('#products').innerHTML = html;
       return  addCarrito(datos);
      
        
       })
}
datosJson();

function addCarrito(datos){
    datos["Episodes"].forEach(function(element,index,y) {
        document.getElementById(element.Episode).addEventListener('click', function(e){
          setCarrito(e.target.parentElement.parentElement.parentElement.parentElement,element.Episode)
        } )
    });
}
let carrito = {};
function setCarrito(object,id){
    console.log(object,id)
    const product = {
        id: id,
        title: object.querySelector('h3').textContent,
        fecha: object.querySelector('h3').textContent,
        price: parseInt(object.querySelector('.price').innerHTML),
        cantidad: 1
    }
    if(carrito.hasOwnProperty(product.id)){
        product.cantidad = carrito[product.id].cantidad + 1
    }
    let nCant = Object.values(carrito).reduce((acc, {cantidad})=>   acc + cantidad, 0)
    let Precio = Object.values(carrito).reduce((acc, {cantidad,price}) => ((acc + cantidad) +1) * price, 0)  
    console.log(Precio)
    carrito[product.id] = {...product}
    pintarLista(product, nCant, Precio)  
    document.getElementById('number').innerHTML =  nCant+1;
 
    
}

function pintarLista(product, nCant, precio){
    let html='';
    html += `
        <div>
           
                <div>
                    id: ${product.id} <br>
                    nombre: ${product.title} <br>
                    precio: ${product.price}<br>
                    cantidad: ${product.cantidad} <br>
                </div>
                <div class="delete">
                    <button id="${product.id}">Eliminar</button>
                </div>
        </div>
    `;

    document.querySelector('#list-car').innerHTML += html;
    document.querySelector('#total').innerHTML = precio;
}

let carDetail= document.getElementById('carritoDetalle');
document.getElementById('carView').addEventListener('click', function(e){
    if(carDetail.classList.contains('active')){
        carDetail.classList.remove('active');
    }else{
        carDetail.classList.add('active');
    }
   
  })