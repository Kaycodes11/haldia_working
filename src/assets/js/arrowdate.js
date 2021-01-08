
arrows = {
    leftArrow: '<i class="feather icon-chevron-left"></i>',
    rightArrow: '<i class="feather icon-chevron-right"></i>'
}
// minimum setup
$('#pc-datepicker-1').datepicker({
    todayHighlight: true,
    orientation: "bottom left",
    templates: arrows
});

// minimum setup for modal demo
$('#pc-datepicker-1_modal').datepicker({
    todayHighlight: true,
    orientation: "bottom left",
    templates: arrows
});

// input group layout
$('#pc-datepicker-2').datepicker({
    todayHighlight: true,
    orientation: "bottom left",
    templates: arrows
});

// input group layout for modal demo
$('#pc-datepicker-2_modal').datepicker({
    todayHighlight: true,
    orientation: "bottom left",
    templates: arrows
});

// enable clear button
$('#pc-datepicker-3, #pc-datepicker-3_validate').datepicker({
    todayBtn: "linked",
    clearBtn: true,
    todayHighlight: true,
    templates: arrows
});

// enable clear button for modal demo
$('#pc-datepicker-3_modal').datepicker({
    todayBtn: "linked",
    clearBtn: true,
    todayHighlight: true,
    templates: arrows
});

// orientation
$('#pc-datepicker-4_1').datepicker({
    orientation: "top left",
    todayHighlight: true,
    templates: arrows
});

$('#pc-datepicker-4_2').datepicker({
    orientation: "top right",
    todayHighlight: true,
    templates: arrows
});

$('#pc-datepicker-4_3').datepicker({
    orientation: "bottom left",
    todayHighlight: true,
    templates: arrows
});

$('#pc-datepicker-4_4').datepicker({
    orientation: "bottom right",
    todayHighlight: true,
    templates: arrows
});

// range picker
$('#pc-datepicker-5').datepicker({
    todayHighlight: true,
    templates: arrows
});

// inline picker
$('#pc-datepicker-6').datepicker({
    todayHighlight: true,
    templates: arrows
});
