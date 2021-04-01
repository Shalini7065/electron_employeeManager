const electron = require("electron");
const $ = require('jquery');
const ipc = electron.ipcRenderer;

$('#btnAdd').on('click', function (e) {
  e.preventDefault();
  const empFname = $('#fname').val();
  const empLname = $('#lname').val();
  const empDob = $('#dob').val();
  const empSalary = $('#salary').val();
  const empAddress = $('#address').val();
  const empCity = $('#city').val();
  const empDept = $('#dept').val();

  ipc.send('emp:add', empFname, empLname, empDob,
    empSalary, empAddress, empCity, empDept);
})