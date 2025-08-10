const moduleID = "453196980393345025";
const namespaceID = "453196980392361985";

const getBearerToken = async ()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    await fetch("https://corteza.duvitra.com/connector/api/token", requestOptions)
    .then(response => response.text())
    .then(result =>{
        result = JSON.parse(result);
        localStorage.setItem("token", result.access_token)
    })
    .catch(error => console.log('error', error));
}


const getGalleryImages = async ()=>{
    try{
        const response = await fetch("https://corteza.duvitra.com/connector/api/gallery", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "namespaceID": namespaceID,
                "moduleID": moduleID
            })
        });
        
        const data = await response.json();
        const galleryDiv = document.querySelector("#galleryDiv");
        console.log(data, galleryDiv)

        let innerHTML = "";
        data.forEach((a, i) => {
            innerHTML = innerHTML + `
                <div class="gallery-item" data-aos="fade-up">
                    <label for="img-modal-${i}">
                        <img src=${'https://corteza.duvitra.com/api/compose' + a.url} alt="Gallery Image" />
                        <div class="caption"></div>
                    </label>
                </div>
                <input type="checkbox" id="img-modal-${i}" class="modal-toggle" />
                <div class="modal-box">
                    <label for="img-modal-${i}" class="overlay"></label>
                    <div class="modal-content-box">
                        <label for="img-modal-${i}" class="close-btn">&times;</label>
                        <img src=${'https://corteza.duvitra.com/api/compose' + a.url} alt="Popup Image" />
                        <p class="modal-caption"></p>
                    </div>
                </div>
            `
        });
        galleryDiv.innerHTML = innerHTML;
    }catch(err){
        console.log(err)
    }
}

const start = async ()=>{
    await getBearerToken();
    getGalleryImages();
}

start();
