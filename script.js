const generateform = document.querySelector(".generate-from");
const imageGallery = document.querySelector(".image-gallery")
const OPENAI_API_KEY = "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";
const generateAiimages = async(userprompt , userimgQuantitiy) =>{
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userprompt,
                n: parseInt(userimgQuantitiy),
                size: "512x512",
                response_format : "b64_json"
            })
        });
      if(!response.ok) throw new Error("Faild to generate images! try again...");
        const { data } = await response.json();
        console.log(data);
    }catch(error){
        alert(error.message);   
    }
}
const formsubmittion = (e) =>{
    e.preventDefault();
    const userprompt = e.srcElement[0].value;
    const userimgQuantitiy = e.srcElement[1].value;

    const imgCardMarkup = Array.from({length: userimgQuantitiy},() => 
        `<div class="img-card loading">
        <img src="./img/loader.svg" alt="image"/>
        <a href="#" class="download-btn">
            <img src="./img/download.svg" alt=" download icon"/>
        </a>
    </div>`
    ).join("");
    imageGallery.innerHTML = imgCardMarkup;
    generateAiimages(userprompt , userimgQuantitiy)
}
generateform.addEventListener("submit", formsubmittion);