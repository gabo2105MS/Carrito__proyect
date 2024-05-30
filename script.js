var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop:true,

    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        
      500:{
        slidesPerView:1,
        spaceBetween:5
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 0,
      },

      950:{
        slidesPerView:3,
        spaceBetween:40
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });
  
  //carrito

  const carrito= document.getElementById("carrito");
  const elemento=document.getElementById("lista");
  //console.log(elemento,"lista")
  const elemento2=document.getElementById('lista-2');
  const lista=document.querySelector("#lista-carrito tbody");
  const vaciarCarritoBtn=document.getElementById("vaciar-carrito");

  cargarEventListeners()

  function cargarEventListeners(){
    elemento.addEventListener("click",comprarElemento);
    elemento2.addEventListener("click",comprarElemento);
    carrito.addEventListener("click",eliminarElemento);
    vaciarCarritoBtn.addEventListener("click",vaciarCarrito);

    document.addEventListener("DOMContentLoaded",leerLocalStorage);
  }

  function comprarElemento(e){
    console.log(e,"evento")
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
      console.log("click en enlaces")
      const elemento = e.target.parentElement;
      leerDatoselemento(elemento);
    }
  }

  function leerDatoselemento(elemento){
    console.log(elemento,"elemento");
    const infoElemento={
      imagen:elemento.querySelector("img").src,
      titulo:elemento.querySelector("h3").textContent,
      precio:elemento.querySelector(".precio").textContent,
      id:elemento.querySelector("a").getAttribute("data-id")
    }

    insertarCarrito(infoElemento);
  }

  function insertarCarrito(elemento){

    const row=document.createElement("tr");
    row.innerHTML=`
      <td>
        <img src="${elemento.imagen}" width=100>
      </td>

      <td>
        ${elemento.titulo}
      </td>
      <td>${elemento.precio}</td>
      <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
      </td>
    `;

    lista.appendChild(row);
    guardarElementoLocalStorage(elemento);
  }

  function eliminarElemento(e){
    e.preventDefault();
    let elemento,
        elementoid;
    if(e.target.classList.contains('borrar')){
      e.target.parentElement.parentElement.remove();
      elemento=e.target.parentElement.parentElement;
      elementoid=elemento.querySelector("a").getAttribute("data-id");

    }

    eliminarElementoLocalstorage(elementoid)
  }

  function vaciarCarrito(){
    while(lista.firstChild){
      lista.removeChild(lista.firstChild);

    }

    vaciarLocalStorage();
    return false;
  }

  function guardarElementoLocalStorage(elemento){
    let elementos;
    elementos = obtenerelementosLocalStorage();
    elementos.push(elemento);

    localStorage.setItem('elementos', JSON.stringify(elementos))

  }


  function obtenerelementosLocalStorage(){
    let elementosLS;

    if(localStorage.getItem('elementos') === null){
      elementosLS = [];

    }else{
      elementosLS = JSON.parse(localStorage.getItem('elementos'));
    }
    return elementosLS;

  }

  function leerLocalStorage(){
    let elementosLS;
    
    elementosLS = obtenerelementosLocalStorage();

    elementosLS.forEach(function(elemento){
      const row=document.createElement("tr");
    row.innerHTML=`
      <td>
        <img src="${elemento.imagen}" width=100>
      </td>

      <td>
        ${elemento.titulo}
      </td>
      <td>${elemento.precio}</td>
      <td>${elemento.precio}</td>
      <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
      </td>
    `;

    lista.appendChild(row);
    })
  }

  function eliminarElementoLocalstorage(elemento){
    let elementosLS;

    elementosLS = obtenerelementosLocalStorage();
    elementosLS.forEach(function(elementoLS , index){
      if(elementosLS.id === elemento){
        elementosLS.splice(index, 1); //verificar si existe el elemento en el id
      }

    });

    localStorage.setItem('elementos', JSON.stringify(elementosLS))
  }

  function vaciarLocalStorage(){
    localStorage.clear();
  }