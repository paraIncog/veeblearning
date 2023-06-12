/* 
  <a href="">Home</a>
  <a href="">Upcoming treks</a>
  <a href="">Treks for family</a>
  <a href="">Contact us</a>
*/

let navItemsHtml = document.querySelector('#navItems');
let navItemsList = [
  {
    pealkiri: 'Home',
    viide: 'index.html'
  },
  {
    pealkiri: 'Upcoming treks',
    viide: 'treks.html'
  },
  {
    pealkiri: 'Treks for family',
    viide: 'family.html'
  },
  {
    pealkiri: 'Contact us',
    viide: 'contact.html'
  }
];

for (const element of navItemsList) {
  navItemsHtml.innerHTML += `<a href="${element.viide}">${element.pealkiri}</a>`;
}