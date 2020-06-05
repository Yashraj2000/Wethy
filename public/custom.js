// on page reload change the href to "/"
if (performance.navigation.type == 1) {
  window.location.href = "/";
} 
// showing error message without button click 
const elem = document.getElementById('modal1');
const instance = M.Modal.init(elem, {dismissible: false});
instance.open();
