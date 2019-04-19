
    class Product{
        constructor(localstorage){
            this.localstorage = localstorage;
        }

        add_to_Cart(){
            let arr = JSON.parse(this.localstorage.getItem('myCart'));
            for(let item of arr){
                if(Object.keys(item).length > 2)
                this.render(item, arr);
            }
        }

        render(item, arr){
            let img = item.img;
            let title = item.title;
            let price = item.price;
            let prodId = item.id;
            let quantity = item.quantity;
            let total = arr[1]["total"];
            let amount = arr[1]["amount"];
//alert("amount  = "+amount);
/****************************************/
            $('.elipse').text(amount);//      товара на индикаторе
            $('.elipse').css('display','block');
//создаем элемент контейнер куда вставим данные о товаре
            let $addToCart = $('.add-to-cart').css('border','1px solid #ccc');

//создаем контейнер для отдельной единицы товара
            let $choice = $('<div/>',{
                class:"choice",
                "id":prodId
            });
//создаем контейнер для  информации для товара
            let $inform = $('<div/>',{
                class:"inform"
            });
//копируем изображение товара в карзину
            let $img = $('<img/>',{
                src: img,
                height:80
            });
//вставляем информацию о выбранном товаре в карзину
            let $title = $(`<p class="good-title">${title}</p>`);//название товара
//div для рейтинга
            let $div = $('<div/>',{
                class:"star-contaner"
            });
            let $rating = $(`<div  class='star'></div>
                         <div  class='star'></div>
                         <div  class='star'></div>
                         <div  class='star'></div>
                         <div  class='star'></div>
                         <br>`);//авторитет товара

            let $number = $(`<span class="quantity">${quantity}</span>`);//количество товара
            let $price = $(`<span class="price-title"> x ${price}</span>`);//цена товара

//создаем кнопку удаление товара
            let $delBtn = $('<img src="img/cross.png" class="del-btn">');

//заполняем блок для одного товара
            $choice.append($img);
            $inform.append($title);
            $div.append($rating);
            $inform.append($div);
            $inform.append($number);
            $inform.append($price);
            $choice.append($inform);
            $choice.append($delBtn);


//навешиваем событие на кнопку удаление товара
            $delBtn.click(function(event){
                // this.parentNode.remove();
                let id =$(event.target).parent().attr('id');

                for(let elem of arr){
                    if(elem.id === id){
                        if(elem.quantity >1){//уменьшаем значение на 1
//уменьшаем количество товара  во внешнем массиве
                            let qq = --elem.quantity;
                            $(`#${id} .quantity`).text(qq);
//уменшаем денежную сумму всех товаров
                            let number = +/[0-9]+/.exec(elem.price);
                            arr[1]['total'] -= number;
                            $("#here").text("$"+arr[1]['total']);//вставляем в элемент
//уменьшаем количество конкретного товара
                         //  --arr[1]['amount'] ;
//меняем общее количество товара на индикаторе
                            let nn = +$('.elipse').text();
                            $('.elipse').text(--nn);
//console.log("In true = "+ nn);
//console.log("total = "+arr[1]["total"]);
                        }else{
                            this.parentNode.remove();//удаляем dom элемент с товаром
                            // $('common-inform').remove();//удаление элемента с суммой всех товаров
                            //  console.log("arr.indexOff(elem) = "+arr.indexOf(elem)) ;
                            // console.log("arr = "+elem[0]);
//ументшаем денежную сумму всех товаров
                            let number = +/[0-9]+/.exec(elem.price);
   // alert(arr);
                            arr[1]['total'] -= number;
                            $("#here").text("$"+arr[1]['total']);//вставляем в элемент

//удаляем из наружнего массива
                            arr.splice(arr.indexOf(elem), 1);
//уменьшаем количество конкретного товара
                         //  --arr[1]['amount'] ;
//меняем общее количество товара на индикаторе
                            let nn = +$('.elipse').text();
                            $('.elipse').text(--nn);
 //console.log("In false = "+ nn);
                            if(nn === 0) {
                                $('.add-to-cart').empty();//удаляем рамку
                                $('.add-to-cart').css('border', 'none');//удаляем рамку
                                $('.elipse').css('display', 'none');//выключаемлампочку на карзине
                            }
                        }
                    }
                }
                localStorage.setItem('myCart',JSON.stringify(this.outerContainer));
            });


//создаем раздел корзины для суммы товаров и печати проверки checkout если
// он не был создан раньше, проверяем по значению в массиве arr
            let $commonInform;
            if(+$('.elipse').text() !== 0){
                $commonInform = $('<div/>', {
                    class: "common-inform"
                });
//суммарная стоимость всех товаров
                let $commonAmount = $(
                    `<div class="span"><span>TOTAL</span><span id="here">${total}</span></div>`);
//создаем checkout
                let $checkout = $("<div/>", {
                    class: "checkout"
                });
//ссылку  go to cart
                let $goToCart = $("<div class='go-to-cart' >GO TO CART</div>");

                $commonInform.append($commonAmount);
                $commonInform.append($checkout);
                $commonInform.append($goToCart);
            }
            $addToCart.prepend($choice);
            $addToCart.append($commonInform);
        }

/****************************************/
    }