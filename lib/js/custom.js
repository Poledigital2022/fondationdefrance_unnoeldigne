var activeExample = 0;
var activeStep = 0;
const constant = 34/100;
//var down = false ;
var countScroll = false ;

/*function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}*/
function fade(){
    $('#window-kit').fadeOut(400);
}
function fadeCount(){
    $('#countDown').fadeOut(400);
}
function toggleModal(modal) {
	if($('#' + modal).css('display') == 'none') {
		$('.modal').not('#' + modal).each(function() {
			$(this).animate({
				top: -1000
			}, 400, function() {
				$(this).css('display', 'none');
			});
		});
		
		$('#' + modal).css('display', 'block').animate({
			top: 150
		}, 400);
	}
	else {
		$('#' + modal).animate({
			top: -1000
		}, 400, function() {
			$(this).css('display', 'none');
		});
	}
}

function scrollToEl(el) {
    var e = $(el).offset().top;
	$('html, body').animate({
		scrollTop: e
	});
    
    $('#window-kit').fadeOut(400);
}

/*function openEcard() {
    dataLayer.push({"event":"clicEcardsNoelDigne"});
    dataLayer.push({
      "event":"tunnel",
      "page": "/choix"
    });
    
    $('html, body').animate({
		scrollTop: 0
	});
    
    $('.steps-container').animate({
        scrollLeft: $('.steps-container').scrollLeft()+$('.steps-container .step').eq(0).position().left
    });

    activeStep = 0;
    
    $('#window-ecard').fadeIn(400);
}

/*function prevStep() {
    if(activeStep == 0) {
        $('.steps-container').animate({
            scrollLeft: $('.steps-container').scrollLeft()+$('.steps-container .step').eq($('.steps-container .step').length-1).position().left
        });
        
        activeStep = $('.steps-container .step').length-1;
    }
    else {
        $('.steps-container').animate({
            scrollLeft: $('.steps-container').scrollLeft()+$('.steps-container .step').eq(activeStep-1).position().left
        });
        
        activeStep--;
    }
    
    if(activeStep == 0) {
        dataLayer.push({
          "event":"tunnel",
          "page": "/choix"
        });
    }
    else if(activeStep == 1) {
        dataLayer.push({
          "event":"tunnel",
          "page": "/validation-ecard"
        });
    }
    else if(activeStep == 2) {
        dataLayer.push({
          "event":"tunnel",
          "page": "/mails"
        });
    }
    else if(activeStep == 3) {
        dataLayer.push({
          "event":"tunnel",
          "page": "/merci"
        });
    }
    
    $('.steps-ecard .step.active').removeClass('active');
    $('.steps-ecard .step').eq(activeStep).addClass('active');
    
    $('html, body').animate({
		scrollTop: 0
	});
}*/

/*function nextStep() {
    if(activeStep == $('.steps-container .step').length-1) {
        $('.steps-container').animate({
            scrollLeft: $('.steps-container').scrollLeft()+$('.steps-container .step').eq(0).position().left
        });
        
        activeStep = 0;
    }
    else {
        $('.steps-container').animate({
            scrollLeft: $('.steps-container').scrollLeft()+$('.steps-container .step').eq(activeStep+1).position().left
        });
        
        activeStep++;
    }
    
    if(activeStep == 0) {
        dataLayer.push({
          "event":"tunnel",
          "page": "/choix"
        });
    }
    else if(activeStep == 1) {
        dataLayer.push({
          "event":"tunnel",
          "page": "/validation-ecard"
        });
    }
    else if(activeStep == 2) {
        dataLayer.push({
          "event":"tunnel",
          "page": "/mails"
        });
    }
    else if(activeStep == 3) {
        dataLayer.push({
          "event":"tunnel",
          "page": "/merci"
        });
    }
    
    $('.steps-ecard .step.active').removeClass('active');
    $('.steps-ecard .step').eq(activeStep).addClass('active');
    
    $('html, body').animate({
		scrollTop: 0
	});
}*/

