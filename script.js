import data from './titanic-data.js'

// visualization 1
// port colors
const portColor = { 
  S: 'tomato', 
  C: 'purple', 
  Q: 'orange', 
  undefined: 'green',
  total: 'lightgray'
}
// variable to hold the bars - bars
const titanicEmbarked = document.querySelector('#titanic-embarked')
// count the passengers that embarked at each stop
// reduce titanic data to an object with three keys - 1 with each stop
// two parameters - a function(takes in accumulator and passenger) and an object 
const embarkedCounts = data.reduce((acc, p) => {
  // key does not exist in acc
  if (acc[p.fields.embarked] === undefined) {
    // create key and give it a value of 1 
    acc[p.fields.embarked] = 1
    // else if it not undefined
  } else {
    // add one
    acc[p.fields.embarked] += 1
  }
  return acc
}, {})

// key for total
embarkedCounts.total = data.length

// object with keys and values to each key 
// set of embarked keys 
// embarkedCounts is an object - keys will will make an array of all the keys in that object
// array of keys 
const embarkedKeys = Object.keys(embarkedCounts)

// the value at embarkedCount for each key is the number of passengers 
embarkedKeys.forEach((e) => {
  // create a div 
  const el = document.createElement('div')
  // append child and add el to the html contained element 'titanicEmbarked'
  titanicEmbarked.appendChild(el)
  // style div
  el.style.width = '30px'
  const count = embarkedCounts[e]
  const percent = count / data.length * 100
  el.style.height = `${percent}%`
  // colors for each div using portColor where each is defined with a color
  el.style.backgroundColor = portColor[e]
  // add margin to el (bar element)
  el.style.margin = '1px'
})

// display bars side by side 
titanicEmbarked.style.display = 'flex'
// align at the bottom 
titanicEmbarked.style.alignItems = 'flex-end'
// border 
titanicEmbarked.style.border = '1px solid'
// box containing the bars
titanicEmbarked.style.width = '300px'
titanicEmbarked.style.height = '300px'
// scale bars to a percentage of the height of the box - so it doesn't shoot out 
// you do this by using % instead of pixels in the el.style.height


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

// let's loop over each passenger and set some styles 
// style each of those divs
passengers.forEach((p, i) => {
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




















