(function($) {
    $.fn.setDateRange = function(option) {
        return this.each(function() {
            var origin = {
                from: null,
                to: null,
                type: 'today'
            };
            var setting = $.extend(origin, option);
            var startDate = $(setting.from);
            var endDate = $(setting.to);

            $(this).on('click', function() {
                switch (setting.type) {
                    case 'today':
                        this.settingToday();
                        break;
                    case 'week':
                        this.settingWeek();
                        break;
                    case 'month':
                        this.settingMonth();
                        break;

                }
            });

            this.settingWeek = function() {
                var today = new Date();
                var day = today.getDay();
                var monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (day === 0 ? -6 : 1) - day);
                var sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (day === 0 ? 0 : 7) - day);

                startDate.val(monday.getFullYear() + '-' + this.addZero(monday.getMonth() + 1) + '-' + this.addZero(monday.getDate()));
                endDate.val(sunday.getFullYear() + '-' + this.addZero(sunday.getMonth() + 1) + '-' + this.addZero(sunday.getDate()));
            };

            this.settingMonth = function() {
                var today = new Date();
                var year = today.getFullYear();
                var month = today.getMonth() + 1;
                var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                var start = year + '-' + this.addZero(month) + '-01';
                var end = year + '-' + this.addZero(month) + '-' + this.addZero(lastDay);

                startDate.val(start);
                endDate.val(end);
            };

            this.settingToday = function() {
                var today = new Date();
                var day = today.getDate();
                var month = today.getMonth() + 1;
                var year = today.getFullYear();
                var result = year + '-' + this.addZero(month) + '-' + this.addZero(day);

                startDate.add(endDate).val(result);
            };

            // Fill number with zero
            this.addZero = function(number) {
                return ('0' + number).substr(-2);

            };
        });
    };
}(jQuery));
