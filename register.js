$(function () {

    $('.button-checkbox').each(function () {
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on:  { icon: 'glyphicon glyphicon-check' },
                off: { icon: 'glyphicon glyphicon-unchecked' }
            };

        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });

        $checkbox.on('change', function () {
            updateDisplay();
        });

        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            $button.data('state', isChecked ? 'on' : 'off');

            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            if (isChecked) {
                $button.removeClass('btn-default').addClass('btn-' + color + ' active');
            } else {
                $button.removeClass('btn-' + color + ' active').addClass('btn-default');
            }
        }

        function init() {
            updateDisplay();
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
            }
        }
        init();
    });

    $('#t_and_c_m .btn-primary').on('click', function () {
        $('#t_and_c').prop('checked', true).trigger('change');
    });

    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        $('.form-group').removeClass('has-error');

        var wajib = ['first_name', 'last_name', 'display_name', 'email', 'password', 'password_confirmation'];
        var valid = true;

        wajib.forEach(function (id) {
            var $el = $('#' + id);
            if ($.trim($el.val()) === '') {
                $el.closest('.form-group').addClass('has-error');
                valid = false;
            }
        });

        if (!valid) {
            alert('Semua kolom wajib diisi!');
            return;
        }

        if ($('#password').val() !== $('#password_confirmation').val()) {
            $('#password, #password_confirmation').closest('.form-group').addClass('has-error');
            alert('Password dan Confirm Password tidak sama!');
            return;
        }

        if (!$('#t_and_c').is(':checked')) {
            alert('Kamu harus menyetujui Terms and Conditions.');
            return;
        }

        alert('Registrasi berhasil! Selamat datang, ' + $('#display_name').val() + '.');
        this.reset();
        $('#t_and_c').trigger('change');
    });
});