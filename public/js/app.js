// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('weather?address=Madrid').then((response) => {
//     response.json().then(( { error, forecast, location} ) => {
//         if (error) {
//             return console.log(`error: ${error}`)
//         }
//         console.log(`location: ${location}`)
//         console.log(`forecast: ${forecast}`)
//     })
// })


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('form input')
const messageOneElement = document.querySelector('#message-1')
const messageTwoElement = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOneElement.textContent = 'Please wait...'
    messageTwoElement.textContent = ''

    const locationSearch = searchElement.value

    fetch(`/weather?address=${encodeURIComponent(locationSearch)}`).then((response) => {
        response.json().then(( { error, forecast, location} ) => {            
            searchElement.focus()
            
            if (error) {
                messageOneElement.textContent = error
                return
            }
            messageOneElement.textContent = location
            messageTwoElement.textContent = forecast
        })
    })
})