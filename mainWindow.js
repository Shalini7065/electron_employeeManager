const electron = require("electron");
const ipc = electron.ipcRenderer;
const $ = require('jquery');


//Add Item
ipc.on('emp:add', function (e, empFname, empLname, empDob, empSalary, empAddress, empCity, empDept) {
  var trd = '';
  trd += '<tr>';
  trd += '<td>' + empFname + '</td>'
  trd += '<td>' + empLname + '</td>'
  trd += '<td>' + empDob + '</td>'
  trd += '<td>' + empSalary + '</td>'
  trd += '<td>' + empAddress + '</td>'
  trd += '<td>' + empCity + '</td>'
  trd += '<td>' + empDept + '</td>'
  trd += '</tr>';
  $('.tbody').append(trd);
});

//Clear items
ipc.on('emp:clear', function () {
  $('.tbody').html('');
});


