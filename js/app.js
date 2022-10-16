const contenedor = document.querySelector('#contenedor')
const modal = new bootstrap.Modal('#modal', {})

window.onload = () => {
    getPersonajes()
}

async function getPersonajes(){
    const url = 'https://attackontitanapi.herokuapp.com/api/characters'

    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        mostrarPersonajes(resultado)
    } catch (error) {
        console.log(error)
    }
}

function mostrarPersonajes(resultado){
   resultado.forEach((personaje) => {
    const  {id, name, gender, picture_url} = personaje
    const personajeContenedor = document.createElement('div')
    personajeContenedor.classList.add('col-md-4')

    const personajeCard = document.createElement('div')
    personajeCard.classList.add('card', 'mb-4')

    const personajeImagen = document.createElement('img')
    personajeImagen.classList.add('card-img-top')
    personajeImagen.src = picture_url

    const personajeCardBody = document.createElement('div')
    personajeCardBody.classList.add('card-body')

    const personajeHeading = document.createElement('h3')
    personajeHeading.classList.add('card-title', 'mb-3', 'text-center')
    personajeHeading.textContent = name

    const personajeGender = document.createElement('p')
    personajeGender.classList.add('card-text', 'text-center', 'font-italic')
    personajeGender.textContent = gender

    const personajeButton = document.createElement('button')
    personajeButton.classList.add('btn', 'btn-danger', 'w-100')
    personajeButton.textContent = 'Ver personaje'
    personajeButton.onclick = function() {
        verPersonaje(id)
    }

    personajeCardBody.appendChild(personajeHeading)
    personajeCardBody.appendChild(personajeGender)
    personajeCardBody.appendChild(personajeButton)

    personajeCard.appendChild(personajeImagen)
    personajeCard.appendChild(personajeCardBody)

    personajeContenedor.appendChild(personajeCard)

    contenedor.appendChild(personajeContenedor)

   })


}
async function verPersonaje(id){
    console.log(id)
    const url = `https://attackontitanapi.herokuapp.com/api/characters/${id}`

    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        mostrarPersonaje(resultado)

    } catch (error) {
        console.log(error)
    }
}
function mostrarPersonaje(resultado){
    const {name, gender, id, picture_url} = resultado 

    const modalTitle = document.querySelector('.modal .modal-title')
    const modalBody = document.querySelector('.modal .modal-body')

    modalTitle.textContent = name

    modalBody.innerHTML = `
    <img class="img-fluid" src="${picture_url}"/>
    <p class="text-center text-primary">${gender}</p>
    `

    modal.show()
}