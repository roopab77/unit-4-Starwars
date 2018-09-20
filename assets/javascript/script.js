//create array for all characters with image,name,attackpoints,health points and counter points
var charlist = [{
        name: "Rey",
        HealthPoints: 1232,
        Attack: 71,
        Counter: 30,
        image: "assets/images/image1.jpg"
    },
    {
        name: "Darth Vader",
        HealthPoints: 1700,
        Attack: 120,
        Counter: 70,
        image: "assets/images/image2.jpg"
    },
    {
        name: "Yoda",
        HealthPoints: 1454,
        Attack: 80,
        Counter: 57,
        image: "assets/images/image3.jpg"
    },
    {
        name: "Kylo Ren",
        HealthPoints: 1546,
        Attack: 88,
        Counter: 60,
        image: "assets/images/image4.jpg"
    }
];
var charSelectedName = "";
var divtoTag = "#characterList";
var className = "chars";
var EnemySelected = false;
var myName = "";
var enemyName = "";


function loadCharacters() {
    for (var i = 0; i < charlist.length; i++) {

        if (charSelectedName != charlist[i].name) {
            $(divtoTag).append(
                "<div class='" + className + "' id='" + "jedi" + (i + 1) + "' value = '" + charlist[i].name + "'>" +
                "<p>" + charlist[i].name + "</p>" +
                "<img src= '" + charlist[i].image + "'></img>" + "<p id='healthstats'>" +
                "Health Points :" + charlist[i].HealthPoints +
                "<br> Attack : " + charlist[i].Attack +
                "<br>Counter: " + charlist[i].Counter + "</p></div> ");
        }
    }

}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

$(document).ready(function () {

    //load all characters in the start
    loadCharacters();

    //choose your Jedi
    $(".chars").on("click", function () {
        charSelectedName = $(this).attr("value");
        myName = charSelectedName;
        var charSelected = $(this).attr("id");
        var charSelectedID = "#" + charSelected;
        $("#yourCharacter").append($(charSelectedID));
        $(divtoTag).empty();
        divtoTag = "#enemyList";
        className = "charsEnemy";
        loadCharacters();

    });

    //choose your opponent


    $(document).on("click", "div .charsEnemy", function () {
        if (EnemySelected == false) {
            EnemySelected = true;
            var enemySelected = $(this).attr("value");
            enemyName = enemySelected;
            var charSelected = $(this).attr("id");
            var charSelectedID = "#" + charSelected;
            $("#yourEnemy").append($(charSelectedID));
        }
    });

    //When you attack 
    $("#attackBtn").on("click", function () {
        
        if (EnemySelected == true) {
            
            var myOBJ = findObjectByKey(charlist, "name", myName);
            var enemyOBJ = findObjectByKey(charlist, "name", enemyName);
            if (myOBJ.HealthPoints > 0 && enemyOBJ.HealthPoints > 0) {
                enemyOBJ.HealthPoints = enemyOBJ.HealthPoints - myOBJ.Attack;

                //$().html("p .healthstats",
                
                $("#yourEnemy .charsEnemy #healthstats").html('Health: ' + enemyOBJ.HealthPoints + '<br/>Attack: ' + enemyOBJ.Attack + '<br/>Counter: ' + enemyOBJ.Counter);
                myOBJ.attack = myOBJ.attack;

                myOBJ.HealthPoints = myOBJ.HealthPoints - enemyOBJ.Counter;
                $('#yourCharacter .chars #healthstats').html('Health: ' + myOBJ.HealthPoints + '<br/>Attack: ' + myOBJ.Attack + '<br/>Counter: ' + myOBJ.Counter);

            }else
            {
                if(myOBJ.HealthPoints < 0)

                {
                    document.getElementById("attackText").textContent =  "You lost. Game Over";
                }
                else
                {
                    document.getElementById("attackText").textContent =  "You won. ";
                }

            }


        }
    });

});