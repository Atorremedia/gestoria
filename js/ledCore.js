(function ($) {
    $.fn.ledCore = function (params) {
        var options = $.extend({}, $.fn.ledCore.defaults, params);
        var ledCore = this;
        var endLoadingI18N = false;
        var ud = 'undefined';


        ledCore.init = function () {
            ledCore.eventsListener();
			ledCore.initI18N();
            return this;
        };


        ledCore.eventsListener = function () {
			ledCore.setPrivateContent();

			/**
			 * Init after i18N loaded
			 */
			$(document).on('i18NLoaded', function() {
				/**
				 * AgendaCalendar plugin
				 */
				$(document).ready(function(){
					if ( $('.js-agenda-calendar').length ) {
						$('.js-agenda-calendar').each( function() {
							$(this).agendaCalendar();
						});
					}
				});

				/**
				 * Authentication widget
				 */
				$(document).ready(function(){
					// Cambiamos el layout según el contexto
					$( ".col-md-12 .authentication-widget" ).addClass( "authentication-widget-horizontal" ).removeClass( "authentication-widget-vertical" );
					$( ".col-md-9 .authentication-widget" ).addClass( "authentication-widget-horizontal" ).removeClass( "authentication-widget-vertical" );
					//$( ".col-md-6 .authentication-widget" ).addClass( "authentication-widget-horizontal" ).removeClass( "authentication-widget-vertical" );

					// Se limita el enlace en estos dos casos
					$( ".col-md-12 .authentication-widget .authentication-widget-access, .col-md-9 .authentication-widget .authentication-widget-access" ).click(function() {
						event.preventDefault();
					});

					// Añadimos la opción de apertura para el widget vertical
					$( ".col-md-6 .authentication-widget .authentication-widget-access" ).addClass( "js-authentication-widget-content-opener" );
					$( ".col-md-4 .authentication-widget .authentication-widget-access" ).addClass( "js-authentication-widget-content-opener" );
					$( ".col-md-3 .authentication-widget .authentication-widget-access" ).addClass( "js-authentication-widget-content-opener" );

					// Ocultamos el contenido del widget
					$( ".col-md-6 .authentication-widget .authentication-widget-content" ).addClass( "js-hide-authentication-widget-content" );
					$( ".col-md-4 .authentication-widget .authentication-widget-content" ).addClass( "js-hide-authentication-widget-content" );
					$( ".col-md-3 .authentication-widget .authentication-widget-content" ).addClass( "js-hide-authentication-widget-content" );

					// Apertura y cierre de la caja
					$( ".js-authentication-widget-content-opener" ).click(function( event ) {
						event.preventDefault();
						$(this).next( ".authentication-widget-content" ).toggleClass( "js-hide-authentication-widget-content" );
					});
				});

				/**
				 * widget: Change language
				 */
				$(document).ready(function() {
					$('#langSelector').on('change', function() {
						$('#hdd-lang-selected').val( $(this).val() );
						document.langSelector.submit();
					});
				});
			});

        };

		ledCore.setPrivateContent = function() {

			if ( ledCore.hasLoggedUser() ) {
				$('.js-content-locked').html('\
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" role="img" aria-labelledby="restrictedcontent-003" style="width: 20px; height: 20px; vertical-align: middle; fill: #337ab7;">\n\
					<title id="restrictedcontent-003">Content with limited access</title>\n\
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-anyfill-graph-restrictedcontent"></use>\n\
				</svg>');
			}
		};

		ledCore.hasLoggedUser = function() {
			return ledCore.random(0,1);
		};

        ledCore.initI18N = function () {
            /**
             * i18next initialization
             */
            i18next
                .use(i18nextXHRBackend)
                //.use(i18nextBrowserLanguageDetector)
                .init({
                    fallbackLng: 'en',
                    lng: $.fn.ledCore.defaults.language,
                    //debug: true,
                    ns: ['common'],
                    defaultNS: 'common',
                    initImmediate: true,
                    preload: ['en', 'fr', 'es'],
                    backend: {
                        // load from i18next-gitbook repo
                        loadPath: '/assets/locales/{{ns}}/{{lng}}.json?0.1',
                        crossDomain: true
                    }
                }, function (err, t) {
                    endLoadingI18N = true;
                    //$(ledCore).trigger('i18NLoaded');
                    $(document).trigger('i18NLoaded');
                    // init set content
                    //updateContent();
                });

            i18next.t('common:messages.in-english');

        };

       /**
         * Mostramos el debug unicamente
         * si la opción está activada
         * @param {string} message
         * @param {boolean} html
         */
        ledCore.log = function (message, html) {
            if (ledCore.isDev()) {
                if (html) {
                    $('body').append(ledCore.htmlError(message))
                } else {
                    console.log(message);
                }
            }
        };


        ledCore.isArray = function (params) {
            if (typeof params != ud && params.length > 0) {
                console.log('is array: ' + params.length);
            }
        };


        /**
         * @param variable
         * @returns {*}
         * Define los metodos publicos
         * utilizando la instancia this
         */
        ledCore.getVar = function (variable) {
            return options[variable];
        };


        this.isValidJson = function (jsonString) {
            if (/^[\],:{}\s]*$/.test(jsonString.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                return true;
            } else {
                return false;
            }
        };


        /**
         * Comprueba si se está en
         * desarrollo o producción
         * leyendo la constante de CI
         * @returns {boolean}
         */
        this.isDev = function () {
            var output = false;
            if (options.environment === 'development') {
                output = true;
            }
            return output;
        };


        /**
         *
         * @param params
         * @returns {*}
         */
        this.ajaxCall = function (params) {

            var url;
            var uri;
            var method = 'POST';
            var async = true;
            var urikey = false;
            var data = params.data;
            var module = '';

            if(typeof params.method != ud){
                method = params.method;
            }

            if(typeof params.async == 'boolean'){
                async = params.async;
            }

            if(typeof params.module != ud){
                module = '/' + params.module;
            }
            /**
             * Si necesitamos que la url
             * se vaya generando con las claves
             * del objeto data, como por ejemplo:
             * data: {id: 123} -> /id/123
             *
             * En caso de no haberse definido
             * o llegar con el valor false la
             * url se genera solo con los valores:
             * data: {id: 123} => /123
             */
            if(typeof params.urikey == 'boolean'){
                urikey = params.urikey;
            }


            if (typeof params.url != ud) {

                url = params.url;

            } else {

                url = options.ajax_url+module;
                uri = '';

                if(typeof params.controller != ud){
                    uri += '/' + params.controller;
                }

                if(typeof params.action != ud){
                    uri += '/' + params.action;
                }

                if(typeof params.method != ud && params.method == 'GET'){
                    if(typeof params.data != ud && !$.isEmptyObject(params.data)){

                        Object.keys(params.data).forEach(function(key) {

                            if(urikey){
                                uri += '/' + key + '/' + params.data[key];
                            }else{
                                uri += '/' + params.data[key];
                            }

                        });

                    }
                }

                url += uri;
            }


            var request = $.ajax({
                method: method,
                url: url,
                data: data,
                async: async
            });



            return request;
        };



        ledCore.showTab = function (container, tab, subtab) {
            if (typeof subtab == ud) {
                subtab = '#ledManualSettings';
            }

            $(container).find('.tab-pane').removeClass('active');
            $(container).find(tab).addClass('active');
            $("[data-target=#ledManualSettings]").addClass('epeppeep')
        };


        ledCore.showModal = function (params) {
            /**
             * Si se llama el método sin haber pasado
             * el selector del modal, mostramos el
             * de por defecto.
             */
            var selector = typeof params.modal != ud ? params.modal : 'mainModal';
            /**
             * la variable content guarda una url que
             * se nos pasa por parámetro y más abajo
             * carga el contenido de esa url en el
             * body del modal
             * @type {null}
             */
            var content = typeof  params.content != ud ? params.content : null;

            /**
             * Si pasamos un callback, se ejecutará
             * cuando el modal se cierre.
             */
            var onModalClose = typeof params.onModalClose != ud ? params.onModalClose : null;
            var onAjaxComplete = typeof params.onAjaxComplete != ud ? params.onAjaxComplete : null;

            var $modal = $(selector);
            $modal.modal();

            if (content) {
                /**
                 * Si se nos pasa una url como parámetro
                 * de content cargamos el contenido por ajax
                 */
                $modal.find('.modal-body').load(params.content + ' .media-library');

                /**
                 * Si necesitamos ejecutar una acción
                 * tras la carga de ajax, ejecutamos
                 * el callback
                 */
                if (onAjaxComplete) {
                    $(document).ajaxComplete(function () {
                        onAjaxComplete();
                    });
                }
            }

            /**
             * Ejecutamos el callback al cerrar
             * el modal.
             */
            if (onModalClose) {
                $modal.on('hidden.bs.modal', function (e) {
                    if (typeof onModalClose == 'function') {
                        onModalClose();
                    }
                });
            }
        };


        ledCore.randomString = function () {
            var m = m || 9;
            s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < m; i++) {
                s += r.charAt(Math.floor(Math.random() * r.length));
            }
            return s;
        };

		ledCore.random = function( min, max ) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

        return ledCore.init();
    };

    $.fn.ledCore.defaults = {
        baseUrl: APP.base_url,
        ajax_url: APP.ajax_url,
        environment: APP.environment,
        language: APP.language,
        closeBtn: '.ledClose',
        devError: '.ledErr'
    };

    /*SISNBUCO2-1806*/
    //TRIGGER recoge evento EFLContent para abrir contenido por API LEFEBVRE
    $( ".js-api-doc-trigger" ).click(function() {

        event.preventDefault();
        //Se obtiene datos desde el enlace
        var tipoDoc=$(this).attr("attr-doc");
        var key=$(this).attr("attr-key");

        if(tipoDoc=="jurisprudencia"){

            var nRef=$(this).attr("attr-nref");
            var url='/Content/apiJurisprudencia';


            var form = $('<form>', {
                'action': url,
                'target': '_blank',
                'method': 'post',
                'id': key
            }).append($('<input>', {
                'name': 'nref',
                'value': nRef,
                'type': 'hidden'
            })).append($('<input>', {
                'name': 'key',
                'value': key,
                'type': 'hidden'
            }));;
        }

        if(tipoDoc=="legislacion"){
            var nRef=$(this).attr("attr-nref");
            var seccion=$(this).attr("attr-seccion");
            var url='/Content/apiLegislacion';

            var form = $('<form>', {
                'action': url,
                'target': '_blank',
                'method': 'post',
                'id': key
            }).append($('<input>', {
                'name': 'nref',
                'value': nRef,
                'type': 'hidden'
            })).append($('<input>', {
                'name': 'seccion',
                'value': seccion,
                'type': 'hidden'
            })).append($('<input>', {
                'name': 'key',
                'value': key,
                'type': 'hidden'
            }));;

        }

        if(tipoDoc=="memento"){
            var cod=$(this).attr("attr-cod");
            var marginal=$(this).attr("attr-marginal");
            var url='/Content/apiMemento';

            var form = $('<form>', {
                'action': url,
                'target': '_blank',
                'method': 'post',
                'id': key
            }).append($('<input>', {
                'name': 'cod',
                'value': cod,
                'type': 'hidden'
            })).append($('<input>', {
                'name': 'marginal',
                'value': marginal,
                'type': 'hidden'
            })).append($('<input>', {
                'name': 'key',
                'value': key,
                'type': 'hidden'
            }));;
        }

        $('body').append(form);
        form.submit();
        form.remove();

    });



})(jQuery);

var ledCore = $(window).ledCore();