// API openweather

// Selectores y variables

const campo_ciudad = document.querySelector('#ciudad')
const campo_pais = document.querySelector('#pais')
const boton = document.querySelector('input[type=submit]')
const resultado = document.querySelector('#resultado')
const frase_escoge = resultado.firstElementChild
const clave_api = "2ae522d72f43de5c7e0726ab0873f05c"

// Funciones


const limpiar_alerta = (referencia) => {
    const alerta = referencia.querySelector('.alerta')
    if (alerta) {
        alerta.remove()
    }
}

const mostrar_error = (error, referencia) => {
    limpiar_alerta(referencia)
    const alerta = document.createElement('p')
    alerta.classList.add('alerta')
    alerta.textContent = error
    referencia.appendChild(alerta)
}

const desactivar_boton = () => {
    boton.disabled = true
    boton.classList.add('opacity-50')
}
const activar_boton = () => {
    boton.disabled = false
    boton.classList.remove('opacity-50')
}

const validar = (e) => {
    if (e.target.id === 'ciudad' && e.target.value.trim().length === 0) {
        desactivar_boton()
        mostrar_error('Este campo no puede estar vacío', e.target.parentElement)
        return
    }
    if (e.target.id === 'pais' && campo_pais.options[campo_pais.selectedIndex].textContent.includes('--')) {
        desactivar_boton()
        mostrar_error('Seleccione un país', e.target.parentElement)
        return
    }
    limpiar_alerta(e.target.parentElement)
    activar_boton()

}

const peticion_openweather = () => {
    const pais = campo_pais.options[campo_pais.selectedIndex].value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${campo_ciudad.value},${pais}&units=metric&appid=${clave_api}`
    //el parámetro metrics es para usar Celsius
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => mostrar_datos(data))
        .catch(error => alert(error))
}

const ocultar_frase_escoge = () => {
    frase_escoge.classList.add('opacity-0')
}

const mostrar_frase_escoge = () => {
    frase_escoge.classList.remove('opacity-0')
}

const mostrar_datos = (datos) => {
    ocultar_frase_escoge()
    console.log(datos)
    const seccion = document.createElement("section")
    resultado.appendChild(seccion)
    seccion.innerHTML = `
                        <p>Temperatura actual: ${datos.main.temp}</p>
                        <p>Max Temp: ${datos.main.temp_max}</p>
                        <p>Min temp:${datos.main.temp_min} </p>
                        `
}


// Eventos

document.addEventListener('DOMContentLoaded', (e) => {
    mostrar_frase_escoge()
    desactivar_boton()
})
campo_ciudad.addEventListener('blur', (e) => validar(e))
campo_pais.addEventListener('blur', (e) => validar(e))
boton.addEventListener('click', (e) => {
    e.preventDefault()
    ocultar_frase_escoge()
    peticion_openweather()
})





