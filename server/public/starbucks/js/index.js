$('.icon-menu', ".leftCon").click(function(){
    // $(".lf-menu").css("display", 'block');
    $(".lf-menu").removeClass('hide').addClass('show');
})
$(".icon-guanbi",".lf-menu").click(function(){
    // $(".lf-menu").css("display", 'none');
    $(".lf-menu").removeClass('show').addClass('hide');
})
$('.carousel').carousel({
    interval:3000,
    pause:"hover"
})