function datas(valorData) {

  console.log(valorData)
  var dayOfday = valorData.getDate();
  var dayOfMonth = valorData.getMonth();
  var year = valorData.getFullYear();

  switch (dayOfMonth) {
    case 0:
      month = "JAN";
      break;
    case 1:
      month = "FEV";
      break;
    case 2:
      month = "MAR";
      break;
    case 3:
      month = "ABR";
      break;
    case 4:
      month = "MAI";
      break;
    case 5:
      month = "JUN";
      break;
    case 6:
      month = "JUL";
      break;
    case 7:
      month = "AGO";
      break;
    case 8:
      month = "SET";
      break;
    case 9:
      month = "OUT";
      break;
    case 10:
      month = "NOV";
      break;
    case 11:
      month = "DEZ";  
  }
  var secondDate = dayOfday+month+year;
  return secondDate
}
