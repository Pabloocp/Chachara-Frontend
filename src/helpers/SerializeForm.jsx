
export const SerializeForm = (form) => {
  const formData = new FormData(form)
  const Obj = {}
  for( let [name ,value] of formData){
    Obj[name] = value
  }
  return Obj
  
}
