import localforage from 'localforage'

localforage.config({
  name: 'Pastanagapp',
})

export const addItemtoDb = (key, value) => {
  return localforage
    .setItem(key, value)
    .then(function(value) {
      console.log(`Data ${key} added:`, value)
    })
    .catch(function(err) {
      console.log(err)
    })
}

export const removeItemfromDB = key => {
  return localforage
    .removeItem(key)
    .then(function() {
      console.log(`Data ${key} removed`)
    })
    .catch(function(err) {
      console.log(err)
    })
}

export const getItemfromDB = key => {
  localforage
    .getItem(key)
    .then(function(value) {
      console.log(`Data ${key} extracted:`, value)
      return value
    })
    .catch(function(err) {
      console.log(err)
    })
}
