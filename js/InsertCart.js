
    class InsertCart{
        constructor(arr){
            this.arr = arr;
            this.add_to_Cart();
        }
        add_to_Cart(){
            let arr = this.arr;
            for(let item of arr){
//выбираем через его длинну тот массив который содержит данные о конкретном товаре
                if(Object.keys(item).length > 2)
                    this.render(item, arr);
            }
        }

        render(item,arr){
            let img = item.img;
            let title = item.title;
            let price = item.price;
            let prodId = item.id;
            let quantity = item.quantity;
            let total = arr[0]["total"];
            let amount = arr[0]["amount"];
console.log("#quantity = "+ quantity+"    #total = "+total+"   #amount = "+amount);

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

            //let arr = this.outerContainer;
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
//ументшаем денежную сумму всех товаров
                            let number = +/[0-9]+/.exec(elem.price);
                            arr[0]['total'] -= number;
                            $("#here").text("$"+arr[0]['total']);//вставляем в элемент


//меняем общее количество товара на индикаторе
                            let nn = +$('.elipse').text();
                            $('.elipse').text(--nn);
//уменьшаем общее количество товара в массиве
                           -- arr[0]['amount'];
 console.log("In insert amount = "+ nn);
 console.log("In insert total = "+arr[0]["total"]);
 //обновляем localStorage
                  localStorage.setItem('myCart',JSON.stringify(arr));
                        }else{
                            this.parentNode.remove();//удаляем dom элемент с товаром
//ументшаем денежную сумму всех товаров
                            let number = +/[0-9]+/.exec(elem.price);
                            arr[0]['total'] -= number;
                            $("#here").text("$"+arr[0]['total']);//вставляем в элемент

//удаляем из наружнего массива
                            arr.splice(arr.indexOf(elem), 1);

//меняем общее количество товара на индикаторе
                            let nn = +$('.elipse').text();
                            $('.elipse').text(--nn);
 console.log("In delBtn = "+ nn);
//уменьшаем общее количество товара в массиве
  console.log("amount before - "+arr[0]['amount']);
                            --arr[0]['amount'];
  console.log("amount after - "+arr[0]['amount']);
                            if(nn === 0) {
                                localStorage.clear();
                                $('.add-to-cart').empty();//удаляем рамку
                                $('.add-to-cart').css('border', 'none');//удаляем рамку
                                $('.elipse').css('display', 'none');//выключаемлампочку на карзине
                            }
                        }
                    }
                }
            });


//создаем раздел корзины для суммы товаров и печати проверки checkout если
// он не был создан раньше, проверяем по лампочке индикатору
            let $commonInform;
 console.log(" elipse = "+(+$('.elipse').text())) ;
            if(+$('.elipse').text() === 0){

                //вставляем число всех товаров в элипс индикатор
                //включаем красную лампочку на карзине
                if($('.elipse').css('display','none'))
                    $('.elipse').css('display','block');
                $(".elipse").text(amount);

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
                let $goToCart =
                    $("<a href='cart.html'><div class='go-to-cart' >GO TO CART</div></a>");

                $commonInform.append($commonAmount);
                $commonInform.append($checkout);
                $commonInform.append($goToCart);
            }
            $addToCart.prepend($choice);
            $addToCart.append($commonInform);
        }




    }