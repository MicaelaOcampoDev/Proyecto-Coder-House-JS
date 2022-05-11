$('#tituloImportante')
const textoCards = document.getElementsByClassName ('colorTextoCards');


// Card 1
const btnCard1= document.getElementById('btnCard1');
function productoCepillo(){
  console.log('Cepillo de dientes');
}

btnCard1.addEventListener('click', productoCepillo)

// Card 2
const btnCard2= document.getElementById('btnCard2');
function productoEsponja(){
  console.log('Esponja vegetal');
}

btnCard2.addEventListener('click', productoEsponja)

// Card 3
const btnCard3= document.getElementById('btnCard3');

btnCard3.addEventListener('click', () => {
  console.log('Peine de bambu')
})

// Formulario

let form = document.getElementById("form");
form.addEventListener("submit", datosDeFormulario);

function datosDeFormulario(e) {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let nombre = document.querySelector("#nombre").value;

    console.log(email);
    console.log(nombre);
    
    e.target.reset();
    localStorage.setItem(email,nombre);
}

// jQuery desafio complementario

$("body").prepend('<p id="p1" class= "text-center">SEGUINOS EN NUESTRAS REDES SOCIALES: IG Y FB @PACHITA.CO </p>');
$("#p1").css("background-color", "#c9d894")

        .slideUp(3500)
        .slideDown(3000);

