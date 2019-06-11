
    $(document).ready(function(){

        let outerContainer = [];
//console.log("outerContainer  - "+outerContainer);
      if(localStorage.getItem('myCart')) {
//загружается содержимое на страницу если хранилище не пустое
         outerContainer = JSON.parse(localStorage.getItem('myCart'));
//console.log("В нутри  if localStorage  - "+outerContainer);
//объект вставляет в корзинку данные
           new InsertCart(outerContainer);
//вставляем данные в страницу всех товаров если она открылась
           if($(".anchor-2").length != 0) {
               console.log('In IN');
               new ShowCart(outerContainer);
           }
      }else{

      }
            let cart;
       $('.add_cart').on('click',function(event){
           cart = new Cart(outerContainer);
           cart.addToCart(event);
       });
        $('.add_cart_men').on('click',function(event){
            cart = new Cart(outerContainer);

            cart.addToCart(event);
        });
//console.log("outerContainer = " +outerContainer);
        /*
          window.addEventListener("beforeunload", function(e){
                localStorage.clear();
          localStorage.setItem('myCart',JSON.stringify(outerContainer));
                outerContainer = null;
                   //
                e.preventDefault();
            });
                   // */

        //localStorage.clear();
       // console.log("localStorage.getItem() end  = " +localStorage.getItem("myCart"));
    });