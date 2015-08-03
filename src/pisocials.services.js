(function($,window,document) {

	window.pisocials = window.pisocials || {};
	window.pisocials.SocialServices = (function(){
	
		var facebookShare = {
			name: 'facebookShare',
			preLoad: function() { },
			official: {
				S: '<a href="https://www.facebook.com/sharer/sharer.php?u={ENCODE_URL}" target="_blank" class="btn_fb_share btn_fb_share_m"> share</a>',
				M: '<a href="https://www.facebook.com/sharer/sharer.php?u={ENCODE_URL}" target="_blank" class="btn_fb_share btn_fb_share_m"> share</a>',
				L: '<a href="https://www.facebook.com/sharer/sharer.php?u={ENCODE_URL}" target="_blank" class="btn_fb_share btn_fb_share_l"> <div class="piso-fb-icon"></div>share</a>'
			},
			custom: {
				dataType: 'jsonp',
				shareWin: 'https://facebook.com/sharer/sharer.php?u={URL}',
				shareRect: [700, 500],
				countUrl: 'http://graph.facebook.com/?id={ENCODE_URL}',
				getResult: function(data) { return data.shares; }
			}
		};
		var facebookLike = {
			name: 'facebookLike',
			preLoad: function() { },
			official: {
				S: '<iframe src="http://www.facebook.com/plugins/like.php?href={ENCODE_URL}&amp;send=false&amp;layout=button&amp;width=150&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>',
				M: '<iframe src="http://www.facebook.com/plugins/like.php?href={ENCODE_URL}&amp;send=false&amp;layout=button_count&amp;width=150&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe>',
				L: '<iframe src="http://www.facebook.com/plugins/like.php?href={ENCODE_URL}&amp;send=false&amp;layout=box_count&amp;width=70&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:70px; height:61px;" allowTransparency="true"></iframe>'
			},
			custom: null
		};
		var twitter = {
			name: 'twitter',
			preLoad: function() {
				!function(d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					var p = /^http:/.test(d.location) ? 'http' : 'https';
					if (!d.getElementById(id)) {
						js = d.createElement(s);
						js.id = id;
						js.src = p + '://platform.twitter.com/widgets.js';
						fjs.parentNode.insertBefore(js, fjs);
					}
				}(document, 'script', 'twitter-wjs');
			},
			official: {
				S: '<a href="https://twitter.com/share" class="twitter-share-button" data-url="{URL}" data-text="{TITLE}" data-lang="ja" data-count="none">ツイート</a>',
				M: '<a href="https://twitter.com/share" class="twitter-share-button" data-url="{URL}" data-text="{TITLE}" data-lang="ja" data-count="horizontal">ツイート</a>',
				L: '<a href="https://twitter.com/share" class="twitter-share-button" data-url="{URL}" data-text="{TITLE}" data-lang="ja" data-count="vertical">ツイート</a>'
			},
			custom: {
				dataType: 'jsonp',
				shareWin: 'https://twitter.com/share?url={ENCODE_URL}&text={TITLE}',
				shareRect: [650, 360],
		        countUrl: 'https://cdn.api.twitter.com/1/urls/count.json?url={URL}&callback=?',
		        getResult: function(data) { return data.count; }
			}
		};
		var googleplus = {
			name: 'googleplus',
			preLoad: function() {
				var po = document.createElement('script');
				po.type = 'text/javascript';
				po.async = true;
				po.src = 'https://apis.google.com/js/plusone.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(po, s);
			},
			official: {
				S: '<div class="g-plusone" data-href="{ENCODE_URL}" data-size="medium" data-annotation="none"></div>',
				M: '<div class="g-plusone" data-href="{ENCODE_URL}" data-size="medium"></div>',
				L: '<div class="g-plusone" data-href="{ENCODE_URL}" data-size="tall"></div>'
			},
			custom: {
				dataType: 'text',
				shareWin: 'https://plus.google.com/share?url={URL}',
				shareRect: [900, 500],
				countUrl: 'https://cors-anywhere.herokuapp.com/https://plusone.google.com/_/+1/fastbutton?url={ENCODE_URL}',
				getResult: function(data) {
				    return parseInt((data.match(/\{c: ([\d]+)/) || [])[1]);
				}
			}
		};
		var hatena = {
			name: 'hatena',
			preLoad: function() {},
			official: {
				S: '<a href="http://b.hatena.ne.jp/entry/{ENCODE_URL}" class="hatena-bookmark-button" data-hatena-bookmark-title="{TITLE}" data-hatena-bookmark-layout="standard-noballoon" title="このエントリーをはてなブックマークに追加"><img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>',
				M: '<a href="http://b.hatena.ne.jp/entry/{ENCODE_URL}" class="hatena-bookmark-button" data-hatena-bookmark-title="{TITLE}" data-hatena-bookmark-layout="standard-balloon"   title="このエントリーをはてなブックマークに追加"><img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>',
				L: '<a href="http://b.hatena.ne.jp/entry/{ENCODE_URL}" class="hatena-bookmark-button" data-hatena-bookmark-title="{TITLE}" data-hatena-bookmark-layout="vertical-balloon"   title="このエントリーをはてなブックマークに追加"><img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>'
			},
			custom: {
				dataType: 'jsonp',
				shareWin: 'http://b.hatena.ne.jp/add?mode=confirm&url={ENCODE_URL}&title={TITLE}',
				shareRect: [550, 500],
				countUrl: 'http://api.b.st-hatena.com/entry.count?url={ENCODE_URL}',
				getResult: function(data) {
					if (!data) {data = 0;}
				    return data;
				}
			}
		};
	
		var pocket = {
			name: 'pocket',
			preLoad: function() {
				! function(d, i) {
					if (!d.getElementById(i)) {
						var j = d.createElement('script');
						j.id = i;
						j.src = 'https://widgets.getpocket.com/v1/j/btn.js?v=1';
						d.body.appendChild(j);
					}
				}(document, 'pocket-btn-js');
			},
			official: {
				S: '<a data-pocket-label="pocket" data-pocket-count="none" data-save-url="{ENCODE_URL}" class="pocket-btn" data-lang="en"></a>',
				M: '<a data-pocket-label="pocket" data-pocket-count="horizontal" data-save-url="{ENCODE_URL}" class="pocket-btn" data-lang="en"></a>',
				L: '<a data-pocket-label="pocket" data-pocket-count="vertical" data-save-url="{ENCODE_URL}" class="pocket-btn" data-lang="en"></a>'
			},
			custom: {
				dataType: 'xml',
				shareWin: 'http://getpocket.com/edit?url={ENCODE_URL}&title={TITLE}',
				shareRect: [500, 300],
				countUrl: 'https://cors-anywhere.herokuapp.com/http://widgets.getpocket.com/v1/button?v=1&count=horizontal&url={URL}',
				getResult: function(data) {
				   return parseInt($(data).find('#cnt').text());
				}
			}
		};
	
		return {
			facebookLike: facebookLike,
			facebookShare: facebookShare,
			twitter: twitter,
			googleplus: googleplus,
			hatena: hatena,
			pocket: pocket
		};
	})();
	
})(jQuery,window,document);

