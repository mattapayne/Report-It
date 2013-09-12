if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.clips = {
	init: function()
	{
		var self = this;
		
		var callback = $.proxy(function()
		{
			$('#redactor_modal').find('.redactor_clip_link').each($.proxy(function(i, s)
			{
				$(s).click($.proxy(function()
				{
					this.insertClip($(s).next().html());
					return false;

				}, this));
			}, this));

			self.saveSelection();
			self.setBuffer();

		}, this );
			
		self.addBtn('clips', 'Clips', function(e)
		{
			self.modalInit('Clips', '#clipsmodal', 500, callback);
		});
	},
	insertClip: function(html)
	{
		this.restoreSelection();
		this.insertHtml($.trim(html));
		this.modalClose();
	}
};

