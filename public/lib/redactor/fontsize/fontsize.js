if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.fontsize = {
	init: function()
	{
		var fonts = [10, 11, 12, 14, 16, 18, 20, 24, 28, 30];
		var that = this;
		var dropdown = {};

		$.each(fonts, function(i, s)
		{
			dropdown['s' + i] = { title: s + 'px', callback: function() { that.setFontsize(s); } };
		});

		dropdown['remove'] = { title: 'Remove font size', callback: function() { that.resetFontsize(); } };

		that.addBtn( 'fontsize', 'Change font size', false, dropdown);
	},
	setFontsize: function(size)
	{
		var node = $(this.getCurrentNode());
		
		if (node.get(0).tagName.toLowerCase() === 'p') {
			var html = node.html();
			node.html("<span style='font-size: " + size + "px;'>" + html + "</span>");
		}
		else {
			node.css('font-size', size + 'px');
		}
		this.syncCode();
	},
	resetFontsize: function()
	{
		//no-op
	}
};