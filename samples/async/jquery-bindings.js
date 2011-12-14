(function ($) {

    var Task = Jscex.Async.Task;

    $.ajaxAsync = function (options) {
        return Task.create(function (t) {

            options.success = function (data, textStatus, jqXHR) {
                t.complete("success", {
                    data: data,
                    textStatus: textStatus,
                    jqXHR: jqXHR
                });
            }

            options.error = function (jqXHR, textStatus, errorThrow) {
                t.complete("failure", {
                    jqXHR: jqXHR,
                    textStatus: textStatus,
                    errorThrow: errorThrow
                });
            };

            $.ajax(options);
        });
    };
    
    if ($.fn.dialog) {
        $.fn.dialogAsync = function (options) {
            var _this = this;

            return Task.create(function (t) {

                options.close = function () {
                    t.complete("success");
                }

                _this.dialog(options);
            });
        }
    }

})(jQuery);
