import data from './titanic-data.js'

const titanic = document.querySelector('#titanic')

titanic.style.display = 'grid'
titanic.style.gridTemplateColumns = 'repeat(48, 18px)'
titanic.style.gridGap = '6px'
titanic.style.backgroundColor = 'lightbrown'

const passengers = data.map(p => {
  return document.createElement('div')
})

passengers.forEach(p => {
  titanic.appendChild(p)
})

function sortSurvival() {
  data.sort((a,b) => {
    if (a.fields.survived < b.fields.survived) {
      return -1
    } else if (a.fields.survived > b.fields.survived) {
      return 1
    }
      return 0
  })
}

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

function sortAge() {
  data.sort((a,b) => {
    return a.fields.age - b.fields.age
  })
}

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

function renderPassengerStyles() {
  passengers.forEach((p, i) => {
  p.classList.add('passenger')
  p.dataset.id = i
  p.style.width = '40px'
  p.style.height = '28px'
  p.style.borderRadius = data[i].fields.sex === 'female' ? '50%' : '0'
  p.style.opacity = data[i].fields.survived === 'Yes' ? '1.0' : '.5'
  const portColor = { S: 'rgb(229, 255, 133)', C: 'lightblue', Q: 'red', undefined: 'green'}
  p.style.backgroundColor = portColor[data[i].fields.embarked]
})
}
renderPassengerStyles()

const passengerDetails = document.querySelector('#passenger-details')

document.body.addEventListener('mouseover', (e) => {
  if (e.target.matches('.passenger')) {
      const id = e.target.dataset.id
      const fields = data[id].fields
      passengerDetails.style.display = 'block'
      passengerDetails.style.position = 'absolute'
      passengerDetails.style.left = `${e.pageX - 290}px`
      passengerDetails.style.top = `${e.pageY - 200}px`
      passengerDetails.style.backgroundColor = 'yellow'
      passengerDetails.style.width = '200px'
      passengerDetails.style.height = '180px'
      passengerDetails.style.border = '1px solid red'
      passengerDetails.style.padding = '1em'

      passengerDetails.innerHTML = `
      <strong>${fields.name}</strong>
      <ul>
        <li>Age: ${fields.age}</li>
        <li>Sex: ${fields.sex}</li>
        <li>Class: ${fields.pclass}</li>
        <li>Survived: ${fields.survived}</li>
        <li>Embarked: ${fields.embarked}</li>
        <li>Fare: ${fields.fare}</li>
      </ul>`
  }
} )

document.body.addEventListener('mouseout', (e) => {
  if (e.target.matches('.passenger')) {
    passengerDetails.style.display = 'none'
  }
})

document.body.addEventListener('click', (e) => {
  if (e.target.matches('.sort-by-age')) {
    sortAge()
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