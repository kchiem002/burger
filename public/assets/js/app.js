const addBurger = _ => {
    fetch('/burgers', {
      method: 'POST',
      //specify content type
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        burger_name: document.querySelector('#burger_name').value,
      })
    })
    .then(_ => {
      location.reload()
    })
    .catch(e => console.log(e))
  }
  
  const devourBurger = id => {
    fetch(`/burgers/${target.dataset.uid}`, { method: 'DELETE' })
        .then(_ => {
        //when user is deleted, page automatically reloads
          location.reload()
        })
        .catch(e => console.log(e))
  }
  
  document.addEventListener('click', event => {
    event.preventDefault()
    switch(event.target.id) {

    case 'devourBurger':
    devourBurger(event.target.dataset.uid)
    console.log('devour')
    break

    case 'addBurger':
    console.log('add burger')
    addBurger(event.target.dataset)
    break
    }
  })
  