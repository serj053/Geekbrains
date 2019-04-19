
    class ShowCart{
        constructor(arr){
            this.arr = arr;
            this.amount =arr[0]['amount'];
            this.total = arr[0]['total'];
            this.addToPage();
        }

        addToPage(){
//оти\рисовка товара
           $(".add-to-cart").css('display','none');
            for(let item of this.arr){
                if(Object.keys(item).length > 2)
                this.render(item);
            }
        }

        render(item){
// элемент якорь
           let $anchor = $(".anchor-2");
//получаем ссылку на элемент во внурть которого мы будем вставлять остальные
            let $cont = $("<div/>",{
                class: "product-place",
                id: item.id
            });
//создаем элемент  картинкой
            let $imgPlace = $("<div/>",{class: 'cart-img'});
//создаем элемент картинку
            let $img = $(`<img src=\"${item.img}\">`,{class: 'cart-img img'});
//создаем элемент описание
            let $description =
             $('<div class="description">' +
                 '<p>Mango  People  T-shirt</p>' +
                 '<p>Color:   Red</p>' +
                 '<p>Size:   Xll	</p></div>');
//создаем элемент цена за единицу товара
            let $unitPrice = $(`<div class='unite-price'>${item.price}</div>`);
//создаем элемент количество товара
            let $quantity = $(`<div class="quantity-2"><div>${item.quantity}</div></div>`);
//создаем элемент shipping
            let $shipping = $("<div class='shipping'>FREE</div>");
//создаем элемент subtotal
            let price = +/[0-9]+/.exec(item.price);
            let subtotal = price * item.quantity;
            let $subtotal = $(`<div class="subtotal">$${subtotal}</div>`);
//создаем элемент insert
            let $insert = $("<div/>",{class: 'inset'});
//создаем элемент кнопка удаления
            let $delButton = $('<div class="action">' +
                '<img src="img/delete_button.png" alt="delete buttom">' +
                '</div>');

            $imgPlace.append($img);
            $cont.append($imgPlace);
            $cont.append($description);
            $cont.append($unitPrice);
            $cont.append($quantity);
            $cont.append($shipping);
            $cont.append($subtotal);
            $cont.append($insert);
            $cont.append($delButton);
            $anchor.append($cont);

            //навешиваем событие на кнопку удаление товара
            let arr = this.arr;
            $delButton.click(function(event){
                let id =$(event.target).parent().parent().attr('id');
//находим в массиве элемент по которому кликнули
                for(let elem of arr){
                    if(elem.id === id){
                        if(elem.quantity >1){//уменьшаем значение на 1
//уменьшаем количество товара  во внешнем массиве
                            let qq = --elem.quantity;
                            $(`#${id} .quantity`).text(qq);
                            $(".quantity-2").text(qq);
//ументшаем денежную сумму всех товаров
                            let number = +/[0-9]+/.exec(elem.price);
                            arr[0]['total'] -= number;
                            $("#here").text("$"+arr[0]['total']);//вставляем в элемент
                            $(".subtotal").text("$"+arr[0]['total']);

//меняем общее количество товара на индикаторе
                            let nn = +$('.elipse').text();
                            $('.elipse').text(--nn);
//уменьшаем общее количество товара в массиве
                            --arr[0]['amount'];
   console.log("amount@ = "+arr[0]['amount']);
   console.log("total@ = "+arr[0]["total"]);
//обновляем localStorage
                            localStorage.setItem('myCart',JSON.stringify(arr));
                        }else{
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
//обновляем localStorage
                            localStorage.setItem('myCart',JSON.stringify(arr));
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
        }
    }
