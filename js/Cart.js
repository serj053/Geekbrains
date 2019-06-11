
    class Cart{
        constructor(outerContainer, cart, anchor="#wrap_img"){
            this.outerContainer = outerContainer;//внешний контйнер для учета отложенного товара
            this.cart = cart;//
            this.anchor = anchor;//
            this.amount = 0;//оющее количество товара
            this.total =0;//общая сумма товара
        }
//нажатие кнопки добавлениея товарак
        addToCart(event){
            let bool = this.checkSituation(event);//проверка товара в карзине
//есть ли товар в корзине если есть то меняем его количество
            if(bool){
                this.changeCount(bool);
 //alert("In bool");
//если товара в корзине нет то заносим его в корзину
            }else{
                this.add(event);
                let id = $(event.target).parent().attr('id');
//включаем красную лампочку на карзине
                if($('.elipse').css('display','none'))
                    $('.elipse').css('display','block');
// прибавляем стоимость товара к общей
                this.changeCount(id);
            }
        }

//проверка наличия товара в карзине если товар есть то вернуть id товара
        checkSituation(event){
            let id = $(event.target).parent().attr('id');
            if(this.outerContainer && this.outerContainer.length !== 0)
            for(let element of this.outerContainer){
                if(element.id === id )
                    return element.id;
            }
            return false;
        }
//изменение количества товара в карзине
         changeCount(id){
            for(let elem of this.outerContainer){
                if(elem.id === id){
//alert("In change count-");
                    $(`#${id} .quantity`).text(++elem.quantity);//меняем количество конкретного товара
                    let nn = $('.elipse').text();//меняем общее количество
                    $('.elipse').text(++nn);//      товара на индикаторе
//добавляем стоимость товара в общую сумму товара
                    let number = +/[0-9]+/.exec(elem.price);
                    this.outerContainer[0]['total'] += number;
//console.log(" in total = "+ this.outerContainer[0]['total']);
//заносим общее количество товара на индикаторе
                    this.outerContainer[0]['amount'] = nn;
//console.log("in amount = "+this.outerContainer[0]['amount']);
                    $("#here").text("$"+this.outerContainer[0]['total']);//вставляем в элемент
//заносим или перезаписываем данные в локальное хранилище
                    localStorage.setItem('myCart',JSON.stringify(this.outerContainer));

                }
              }
           }

//добавление товара в карзину после проверки
        add(event){
// получили изображение и текст выбранного товара
            let imgReseived = $(event.target).parent().find('img').attr('src');
            let titleReseived = $(event.target).parent().find('.top_letter').text();
            let priceReseived = $(event.target).parent().find('.bottom_letter').text();
            let prodId = $(event.target).parent().attr('id');

//добавляем данные о товаре в наружныйое хранилище
            this.outerContainer.push({"id": prodId,//id товара
                "title": titleReseived,         // нименование товара
                "quantity":0, "img":imgReseived,// количество товара одного вида
                "price": priceReseived,         //цена товара
                });
 //денежная сумма всех товаров
            if(!this.outerContainer[1]){
                this.outerContainer.unshift({"amount":0,"total":this.total});
            }

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
                src: imgReseived,
                height:80
            });
//вставляем информацию о выбранном товаре в карзину
            let $title = $(`<p class="good-title">${titleReseived}</p>`);//название товара
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

            let $number = $(`<span class="quantity"></span>`);//количество товара
            let $price = $(`<span class="price-title"> x ${priceReseived}</span>`);//цена товара

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

/* --> */   let arr = this.outerContainer;

//навешиваем событие на кнопку удаление товара
            $delBtn.click(function(event){
                let id =$(event.target).parent().attr('id');
//находим в массиве элемент по которому кликнули
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
                            --arr[0]['amount'];
//console.log("amount@ = "+arr[0]['amount']);
//console.log("total@ = "+arr[0]["total"]);
  //обновляем localStorage
               localStorage.setItem('myCart',JSON.stringify(arr));
                        }else{//если товр остался в одном екземпляре то удаляем
                            this.parentNode.remove();//удаляем dom элемент с товаром
//ументшаем денежную сумму всех товаров
                            let number = +/[0-9]+/.exec(elem.price);
                            arr[0]['total'] -= number;
                            $("#here").text("$"+arr[0]['total']);//вставляем в элемент

//удаляем из наружнего массива
                 console.log("splice -" +arr.splice(arr.indexOf(elem), 1));          ;
                      //      arr.splice(arr[0], 2);
//меняем общее количество товара на индикаторе
                            let nn = +$('.elipse').text();
                            $('.elipse').text(--nn);

console.log("In delBtn = "+ nn);
//console.log(" amount before  -"+arr[0]['amount']);

//уменьшаем общее количество товара в массиве
                            --arr[0]['amount'];
 //console.log(" amount after  -"+arr[0]['amount']);

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
            if(+$('.elipse').text() === 0){
                $commonInform = $('<div/>', {
                    class: "common-inform"
                });
//суммарная стоимость всех товаров
                let $commonAmount = $(
                `<div class="span"><span>TOTAL</span><span id="here"></span></div>`);
//создаем checkout - штамп
                let $checkout = $("<div/>", {
                    class: "checkout"
                });
//ссылку  go to cart
                let $goToCart = $("<a href='cart.html'><div class='go-to-cart' >GO TO CART</div></a>");

                $commonInform.append($commonAmount);
                $commonInform.append($checkout);
                $commonInform.append($goToCart);
          }
            $addToCart.prepend($choice);
            $addToCart.append($commonInform);
        }

    }