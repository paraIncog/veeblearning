const API_URL = 'https://andrease-matkad-app.onrender.com';
// const API_URL = 'http://localhost:10000';
const matkad = document.querySelector('#matkad');
const uusMatk = document.querySelector('#uus-matk');
const matkaPaneeliPealkiri = document.querySelector('#matka-paneel-pealkiri');
const uusMatkNimi = document.querySelector('#uus-matk-nimi');
const uusMatkLaiuskraad = document.querySelector('#uus-matk-laiuskraad');
const uusMatkPikkuskraad = document.querySelector('#uus-matk-pikkuskraad');
const uusMatkHind = document.querySelector('#uus-matk-hind');
const uusMatkPildiUrl = document.querySelector('#uus-matk-pildi-url');
const uusMatkAlgus = document.querySelector('#uus-matk-algus');
const uusMatkLopp = document.querySelector('#uus-matk-lopp');
const uusMatkKirjeldus = document.querySelector('#uus-matk-kirjeldus');
const nupud = document.querySelector('#nupud');
const salvestaMatkNupp = document.querySelector('#lisa-matk-nupp');
let treks = [];
matkad.innerHTML = 'Loading...';

function startCreatingNewTrek() {
  emptyAllInputs();

  matkaPaneeliPealkiri.innerHTML = 'Lisa uus matk';
  salvestaMatkNupp.innerHTML = 'Lisa matk';
  salvestaMatkNupp.onclick = function() { addTrek() };

  const kustutaNupp = document.querySelector('#kustuta-nupp');
  if (kustutaNupp !== null) {
    kustutaNupp.remove();
  }

  uusMatk.style.display = 'flex';
}

function editTrek(trekId) {
  const trekToEdit = treks.find(({ id }) => trekId == id);
  if (trekToEdit === undefined) {
    return;
  }
  console.log('edit trek kutsuti välja', trekToEdit);

  matkaPaneeliPealkiri.innerHTML = 'Matka muutmine';

  uusMatkNimi.value = trekToEdit.name;
  uusMatkLaiuskraad.value = trekToEdit.latitude;
  uusMatkPikkuskraad.value = trekToEdit.longitude;
  uusMatkHind.value = trekToEdit.price;
  uusMatkPildiUrl.value = trekToEdit.image_url;
  uusMatkAlgus.value = trekToEdit.start_time;
  uusMatkLopp.value = trekToEdit.end_time;
  uusMatkKirjeldus.value = trekToEdit.description;

  salvestaMatkNupp.innerHTML = 'Salvesta muudatused';
  salvestaMatkNupp.onclick = function() { saveTrekChanges(trekId) };

  let kustutaNupp = document.querySelector('#kustuta-nupp');
  if (kustutaNupp !== null) {
    kustutaNupp.remove();
  }

  kustutaNupp = document.createElement('button');
  kustutaNupp.id = 'kustuta-nupp';
  kustutaNupp.innerHTML = 'Kustuta matk';
  kustutaNupp.onclick = function() {
    if (!confirm('Kas oled kindel, et tahad matka kustutada?')) {
      return;
    }
    deleteTrek(trekId);
    closeNewTrekPanel();
  };
  kustutaNupp.addEventListener('click', function(event) {
    event.preventDefault();
  });
  nupud.appendChild(kustutaNupp);

  uusMatk.style.display = 'flex';
}

function closeNewTrekPanel() {
  uusMatk.style.display = 'none';
  emptyAllInputs();
}

async function deleteTrek(trekId) {
  try {
    await fetch(`${API_URL}/api/treks/${trekId}`, {
      method: 'DELETE'
    });

    getTreks();
  } catch(e) {
    console.log(e);
    matkad.innerHTML = 'Error, couldn\'t fetch treks';
  }
}

async function saveTrekChanges(trekId) {
  if (isAnyInputEmpty()) {
    return;
  }
  try {
    await fetch(`${API_URL}/api/treks/${trekId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: uusMatkNimi.value,
        latitude: uusMatkLaiuskraad.value,
        longitude: uusMatkPikkuskraad.value,
        price: uusMatkHind.value,
        image_url: uusMatkPildiUrl.value,
        start_time: uusMatkAlgus.value,
        end_time: uusMatkLopp.value,
        description: uusMatkKirjeldus.value,
      })
    }).then((response => response.json()));

    getTreks();
  } catch(e) {
    console.log(e);
    matkad.innerHTML = 'Error, couldn\'t fetch treks';
  }
}

async function addTrek() {
  if (isAnyInputEmpty()) {
    return;
  }
  try {
    await fetch(`${API_URL}/api/treks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: uusMatkNimi.value,
        latitude: uusMatkLaiuskraad.value,
        longitude: uusMatkPikkuskraad.value,
        price: uusMatkHind.value,
        image_url: uusMatkPildiUrl.value,
        start_time: uusMatkAlgus.value,
        end_time: uusMatkLopp.value,
        description: uusMatkKirjeldus.value,
      })
    }).then((response => response.json()));

    getTreks();
    emptyAllInputs();
  } catch(e) {
    console.log(e);
    matkad.innerHTML = 'Error, couldn\'t fetch treks';
  }
}

async function getTreks() {
  try {
    treks = await fetch(`${API_URL}/api/treks`).then((response => response.json()));
    console.log(treks);

    matkad.innerHTML = `
      <h2>Matkad</h2>
    `;
    for (let trek of treks) {
      matkad.innerHTML += `
        <a onclick="editTrek(${trek.id})" href="javascript:;">${trek.name}</a>
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

function isAnyInputEmpty() {
  if (
    uusMatkNimi.value === '' || 
    uusMatkLaiuskraad.value === '' ||
    uusMatkPikkuskraad.value === '' ||
    uusMatkHind.value === '' ||
    uusMatkPildiUrl.value === '' ||
    uusMatkAlgus.value === '' ||
    uusMatkLopp.value === '' ||
    uusMatkKirjeldus.value === ''
  ) {
    return true;
  }
  return false;
}

function emptyAllInputs() {
  uusMatkNimi.value = '';
  uusMatkLaiuskraad.value = '';
  uusMatkPikkuskraad.value = '';
  uusMatkHind.value = '';
  uusMatkPildiUrl.value = '';
  uusMatkAlgus.value = '';
  uusMatkLopp.value = '';
  uusMatkKirjeldus.value = '';
}

getTreks();

salvestaMatkNupp.addEventListener('click', function(event) {
  event.preventDefault();
});