export const cleanForm = (
  nameInput: React.RefObject<HTMLInputElement >,
  lastName: React.RefObject<HTMLInputElement>,
  fechaSalidaRef: React.RefObject<HTMLInputElement>,
  fechaEntradaRef: React.RefObject<HTMLInputElement>,
  identificationRef: React.RefObject<HTMLInputElement>,state:boolean
) => {
  if(state === false){
    [nameInput, lastName, fechaSalidaRef, fechaEntradaRef, identificationRef].forEach(ref => {
    if (ref.current) ref.current.value = '';
  });
  }
};