let countriesSelect = document.getElementById('countriesSelect');
let allCountriesName = document.getElementById('allCountriesName');
let myFlag = document.getElementById('myFlag');
let myCoat = document.getElementById('myCoat');
let myNations= document.getElementById('myNations');
let myIndependent = document.getElementById('myIndependent');
let myPopulation = document.getElementById('myPopulation');
let myRegion = document.getElementById('myRegion');
let myWeek = document.getElementById('myWeek');
let myTime = document.getElementById('myTime');
let myCapital = document.getElementById('myCapital');
let myBtn = document.getElementById('myBtn');
let myIframe = document.getElementById('myIframe');
let myBox =document.getElementById('myBox');
document.getElementById("countriesSelect").addEventListener("change", function() {
    let selectedCountry = this.value;
    if (!selectedCountry) {
        alert("Please select a country.");
    }
});


fetch(`https://restcountries.com/v3.1/all?fields=name`)
.then(res=>res.json())
.then(data => {
    const countryName = data;
    countryName.forEach(element => {
        allCountriesName.innerHTML +=`
        <option>${element.name.common}</option>
        `
    });
})

countriesSelect.addEventListener('change',()=>{
    const countryValue = countriesSelect.value;
    fetch(`https://restcountries.com/v3.1/name/${countryValue}`)
    .then(res => res.json())
    .then(data => {
        const countryData = data[0];
        myFlag.src = countryData.flags.png;
        myCoat.src= countryData.coatOfArms.png;
        if(countryData.landlocked === true) {
            myNations.innerHTML =`<i class="fas fa-check"></i>`;
        }else{
            myNations.innerHTML =`<i class="fas fa-times"></i>`;
        }
        if(countryData.independent === true) {
            myIndependent.innerHTML =`<i class="fas fa-check"></i>`;
        }else{
            myIndependent.innerHTML =`<i class="fas fa-times"></i>`;
        }
        myPopulation.innerHTML = countryData.population.toLocaleString();
        myRegion.innerHTML = countryData.region;
        myWeek.innerHTML = countryData.startOfWeek;
        const firstTimezone = countryData.timezones[0];
        myTime.innerHTML = firstTimezone;
        const firstCapital = countryData.capital[0];
        myCapital.innerHTML = firstCapital;
        myBtn.addEventListener("click",()=>{
            myBtn.href=countryData.maps.googleMaps;
        });
        const lat = countryData.latlng[0];
        const lng = countryData.latlng[1];
        myIframe.src = `
        https://www.google.com/maps/embed/v1/view?key=AIzaSyDCCfoXSZoK3UBns2vOgqjxikkomxkSp6k&center=${lat},${lng}&zoom=6
        `;

        const nwe = countryData.cca2;
        getNews(nwe);
    });
});


function getNews(nwe){
    fetch(`https://api.worldnewsapi.com/search-news?api-key=c98fe6a36cb545379b479cfa63a60c8b&source-countries=${nwe}`)
        .then(res => res.json())
        .then(data =>{
            const allNews = data.news;
            console.log(data);
            console.log(allNews);
            allNews.forEach(news => {
                myBox.innerHTML += `
                <div class="col-md-3 col-sm-6">
                <div class="news-box">
                  <div class="new-thumb"> <span class="cat c1">Economy</span> <img src=${news.image}> </div>
                  <div class="new-txt">
                    <ul class="news-meta">
                      <li>${news.publish_date}</li>
                    </ul>
                    <h6><a href=${news.url}>${news.text.slice(0,40)}</a></h6>
                    <p>${news.title.slice(0,50)}</p>
                  </div>
                  <div class="news-box-f"> <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt=""> ${news.authors[1]} <a href=${news.url}><i class="fas fa-arrow-right"></i></a> </div>
                </div>
              </div>
                `;
            });
        });
}

let suu = document.getElementById("suu");

function SendMail(){
    var params = {
        from_name : document.getElementById("fullName").value,
        email_id : document.getElementById("email_id").value,
        message : document.getElementById("message").value
    }
    emailjs.send("service_7f9ybgs","template_994219u",params).then(function(res){
        suu.innerHTML =`
        <div class="alert alert-success" role="alert">
        ${res.status}
        </div>
    `
    })
}