/*function prevExample() {
    if(activeExample == 0) {
        $('.ecard-examples').animate({
            scrollLeft: $('.ecard-examples').scrollLeft()+$('.ecard-examples .ecard-example').eq($('.ecard-examples .ecard-example').length-1).position().left
        });
        
        activeExample = $('.ecard-examples .ecard-example').length-1;
    }
    else {
        $('.ecard-examples').animate({
            scrollLeft: $('.ecard-examples').scrollLeft()+$('.ecard-examples .ecard-example').eq(activeExample-1).position().left
        });
        
        activeExample--;
    }
}*/

/*function nextExample() {
    if(activeExample == $('.ecard-examples .ecard-example').length-1) {
        $('.ecard-examples').animate({
            scrollLeft: $('.ecard-examples').scrollLeft()+$('.ecard-examples .ecard-example').eq(0).position().left
        });
        
        activeExample = 0;
    }
    else {
        $('.ecard-examples').animate({
            scrollLeft: $('.ecard-examples').scrollLeft()+$('.ecard-examples .ecard-example').eq(activeExample+1).position().left
        });
        
        activeExample++;
    }
}*/

/*function chooseExample(id) {
    $('#filename').val('lib/img/ecard-' + id + '.gif');
    $('.preview-picture').html('<img src="lib/img/ecard-' + id + '.gif" class="full-width" />');
}*/

/*function uploadEnd(error, path) {
    if (error === 'OK') {
        $('#filename').val('lib/img/upload/' + path);
        $('.preview-picture').html('<img src="lib/img/upload/' + path + '" class="full-width" />');
    }
    else {
        document.getElementById('uploadStatus').innerHTML = error;
    }
}

/*function addDest() {
    var i = $('.row-dest > div').length+1;
    
    $('.row-dest').append($('<div class="col-sm-12 text-center"><span class="universulcd font-58 red text-left text-uppercase line-height-1 number-dest">' + i + '</span><input type="text" name="destinataires[]" class="form-control" placeholder="Adresse e-mail" style="vertical-align: text-bottom;" /></div>'));
}*/

function endEcard() {
	var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var error = false;
    
    var civilite = $('#civilite').val();
    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    var email = $('#email').css('border', '1px solid #ccc').val();
    /*var optin = $('#optin').prop('checked') == true ? 1 : 0;
    var fichier = $('#filename').val();
    var texte = $('.preview-content .preview-text').html();*/
    
    $('input[name="destinataires[]"]').each(function() {
        $(this).css('border', '1px solid #ccc');
        
        if($(this).val() != '' && !reg.test($(this).val())) {
            error = true;
            $(this).css('border', '1px solid #ff0000');
        }
    });
    
    if(!reg.test($('#email').val())) {
        error = true;
        $('#email').css('border', '1px solid #ff0000');
    }
    
    // On vérifie les emails, si ils sont bons, on valide.
    
    if(!error) {
        nextStep(); 
        
        /*$.ajax({
            type: 'POST',
            url: 'lib/php/functions.php?' + Math.round(new Date().getTime()),
            data : {
                what: 'setEcard',
                civilite: civilite,
                nom: nom,
                prenom: prenom,
                email: email,
                optin: optin,
                fichier: fichier,
                texte: texte,
                destinataires: $('input[name="destinataires[]"]').map(function(){return $(this).val();}).get()
            },
            success : function(data){
                    console.log("1pppppp");
            },
            error : function(data){
                    console.log("2pppppp");
            }
        });*/
    }
}

