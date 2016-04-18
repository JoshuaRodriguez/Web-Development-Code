$('ul').on('click', "li", function () {
    $(this).toggleClass("completed");
});

$('ul').on('click', "span", function (event) {
    $(this).parent().fadeOut(1000, function () {
        $(this).remove(); // the $this here refers to the parent
    })
    event.stopPropagation();
});

$("input[type='text']").keypress(function (event) {
    if(event.which === 13) {
        var todoText = $(this).val();
        $('ul').append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
        $(this).val("");
    }
});

$('.fa-plus').on('click', function () {
    $('input[type="text"]').fadeToggle();
});
