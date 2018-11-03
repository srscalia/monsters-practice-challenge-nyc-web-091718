// //Steps:
// // - Get the first 50 monsters to show on the page (name,age and description) -- COMPLETE
// // - above monsters, make form to create a new monster (fields for name, age, description) and a button ('Create Monster Button') -- COMPLETE
// // - When you submit form, monster should be added to the list and saved in the API -- COMPLETE
// // - At the end of the first 50, there should be a button to load the next 50 monsters.

document.addEventListener('DOMContentLoaded', () => {
  let monsters = []
  const monsterContainer = document.getElementById('monster-container')
  const createMonster = document.getElementById('create-monster')
  const form = document.getElementById('form')
  const forward = document.getElementById('forward')
  const back = document.getElementById('back')


  let pageNumber = 1;
  getPage()

  function getPage() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then((responseObject) => responseObject.json())
    .then((monstersJSONDATA)=> {
      monsters = monstersJSONDATA
      monsters.forEach((monster)=>{
        monsterContainer.innerHTML += `
          <div data-id="${monster.id}">
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Description: ${monster.description}</p>
          </div>`
      }) //end of the for each
    }) //end of the then for the parsed JSON data
  } // end of get page function

  forward.addEventListener('click', (event)=> {
    pageNumber++
    monsterContainer.innerHTML=""
    window.scrollTo(0,0)
    //CALL THE FUNCTION
    getPage()
  }) // end of add event listener for forward

  back.addEventListener('click', (event)=> {
    pageNumber--
    monsterContainer.innerHTML=""
    window.scrollTo(0,0)
    //CALL THE FUNCTION
    getPage()
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    postMonster(event)
    form.reset()
  })

  const postMonster = (event) => {
    fetch('http://localhost:3000/monsters/',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"},
        // data: { name: string, age: number, description: string },
        body: JSON.stringify({
          "name": event.target.children[0].value,
          "age": event.target.children[1].value,
          "description": event.target.children[2].value})}).
          then(response => {return response.json()}).
          then(json => {
            monsters.push(json)
            monsterContainer.innerHTML += `
              <div data-id="${json.id}">
                <h2>${json.name}</h2>
                <h4>Age: ${json.age}</h4>
                <p>Description: ${json.description}</p>
              </div>`
            }) //end of last then statement
          } // end of postMonster function

}) // end of DOM Content Loaded event listener
