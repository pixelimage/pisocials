
$(function(){
	MainController.init();
	ConditionView.init();
	CodeView.init();
	PreView.init();
	
	CodeView.stageIn();
	PreView.stageIn();
	ConditionView.stageIn();
});

//
var MainController = (function(){
	var view;
	var v = {};
	
	
	function init(){
	}
	
	function update(current){
		// console.log(current);
		CodeView.update(current);
		PreView.update(current);
	}

	return { init:init,update:update }
})();

var ConditionView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#ConditionView');
		stageInit();
		createlayout();
		setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){}

	var current = {
		services:[
			'facebookShare',
			'facebookLike',
			'twitter',
			'googleplus',
			'hatena',
			'pocket'
		],
		url:"",
		title:"",
		size:"M",
		design:"official",
		round:0,
		color:""
	};
	
	var curerntDesignNo = 0;
	var curerntSizeNo = 1;
	var curerntRoundNo = 0;
	var curerntColorNo = 0;
	
	function setBtn(){
		
		v.btnsRound = view.find(".btns-round").hide();
		v.btnsColor = view.find(".btns-color").hide();
		
		view.find("button").click(function(event){
			event.preventDefault();
		});

		
		v.in_url = view.find(".in_url");
		v.in_url.keyup(function(){
			update(1000);
		});
		v.in_title = view.find(".in_title");
		v.in_title.keyup(function(){
			update(1000);
		});
		
		/* ---------- ---------- ---------- */

		v.btn_service = view.find(".btn_service").addClass(CURRENT);
		v.btn_service.click(function(){
			var no = $(this).data("no");
			updateService(no);
		})
		
		/* ---------- ---------- ---------- */
		
		v.btn_design = view.find(".btn_design");
		v.btn_design.click(function(){
			var no = $(this).data("no");
			curerntDesignNo = no;
			update();
		})
		v.btn_size = view.find(".btn_size");
		v.btn_size.click(function(){
			var no = $(this).data("no");
			curerntSizeNo = no;
			update();
		})
		v.btn_round = view.find(".btn_round");
		v.btn_round.click(function(){
			var no = $(this).data("no");
			curerntRoundNo = no;
			update();
		})
		v.btn_color = view.find(".btn_color");
		v.btn_color.click(function(){
			var no = $(this).data("no");
			curerntColorNo = no;
			update();
		})
	}
	function updateService(_no){
		var tar = v.btn_service.eq(_no)
		if(tar.hasClass(CURRENT)){
			v.btn_service.eq(_no).removeClass(CURRENT)
		} else {
			v.btn_service.eq(_no).addClass(CURRENT)
		}
		update()
	}
	var srs = current.services.concat([]);
	
	var CURRENT = "active"
	var tID;
	function update(_delay){
		if(curerntDesignNo){
			v.btnsRound.show()
			v.btnsColor.show()
		} else{
			v.btnsRound.hide()
			v.btnsColor.hide()
		}
		
		var ss = []
		v.btn_service.each(function (index, dom) {
			if($(this).hasClass(CURRENT)){
				ss.push(srs[index])	
			}
		});
		current.services = ss;
		
		v.btn_design.removeClass(CURRENT)
		v.btn_size.removeClass(CURRENT)
		v.btn_round.removeClass(CURRENT)
		v.btn_color.removeClass(CURRENT)
		v.btn_design.eq(curerntDesignNo).addClass(CURRENT)
		v.btn_size.eq(curerntSizeNo).addClass(CURRENT)
		v.btn_round.eq(curerntRoundNo).addClass(CURRENT)
		v.btn_color.eq(curerntColorNo).addClass(CURRENT)
		
		current.url = $(".in_url").val()
		current.title = $(".in_title").val()
		current.design = ["official","flat"][curerntDesignNo];
		current.size = ["S","M","L"][curerntSizeNo];
		current.round = [0,5,10,20,40][curerntRoundNo];
		current.color = ["","lglay","glay","black","white"][curerntColorNo];

		if(tID) clearTimeout(tID);
		tID = setTimeout(function(){
			update_delay()
		},(_delay) ? _delay : 200);
	}
	function update_delay(){
		MainController.update(current);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){
				update()
			}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return { init:init, stageIn:stageIn, stageOut:stageOut}
})();


var PreView = (function(){
	var view;
	var v = {};
	
	function init(){
		view = $('#PreView');
		codeView = $('#PreviewCode');
		v.inner = view.find(".inner")
		
		stageInit();
		createlayout();
		// setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){

	}
	
	function update(_o){
		v.inner.html('<iframe id="SubFrame" class="previewArea" src ="blank.html" frameborder="0" ></iframe>')
		document.getElementById('SubFrame').onload = function (){
			update_core(_o);
		}
	}
	function update_core(_o){
		document.getElementById('SubFrame').contentWindow.callMain(_o);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		update: update
	}
})();


var CodeView = (function(){
	var view;
	var v = {};
	var baseCode = ""
	
	function init(){
		view = $('#CodeView');
		v.code = view.find("textarea");
		v.baseCode = $('#BaseCode');
		baseCode = v.baseCode.val();
		stageInit();
		createlayout();
		// setBtn();
	}
	
	/* ---------- ---------- ---------- */
	
	function createlayout(){
		v.code.click(function(){ 
			$(this).select();
		});
	}
	
	function update(_o){
		var s = baseCode;
		var param = JSON.stringify(_o, null, "	")
			s = s.split("{PARAM}").join(param);
		v.code.val(s);
	}
	
	/* ---------- ---------- ---------- */
	
	var isOpen = false;
	var isFirst = true;
	function stageInit(){
		view.hide();
	}
	function stageIn(){
		if(! isOpen){ isOpen = true;
			view.show();
			if(isFirst){}
			isFirst = false;
		}
	}
	function stageOut(){
		if(isOpen){ isOpen = false;
			view.hide();
		}
	}

	return {
		init: init,
		stageIn: stageIn,
		stageOut: stageOut,
		update: update
	}
})();



