$(document).ready(function () {
  $('.block1').on("mouseover", function () {
    $('.block-hover1').addClass('visible');
    console.log('hi');
  });
  $('.block1').on("mouseleave", function () {
    $('.block-hover1').removeClass('visible');
    console.log('bye');
  });

  $('.block2').on("mouseover", function () {
    $('.block-hover2').addClass('visible');
    console.log('hi');
  });
  $('.block2').on("mouseleave", function () {
    $('.block-hover2').removeClass('visible');
    console.log('bye');
  });

  $('.block3').on("mouseover", function () {
    $('.block-hover3').addClass('visible');
    console.log('hi');
  });
  $('.block3').on("mouseleave", function () {
    $('.block-hover3').removeClass('visible');
    console.log('bye');
  });

  $('.block4').on("mouseover", function () {
    $('.block-hover4').addClass('visible');
    console.log('hi');
  });
  $('.block4').on("mouseleave", function () {
    $('.block-hover4').removeClass('visible');
    console.log('bye');
  });

  //slick-slider

  $('.slider-wraper').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots:true,
    infinite:true,
  });

  //hover2
  $('.block').on("mouseover", function () {
    $('.block-hover',this).addClass('visible');
    console.log('hi');
  })
  $('.block').on("mouseleave", function () {
    $('.block-hover',this).removeClass('visible');
  })


  //accordeon
  $('.accordeon-item').on('click', function(){
    $('.item-block').not($(this).next()).slideUp(1000);
    $('.item-img-minus').not($(this).next()).css('display', 'none');
    $('.item-img-plus').not($(this).next()).css('display', 'block');
    $('.item-block',this).slideToggle(1000);
    $('.item-img-minus',this).css('display', 'block');
    $('.item-img-plus',this).css('display', 'none');
  });

});
