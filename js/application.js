(function ($) {
    /*
     * Inicializamos dataTables
     */
    if ($('.js_datatable-activate').length) {
        $('.js_datatable-activate').each(function () {
            if ($(this).attr('data-ajax-url') && $(this).attr('data-ajax-type')) {
                /*
                 Datatables customized server-side options, for describe the ajax url settings (ajax url and request type) (that are not available on
                 default datatables html-attributes
                 */
                var datatablesOptions = {
                    serverSide: true,
                    ajax: {
                        url: $(this).data('ajax-url'),
                        type: $(this).data('ajax-type')
                    }
                };
            } else {
                /*
                 Default options. The default behavior for datatables
                 */
                var datatablesOptions = false;
            }
            $(this).DataTable(datatablesOptions);
        });
    }

    $('.slideshow-video').slick({
        dots: false, // Esto era TRUE
        arrows: true, // Esto era FALSE
        infinite: false,
        autoplay: true,
        speed: 900, // Se ha cambiado la velocidad
        useCSS: true,
        rows: 0,
        slidesToShow: 3,
        slidesToScroll: 2,
        prevArrow: '<button class="slick-prev slick-arrow slick-disabled" aria-label="Previous" type="button" aria-disabled="true" style="display: block;">Previous\n' +
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" role="img" aria-labelledby="previousCarouselsSlideTitle" class="icon icon-anyfill-ui-chevron-left">\n' +
                '<title id="previousCarouselsSlideTitle">Avanzar hacia el video anterior</title>\n' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-anyfill-ui-chevron-left"></use>\n' +
                '</svg>\n' +
                '</button>\n',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: block;" aria-disabled="false">Next\n' +
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" role="img" aria-labelledby="nextCarouselsSlideTitle" class="icon icon-anyfill-ui-chevron-right">\n' +
                '<title id="nextCarouselsSlideTitle">Avanzar hacia el siguiente video</title>\n' +
                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-anyfill-ui-chevron-right"></use>\n' +
                '</svg>\n' +
                '</button>\n',
        respondTo: 'min',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    /*
     * Accept cookies
     */

    var $cookieBanner = $('.js-cookie-banner');
    var $btn = $cookieBanner.find('.js-accept-button');
    var $configCookiesbtn = $('.js-configCookies-button');

    //nueva cookie que determina que aparezca banner (aceptando cookie basica)
    const CONFIG_COOKIE = APP.cookies_site_config;
    //cookie ga
    const GA_COOKIE = APP.cookies_site_ga;

    /*BOTON ACEPTAR TODAS COOKIES / ALGUNAS COOKIES*/
    $btn.on('click', function (event) {
        var $dataCookies = $(this).data('cookies');
        var $check = $('#check_ga_active_desactive');
        //INICIALMENTE SE ACTIVA LA COOKIE CONFIG GLOBAL
        document.cookie = CONFIG_COOKIE + "=1; path=/;";
        //SE REVISA SELECCION PARA ACTIVAR LAS RESTANTES COOKIES
        document.cookie = GA_COOKIE + "=" + ($dataCookies === 'all' || ($dataCookies === 'config' && $check.is(':checked')) ? '1' : 0) + "; path=/;"
        $cookieBanner.hide();
    });

    /*BOTON PARA CONFIGURAR LAS COOKIES*/
    $configCookiesbtn.on('click', function (event) {
        $('#cookie_banner').show();
    });

    /* Menu fixed on scroll*/
    $(function () {
        var $win = $(window);
        var $winWidth = $win.width();
        if ($winWidth >= 992) {
            var $headerClass = $('[class^=header-00]');
            if ($headerClass.length > 0) { //en caso que exista esa class
                $shrinkingEfect = (typeof $shrinkingEfect !== 'undefined') && $shrinkingEfect;

                var $firstHeaderElement = $('header div:first-child');
                var $posheaderlogo = 0;
                var $posheaderbar = $headerClass.find('.container-fluid.top-bar').outerHeight();
                var $totalHeader = $posheaderbar;

                if ($firstHeaderElement.hasClass('slideshow-fullwidth-placeholder')) {
                    $totalHeader += $firstHeaderElement.outerHeight();
                }

                if ($headerClass.hasClass('shrinking-effect-logo') && ($headerClass.hasClass('header-001') ||
                        $headerClass.hasClass('header-002') ||
                        $headerClass.hasClass('header-003') ||
                        $headerClass.hasClass('header-004') ||
                        $headerClass.hasClass('header-005') ||
                        $headerClass.hasClass('header-006') ||
                        $headerClass.hasClass('header-008') ||
                        $headerClass.hasClass('header-010'))) {
                    var $headerStyle = $headerClass.attr('style');
                    $headerStyle = ((typeof $headerStyle !== 'undefined') && $headerStyle) ? $headerStyle + ';' : '';
                    var $headerStyleRefresh = true;
                    var $headerStyleTmp = '';
                    var $headerStyleTop = 0;
                    var $headerStyles = 0;
                    var $winScrollTop = 0;
                    $win.scroll(function () {
                        let $heightMenu = $headerClass.find('.container-fluid.menu-bar').outerHeight();
                        if ($headerClass.hasClass('slideshow-fullwidth-placeholder')) {
                            $heightMenu += $firstHeaderElement.outerHeight();
                        }
                        $posheaderlogo = ($headerClass.find('.container-fluid.logo-header').css('display') !== 'none') ? $headerClass.find('.container-fluid.logo-header').outerHeight() : 0;
                        $winScrollTop = $win.scrollTop();
                        $headerStyles = $heightMenu + $posheaderlogo;
                        if ($winScrollTop <= $totalHeader) {
                            $headerClass.removeClass('reduced');
                            if ($headerClass.hasClass('header-004')) {
                                $headerClass.removeClass('navbar-fixed-top');
                            } else {
                                $headerClass.find('.logo-header').removeClass('navbar-fixed-top');
                                $headerClass.find('.menu-bar').removeClass('navbar-fixed-top');
                            }
                            $headerStyleTop = 0;
                        } else {
                            if (!$headerClass.hasClass('header-008') && !$headerClass.hasClass('header-010')){
                                $headerClass.addClass('reduced');
                            }
                            if ($headerClass.hasClass('header-004')) {
                                $headerClass.addClass('navbar-fixed-top');
                            } else {
                                $headerClass.find('.logo-header').addClass('navbar-fixed-top');
                                $headerClass.find('.menu-bar').addClass('navbar-fixed-top');
                            }
                            $headerStyleTop = $headerStyles;
                        }

                        $headerStyleTmp = $headerStyle + 'padding-' + ($headerClass.hasClass('header-004') ? 'top' : 'bottom') + ':' + ($headerStyleTop) + 'px;';
                        $headerStyleRefresh = $headerStyleTmp === $headerClass.attr('style');
                        if (!$headerStyleRefresh && ($headerStyles !== 0)) {
                            if ($headerClass.hasClass('header-004')) {
                                $headerClass.parent().parent().attr('style', $headerStyleTmp);
                            } else {
                                $headerClass.attr('style', $headerStyleTmp);
                            }
                        }
                        $menuFunctions.setTopStickyByMenu($menuFunctions.getMenuHeight() + 5);
                    });
                } else {
                    var $headerElement = $headerClass;
                    if (!$headerClass.hasClass('header-004')) {
                        $headerElement = $headerClass.find('.menu-bar');
                    }
                    $posheaderlogo = ($headerClass.find('.container-fluid.logo-header').css('display') !== 'none') ? $headerClass.find('.container-fluid.logo-header').outerHeight() : 0;
                    $totalHeader += $headerClass.hasClass('header-004') ? 0 : $posheaderlogo;
                    $win.scroll(function () {
                        var $heightMenu = $menuFunctions.getMenuHeight();

                        $winScrollTop = $win.scrollTop();
                        if ($winScrollTop <= $totalHeader) {
                            $headerElement.parent().attr('style', 'padding-top:0');
                            $headerElement.removeClass('navbar-fixed-top');
                            if ($headerClass.hasClass('header-008')) {
                                $headerClass.css('background-color','rgba(0,0,0,.5)');
                                $headerElement.children().removeClass('ocultar-header');
                            }
                        } else {
                            $headerElement.parent().attr('style', 'padding-top:' + $heightMenu + 'px;');
                            $headerElement.addClass('navbar-fixed-top');
                            if ($headerClass.hasClass('header-008')) {
                                $headerClass.css('background-color','rgba(0,0,0,0)');
                                $headerElement.children().addClass('ocultar-header');
                            }
                        }
                        $menuFunctions.setTopStickyByMenu($heightMenu + 5);
                    });
                }
            }
        }
    });

    $(document).ready(function () {
        $('.idioma').text(APP.language_text);
        $menuFunctions.init();
        $cookiesCheck = document.cookie;
        $('#cookie_banner').hide();
        if ($cookiesCheck === '') {
            $('#cookie_banner').show();
            $('#cookies_tab_btn').hide();
        }
    });
    $('.btn-eye').on('click', function () {
        var $pass = $('#password');
        var $btn = $(this);
        if ($pass.is(':password')) {
            $pass.attr('type', 'text');
            $btn.find('span').addClass('lf-icon-not-visible');
            $btn.find('span').removeClass('lf-icon-visible');
        } else {
            $pass.attr('type', 'password');
            $btn.find('span').removeClass('lf-icon-not-visible');
            $btn.find('span').addClass('lf-icon-visible');
        }
    });
})(jQuery);

var checkValidation = 0;
var checkValidationLimit = 10;

function jsRejectCookies(){
    $('#_efl_cookies_save_config').click();
}

/* banner política de cookies */
function handle_btn_config(action) {
    var $check = $('#check_ga_active_desactive');
    if (action === 'setUp') {
        $('#config_cookies').show();
        $('#_efl_cookies_config').hide();
        $('#js_cookie_panel').show();
        $('#js_cookie_banner').hide();
        $('#cookies_tab_btn').hide();
    } else
    if (action === 'accept') {
        $('#cookie_banner').hide();
        $('#cookies_tab_btn').show();

    } else
    if (action === 'close') {
        if (!(document.cookie === '')) {
            $('#cookie_banner').hide();
            $('#cookies_tab_btn').show();
        } else if (document.cookie === '') {
            $('#cookie_banner').show();
            $('#config_cookies').hide();
            $('#_efl_cookies_config').show();
            $('#js_cookie_panel').hide();
            $('#js_cookie_banner').show();
        }
    } else
    if (action === 'open') {
        $('#cookie_banner').show();
        $('#config_cookies').show();
        $('#_efl_cookies_config').hide();
        $('#js_cookie_panel').show();
        $('#js_cookie_banner').hide();
        $('#cookies_tab_btn').hide();
    }
}

/* Activar y desactivar aceptacion de cookies en SlideToogle */
function clickGaCheckbox() {
    var $check = $('#check_ga_active_desactive');
    var $span_desactive = $('#span_desactive');
    var $span_active = $('#span_active');

    if ($check.is(':checked')) {
        $span_desactive.hide();
        $span_active.show();
    } else {
        $span_desactive.show();
        $span_active.hide();
    }
}

function validateEmail(email) {
    const regularExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExp.test(String(email).toLowerCase());
}

function checkCaptcha(text, text_unique) {
    var result = "ko";
    $.ajax({
        url: '/form/isValidCaptcha',
        type: 'POST',
        async: false,
        data: {
            'text': text,
            'text_unique': text_unique
        },
        dataType: 'json',
        success: function (data) {
            if (true == data) {
                result = "ok";
            }
        },
        error: function () {
            result = "ko";
        }
    });
    return result;
}

var $menuFunctions = {
    init: function () {
        var $itemMenus = $('.menu-bar .menu-sections, .mobile-menu-container .menu-sections, .header-mobile #mobile-buttons');
        $menuFunctions.hideMenuItems($itemMenus);
        $menuFunctions.hideMenuParentItems($itemMenus);
    },
    hideMenuItems: function ($itemMenus) {
        if ((typeof $eflContentMenu !== 'undefined') && $eflContentMenu) {
            var $itemMenu;
            var hasLanguage = typeof $eflContentMenu[APP.language] !== 'undefined';
            var appLanguage = (true === hasLanguage) ? APP.language : Object.keys($eflContentMenu)[0];
            for (let item in $eflContentMenu[appLanguage]) {
                $itemMenu = $itemMenus.find('a[href$="/' + item + '"]');
                if ((typeof $itemMenu !== 'undefined') && $itemMenu) {
                    if ($eflContentMenu[appLanguage][item] === 0 || false === hasLanguage) {
                        $itemMenu.parent().addClass('hidden');
                    }
                }
            }
        }
    },
    hideMenuParentItems: function ($itemMenus) {
        var $parentItemMenus = $itemMenus.find('ul');
        var tmpHidden;
        $parentItemMenus.each(function (keyParent, parent) {
            tmpHidden = 0;
            $(parent).find('li').each(function (keyItem, item) {
                if ($(item).hasClass('hidden') === false) {
                    tmpHidden++;
                }
            });
            if (tmpHidden === 0) {
                $(parent).parent().addClass('hidden');
            }
        });
    },
    setTopStickyByMenu: function (height) {
        var sticky = $('.cont-sticky-form');
        if (1 >= sticky.length) {
            sticky.css('top', height + 'px');
        }
    },
    getMenuHeight() {
        const headerClass = $('[class^=header-00]');
        let height = 0;
        let posheaderlogo = 0;
        if(headerClass.length <= 0){
            return height;
        }
        const shrinking = headerClass.hasClass('shrinking-effect-logo');
        if(shrinking){
            posheaderlogo = (headerClass.find('.container-fluid.logo-header').css('display') !== 'none') ? headerClass.find('.container-fluid.logo-header').outerHeight() : 0;
        }

        switch (true) {
            case headerClass.hasClass('header-001'):
            case headerClass.hasClass('header-002'):
            case headerClass.hasClass('header-003'):
            case headerClass.hasClass('header-005'):
            case headerClass.hasClass('header-006'):
                height = headerClass.find('.container-fluid.menu-bar').outerHeight() + posheaderlogo;
                break
            case headerClass.hasClass('header-004'):
            case headerClass.hasClass('header-007'):
            case headerClass.hasClass('header-008'):
                height = headerClass.find('.container-fluid').outerHeight();
                break;
        }

        return height;
    }
};

window.addEventListener('load', function () {
    $("form.form-app .btn").click(function (e) {
        e.preventDefault();
        var errors = false;
        var formAppName = 'form.form-app';
        $('#error-email').remove();
        $('#error-captcha').remove();
        $(formAppName + " input").each(function () {
            if (this.hasAttribute('required')) {
                if (this.getAttribute('type') === 'checkbox') {
                    if (!this.checked) {
                        $('#error').show();
                        $(this).parent().addClass('has-error');
                        errors = true;
                    } else {
                        $(this).parent().removeClass('has-error');
                    }
                } else {
                    if (!this.value) {
                        $('#error').show();
                        $(this).parent().addClass('has-error');
                        errors = true;
                    } else {
                        if (this.hasAttribute('type') && this.getAttribute('type') === 'email') {
                            if (false === validateEmail(this.value)) {
                                $('#error').show();
                                $(this).parent().addClass('has-error');
                                if (null === document.getElementById('error-email')) {
                                    $('#error>').append(' <p id="error-email" class="control-label">' + i18next.t('common:form.Email format is not valid.') + '</p>');
                                }
                                errors = true;
                            } else {
                                $('#error-email').remove();
                                $(this).parent().removeClass('has-error');
                            }
                        } else if (this.hasAttribute('name') && this.getAttribute('name') === 'captcha') {
                            if ("ko" === checkCaptcha(this.value, $(this).parent().parent().find("input:hidden")[0].value)) {
                                $('#error').show();
                                $(this).parent().addClass('has-error');
                                if (null === document.getElementById('error-captcha')) {
                                    $('#error').append(' <p id="error-captcha" class="control-label">' + i18next.t('common:form.Text image is not valid') + '.</p>');
                                }
                                checkValidation++;
                                if (checkValidation >= checkValidationLimit) {
                                    location.reload();
                                }
                                errors = true;
                            } else {
                                $('#error-captcha').remove();
                                $(this).parent().removeClass('has-error');
                            }
                        }
                    }
                    if (!errors) {
                        $('#error').hide();
                    }
                }
            }
        });
        $(formAppName + "textarea").each(function () {
            if (this.hasAttribute('required') && !this.value) {
                $('#error').show();
                $(this).parent().addClass('has-error');
                errors = true;
            } else {
                $(this).parent().removeClass('has-error');
            }
        });
        if (!errors) {
            $(formAppName).submit();
        }
    });
});

if ((typeof $defaultsSliderCaptcha !== "undefined") && $defaultsSliderCaptcha) {
    var queryUiJS = document.createElement('script');
    queryUiJS.src = "/assets/js/plugins/jquery-ui.min.js";
    queryUiJS.type = "text/javascript";
    document.getElementsByTagName('body')[0].appendChild(queryUiJS);

    var queryUiTouchJS = document.createElement('script');
    queryUiTouchJS.src = "/assets/js/plugins/jquery.draggableTouch.js";
    queryUiTouchJS.type = "text/javascript";
    document.getElementsByTagName('body')[0].appendChild(queryUiTouchJS);

    setTimeout(function () {
        var sliderCaptchaJS = document.createElement('script');
        sliderCaptchaJS.src = "/assets/js/captcha/sliderCaptcha.js";
        sliderCaptchaJS.type = "text/javascript";
        document.getElementsByTagName('body')[0].appendChild(sliderCaptchaJS);
    }, 500);
}

if ((typeof $checkFormVisibleWidgetLimit !== "undefined") && $checkFormVisibleWidgetLimit) {
    var queryJS = document.createElement('script');
    queryJS.src = "/assets/js/captcha/captcha.js";
    queryJS.type = "text/javascript";
    document.getElementsByTagName('body')[0].appendChild(queryJS);
}
