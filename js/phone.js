// Add spinner  
const toggleSpinn = displaySpin => {
    document.getElementById('spinner').style.display = displaySpin;

}

const loadPhones = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    // display spinner  
    toggleSpinn('block');
    console.log(searchText);
    searchField.value = ''


    // ----------------load Data -----------------
    const url = (` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

// display data phone name and brand
const displayPhones = (phones) => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
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
}
// load phone details id  
const loadphoneDetails = id => {
    console.log(id)
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}



// display phone details  
const displayPhoneDetails = (phone) => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-detials');
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-75 p-4 mx-auto" alt="...">
    <div class="card-body">
        <p class="card-text text-center fw-bold">Release-date: ${phone.releaseDate}</p>
        <p class="card-text text-center fw-bold">Display: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text text-center fw-bold">Processor: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text text-center fw-bold">Storage: ${phone.mainFeatures.storage}</p>
        <p class="card-text text-center fw-bold">Sensors: ${phone.mainFeatures.sensors}</p>
        <p class="card-text text-center fw-bold">Other: ${phone?.others?.WLAN} <br> Bluetooth: ${phone?.others?.Bluetooth}<br>GPS: ${phone?.others?.GPS}<br> NFC: ${phone?.others?.NFC}<br>Radio: ${phone?.others?.Radio}<br>SBS: ${phone?.others?.SBS}</p>
        
            `;
    phoneDetails.appendChild(div);

}
