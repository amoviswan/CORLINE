jQuery(function($){
    function mainSlider() {
        if(typeof $.fn.jcarousel != "undefined") {

            /* карусель акций на главной странице */
            var carousel = $('.slides').jcarousel({
                wrap: 'circular'
            });
            carousel.jcarouselAutoscroll({
                interval: 4000
            });

            var bnrCarousel = $('.bannerSlides').jcarousel({
                wrap: 'circular'
            });
            bnrCarousel.jcarouselAutoscroll({
                interval: 3000
            });
            
            /* карусель баннеров в разделе "Вакансии" */
            /*var jobCarousel = $('.jobSlides').jcarousel({
                wrap: 'circular',
                animation: {
                    duration: 800,
                    easing:   'linear',
                    complete: function() {
                    }
                }
            });
            jobCarousel.jcarouselAutoscroll({
                interval: 3000,
                autostart: true
            });*/
            

            var catalogCarousel = $('.catalogSlides').jcarousel({
                wrap: 'circular'
            });
            catalogCarousel.jcarouselAutoscroll({
                interval: 6000
            });
            

            var newItemGurman = $('.itemSlides').jcarousel({
                wrap: 'circular'
            });
            newItemGurman.jcarouselAutoscroll({
                autostart: false
            });

            $('.arrow.prev')
                .on('jcarouselcontrol:active', function() {
                    $(this).removeClass('inactive');
                })
                .on('jcarouselcontrol:inactive', function() {
                    $(this).addClass('inactive');
                })
                .jcarouselControl({
                    target: '-=1'
                });

            $('.arrow.next')
                .on('jcarouselcontrol:active', function() {
                    $(this).removeClass('inactive');
                })
                .on('jcarouselcontrol:inactive', function() {
                    $(this).addClass('inactive');
                })
                .on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                })
                .jcarouselControl({
                    target: '+=1'
                });
        }
    }
    
    
    
    

    function forms() {
        if($('select').length) {
            $('select').replaceSelect();
        }

        if($('input[type=radio]').length) {
            $('input[type=radio]').iCheck();
        };

        //if($('input[type=checkbox]').length) {
        //    $('input[type=checkbox]').iCheck();
        //};

        if($('input.date').length) {
            $('input.date').datepicker({
                dateFormat: "dd.mm.yy",
                maxDate: "today",
                onSelect: function(dateStr) {
                    if(typeof $.validator != "undefined" && $(this).closest('.addComment, .vacancyForm').length) {
                        $('.addComment form, .vacancyForm').validate().element(this);
                    }
                }
            });
            $('.calendar').on('click', function(e) {
                e.preventDefault();

                $(this).prev('.date').datepicker('show');
            });
        }

        if(typeof $.mask != "undefined") {
            $.mask.definitions['~'] = "[+-]";
            $(".cityPhone").mask("8 (9999) 99-99-99");
            $(".mobilePhone").mask("+7 (999) 999-99-99");
            $(".date").mask("99.99.9999");
        }

        if(typeof $.validator != "undefined") {
            jQuery.validator.addMethod("dmy", function(value, element) {
                var check = false,
                    re = /^\d{1,2}\.\d{1,2}\.\d{4}$/,
                    adata, gg, mm, aaaa, xdata, curdate;
                if ( re.test(value)) {
                    adata = value.split(".");
                    gg = parseInt(adata[0],10);
                    mm = parseInt(adata[1],10);
                    aaaa = parseInt(adata[2],10);
                    xdata = new Date(aaaa, mm - 1, gg, 0, 0, 0, 0);
                    curdate = new Date();

                    if ( ( xdata.getFullYear() === aaaa ) && ( xdata.getMonth() === mm - 1 ) && ( xdata.getDate() === gg ) && (xdata.getTime() <= curdate.getTime())){
                        check = true;
                    } else {
                        check = false;
                    }
                } else {
                    check = false;
                }
                return this.optional(element) || check;
            }, "Please enter a correct date");

            $('.addComment form, .vacancyForm').validate({
                rules: {
                    //email: "required email",
                    date: {
                        "dmy": true,
                        "date": false
                    }
                },
                highlight: function (element, errorClass) {
                    $(element).parent().addClass('invalid').removeClass('valid');
                },

                unhighlight: function (element, errorClass) {
                    $(element).parent().addClass('valid').removeClass('invalid');
                },
                errorPlacement: function(error,element) {
                    return true;
                }

            });
        }

        $('.btnResponse, a[href=#comment]').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: $('.addComment').offset().top
            })
        });
    }

    function findYourStore() {
        if(typeof $.fn.qtip != "undefined") {
            $('.store .icons div').each(function(){
                $(this).qtip({
                    content: {
                        text: $(this).attr('title')
                    },
                    position: {
                        my: "right center",
                        at: "left center",
                        adjust: {
                            mouse: false,
                            method: 'flip'
                        }
                    },
                    style: {
                        classes: 'icontip qtip-shadow'
                    }
                })
            });
        }


        var $map = false,
            mapObj;

        $('.store .icons .map').on('click', function(e) {
            var $store = $(this).closest('.store');

            if(!$map || !mapObj) {
                $map = $('<div></div>');
                $map.addClass('popupMap')

                $('body').append($map);

                mapObj = new DG.Map($map.get(0));
                mapObj.controls.add(new DG.Controls.Zoom());

                $map.hide();
            }

            $.fancybox.open($map);

            var coords = $store.data('coords');
            var address = $store.data('address');

            if(coords) {
                mapObj.setCenter(geoObj.getCenterGeoPoint(), 16);
            } else {
                DG.Geocoder.get(address, {
                    success: function(geoObjects){
                        for(var i = 0; i < geoObjects.length; i++) {
                            var geoObj = geoObjects[i];
                            $store.data('coords', geoObj.getCenterGeoPoint());

                            var markerOptions = {
                                geoPoint: geoObj.getCenterGeoPoint(),
                                balloonOptions: {
                                    contentHtml: address
                                }
                            }

                            var marker = new DG.Markers.MarkerWithBalloon(markerOptions);
                            mapObj.markers.add(marker);

                            mapObj.setCenter(geoObj.getCenterGeoPoint(), 16);
                        }
                    }
                });
            }
        });


        var squareFrom = 150,
            squareTo = 300;

        if($('input[name=squareFrom]').val() > 0) {
            squareFrom = $('input[name=squareFrom]').val();
        }

        if($('input[name=squareTo]').val() > 0) {
            squareTo = $('input[name=squareTo]').val();
        }

        if(typeof $.fn.slider != "undefined") {
            var $slider = $( ".range" ).slider({
                range: true,
                min: 0,
                max: 1000,
                values: [ squareFrom, squareTo ],
                slide: function( event, ui ) {
                    $('input[name=squareFrom]').val(ui.values[0]);
                    $('input[name=squareTo]').val(ui.values[1]);
                }
            });
            $('input[name=squareFrom]').on('change', function() {
                $slider.slider('values', 0, $(this).val());
            });

            $('input[name=squareTo]').on('change', function() {
                $slider.slider('values', 1, $(this).val());
            });

            //$('input[name=squareFrom]').val($slider.slider('values', 0));
            //$('input[name=squareTo]').val($slider.slider('values', 1));
        }
    }

    function fancybox() {
        if(typeof $.fancybox != "undefined") {
            $('a[rel=fancybox]').fancybox();
        }
    }

    function catalogMenu() {
        $('.partnersMenu > ul > li > a').on('click', function(e) {
            e.preventDefault();
            $(this).closest('li').toggleClass('active');
        })
    }

    function masonry() {
        if(typeof $.fn.masonry != "undefined") {
            $('.listRecipes .inner').masonry({
                itemSelector: '.itemRecipe',
                gutter: 28
            });
        }
    }

    function ingredients() {
        $('.imgRecipe')
            .on('mouseenter', function(e) {
                $(this).children('.ingr').stop(1,1).animate({
                    bottom: 0,
                    opacity: 0.7
                });
            })

            .on('mouseleave', function(e){
                $(this).children('.ingr').stop(1,1).animate({
                    bottom: -219,
                    opacity: 1
                });
            });
    }

    function print() {
        $('.print').on('click', function(e) {
            e.preventDefault();

            window.print();
        })
    }

    function share() {
        $('.itemNew .share a').on('click', function(e) {
            e.preventDefault();

            var link = document.location;
            var title = $(this).closest('.itemNew').find('h2').text() + ' - ' + $('head title').text();
            var image = 'http://' + document.location.host + '/' + $(this).closest('.itemNew').find('.newImage img').attr('src');
            var desc = $(this).closest('.itemNew').find('.contentAction').text();

            switch($(this).attr('class')) {
                case 'vk':
                    Share.vkontakte(link,title,image,desc);
                    break;
                case 'fb':
                    Share.facebook(link,title,image,desc);
                    break;
                case 'tw':
                    Share.twitter(link,title);
                    break;
                case 'ok':
                    Share.odnoklassniki(link,title);
                    break;
            }

            return false;
        })

        $('.itemNews .share a').on('click', function(e) {
            e.preventDefault();

            var link = document.location;
            var title = $(this).closest('.itemNews').find('h3').text();
            var image = 'http://' + document.location.host + '/' + $(this).closest('.itemNews').find('img').attr('src');
            var desc = $(this).closest('.itemNews').find('.contentAction p:first').text();

            switch($(this).attr('class')) {
                case 'vk':
                    Share.vkontakte(link,title,image,desc);
                    break;
                case 'fb':
                    Share.facebook(link,title,image,desc);
                    break;
                case 'tw':
                    Share.twitter(link,title);
                    break;
                case 'ok':
                    Share.odnoklassniki(link,title);
                    break;
            }

            return false;
        })
    }



    /* -------------------------------------------- */

    function mainBgs() {
        var $slides = $('#mainSlider .background');
        var $points = $('#mainSlider .navMSitems li');
        var ms = setInterval(changeSlide, 4000);
        var speed = 1000;
        
        if($slides.length) {
            $slides.first().show();
            $points.first().addClass('active');

            function changeSlide() {
                //var speed = 1000;
        
                $prevSlide = $slides.filter(':visible');
                $nextSlide = $prevSlide.next('.background');
                
                $prevPoint = $points.filter('.active');
                $nextPoint = $prevPoint.next('li');
                $prevPoint.removeClass('active');
                $nextPoint.addClass('active');
        
                if(!$nextSlide.length) {
                    $nextSlide = $slides.first();
                    $points.removeClass('active');
                    $nextPoint = $points.first().addClass('active');
                }
        
                $prevSlide.fadeOut(speed);
                $nextSlide.fadeIn(speed);
            }
            
            function changeSlidePrev() {
                //var speed = 1000;
        
                $prevSlide = $slides.filter(':visible');
                $nextSlide = $prevSlide.prev('.background');
                 
                $prevPoint = $points.filter('.active');
                $nextPoint = $prevPoint.prev('li');
                $prevPoint.removeClass('active');
                $nextPoint.addClass('active');
        
                if(!$nextSlide.length) {
                    $nextSlide = $slides.last();
                    $points.removeClass('active');
                    $nextPoint = $points.last().addClass('active');
                }
        
                $prevSlide.fadeOut(speed);
                $nextSlide.fadeIn(speed);
            }

            $(window).on('load', function() {
                //var ms = setInterval(changeSlide, 4000);
                start(changeSlide);
            });
            
            function start(vector)
            {
                ms = setInterval(vector, 4000);
            }
            /* С помощью функции stop Вы можете остановить выполнение кода */
            function stop()
            {
                clearInterval(ms);
            }
            
             $('.mArrow.next').on('click', function(){
                 stop();
                 changeSlide();
                 start(changeSlide);
             });
            $('.mArrow.prev').on('click', function(){
                 stop();
                 changeSlidePrev();
                 start(changeSlidePrev);
             });
             
             $('#mainSlider .navMSitems li').on('click', function(){
                    $('#mainSlider .navMSitems li').removeClass('active');
                    $(this).addClass('active');
                    $prevSlide = $slides.filter(':visible');
                    var nPoint = $(this).attr('rel');
                    
                    $slides.each(function(key, val){
                        if($(this).attr('rel') == nPoint){
                            $nextSlide = $(this);
                        }
                    });

                      stop();
                    $prevSlide.fadeOut(speed);
                    $nextSlide.fadeIn(speed);
                    start(changeSlide);
             });
            
        }
    }
    

    /* -------------------------------------------- */
    
    
    

    

    
    /* --------------------- Vacancy slider ----------------------- */

    function jobCarousel() {
        var $slides = $('.jobSlides li');

        var ms = setInterval(changeJobSlide, 6000);
        var speed = 600;
        
        if($slides.length) {
            $slides.first().show();
            

            function changeJobSlide() {
                $prevSlide = $slides.filter(':visible');
                $nextSlide = $prevSlide.next('.jobSlides li');
                
                if(!$nextSlide.length) {
                    $nextSlide = $slides.first();
                }
        
                $prevSlide.fadeOut(speed);
                $nextSlide.fadeIn(speed);
            }
            
            function changeJobSlidePrev() {
                $prevSlide = $slides.filter(':visible');
                $nextSlide = $prevSlide.prev('.jobSlides li');
                 
                if(!$nextSlide.length) {
                    $nextSlide = $slides.last();
                }
        
                $prevSlide.fadeOut(speed);
                $nextSlide.fadeIn(speed);
            }

            $(window).on('load', function() {
                start(changeJobSlide);
            });
            
            function start(vector)
            {
                ms = setInterval(vector, 6000);
            }
            /* С помощью функции stop Вы можете остановить выполнение кода */
            function stop()
            {
                clearInterval(ms);
            }
            
             $('.bnrJobs .arrow.next').on('click', function(){
                 stop();
                 changeJobSlide();
                 start(changeJobSlide);
             });
            $('.bnrJobs .arrow.prev').on('click', function(){
                 stop();
                 changeJobSlidePrev();
                 start(changeJobSlidePrev);
             });

        }
    }
    

    /* -------------------------------------------- */
    
    

    
    
    
    

    function gurmanSlider() {
        var $slider = $('.changeSlider');

        if($slider.length) {
            $slides = $slider.children();

            $slides
                .on('click', function(e){
                    var $slide = $(this);
                    $slider.attr('class', 'changeSlider');
                    $slider.addClass($(this).attr('class'));
                });
        }
    }
    /*
    function NewItemSlider() {
        var $slider = $('.NewItemSlider');

        if($slider.length) {
            $slides = $slider.children();

            $slides
                .on('click', function(e){
                    var $slide = $(this);
                    $slider.attr('class', 'NewItemSlider');
                    $slider.addClass($(this).attr('class'));
                });
        }
    }*/
    
    
    
     /* --------------------- Sublease slider ----------------------- */

    function subleaseCarousel() {
        var $slides = $('.subleaseSlides li');

        var ms = setInterval(changeSubleaseSlide, 6000);
        var speed = 600;
        
        if($slides.length) {
            $slides.first().show();
            

            function changeSubleaseSlide() {
                $prevSlide = $slides.filter(':visible');
                $nextSlide = $prevSlide.next('.subleaseSlides li');
                
                if(!$nextSlide.length) {
                    $nextSlide = $slides.first();
                }
        
                $prevSlide.fadeOut(speed);
                $nextSlide.fadeIn(speed);
            }
            
            function changeSubleaseSlidePrev() {
                $prevSlide = $slides.filter(':visible');
                $nextSlide = $prevSlide.prev('.subleaseSlides li');
                 
                if(!$nextSlide.length) {
                    $nextSlide = $slides.last();
                }
        
                $prevSlide.fadeOut(speed);
                $nextSlide.fadeIn(speed);
            }

            $(window).on('ready', function() {
                start(changeSubleaseSlide);
            });
            
            function start(vector)
            {
                ms = setInterval(vector, 6000);
            }
            function stop()
            {
                clearInterval(ms);
            }
            
             $('.bnrSublease .arrow.next').on('click', function(){
                 stop();
                 changeSubleaseSlide();
                 start(changeSubleaseSlide);
             });
            $('.bnrSublease .arrow.prev').on('click', function(){
                 stop();
                 changeSubleaseSlidePrev();
                 start(changeSubleaseSlidePrev);
             });

        }
    }
    

    /* -------------------------------------------- */
    
    
    function vacancy() {
        $('.vacancyList').hide();
        
        $('.vacancyPage h1').on('click', function(e) {
            $(this).next('.vacancyList').slideToggle();
        })
    }

    function tabs() {
        $('.tabsBlock').each(function() {
            var $tabs = $('.tabs .tab', this);
            var $tabsContent = $('.tabscontent .tab', this);

            $tabs.first().addClass('active');
            $tabsContent.first().addClass('active');

            $tabs.on('click', function() {
                if($(this).hasClass('active')) return;

                $tabs.removeClass('active');
                $(this).addClass('active');

                $tabsContent.removeClass('active');
                $tabsContent.eq($tabs.index(this)).addClass('active');
            });
        });
    }

    function actionImages() {
        $('.actionImage.ask').on('click', function(e) {
            if(!confirm('Вы старше 18 лет?')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });

        $('.actionImage').fancybox({
            afterShow: function(){
                $('.loop').loupe();
            }
        });
    }
    function actionImagesGurman() {
        $('.actionImageGurman.ask').on('click', function(e) {
            if(!confirm('Вы старше 18 лет?')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });

        $('.actionImageGurman').fancybox();
    }

    var handlers = [
        mainSlider,
        mainBgs,
        forms,
        findYourStore,
        fancybox,
        catalogMenu,
        masonry,
        //gurmanSlider,
        //NewItemSlider,
        ingredients,
        print,
        share,
        vacancy,
        tabs,
        actionImages,
        actionImagesGurman,
        jobCarousel,
        subleaseCarousel
    ];

    $.each(handlers, function(i, handler){
        try {
            handler.call();
        } catch (e) {
            console.log('Error! ' + e);
        }
    });
    
    
    
    
    var wrapper = $( ".file_upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( "button" ),
        lbl = wrapper.find( "div" );

    btn.focus(function(){
        inp.focus()
    });
    // Crutches for the :focus style:
    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] ) 
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            btn.text( "Прикрепить файл" );
        }else
            btn.text( file_name );
    }).change();
    
    
});


$( window ).resize(function(){
    $( ".file_upload input" ).triggerHandler( "change" );
});


/* ------------------------ F.A.Q. ------------------------ */
$(document).on('click', 'div.page-question', function () {
	$(this).next('div').slideToggle(300, function(){
	    if ($(this).parent().find('div.arrow-f').hasClass('activeFAQ')){
	        $(this).parent().find('div.arrow-f').removeClass('activeFAQ');
	        //console.log('remove');
	    } else{
	        $(this).parent().find('div.arrow-f').addClass('activeFAQ');
	        //console.log('add');
	    }
	});
});
