export const setItemToSession = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value)
  } catch (err) {
    console.error('[setItemToSession]: error occured during setting value', err)
    throw err
  }
}

export const getItemFromSession = (key: string) => {
  try {
    return sessionStorage.getItem(key)
  } catch (err) {
    console.error('[setItemToSession]: error occured during getting value', err)
    throw err
  }
}