$(function() {
	var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
	var isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;

	if(isMac) {
		$('body').addClass('mac');
	}
	else if(isIOS) {
		$('body').addClass('ios');
	}
    
    /*if(screen.width >= 768) {
        window.setTimeout(function() {
            $('.v-center, .hv-center, .v-bottom').each(function() {
                if(!$(this).parent().hasClass('no-height') && !$(this).parent().parent().hasClass('row-eq-height') && !$(this).parent().parent().hasClass('row-eq-height-sm') && !$(this).parent().parent().hasClass('row-eq-height-md') && !$(this).parent().parent().hasClass('row-eq-height-lg')) {
                    $(this).parent().css('height', $(this).height()+parseFloat($(this).parent().css('paddingTop'))+parseFloat($(this).parent().css('paddingBottom')));
                }
                else {
                     $(this).parent().addClass('pos-relative').css('height', $(this).parent().parent().height());
                }
            });
        }, 1000);
    }*/
    
    $('#map').height(screen.height).width($('#map').parent().width());
    
    if(screen.width < 768) {
        map.setZoom(5);
    }
    else {
        map.setZoom(6);
    }
    
    $(window).on('resize', function() {
        if(screen.width < 768) {
            map.setZoom(4);
        }
        else {
            map.setZoom(6);
        }
        
       /* if(screen.width >= 768) {
            $('.v-center, .hv-center, .v-bottom').each(function() {
                if(!$(this).parent().hasClass('no-height') && !$(this).parent().parent().hasClass('row-eq-height') && !$(this).parent().parent().hasClass('row-eq-height-sm') && !$(this).parent().parent().hasClass('row-eq-height-md') && !$(this).parent().parent().hasClass('row-eq-height-lg')) {
                    $(this).parent().css('height', $(this).height()+parseFloat($(this).parent().css('paddingTop'))+parseFloat($(this).parent().css('paddingBottom')));
                }
                else {
                     $(this).parent().addClass('pos-relative').css('height', $(this).parent().parent().height());
                }
            });
        }*/
        
         //$('.map-container').parent().height($('.map-container').height()-$('.row-1').height());
    });
    
   /* window.setTimeout(function() {
        $('#window-ecard').css('paddingTop', $('.navbar').height()+30).css('height', $('body').height());
    }, 1000);*/
    
    /*$('div.preview-text').on('keyup paste', function(event) {
        //You can add delete key event code as well over here for windows users.
        if($(this).text().length === 350 && event.keyCode != 8) { 
            event.preventDefault();
        }
        else {
            $('.preview-text2').html(nl2br($('.preview-text').html()));
        }
    });*/
    
   /* $('.ecard-examples').animate({
        scrollLeft: $('.ecard-examples').scrollLeft()+$('.ecard-examples .ecard-example').eq(0).position().left
    });
    
    $('.steps-container').animate({
        scrollLeft: $('.steps-container').scrollLeft()+$('.steps-container .step').eq(0).position().left
    });*/
    
    $.cookieBar({
        message: 'Ce site utilise des cookies pour vous proposer des contenus et publicités personnalisés, pour faciliter le partage d’information sur les réseaux sociaux et pour réaliser des mesures d’audience.',
        acceptText: 'Accepter',
        savoirText:'En savoir plus',
        fixed: true,
        bottom: true,
    });
});

function transform_top() {
    var g = $(".logo img").height()/2;
    if($(window).width() <= 1240 && $(window).width() > 640){
        $(".main-nav").css("margin-top", "-"+g+"px");
      
    }
    else {
        $(".main-nav").css("margin-top", "auto");
    }
}
$("#submit-don").click(function (e) {
      e.preventDefault();
   if ($('#don-m').val() != "" && $("#other-don").is(':checked')) {
    $('#amount').val($('#don-m').val() * 100);

  } else {
    $('#amount').val($('input[name="radio-don"]:checked', '.form-don').val());
    
  }

  var url = $('.form-don').attr('action')+'?amount='+$('#amount').val()+$('#url_form').val();
    //$('.form-don').attr('action' );
    window.open(url,'_blank' );

});


