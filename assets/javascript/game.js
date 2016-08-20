var game = {
    char1: {
        name: 'Obi-Wan Kenobi',
        health: 120,
        baseAttack: 8,
        attack: 8,
        counter: 15
    },
    char2: {
        name: 'Luke Skywalker',
        health: 100,
        baseAttack: 15,
        attack: 15,
        counter: 5
    },
    char3: {
        name: 'Darth Sidious',
        health: 150,
        baseAttack: 8,
        attack: 8,
        counter: 20
    },
    char4: {
        name: 'Darth Maul',
        health: 180,
        baseAttack: 20,
        attack: 20,
        counter: 25
    },

    attack: function(heroId, enemyId) {
        this[enemyId].health -= this[heroId].attack;
        this[heroId].attack += this[heroId].baseAttack;
        if (this[enemyId].health > 0) {
            this[heroId].health -= this[enemyId].counter;
        };
    },

    reset: function() {
        this.char1.health = 120;
        this.char1.attack = this.char1.baseAttack;
        this.char2.health = 100;
        this.char2.attack = this.char2.baseAttack;
        this.char3.health = 150;
        this.char3.attack = this.char3.baseAttack;
        this.char4.health = 180;
        this.char4.attack = this.char4.baseAttack;
    }
}

$(document).ready(function() {

    var heroSelected = false;
    var targetSelected = false;

    // Character buttons click events
    $(".characters").on("click", function(event) {

        if (heroSelected == false) { // Sets user's character
            $("#" + event.target.id).addClass("selectedChar").removeClass("possChar").appendTo($(".hero"));
            heroSelected = true;
            $(".charTitle").html("Enemies Available to Attack");
        } else if (targetSelected == false) { // Sets enemy character
            $("#" + event.target.id).addClass("selectedTarget").removeClass("possChar notSelected").appendTo($(".target"));
            targetSelected = true;
        }
        $(".possChar").addClass("notSelected");
    });

    // Attack button click events
    $("#attackBtn").on("click", function() {

        var heroId = $(".selectedChar").attr("id");
        var enemyId = $(".selectedTarget").attr("id");

        if (heroSelected == false) { // Error if no user character selected
            $("#status").html("You must choose a character before you can attack.");
        } else if (targetSelected == false) { // Error if no defender selected
            $("#status").html("You must choose a character to attack.")
        } else { // Runs when both character and defender have been selected
            $("#status").html("You attacked " + game[enemyId].name + " for " + game[heroId].attack + " damage.<br>" + game[enemyId].name + " attacked you back for " + game[enemyId].counter + " damage.");
            game.attack(heroId, enemyId);
            if (game[heroId].health <= 0) { // Player has been defeated
                $("." + heroId + "health").html(game[heroId].health);
                $("." + enemyId + "health").html(game[enemyId].health);
                $("#status").html("You have been defeated . . . GAME OVER!!!");
                $("#resetBtn").removeClass("hide");
            } else if (game[enemyId].health <= 0) { // Target has been defeated
                if ($.trim($(".characters").html()) == "") { // Check if game is over
                    $("#status").html("You won! GAME OVER!!!");
                    $("#" + enemyId).addClass("hide");
                    $("#resetBtn").removeClass("hide");
                } else { // Remove a defeated enemy
                    $("#status").html("You have defeated " + game[enemyId].name + ", you may choose to fight another enemy.");
                    $("#" + enemyId).addClass("hide").removeClass("selectedTarget");
                    targetSelected = false;
                }
            } else { // Update displayed health points for both characters
                $("." + heroId + "health").html(game[heroId].health);
                $("." + enemyId + "health").html(game[enemyId].health);
            }
        }
    });

    // Reset button click events
    $("#resetBtn").on("click", function() { // Restart game
        game.reset();
        for (var i = 1; i < 5; i++) { // Reset character buttons
            $("#char" + i).removeClass("hide selectedChar selectedTarget notSelected").addClass("possChar").appendTo(".characters");
            $(".char" + i + "health").html(game["char" + i].health);
        };
        $(".charTitle").html("Characters");
        heroSelected = false;
        targetSelected = false;
        $("#status").html("");
        $("#resetBtn").addClass("hide");
    });
})
