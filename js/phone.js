// Add spinner  
const toggleSpinn = displaySpin => {
    document.getElementById('spinner').style.display = displaySpin;
}
// display searching Phone after spinner load 
const toggleSearchResult = displayresult => {
    document.getElementById('search-result').style.display = displayresult;
}

// searchField 
const loadPhones = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;

    // // Error Message
    const noFound = document.getElementById('no-found');
    if (searchField.value == '') {
        noFound.style.display = 'block'
    }
    else {
        noFound.style.display = 'none'
    }

    // display spinner  
    toggleSpinn('block');
    toggleSearchResult('none');

    // console.log(searchText);
    searchField.value = '';

    // ----------------load Data -----------------
    const url = (` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

// display data phone name and brand
const displayPhones = (phones) => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // error message 
    const noFound = document.getElementById('no-found');
    phones.forEach(phone => {
        // console.log(phone.slice);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = ` 
        <div class="card p-3 m-3">
        <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">Phone_name: ${phone.phone_name}</h5>
            <p class="card-text fw-bold">Brand: ${phone.brand}</p>
            <button class="py-1 px-3 text-white rounded-pill bg-success" onclick="loadphoneDetails('${phone.slug}')">Details</button>
        </div>
    </div>
    `;
        searchResult.appendChild(div);

    });


    // stop spinner  
    toggleSpinn('none');
    toggleSearchResult('');

}
// load phone details id  
const loadphoneDetails = id => {
    // console.log(id)
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

// display phone details  
const displayPhoneDetails = (phone) => {
    // console.log(phone);
    const phoneDetails = document.getElementById('phone-detials');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-75 p-4 mx-auto" alt="...">
    <div class="card-body">
    <h4 class="fw-bolder">Features:</h4>
        <p class="card-text fw-bold">Release-date: ${phone.releaseDate ? phone.releaseDate : 'no yet release'}</p>
        <p class="card-text  fw-bold">Display: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text  fw-bold">Processor: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text  fw-bold">Storage: ${phone.mainFeatures.storage}</p>
        <p class="card-text  fw-bold">Sensors: ${phone.mainFeatures.sensors}</p>
        <h4 class="fw-bolder text-center">Others Features:</h4>
        <p class="card-text text-center fw-bold">WLAN: ${phone.others?.WLAN ? phone.others.WLAN : 'NO'} <br> Bluetooth: ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'NO'}<br>GPS: ${phone.others?.GPS ? phone.others.GPS : 'NO'}<br> NFC: ${phone.others?.NFC ? phone.others.NFC : 'NO'}<br>Radio: ${phone.others?.Radio ? phone.others.Radio : 'No'}<br>SBS: ${phone.others?.SBS ? phone.others.SBS : 'no'}</p>
        
            `;
    phoneDetails.appendChild(div);

}
