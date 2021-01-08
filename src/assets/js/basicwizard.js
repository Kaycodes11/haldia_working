
$(document).ready(function () {
    $('#besicwizard').bootstrapWizard({
        withVisible: false,
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        'firstSelector': '.button-first',
        'lastSelector': '.button-last'
    });
    $('#btnwizard').bootstrapWizard({
        withVisible: false,
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        'firstSelector': '.button-first',
        'lastSelector': '.button-last'
    });
    $('#progresswizard').bootstrapWizard({
        withVisible: false,
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        'firstSelector': '.button-first',
        'lastSelector': '.button-last',
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#progresswizard .progress-bar').css({
                width: $percent + '%'
            });
        }
    });
    $('#validationwizard').bootstrapWizard({
        withVisible: false,
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        'firstSelector': '.button-first',
        'lastSelector': '.button-last',
        onNext: function (tab, navigation, index) {
            if (index == 1) {
                if (!$('#validation-t-name').val()) {
                    $('#validation-t-name').focus();
                    $('.form-1').addClass('was-validated');
                    return false;
                }
                if (!$('#validation-t-email').val()) {
                    $('#validation-t-email').focus();
                    $('.form-1').addClass('was-validated');
                    return false;
                }
                if (!$('#validation-t-pwd').val()) {
                    $('#validation-t-pwd').focus();
                    $('.form-1').addClass('was-validated');
                    return false;
                }
            }
            if (index == 2) {
                if (!$('#validation-t-address').val()) {
                    $('#validation-t-address').focus();
                    $('.form-2').addClass('was-validated');
                    return false;
                }
            }
        }
    });
    $('#tabswizard').bootstrapWizard({
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
    });
    $('#verticalwizard').bootstrapWizard({
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
    });
});
