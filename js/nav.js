$('document').ready(() => {
  $('.nav-hamburger').click(() => {
    if (document.getElementById('nav').style.display == 'flex') {
      document.getElementById('nav').style.display = 'none';
    } else {
      document.getElementById('nav').style.display = 'flex';
    }
  });
});