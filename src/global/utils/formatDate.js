export function formatDate(date) {
  // Crear un objeto de fecha con la cadena proporcionada
  let dateObj = new Date(date);

  // Extraer los componentes de la fecha y hora
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1; // El mes va de 0 a 11, por lo tanto se suma 1
  let day = dateObj.getDate();
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();

  // Formatear el resultado según lo solicitado
  let formattedDate = `${day}/${month}/${year} ${hour}:${minutes}`;

  return formattedDate;
}
