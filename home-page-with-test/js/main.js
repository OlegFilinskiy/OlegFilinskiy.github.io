
!(function( $ ) {
	
		/*  =========================
		    Mailbox
		    ========================= */
		
		$(function() {
		
		    var num = Math.floor(Math.random()*100000000000000000);
		    $('input[name="num"]').attr('value',num);
		    var url = '/google/thank.php?id=gg'+num;
		
		    var forms = $('.form'); 
		
		    forms.on('submit', function (event) {
		        event.preventDefault();
		
		        var valid = true,
		            form = $(this),
		            data = form.serialize(),
		            input = form.find('.input'),
		            //phone = form.find('input[name="phone"]'),
		            email = form.find('input[name="email"]'),
		            //sel = form.find('select[name="country"]'),
		            button = form.find('button').html(),
		            tel_check = /[0-9]{6,15}$/,
		            email_check = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
		
		        input.map(function(){
		            var field = $(this);
		
		            if (field.val().length < 1) {
		                valid = false;
		                field.addClass('error');
		                field.removeClass('good');
		            } else{
		                field.removeClass('error');
		                field.addClass('good');
		            }
		        });
		
		        // phone.map(function(){
		        //     var field = $(this);
		
		        //     if (!field.val().search(tel_check) == 0) {
		        //         valid = false;
		        //         field.addClass('error');
		        //         field.removeClass('good');
		        //     } else{
		        //         field.removeClass('error');
		        //         field.addClass('good');
		        //     }
		        // });
		
		        email.map(function(){
		            var field = $(this);
		
		            if (!field.val().search(email_check) == 0) {
		                valid = false;
		                field.addClass('error');
		                field.removeClass('good');
		            } else{
		                field.removeClass('error');
		                field.addClass('good');
		            }
		        });
		
		        // if (sel.attr('value') == "Australia" && phone.val().length != 11) {
		        //     field.addClass('error');
		        //     field.removeClass('good');
		        //     form.find('p.error').text('Номер телефона некорректный.');
		        //     valid = false;  
		        // }
		
		        // sel.map(function(){
		        //     var field = $(this);
		        //     if (field.find('option:selected').attr('value') == 'Country') {
		        //         field.addClass('error');
		        //         field.removeClass('good');
		        //         valid = false;
		        //         form.find('p.error').text('Пожалуйста, выберите страну.');
		        //     } else {
		        //         field.removeClass('error');
		        //         field.addClass('good');
		        //     }
		        // })
		
		        if ( valid ) { 
		            form.find('button').attr('disabled','disabled');
		            form.find('button').html('Отправка...');
		
		             $.ajax({ 
		                method: 'POST', 
		                url: 'mail.php', 
		                data: data,  
		                dataType: 'json',
		                error: function(e) {
		                    form.find('p.error').text('Ошибка! Попробуйте пожалуйста позже.');
		                    form.find('button').removeAttr('disabled','disabled');
		                    form.find('button').html(button);
		                },
		                success: function(e) {
		                    var r = e['exist'];
		                    if (!r){
		                        form.find('button').removeAttr('disabled','disabled');
		                        form.find('button').html(button);
		                        location.replace(url);
		                    } else {
		                        form.find('p.error').text(e['errorMessage']);
		                        form.find('button').removeAttr('disabled','disabled');
		                        form.find('button').html(button);
		                    }
		                }                          
		            });
		
		            return false; 
		        } else { 
		            return false; 
		        }
		    });
		
		    var option = $('select[name=country]').find('option:selected');
		    $('input[name=phone]').val(option.attr('data-phone-code'));
		    
		    $('select[name=country]').change(function() {
		        var option = $(this).find('option:selected');
		        $('input[name=phone]').val(option.attr('data-phone-code'));
		    });
		    
		    $("input[type='tel']").keyup(function(){
		    
		        var tel = $(this);
		        var option = $('select').find('option');
		
		        option.map(function(){
		            if ($(this).attr('data-phone-code') == tel.val()) {
		                $(this).attr("selected", "selected");
		            }
		        })
		
		        var option2 = $('select[name=country]').find('option:selected');
		
		        if (tel.val().search(option2.attr('data-phone-code')) == '-1' && tel.val().length < option2.attr('data-phone-code').length) {
		            tel.val(option2.attr('data-phone-code'));
		            forms.find('p.error').text('Ваш код в международном формате '+ option2.attr('data-phone-code'));
		        }
		
		        if (tel.val().search(option2.attr('data-phone-code')) == '-1'){
		            tel.val('');
		        }
		    });
		
		});
		/*  =========================
			Burger UX
		    ========================= */
		
		var burger_id = '.js-burger',
			nav_id = '.js-nav',
			elements = burger_id + ', ' + nav_id;
		
		$(burger_id).on('click', function(e){
			e.preventDefault(e);
		
			$(burger_id).hasClass('js-active') ? $(elements).removeClass('js-active') : $(elements).addClass('js-active');
		});

		$('.input').keyup(function(){
			if ($(this).val().length > 1) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		})

// ********************************************************************* //

$('.header__right--icon').on('click', function() {
	$('.header').addClass('search__active');
});

$('.header__right--del').on('click', function() {
	$('.header').removeClass('search__active');
});

// ********************************************************************* //

$('.quest__box--close').on('click', function() {
	$('.quest').hide();
});

$('.quest__on').on('click', function() {
	$('.quest').css('display','flex');
});

$('.quest__box--btn').on('click', function() {
	var btn = $(this);
	var parent = btn.parent('.quest__box');
	parent.hide();

	if ($(this).hasClass('quest__start')) {
		parent.next().css('display','flex');
	} else {
		parent.prev().css('display','flex');
	}
});

$('.quest__box--label').on('click','input', function() {
	var input = $(this);
	var parent = input.parents('.quest__box');
	parent.hide();

	if (parent.hasClass('quest__box--14')) {
		result();
	} else{
		parent.next().css('display','flex');	
	}
})

function result(){
	var i = 1;
	var j = 0;

	$('.quest__box--list').map(function(){
		var list = $(this);
		var answ = list.find('input:checked').val();

		if (i == 1 && answ == 4 
			|| i == 2 && answ == 3 
			|| i == 3 && answ == 1 
			|| i == 3 && answ == 2 
			|| i == 4 && answ == 2 
			|| i == 5 && answ == 1 
			|| i == 6 && answ == 1 
			|| i == 6 && answ == 4 
			|| i == 7 && answ == 3 
			|| i == 8 && answ == 3 
			|| i == 8 && answ == 4
			|| i == 9 && answ == 3
			|| i == 9 && answ == 4
			|| i == 10 && answ == 4
			|| i == 11 && answ == 1
			|| i == 11 && answ == 2
			|| i == 12 && answ == 3
			|| i == 13 && answ == 1
			) {

			j++;
		}

		i++;
	})

	if (j > 6) {
		$('.quest__box--pro').css('display','flex');
	} else {
		$('.quest__box--begin').css('display','flex');
	}
}

// ********************************************************************* //

$(document).ready(function(){
  $('.edu_comments__slider').slick({
      infinite: true,
	  slidesToShow: 2,
	  slidesToScroll: 1,
	  dots: false,
	  speed: 1000,
	  nextArrow: '<button type="button" class="slick-next"></button>',
	  prevArrow: '<button type="button" class="slick-prev"></button>',
	   responsive: [
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  });
});

// ********************************************************************* //

$(document).ready(function(){
  $('.res_slider__cont').slick({
      infinite: true,
	  slidesToShow: 2,
	  slidesToScroll: 1,
	  dots: false,
	  speed: 1000,
	  nextArrow: '<button type="button" class="slick-next"></button>',
	  prevArrow: '<button type="button" class="slick-prev"></button>',
	   responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  });
});

// ********************************************************************* //

$(document).ready(function(){
  $('.fam_second__review__slider').slick({
      infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: true,
	  dotsClass: 'slick-dots',
	  speed: 600,
	  autoplay: true,
	  autoplaySpeed: 3000,
	  arrows: false,
  });
});

// ********************************************************************* //

$('.tariff__block').on('click', function() {
	var block = $(this);
	var blocks = $('.tariff__block');
	var num = block.attr("data-order");
	
	blocks.removeAttr("id");
	block.attr("id", "one");

	if (num == 1) {
		block.next().attr("id", "three");
		block.next().next().attr("id", "two");
	}else if (num == 2) {
		block.prev().attr("id", "two");
		block.next().attr("id", "three");
	}else if (num == 3) {
		block.prev().attr("id", "two");
		block.prev().prev().attr("id", "three");
	}
})

})( jQuery );