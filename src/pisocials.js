(function($,window,document) {

	window.pisocials = window.pisocials || {};
	
	$.fn.pisocials = function(options) {
		var settings = $.extend({
			url: '',
			title: '',
			services: ['facebookLike','twitter'],
			design: 'official',
			size: 'M',
			round: 0,
			color: ''
		}, options);
		
		var services = window.pisocials.SocialServices;
		this.each(function() {
			var view = $(this);
			var ss = settings.services;
			var cs = 'pisocials';
				cs += ' piso-' + settings.design;
			if (settings.round) {cs += ' piso-round-' + settings.round;}
			if (settings.color) {cs += ' piso-color-' + settings.color;}
			var tag = $('<ul>').addClass(cs);
			for (var i = 0; i < ss.length; i++) {
				var btn = new SocialBtn(ss[i], settings, services);
				if (btn.hasData()) {
					tag.append(btn.getNode());
				}
			}
			view.append(tag);
		});
		return this;
	};

	var templateHTML = {
		flat: {
			S: '<a href="{SHARE_LINK}" target="_blank" class="piso-S piso-{SERVICE}"><span class="piso-icon"></span></a>',
			M: '<a href="{SHARE_LINK}" target="_blank" class="piso-M piso-{SERVICE}"><span class="piso-icon"></span> <span class="piso-count">...</span></a>',
			L: '<a href="{SHARE_LINK}" target="_blank" class="piso-L piso-{SERVICE}"><span class="piso-icon"></span> <span class="piso-count">...</span></a>'
		}
	};
	
	
	var SocialBtn = (function() {
		/* ---------- ---------- ---------- */
		var c = function(_sname, _settings , _services) {
		  this.init(_sname, _settings , _services);
		};
		var p = c.prototype;
		p.init = function(_sname, _settings , _services) {
			this.sname = _sname;
			this.settings = _settings;
			this.title = (function(_s) {
			    if (!_s) {return document.title;}
			    return _s;
			})(this.settings.title);
			this.url = (function(_s) {
			    if (!_s) {return window.location.href;}
			    return _s;
			})(this.settings.url);
			if (_services[this.sname]) {
				this.serviceData = _services[this.sname];
				if (this.settings.design === 'official') {
					this.serviceData.preLoad();
				}
			}
		};
		p.hasData = function() {
			return (this.serviceData) ? true : false;
		};
		p.doTemplate = function(_s) {
			var s = _s;
			if (this.serviceData.custom) {
				s = s.split('{SHARE_LINK}').join(this.serviceData.custom.shareWin);
			}
			s = s.split('{NAME}').join(this.sname);
			s = s.split('{SERVICE}').join(this.sname);
			s = s.split('{TITLE}').join(this.title);
			s = s.split('{URL}').join(this.url);
			s = s.split('{ENCODE_URL}').join(encodeURIComponent(this.url));
			return s;
		};
		p.formatCount = function(_n) {
			var n = _n;
			if (!n) {n = 0;}
			if (n > 10000) {
				n = (n / 10000).toFixed(1) + '万';
			}
			return n;
		};
		p.getNode = function() {
			var self = this;
			var node = $('<li>');
			var des = this.settings.design;
			var siz = this.settings.size;
			if (des === 'official') {
				node.append(this.doTemplate(this.serviceData.official[this.settings.size]));
			}
			if (des === 'flat' || des === 'flat-r') {
				if (this.serviceData.custom) {
				node.append(this.doTemplate(templateHTML[des][siz]));
				var countNode = node.find('.piso-count');
					$.ajax({
						scriptCharset: 'utf-8',
						type: 'GET',
						url: this.doTemplate(this.serviceData.custom.countUrl),
						dataType: this.serviceData.custom.dataType,
						success: function(json) {
							countNode.html(self.formatCount(self.serviceData.custom.getResult(json)));
						},
						error: function() {
							countNode.html('-');
						}
					});
				}
			}
			return node;
		};
		return c;
	})();
	
})(jQuery,window,document);

