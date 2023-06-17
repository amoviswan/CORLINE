/*
 * (c) IgoninLab, 2013-2014
 * http://igoninlab.com
 * i@igoninlab.com
 * +7 8422 75-81-02
 */

(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);

(function($) {
    $.fn.replaceSelect = function(){
        return this.each(function(){
            var $this = $(this);

            var options = [];
            var selected = 0;


            var $container = $('<div></div>');
            var $current = $('<span></span>');
            var $list = $('<ul></ul>');
            var $input = $('<input/>');
            var scrolled = false;

            if($this.find('optgroup').length) {
                $(this).children('option').each(function(){
                    var value = $(this).attr('value') || $(this).text();
                    if($(this).is(':selected')) {
                        selected = $(this).index();
                    }

                    options.push({
                        value: value,
                        text: $(this).text()
                    });

                    var $item = $('<li></li>');
                    $item.text($(this).text())
                        .data('value', value);
                    $list.append($item);
                });

                $this.find('optgroup').each(function() {
                    var $item = $('<li></li>');
                    $item.addClass('group')
                    $item.text($(this).attr('label'))
                        .data('value', '');
                    $list.append($item);


                    $(this).find('option').each(function(){
                        var value = $(this).attr('value') || $(this).text();

                        options.push({
                            value: value,
                            text: $(this).text()
                        });

                        if($(this).is(':selected')) {
                            selected = options.length - 1
                        }



                        var $item = $('<li></li>');
                        $item.text($(this).text())
                            .data('value', value);
                        $list.append($item);
                    });
                });
            } else {
                $this.find('option').each(function(){
                    var value = $(this).attr('value') || $(this).text();
                    if($(this).is(':selected')) {
                        selected = $(this).index();
                    }

                    options.push({
                        value: value,
                        text: $(this).text()
                    });
                });

                for(var id in options) {
                    var $item = $('<li></li>');
                    $item.text(options[id].text)
                        .data('value', options[id].value);
                    $list.append($item);
                }
            }

            $current.text(options[selected].text)
                    .click(function(e){
			            $('.select').not($(this).closest('.select')).removeClass('open');
                        $container.toggleClass('open');

                        if($list.hasScrollBar() && !scrolled) {
                            if($input.css('customselect')) {
                                $list.width($list.width() + ($list.width() - $list.get(0).scrollWidth) + 100);
                            } else {
                                $list.width($list.width() + ($list.width() - $list.get(0).scrollWidth));
                            }

                            scrolled = true;
                        }

                        e.stopPropagation();
			            return false;
                    });

            $list.find('li').not('.group').click(function(){
                $container.removeClass('open');
                $current.text($(this).text());
                $input.val($(this).data('value'));

                return false;
            });
            $list.find('li.group').click(function(e){
                e.preventDefault();
                e.stopPropagation();
            });

            $list.click(function(){
                $container.removeClass('open');

                return false;
            });

            $input.attr('type', 'hidden');
            $input.attr('name', $this.attr('name'));
            $input.attr('id', $this.attr('id'));
            $input.val(options[selected].value);

            $container.attr('class', $this.attr('class'));
            $container.addClass('select');
            $container.append($current)
                      .append($list)
                      .append($input);

	        $('body').click(function(){
		        $container.removeClass('open');
	        });

            $this.before($container);
            $this.remove();
        });
    }

})(jQuery);