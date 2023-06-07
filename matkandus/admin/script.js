// const API_URL = 'https://andrease-matkad-app.onrender.com';
const API_URL = 'http://localhost:5070';
const matkad = document.querySelector('#matkad');
const uusMatk = document.querySelector('#uus-matk');
matkad.innerHTML = 'Loading...';

function startCreatingNewTrek() {
  console.log('asdf');
  uusMatk.style.display = 'flex';
}

function closeNewTrekPanel() {
  uusMatk.style.display = 'none';
}

async function getTreks() {
  try {
    const treks = await fetch(`${API_URL}/api/treks`).then((response => response.json()));
    console.log(treks);
    matkad.innerHTML = `
      <h2>Matkad</h2>
    `;
    for (let trek of treks) {
      matkad.innerHTML += `
        <a href="">${trek.name}</a>
      `;
    }
    matkad.innerHTML += `
      <a onclick="startCreatingNewTrek()" href="javascript:;">Lisa uus matk</a>
    `;
  } catch(e) {
    console.log(e);
    matkad.innerHTML = 'Error, couldn\'t fetch treks';
  }
}

await getTreks();