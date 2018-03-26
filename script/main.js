/*eslint-env browser*/
/*eslint "no-console": "off" */

var allBooks =[];

$.getJSON("https://api.myjson.com/bins/udbm5", function(data){
    allBooks=data.books
    getImages();
    console.log(allBooks);
    


})

var img = document.getElementById("img");

function getImages(){
  for (var i=0; i < allBooks.length; i++){
    //make img and make the flip divs (https://davidwalsh.name/css-flip)  
    var newImg = document.createElement("img");
    newImg.setAttribute("src", allBooks[i].detalle)
    var flipCont = document.createElement("div");
    var flipper = document.createElement("div");
    var front = document.createElement("div");
    var back = document.createElement("div");
    flipCont.setAttribute("class", "flip-container") 
    flipper.setAttribute("class", "flipper") 
    front.setAttribute("class", "front") 
    back.setAttribute("class", "back") 
      
    newImg.setAttribute("id", "img" + i);
    $(newImg).attr("src", allBooks[i].portada);
    //make a button for the back side:
    //$('<button />').attr({class: "button", id: i}).text("more infos").appendTo(back);
    
    //actually it's better make an anchor; the next with jQuery DOESNT WORK
    
    /*var newAnchor = $("a").attr("href", "allBooks[i].detalle") 
    newAnchor.setAttribute("data-fancybox", "images" )
    back.append(newAnchor)*/
          
    //add the book's title
    var title = allBooks[i].titulo;
    var bookTitle = document.createElement("p");
    bookTitle.setAttribute("class", "bookTitle");
    bookTitle.innerHTML=title;
    //jQuery in the next 2 lines here doesn't work, shows only some books; console: "Syntax error, unrecognized expression: Java... what?"; I have to use pure JS
    //insert the title in a div
    var titleContainer = document.createElement("div")
    titleContainer.setAttribute("class", "titleContainer")
    titleContainer.append(bookTitle);   
    //append titleContainer to back
    back.append(titleContainer)
    
    // add the book's description
  
     $("<div/>").attr({class: "text", id: "info"+i}).text(allBooks[i].descripcion).appendTo(back)
     
    
     //make an anchor, link it to the gallery images, give it the "data-fancybox" attribute for the gallery; appendanchor to back
     //here an anchor container;
     var anchorContainer = $("<div/>").attr("class", "anchorContainer").appendTo(back)
     var newAnchor = document.createElement("a");
     newAnchor.setAttribute("id", "anchor"+i);
     $(newAnchor).attr("href", allBooks[i].detalle);
     $(newAnchor).attr("data-fancybox", "images")
     $(newAnchor).appendTo(anchorContainer)
     // append a button to the anchor, so it will contain the link
     $("<button />").attr({class: "button", id: "show"+i}).text("more infos").appendTo(newAnchor)
         
     front.append(newImg);
     flipper.append(front, back);
     flipCont.append(flipper);

     $("#data").append(flipCont);
  

/* ISOTOPE FILTER
// quick search regex
var qsRegex;

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.flip-container',
  layoutMode: 'fitRows',
  filter: function() {
    return qsRegex ? $(this).text().match( qsRegex ) : true;
  }
});

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' ); //RegExp constructor creates an expression to match text with a pattern
  $grid.isotope();
}, 200 ) ); //with the "bounce" function, the function will fire just once every n milliseconds (200 in this case)

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {.0............break
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout( delayed, threshold || 100 );
  }
}


*/

    }// end of the loop
    
search(); //call the function to set the filter

}//end of the function getImages



function search() {//here's the filter
        $("#quicksearch").on("keyup", function () {//".on" method attaches 1 or more event handlers ("event", function{}) to elements; here I attach the method to the input bar with id "quicksearch"
            
            var value = $(this).val().toLowerCase();
            //value is the value of "quicksearch" translated to lower case, to comprise everything
            
            $(".flip-container").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
            //method ".filter":reduces the set of matched elements to those that match the selector or pass the function's test here the function does this:
            //a) .toggle -> displays/hides the matched element (here: $(this), meaning "flip.container); HERE DISPLAYS IF:
            //b) the text in lower cases of $(this)(i.e. of "flip-container) CONTAINS the "value" (the input content)
            // .text(): gets the combined text content of each element in the matching element (including children) OR set the text content of the matched element
            //.indexOf(): search for a given element among the matched elements; if element is not found returns -1 
            
        })
  
}


$("[data-fancybox]").fancybox({ /*why this doesn't work??*/
		buttons:[
            "zoom",
            "slideShow",
            "fullScreen",
            "thumbs",
            "share",
            "download",
            "close"
        ],
    
        margin:[44,0],
    
        gutter: 50,
        
        arrows: true
});

$().fancybox({//this works to toggle the whole stuff
  selector : '[data-fancybox="images"]',
  
  loop     : true, //goes thorugh the gallery
  
  arrows: true,
  
  buttons:[
    "zoom",
    "slideShow",
    "fullScreen",
    "thumbs",
    "share",
    "download",
    "close",
    
  ]


})










