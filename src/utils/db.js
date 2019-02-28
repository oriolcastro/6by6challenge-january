import localforage from 'localforage'

localforage.config({
  name: 'Pastanagapp',
})

export const addItemtoDb = (key, value) => {
  return localforage
    .setItem(key, value)
    .then(function(value) {
      console.log('Event added')
    })
    .catch(function(err) {
      console.log(err)
    })
}

export const removeItemfromDB = key => {
  return localforage
    .removeItem(key)
    .then(function() {
      console.log('Event is removed from favs')
    })
    .catch(function(err) {
      console.log(err)
    })
}

export const getItemfromDB = key => {
  return localforage
    .getItem(key)
    .then(function(value) {
      console.log(value)
    })
    .catch(function(err) {
      console.log(err)
    })
}
