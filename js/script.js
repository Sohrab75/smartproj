// weather data 

let x = document.getElementById('out');
            let y = document.getElementById('weather');
            function geolocation(){
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(showPosition);
                }else{
                    x.innerText = "Geo Not Supoorted"
                }
            }

            function showPosition(data){
                //alert("Hello")
                console.log(data)
                let lat = data.coords.latitude;
                let lon = data.coords.longitude;
                //x.innerText = `Latitude is ${lat} and longitude is ${lon}`;
                const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
                //api calling
                fetch(url,{method:"GET"})
                //return promise
                .then((res) => res.json())
                //resolve promise and get data
                .then((data) => {
                    console.log(data);
                    let cityName = data.city.name;
                    let temp = data.list[0].temp.day;
                    y.innerText= `Location is ${cityName} and temperature is ${temp} °C`;
                })
            }

            
const Container = document.querySelector(".container");
const closeBtn = document.querySelector(".container .close");

function loadCoupon(){
  Container.classList.add("active");
    document.getElementsByClassName('.container');
   document.getElementById('body').style.opacity='1';
}

function closeCoupon(){
  Container.classList.remove("active");
}

var cpnBtn = document.getElementById("cpnBtn");
var cpnCode = document.getElementById("cpnCode");
cpnBtn.onclick = function(){
  navigator.clipboard.writeText(cpnCode.innerHTML);
  cpnBtn.innerHTML = "COPIED";
  setTimeout(function(){
    cpnBtn.innerHTML = "COPY CODE";

  }, 3000);
}




let searchForm= document.querySelector('.search-form');

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

function myFunction1() {
  var element = document.body;
  element.classList.toggle("light-mode");
}

document.querySelector('#search-btn').onclick =() => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove ('active');
    navbar.classList.remove ('active');
    loginForm.classList.remove ('active');
}

// Cart function JS code

// $(document).ready(function(){
//   var productItem = [{
//     productName: "fresh barcoli",
//     price: "100.00",
//     photo: "https://i.ibb.co/4RS5tGB/6-cabbage-png-image.png"
//   },
//   {
//     productName: "fresh barcoli",
//     price: "100.00",
//     photo: "https://i.ibb.co/4RS5tGB/6-cabbage-png-image.png"
//   },
//   {
//     productName: "fresh barcoli",
//     price: "100.00",
//     photo: "https://i.ibb.co/4RS5tGB/6-cabbage-png-image.png" 
//     }];
//     showProductGallery(productItem);
//     showCartTable(); 
// });

function addToCart(element){
  var productParent = $(element).closest('div.swiper-slide');
  var price = $(productParent).find('.price').text();
  var productName = $(productParent).find('.productName').text();
  var quantity = $(productParent).find('.quantity').val();

  var cartItem = {
    productName: productName,
    price: price,
    quantity: quantity

  };

  var cartItemJSON = JSON.stringify(cartItem);

  var cartArray = new Array();
  if(sessionStorage.getItem('shopping-cart')){
    cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));

  }
  cartArray.push(cartItemJSON);

  var cartJSON = JSON.stringify(cartArray);
  sessionStorage.setItem('shopping-cart', cartJSON);
  showCartTable();
}
function emptyCart(){
  if(sessionStorage.getItem('shopping-cart')){
    sessionStorage.removeItem('shopping-cart');
    showCartTable();

  }
}

function removeCartItem(index){
  if(sessionStorage.getItem('shopping-cart')){
    var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
    sessionStorage.removeItem(shopping-cart[index]);
    showCartTable();
  }
}

function showCartTable(){
  var cartRowHTML = "";
  var itemCount = 0;
  var grandTotal = 0;

  var price = 0;
  var quantity = 0;
  var subTotal = 0;

  if(sessionStorage.getItem('shopping-cart')){
    var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
    itemCount = shoppingCart.length;

    shoppingCart.forEach(function(item){
      var cartItem = JSON.parse(item);
        price = parseFloat(cartItem.price);
        quantity = parseInt(cartItem.quantity);
        subTotal = price * quantity;


      cartRowHTML += "<tr>" +
        "<td>" + cartItem.productName + "</td>" +
        "<td class='text-right'>$" + price.toFixed(2) + "</td>" +
        "<td class='text-right'>" + quantity+ "</td>" +
        "<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
        "</tr>";
        grandTotal += subTotal;


    });
      
  
  }
  $('#cartTableBody').html(cartRowHTML);
  $('#itemCount').text(itemCount);
  $('totalAmount').text("$" + grandTotal.toFixed(2));

}

// function showProductGallery(productItem){
//   var productHTML = "";
//   product.forEach(function(item){
//     productHTML += '<div class="product-item">' +
//     '<img src="https://i.ibb.co/hM0gctk/12-broccoli.png/' + item.photo + '">'  +
//     '<div class="product-name">' + item.productName + '</div>' +
//     '<div class="price">$<span>' + item.price + '</span></div>' +
//     '<div class="cart-action">'+
//     '<input type="text" class="product-quantity" name="quantity" value="1" size="2"/>' +
//     '<input type="submit" value="addToCart" class="addToCart" onClick="addToCart(this)"/>' +

//     +'</div>' +
//     '</div>';

//   });
//   $('.products').html(productHTML);

// }

let shoppingCart= document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick =() => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove ('active');
    loginForm.classList.remove ('active');
}
let loginForm= document.querySelector('.login-form');

document.querySelector('#login-btn').onclick =() => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove ('active');
    navbar.classList.remove ('active');
}
let navbar= document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick =() => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove ('active');
    loginForm.classList.remove ('active');
}
window.onscroll =() => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove ('active');
    navbar.classList.remove ('active');
    loginForm.classList.remove ('active');
}


var swiper = new Swiper(".products-slider", {
    loop:true, 
    spaceBetween: 20,
    autoplay:{
        delay:7500,
        disableOnInteraction:false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
       
      },
      768: {
        slidesPerView: 2,
        
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });


  var swiper = new Swiper(".review-slider", {
    loop:true, 
    spaceBetween: 20,
    autoplay:{
        delay:7500,
        disableOnInteraction:false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
       
      },
      768: {
        slidesPerView: 2,
        
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });