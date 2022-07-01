$(document).ready(function () {
  let acces_key = "nY_308CoT1wpFAh5qXBiOlSElCL_e02fAaMiNg5qpdk";
  let apiUrl = `https://api.unsplash.com/photos/?client_id=${acces_key}&per_page=100`;
  let searchUrl = `https://api.unsplash.com/search/photos/?client_id=${acces_key}&per_page=100&query=`;

  let imageURLS = [];

  ajaxData();

  function ajaxData() {
    $.ajax({
      url: apiUrl,
      type: "GET",

      success: function (response) {
        // console.log(response)
        $.each(response, (i, element) => {
          imageURLS.push(element.urls.small);
        });
        displayImages()
      },

      // Error handling
      error: function (error) {
        console.log(`Error ${error}`);
      },
    });
  }
 


  // DISPLAY IMAGE
  function displayImages() {
    $("#col-1").html("");
    $("#col-2").html("");
    $("#col-3").html("");
    $("#col-4").html("");

    $.each(imageURLS, (index, url) => {
      var image = $(`<div><img src=${url} style='width:100%'/></div`);

      if ((index + 1) % 4 == 0) {
        $("#col-1").append(image);
      }
      if ((index + 2) % 4 == 0) {
        $("#col-2").append(image);
      }
      if ((index + 3) % 4 == 0) {
        $("#col-3").append(image);
      }
      if ((index + 4) % 4 == 0) {
        $("#col-4").append(image);
      }
    });
  }

  // SEARCH INPUT
  $('#searchBtn').click(function(){
    if($('searchKey').val() !== ''){
      ajaxSearchData($('#searchKey').val());
    }
  })

  function ajaxSearchData(key){

    imageURLS = [];

    let inputValue = $('#searchKey').val();
    $('#searchQuery').html(inputValue);

    $.ajax({
      url: searchUrl+key,

      type: 'GET',

      success: function(response) {
        
        let imageArrays = response.results;
        $.each(imageArrays, (i, element) => {
          imageURLS.push(element.urls.regular)
        });
        displayImages();
      },

      error: function(error){
        console.log(`ERROR ${error}`)
      }
    })
  }
});
