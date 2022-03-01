const loadPhones = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';

    // ----------------load Data -----------------
    const url = (` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

// =============display data===============
const displayPhones = (phones) => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = ` 
        <div class="card">
        <img height="450px" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Phone_name: ${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <button onclick="loadphoneDetails('${phone.slug}')">Details</button>
        </div>
    </div>
    `;
        searchResult.appendChild(div);

    });
}
const loadphoneDetails = id => {
    console.log(id)
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))

}
const displayPhoneDetails = (phone) => {
    console.log(phone)
}