$(document).ready(function() {
        jcf.replaceAll();
        $("#civilite").change(function(e){
            var val = $("#civilite").val();
            if(val == "M"){
                $(".jcf-select .jcf-select-opener").addClass('monsieur').removeClass('madame')
            }else if(val == "MME"){
                $(".jcf-select .jcf-select-opener").addClass('madame').removeClass('monsieur')
            }
        });

        $(".radio-don").change(function(){
                if($("#other-don").is(':checked')) {
                     $('.don-txt').removeAttr('disabled');
                     $("#don-m").focus();
                //} else {
                     ///$('.don-txt').attr('disabled','disabled');
                }

        });

        $("#don-m").focus(function(){
                     //console.log("bien clikkc");
                     $("#don-m").removeAttr('disabled');
                     $("#other-don").prop("checked", true);
                     $('.jcf-radio .radio-t').prop("checked", false).addClass("jcf-unchecked").removeClass("jcf-checked");
                     $('.jcf-radio').addClass("jcf-unchecked").removeClass("jcf-checked");
                     $("#other-don").parent(".jcf-radio").addClass("jcf-checked").removeClass("jcf-unchecked");

        });
        $(".don-txt").keyup(function(){
            var price = $(this).val();
               if (!isNaN(price) && price != "") {
               var deduction = price * constant;
               $("#deduction-old").text(price);
               $("#deduction").text(Math.ceil(deduction));
                }
            });
        $('input[type="radio"].radio-t').each(function (){
                 $(this).change(function(){
                    var val =  $(this).val() / 100;
                    var val1 =  val * constant;
                    $("#deduction-old").text(val);
                     $("#deduction").text(Math.ceil(val1));
                     $("#don-m").val("");
                      //$('.don-txt').attr('disabled','disabled');
                     //$(".don-txt").val(val);
                }) 
         });
         
        
        $(window).scroll(function(){
            /*var date = new Date();
            var show_at = new Date('2017-12-25');
            var diff = date - show_at ;
            if (diff >= 0) {
                if(countScroll == false){
                    $("#countDown").fadeIn(1000);
                    countScroll = true;
                }
            }*/
            
            var scrollw = $(window).scrollTop();
            var scroll = $(".offer-don-form").position().top+$(".offer-don-form").height();
            if(scrollw > scroll){
                $(".sticky-row").addClass("is-stick");
            }else{
                $(".sticky-row").removeClass("is-stick");
            }
        });
        

       /*$("#form-kit .btn-green").click(function(e){
            e.preventDefault();
               $.ajax({url: "lib/php/kit.php",
                        type: "POST",
                        data: {
                            nom : $("#nom").val(),
                            prenom : $("#prenom").val(),
                            civilite : $("#civilite").val(),
                            email: $("#email").val(),
                        },
                        success: function (data) {
                              if(data == "1")
                               $(window).location.href="kit-page.php";
                              
                        }
                      });
           
        });*/
                  
      jQuery.validator.addMethod(
                "checkSelect",
                function(value, element, checkSelect) {
                    if(value == "non_preci"){
                        return false;
                    }else{
                        return true;
                    }
                },
                "Ce champ n'est pas valide."
            );

     $("#form-kit").validate({
             rules:{
            nom:"required",
            prenom:"required",
            civilite:{required: true,checkSelect: true},
            email: {
                    required: true,
                    email: true
                },
        }
      });
     countDown();


});

function countDown(){

    var countDownDate = new Date("12/31/2017 23:59:00").getTime();
    var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().split("");
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().split("");
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().split("");
    //var seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().split("");

    /*var days = days.split("");
    var hours = hours.split("");
    var minutes = minutes.split("");
    var seconds = seconds.split("");*/
    var d = "";
    var h = "";
    var m = "";
    for ( var i = 0, l = days.length; i < l; i++ ) {
        d+= '<span class="char-count red">'+days[i]+"</span>";
    }
    for ( var i = 0, l = hours.length; i < l; i++ ) {
         h+= '<span class="char-count red">'+hours[i]+"</span>";
    }
    for ( var i = 0, l = minutes.length; i < l; i++ ) {
         m+= '<span class="char-count red">'+ minutes[i]+"</span>";
    }
    $(".day").html(d);
    $(".hour").html(h);
    $(".mint").html(m);
    if (distance < 0) {
        clearInterval(x);
        $("countDown").css("display" , "none");
    }
}, 1000);
}


    /*$(window).bind("beforeunload", function (e) {
      
        confirm("Etes-vous sûr de vouloir quitter cette page sans télécharger la brochure");
       
              if(down == false){
                         e.preventDefault();
                         if(e || $(window).event){
                                  $('#window-kit').fadeIn(400);
                                  down = true;

                          
                            
                         }
                    }

         }); */