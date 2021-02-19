'use strict';
let allKeywords = [] ; 
let allImagesArray = [] ; 

$.ajax('./data/page-1.json')
.then(data => {
        data.forEach((item) => {
            let newImage = new Images(item);   
            newImage.renderImages();
            if (!allKeywords.includes(item.keyword)){
                allKeywords.push(item.keyword) ;
            }
        });
        renderSelect(); 
        removeTemplate();      
});



function Images(imageData) {
    this.title = imageData.title;
    this.image_url = imageData.image_url;
    this.description = imageData.description;
    this.keyword = imageData.keyword;
    this.horns = imageData.horns;

    allImagesArray.push(this) ;
}

Images.prototype.renderImages = function () {

    let imageClone = $('#photo-template').clone().attr('id', this.keyword);;
    imageClone.removeAttr('id') ; 
    imageClone.find('h2').text(this.title);
    imageClone.find('img').attr('src', this.image_url);
    imageClone.find('p').text(this.description);

    $('main').append(imageClone);

} 


function renderSelect() {
    allKeywords.forEach(key =>{
        $('select').append(`<option>${key}</option>`) ; 
    })      
}

$('select').on('change',function(){

 $('main').html('<div id="photo-template"> <h2></h2> <img src="" alt=""> <p></p></div>') ;
  let choice =  $('select').val() ; 
  allImagesArray.forEach(object =>{   
    if (object.keyword === choice){ 
        let newObject = new Images(object) ; 
        newObject.renderImages() ;  
        allImagesArray.pop();
            }
}) 
removeTemplate();

});

function removeTemplate() {
    $('#photo-template').remove();
  }