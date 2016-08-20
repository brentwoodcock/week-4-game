var game = {
	char1: {
		name: 'Obi-Wan Kenobi',
		health: 120,
		attack: 8,
		counter: 15
	},
	char2: {
		name: 'Luke Skywalker',
		health: 100,
		attack: 15,
		counter: 5
	},
	char3: {
		name: 'Darth Sidious',
		health: 150,
		attack: 8,
		counter: 20
	},
	char4: {
		name: 'Darth Maul',
		health: 180,
		attack: 20,
		counter: 25
	},
	attack: function(heroId, enemyId){
		this[enemyId].health -= this[heroId].attack;
		this[heroId].health -= this[enemyId].counter;
		this[heroId].attack += this[heroId].attack;
	},
	reset: function(){
		this.char1.health = 120;
		this.char1.attack = 8;
		this.char2.health = 100;
		this.char2.attack = 15;
		this.char3.health = 150;
		this.char3.attack = 8;
		this.char4.health = 180;
		this.char4.attack = 20;
	}
}

$(document).ready(function(){

	var heroSelected = false;
	var targetSelected = false;

	$(".characters").on("click", function(event){

		if (heroSelected == false){
			$("#" + event.target.id).addClass("selectedChar").appendTo($(".hero"));
			heroSelected = true;
		}else if (targetSelected == false){
			$("#" + event.target.id).addClass("selectedTarget").appendTo($(".target"));
			targetSelected = true;
		}
	});

	$("#attackBtn").on("click", function(){

		var heroId = $(".selectedChar").attr("id");
		var enemyId = $(".selectedTarget").attr("id");

		if (heroSelected == false){
			$("#status").html("You must choose a character before you can attack.");
		}else if (targetSelected == false){
			$("#status").html("You must choose a character to attack.")
		}else{ // Runs when both character and target have been selected
			$("#status").html("You attacked " + game[enemyId].name + " for " + game[heroId].attack + " damage.<br>" + game[enemyId].name + " attacked you back for " + game[enemyId].counter + " damage.");
			game.attack(heroId, enemyId);
			if (game[heroId].health <= 0){ // Player has been defeated
				$("." + heroId + "health").html(game[heroId].health);
				$("#status").html("You have been defeated . . . GAME OVER!!!");
				$("#resetBtn").removeClass("hide");
			}else if (game[enemyId].health <= 0){ // Target has been defeated
				if($.trim($(".characters").html()) == ""){ // Check if game is over
					$("#status").html("You won! GAME OVER!!!");
					$("#" + enemyId).addClass("hide");
					$("#resetBtn").removeClass("hide");
				}else{
					$("#status").html("You have defeated " + game[enemyId].name + ", you may choose to fight another enemy.");
					$("#" + enemyId).addClass("hide").removeClass("selectedTarget");
					targetSelected = false;
				}
			}else{ // Update displayed health points for both characters
				$("." + heroId + "health").html(game[heroId].health);
				$("." + enemyId + "health").html(game[enemyId].health);
			}
		}
	});

	$("#resetBtn").on("click", function(){
		game.reset();
		for (var i = 1; i < 5; i++) {
			$("#char" + i).removeClass("hide selectedChar selectedTarget").appendTo(".characters");
			$(".char" + i + "health").html(game["char" + i].health);
		};
		heroSelected = false;
		targetSelected = false;
		$("#status").html("");
		$("#resetBtn").addClass("hide");
	});
})