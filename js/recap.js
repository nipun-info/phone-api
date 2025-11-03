const loadPhone = async (searchText, isShowAll) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json();
    const phones = data.data
    displayPhones(phones, isShowAll);  
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else 
    {
        showAllContainer.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card border border-gray-300 shadow-lg`;
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}"
                    alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts
                </p>
                <div class="card-actions">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);        
    })
    toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) => {
    const searchText = document.getElementById('search-field').value;
    toggleLoadingSpinner(true)
    loadPhone(searchText, isShowAll)  
}

const handleShowAll = () => {
    handleSearch(true)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowDetails = async(id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="">
            <div class=" flex items-center justify-center">
                <img class="inline bg-blue-200 p-4 rounded-xl mb-4" src="${phone.image}" />
            </div>
            <h3 class="text-2xl font-bold">${phone.name}</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p class="text-xl font-semibold"><span class="font-bold">Storage: ${phone?.mainFeatures?.storage}</span> </p>
            <p class="text-xl font-semibold"><span class="font-bold">Display Size: </span> </p>
            <p class="text-xl font-semibold"><span class="font-bold">Chipset: </span> </p>
            <p class="text-xl font-semibold"><span class="font-bold">Memory: </span> </p>
            <p class="text-xl font-semibold"><span class="font-bold">Slug: ${phone.slug}</span> </p>
            <p class="text-xl font-semibold"><span class="font-bold">Release data: ${phone.releaseDate} </span> </p>
            <p class="text-xl font-semibold"><span class="font-bold">Brand: ${phone.brand} </span> </p>
            <p class="text-xl font-semibold"><span class="font-bold">GPS: ${phone.other?.GPS || 'No GPS available'} </span> </p>
        </div>
    `;

    show_details_modal.showModal();  

}

loadPhone(searchText = "13");