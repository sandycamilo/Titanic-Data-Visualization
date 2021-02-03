import data from './titanic-data.js'

//Visualization 1
// variable to hold the bars
const titanicEmbarked = document.querySelector('#titanic-embarked')

const embarkedCounts = data.reduce()





//Visualization 2 
// Get a reference to the #titanic div in index.html
const titanic = document.querySelector('#titanic')

// Set some styles on the titanic
// display flex, justifyContent center, alignItems flex-end
titanic.style.display = 'grid'
// Change the number of columns on the titanic to 34
titanic.style.gridTemplateColumns = 'repeat(34, 15px)'
titanic.style.gridGap = '2px'

// Map over the data and make a new element for each passenger
// Use map to transform each passenger (p) into a div (createElement)
// Creating a div doesnt place it in the DOM, it just creates it 
// Returns an array of passenger divs 
const passengers = data.map(p => {
  return document.createElement('div')
})

// Loop over each passenger and append them to the titanic
// Append each of the divs to the DOM 
// Each of those divs are a child to the titanic
// They are now in the DOM
passengers.forEach(p => {
  titanic.appendChild(p)
})

// WHO SURVIVED - BY PORT AND GENDER
// sort data - survived?
data.sort((a,b) => {
  // return a number less than 1 if a comes before b 
  // if it returns 0 then a and b stay in the same place 
  // if it returns a number greater than 1 then b comes before a
  if (a.fields.survived === 'Yes') {
    return -1
  } 
  return 1
})

// sort by embarkation
// embarked is a strind but can be compared numerically 
data.sort((a,b) => {
  if (a.fields.embarked < b.fields.embarked){
    return -1
  } else if (a.fields.embarked > b.fields.embarked) {
    return 1
  }
  return 0
})

// sort data by gender 
data.sort((a,b) => {
  if (a.fields.sex === 'female') {
    return -1
  }
  return 1 
})

// Let's loop over each passenger and set some styles 
// Style each of those divs
passengers.forEach((p, i) => {
  // Make the squares a little bigger 15px by 15px. 
  // You'll need to change both the gridTemplateColumn on the
  // titanic and the width and height of each passenger. 
  p.style.width = '15px'
  p.style.height = '15px'
  // Display each passenger as a circle if they are female. 
  // Do this by setting the borderRadius of each passenger. 
  // Match the passenger in passengers to the object data 
  // in the data array by the index. 
  p.style.borderRadius = data[i].fields.sex === 'female' ? '50%' : '0'
  // Display each passengers who did not survive as 
  // opacity 0.5. 
  p.style.opacity = data[i].fields.survived === 'Yes' ? '1.0' : '.5'
  // Set the backgroundColor of each passenger by their 
  // embarked value. There are three possible values: 
  // 'S', 'C', and 'Q'
  const portColor = { S: 'tomato', C: 'purple', Q: 'orange', undefined: 'green'}
  p.style.backgroundColor = portColor[data[i].fields.embarked]
})




















