import data from './titanic-data.js'


// visualization 2 - titanic sort 
// get a reference to the #titanic div in index.html
const titanic = document.querySelector('#titanic')

// set some styles on the titanic
// display flex, justifyContent center, alignItems flex-end
titanic.style.display = 'grid'
// change the number of columns on the titanic to 34
titanic.style.gridTemplateColumns = 'repeat(34, 15px)'
titanic.style.gridGap = '2px'

// map over the data and make a new element for each passenger
// use map to transform each passenger (p) into a div (createElement)
// creating a div doesnt place it in the DOM, it just creates it 
// returns an array of passenger divs 
const passengers = data.map(p => {
  return document.createElement('div')
})

// loop over each passenger and append them to the titanic
// append each of the divs to the DOM 
// each of those divs are a child to the titanic
// they are now in the DOM
passengers.forEach(p => {
  titanic.appendChild(p)
})


// sort data by survival status
function sortSurvival() {
  data.sort((a,b) => {
    // return a number less than 1 if a comes before b 
    // if it returns 0 then a and b stay in the same place 
    // if it returns a number greater than 1 then b comes before a
    if (a.fields.survived < b.fields.survived) {
      return -1
    } else if (a.fields.survived > b.fields.survived) {
      return 1
    }
      return 0
  })
}

// sort by embarkation
// embarked is a string but can be compared numerically
function sortEmbarked() {
  data.sort((a,b) => {
    if (a.fields.embarked < b.fields.embarked){
      return -1
    } else if (a.fields.embarked > b.fields.embarked) {
      return 1
    }
    return 0
  })
} 

// sort by age 
function sortAge() {
  // a and b represents an item in the data 
  data.sort((a,b) => {
    // 25yrs (a) - 20yrs (b) = 5 its a positive number so a should come before b 
    // if its -5 then a would come after b
    return a.fields.age - b.fields.age
  })
}

// sort data by gender 
function sortSex() {
  data.sort((a,b) => {
    if (a.fields.sex < b.fields.sex) {
      return -1
    } else if (a.fields.sex > b.fields.sex) {
      return 1
    }
    return 0
  })
}

// sort data by class 
function sortClass() {
  data.sort((a,b) => {
    if (a.fields.pclass < b.fields.pclass) {
      return -1
    } else if (a.fields.pclass > b.fields.pclass) {
      return 1
    }
    return 0
  })
}

// sort data by fare 
function sortFare() {
  data.sort((a,b) => {
    if (a.fields.fare < b.fields.fare) {
      return -1
    } else if (a.fields.fare > b.fields.fare) {
      return 1
    }
    return 0
  })
}

// let's loop over each passenger and set some styles 
function renderPassengerStyles() {
  // style each of those divs
  passengers.forEach((p, i) => {
  // when looping over passenger divs lets pass in a class name dynamically
  p.classList.add('passenger')
  // add an attribute for each passenger so that there is an id for every passenger - (index)
  p.dataset.id = i
  // make the squares a little bigger 15px by 15px. 
  // you'll need to change both the gridTemplateColumn on the
  // titanic and the width and height of each passenger. 
  p.style.width = '15px'
  p.style.height = '15px'
  // display each passenger as a circle if they are female. 
  // do this by setting the borderRadius of each passenger. 
  // match the passenger in passengers to the object data 
  // in the data array by the index. 
  p.style.borderRadius = data[i].fields.sex === 'female' ? '50%' : '0'
  // display each passengers who did not survive as 
  // opacity 0.5. 
  p.style.opacity = data[i].fields.survived === 'Yes' ? '1.0' : '.5'
  // set the backgroundColor of each passenger by their 
  // embarked value. There are three possible values: 
  // 'S', 'C', and 'Q'
  const portColor = { S: 'tomato', C: 'purple', Q: 'orange', undefined: 'green'}
  p.style.backgroundColor = portColor[data[i].fields.embarked]
})
}
// call the function so it shows up as a starting point (pre-click)
renderPassengerStyles()

//  visualization 3 ~ passenger-details

// make a variable equal to query selector - to get a reference to the the passenger details div in the html file
const passengerDetails = document.querySelector('#passenger-details')

// create an event listener that will register when the cursor enters one of the passenger divs 
// instead of putting an event listener on every div, we place it on the whole body ~ event delegation
// add it to the body tag - the body tag always exists unlike the divs that are being dynamically created, this way its less work!
// the event we are listening for is 'mouseover'
// event handler (function) --> function takes in an event object (e)
document.body.addEventListener('mouseover', (e) => {
  // the event object is created and passed passed to the function 
  // target is the property (there are hundreds of properties to these event objects)- target is where the event occurs 
  // .matches is a function that asks- does the event.target match the description passed in (.css selector)? 
  if (e.target.matches('.passenger')) {
      // console.log('mouse over div')
    // check if e has id (index in titanic data) with .target 
      const id = e.target.dataset.id
      const fields = data[id].fields
      // styling for passenger details box with information
      // block shows the div when mouse is over 
      passengerDetails.style.display = 'block'
      passengerDetails.style.position = 'absolute'
      passengerDetails.style.left = `${e.pageX + 3}px`
      passengerDetails.style.top = `${e.pageY + 3}px`
      passengerDetails.style.backgroundColor = 'white'
      passengerDetails.style.border = '1px solid'
      // space between edges and content
      passengerDetails.style.padding = '0.5em'

      passengerDetails.innerHTML = `
      <strong>${fields.name}</strong>
      <ul>
        <li>Age: ${fields.age}</li>
        <li>Survived: ${fields.sex}</li>
        <li>Class: ${fields.pclass}</li>
        <li>Age: ${fields.survived}</li>
        <li>Survived: ${fields.embarked}</li>
        <li>Class: ${fields.fare}</li>
      </ul>`
  }
} )

document.body.addEventListener('mouseout', (e) => {
  if (e.target.matches('.passenger')) {
    // hide passenger details div when mouse over div
    passengerDetails.style.display = 'none'
  }
})

// event listener for buttons
// if a click occurs at the body tag the event will run 
// function takes in event object and if the target of the object matches then it sorts data
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.sort-by-age')) {
    // call the function to sort by age written above and sorts data
    sortAge()
    // render the new styles when you click the button and the data sorts differently
    renderPassengerStyles()
  } else if (e.target.matches('.sort-by-fare')) {
    sortFare()
    renderPassengerStyles()
  } else if (e.target.matches('.sort-by-embarked')) {
    sortEmbarked()
    renderPassengerStyles()
  } else if (e.target.matches('.sort-by-class')) {
    sortClass()
    renderPassengerStyles()
  } else if (e.target.matches('.sort-by-sex')) {
    sortSex()
    renderPassengerStyles()
  } else if (e.target.matches('.sort-by-survival')) {
    sortSurvival()
    renderPassengerStyles()
}
})