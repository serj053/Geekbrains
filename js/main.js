$(document).ready(function(){



    //с помощью клика выбираем элемент и выводим его параметры
    $('.add_cart').on('click', function(event){
 // получили изображение и текст выбранного товара
        let imgReseived = $(event.target).parent().find('img').attr('src');
        let titleReseived = $(event.target).parent().find('.top_letter').text();
        let priceReseived = $(event.target).parent().find('.bottom_letter').text();
        let prodId = $(event.target).parent().attr('id');

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
 //копируем изображение в карзину
        let $img = $('<img/>',{
            src: imgReseived,
            height:80
        });
 //вставляем инфлормацию о выбранном товаре в карзину
        let $title = $(`<p class="good-title">${titleReseived}</p>`);//название товара
//div для рейтинга
        let $div = $('<div/>',{

        });
        let $rating = $(`<img src="img/star_3.png" class='star'>
                         <img src="img/star_3.png" class='star'>
                         <img src="img/star_3.png" class='star'>
                         <img src="img/star_3.png" class='star'>
                         <img src="img/star_3.png" class='star'>
                         <br>`);//авторитет товара
        let $number = $(`<span>2</span>`);//количество товара
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
             $addToCart.append($choice);


//вствляем итоговую информацию  общая стоимость товара
        let $amount = $('<p>${amount}</p>');
          $('.wrap_img').append($addToCart);
      //    $('.wrap_img').append($amount);

 //зажигаем красную лампочку на корзине
        if($('.elipse').css('display') === 'none'){
           $('.elipse').css('display','block');
        }

    });

});