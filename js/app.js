'use strict';
let allKeywords = [] ; 
let allImagesArray = [] ; 
let pageNum = 1;

page(pageNum);

function page(){
    $.ajax(`./data/page-${pageNum}.json`)
    .then(data => {
            data.forEach((item) => {
                let newImage = new Images(item);   
                newImage.render();
                if (!allKeywords.includes(item.keyword)){
                    allKeywords.push(item.keyword) ;
                }
            });
            renderSelect();       
    });
}

function Images(imageData) {
    this.title = imageData.title;
    this.image_url = imageData.image_url;
    this.description = imageData.description;
    this.keyword = imageData.keyword;
    this.horns = imageData.horns;

    allImagesArray.push(this) ;
}

Images.prototype.render = function () {

    // let imageClone = $('#photo-template').clone();
    // imageClone.removeAttr('id') ; 
    // imageClone.find('h2').text(this.title);
    // imageClone.find('img').attr('src', this.image_url);
    // imageClone.find('p').text(this.description);

    // $('main').append(imageClone);

    let template = $('#template-section').html();
    let newImage = Mustache.render(template, this);
     $('main').append(newImage);

    return newImage;

} 


function renderSelect() {
    allKeywords.forEach(key =>{
        $('select').append(`<option>${key}</option>`) ; 
    })      
}

$('select').on('change',function(){ 
 $('main').html('') ;
  let choice =  $('select').val() ; 
  allImagesArray.forEach(object =>{   
    if (object.keyword === choice){ 
        let newObject = new Images(object) ; 
        newObject.render() ;  
    }
  })
})

$('#previous').click(showPage(1));
$('#next').click(showPage(2));
$('#hornsNum').click(sortingByHorns);
$('#titleSort').click(sortingByTitle)

function showPage(num){
  return function(){ 
      $('select').html('<option>Filter by Keyword</option>')
      $('main').html('') ;
      allKeywords = [];
      allImagesArray = [];
      pageNum= num; 
      page(pageNum);
      console.log(`Hello Page${pageNum}`);
  }
}

function sortingByHorns(){
    allImagesArray.sort( (a,b) =>{
        // if (a.horns)
        return a.horns - b.horns;
        });

    $('main').html('') ;    
    allImagesArray.forEach((e) => {
        e.render();
      });
}

function sortingByTitle(){
    allImagesArray.sort((a,b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()){
          return -1;
        }
         else if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
         else return 0;
     });
    $('main').html('') ;    
    allImagesArray.forEach((e) => {
        e.render();
      });
}
