
// phone-hunter api = https://openapi.programming-hero.com/api/phones?search=iphone
const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data, dataLimit));
}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 5){
        phones = phones.slice(0, 5);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    // console.log(phones);
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                    <!-- Button trigger modal -->
                    <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
                    Details
                    </button>
            </div>
         </div>
        `
        phonesContainer.appendChild(phoneDiv);
    })
    // stop spinner or loading
    toggleSpinner(false)
}
const utilityProcessSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
document.getElementById('btn-search').addEventListener('click', function(){
    utilityProcessSearch(5);
});
document.getElementById('searchField').addEventListener('keypress', function(e) {
    if(e.key === 'Enter'){
        utilityProcessSearch(5);
    }
});
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader-spinner');
    if(isLoading === true){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
// btn show all 
document.getElementById('btn-show-all').addEventListener('click', function(){
    utilityProcessSearch();
});

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneDetailModalLabel = document.getElementById('phoneDetailModalLabel');
    phoneDetailModalLabel.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <P>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No Storage Information'}</P>
        <p>Other: ${phone.others.Bluetooth ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : 'no sensors'}</p>
    
    `
}


// loadPhones();