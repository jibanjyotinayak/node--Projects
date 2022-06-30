
// fetch('http://puzzle.mead.io/puzzle').then((response) => {

// response.json().then((data)=>{
// console.log(data)
// })


const weatherForm= document.querySelector('form')//Doubt is how this section refer to the index page form section to get the input reference
const searchElement= document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
const location=searchElement.value

 messageOne.textContent= 'Loading....'
 messageTwo.textContent = ' Please wait...'

fetch('http://localhost:3000/weather?address=' + location ).then((response) => {

response.json().then((data)=>{


if (data.error){
    messageOne.textContent= data.error
}
else{
    messageOne.textContent= data.location
        messageTwo.textContent= data.forecast
}
    // console.log(data.location)
    // console.log(data.forecast)


})
})
})