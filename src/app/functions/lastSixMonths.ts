export function lastSixMonths() {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let lastSixMonth = [];
  var today = new Date();
  var d;
  var month;
  let months = []
  for (var i = 6; i > 0; i -= 1) {
    d = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
    month = d.getMonth() + 1;
    lastSixMonth.push(monthNames[month - 1]);
    months.push(month);
  }
  return {months:months,lastSixMonth: lastSixMonth};
}
