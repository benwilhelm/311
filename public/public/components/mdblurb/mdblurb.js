(function($){

	var $edit = function() { return $("<a href='#' class='fa fa-edit blurb-control-edit'></a>"); }
	var $save = function() { return $("<a href='#' class='fa fa-save blurb-control-save'></a>"); }
	var $cancel = function() { return $("<a href='#' class='fa fa-close blurb-control-cancel'></a>"); }
	var $loading = function() { return $("<span class='fa fa-circle-o-notch fa-spin'></span>"); }

	$.fn.addBlurbHandlers = function() {
		var $blurb = $(this);
		$blurb.on('click', '.blurb-control-edit', function(e){
			e.preventDefault();
			$(this).replaceWith($loading());
			$blurb.blurbEditMode();
		});

		$blurb.on('click', '.blurb-control-cancel', function(e){
			e.preventDefault();
			if (confirm("Your changes will be discarded")) {
				$blurb.blurbCancelEdit();
			}
		});

		$blurb.on('click', '.blurb-control-save', function(e){
			e.preventDefault();
			$(this).replaceWith($loading());
			$blurb.blurbSaveEdits();
		});
	}

	$.fn.blurbEditMode = function() {
		var $this = $(this)
		var $controls = $this.find('.blurb-controls').first();
		var $content = $this.find('.blurb-content').first();
		var $editor = $("<textarea class='blurb-editor'></textarea>")
		$editor.css({fontFamily:'monospace',fontSize:'1.1em', minHeight:'300px'});
		$this.data('blurbContent', $content.html());
		var w = $content.width();
		var h = $content.height();
		var dataId = $this.attr('data-blurb-id') || false;

		if (dataId) {
			var url = '/blurb/' + $this.attr('data-blurb-id');
			$.getJSON(url, function(resp){
				var markdown = resp.blurb.text;
				$editor.val(markdown);
				$editor.width(w);
				$editor.height(h);
				$content.html($editor);
		
				$controls.html('');
				$controls.append($save());
				$controls.append($cancel());

			});
		} else {
			$editor.width(w);
			$content.html($editor);
			$controls.html('');
			$controls.append($save());
			$controls.append($cancel());
		}
	}

	$.fn.blurbCancelEdit = function() {
		var $this = $(this);
		var $controls = $this.find('.blurb-controls').first();
		var $content = $this.find('.blurb-content').first();
		$content.html($this.data('blurbContent'));
		$controls.html($edit);
	}

	$.fn.blurbSaveEdits = function() {
		var $this = $(this)
		var $controls = $this.find('.blurb-controls').first();
		var $content = $this.find('.blurb-content').first();
		var $editor = $this.find('.blurb-editor').first();
		var markdown = $editor.val();

		var ajaxSettings = {
			type: 'POST',
			data: {text: markdown},
			success: function(resp) {
				$content.html(resp.blurb.html);
				$controls.html($edit);
			}			
		}

		if ($this.attr('data-blurb-id')) {
			var url = '/blurb/' + $this.attr('data-blurb-id');
			ajaxSettings.headers = {
				'X-HTTP-Method-Override': 'PUT'
			}
		} else {
			var url = '/blurb'
			ajaxSettings.headers = null
			ajaxSettings.data.hash = $this.attr('id');
			ajaxSettings.data.path = window.location.pathname;
		}

		$.ajax(url, ajaxSettings)
	}


	$(document).ready(function(){
		$('*[data-blurb=true]').each(function(idx, obj){
			var $obj = $(obj);
			var $spans = $obj.find('span[data-blurb-id]')

			if ($spans.length) {
				var $span = $spans.first();
				var dataId = $span.attr('data-blurb-id');
				$obj.attr('data-blurb-id', dataId);
				$span.remove();
			}

			$obj.wrapInner("<div class='blurb-content'></div>");
			var $controls = $("<div class='blurb-controls'></div>")
			$controls.append($edit());
			$obj.append($controls);

			$obj.addBlurbHandlers();

		})
	})
})(jQuery)