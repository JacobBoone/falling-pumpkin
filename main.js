// MoonGame namespace to contain all the variables. use revailing module pattern with IFFE.
// IFFE: function expression
var PumpkinGame = (function() {

var NUM_PUMPKINS = 30;
var MAX_TOP = 70;
var MAX_LEFT = 95;


// Bird constructor - creates the birds
	var Pumpkin = function(){
	}

	Pumpkin.prototype.create = function(){
		this.el= $('<img src="http://files.softicons.com/download/holidays-icons/desktop-halloween-icons-by-aha-soft/png/256x256/Pumpkin.png">')

		this.el.css({
			top: Math.random() * MAX_TOP + '%',
			left: Math.random() * MAX_LEFT  + '%'
		})
		return this.el;
	}


// declare array of free-flying birds
	var pumpkins = [];
	var flock = null;


	var init = function(){

		//  create the flock
		var basket = new Basket();
		flock = new Flock(basket);
		$('.sky').append(flock.create());	


	// create birds in sky
		for (var i = 0; i < NUM_PUMPKINS; i++) {
			var pumpkin = new Pumpkin();
			var pumpEl = pumpkin.create();
			$('.sky').append(pumpEl);
			pumpkins.push(pumpkin);
			flock.addPumpkinClickHandler(pumpkin);
			};	
	
		}

	



//  Penguin Constuructor

	var Basket =function(){

	}
	Basket.prototype.create = function(){
		this.el =$('<i class="penguin icon-plancast"></i>');('<img src="http://www.vaibhaventerprises.org/images/Decorative-items/Gift-Packing-Baskets/Oval%20Jaili%20Basket.png">')
		return this.el;

		
	}


// Flock Constructor
	var Flock = function(basket){
		this.basket=basket;
		this.pumpkins=[];

	}
	Flock.prototype.create = function(){
		var newEl =$('<div class="flock">');
		newEl.append(this.basket.create());
		newEl.css('bottom', this.pumpkins.length * 20)  

		// 	append all pumkins to flock
		for (var i = 0; i < this.pumpkins.length; i++) {
			console.log(this.pumpkins[i].el)
			newEl.append(this.pumpkins[i].el)
		};
		// replaceWith OLD FLOCK WITH NEW FLOCK
		if(this.el){
			this.el.replaceWith(newEl);
		}
		this.el = newEl;

		return this.el;
	}
	Flock.prototype.addPumpkinClickHandler = function(pumpkin){
		var self = this;
		pumpkin.el.on('click', function(){
			self.pumpkins.push(pumpkin)
			self.create()
		})	
	};

// return object literal we wish to reveal to rest of program. all else remains private.
	return{
		init: init
	};


})();


$(document).on('ready', function() {
  PumpkinGame.init();
});