// Sven Abilities
  $( document ).ready(function () {
    // insert player name
    var charName = $('#characterName').val();
    $('#pname').text(charName);

    // to get the attack comands for player attacks
    $(document).keydown(function (event) {
      //***********************************************************************
      // Get and Set all verbals for fighting
        // set players default attack with out weapon
        var playerDefualtAttack  = 10,
        // set enemys default attack with out weapon
        enemydefaultAttack   = 30,

        // set mana cost for player and enemy *********************************
        // brutus Magic 1 attack gives him Full Armor
        svenMagicOneCost   = 30,
        // brutus Magic 2 attack reduces the enemy armor
        // magicOneAbility
        magicOneAbility    = boolean;
        // sven magic 2 cost
        svenMagicTwoCost   = 30,
        // magicTwoAbility
        magicTwoAbility    = false;
        // shadowling enemy Magic 1 cost
        // Still need to set shadowling mana attack
        shadowMagicOneCost   = 1 * 10,
        // still need tio set shadowling mana2 attack
        shadowMagicTwoCost   = 1 * 10,
        

        // set player and enemy stamina cost **********************************
        // brutus stamina 1 attack is double attack
        svenStaminaOneCost = 60,
        // brutus stamina 2 attack is bleed strike
        svenStaminaTwoCost = 20,
        // shadowling stamina one attack and 2 still needs to be set
        // set stamina one attack for enemy
        shadowStaminaOneCost = 1 * 10,
        // set stamina two attack for enemy
        shadowStaminaTwoCost = 1 * 10,

        // get player health, mana, stamina and Armor *************************
        // player health
        playerHealth         = $('#playerHealth').width(),
        // player mana
        playerMana           = $('#playerMana').width(),
        // player stamina
        playerStamina        = $('#playerStamina').width(),
        // player Armor
        playerArmor          = $('#playerArmor').attr('data-id');

        // get enemy health, mana, stamina and Armor
        // enemy health
        enemyHealth          = $('#enemyHealth').width(),
        // enemy mana
        enemyMana            = $('#enemyMana').width(),
        // enemy stamina
        enemyStamina         = $('#enemyStamina').width(),
        // enemy armor
        enemyArmor           = $('#enemyArmor').attr('data-id');
      //***********************************************************************
console.log(magicOneAbility);
      //***********************************************************************
        // sven Magic one and 2 abilities settings
        if (magicOneAbility === false) {
          // creats a clone of him self enemy has 50% to do damge
          $('.playerHolder').css('background-image', 'url(images/Characters/Rogue-back.png)');
          playerHealth = playerHealth;
          playerMana = playerMana;
          playerStamina = playerStamina;
          playerArmor = playerArmor;
          console.log('inside false', magicOneAbility);
        }

        if (magicTwoAbility === false) {
          // creats a clone of him self enemy has 50% to do damge
          $('.playerHolderDouble').hide();
          $('.playerHolder').css('left', '54px');
          playerHealth = playerHealth;
          playerMana = playerMana;
          playerStamina = playerStamina;
          playerArmor = playerArmor;
        }
        // End of svens magic abilities settings
      //***********************************************************************

      // attack is false
      var attack = false;
      //swap based on the keyCode
      switch (event.keyCode) {
        case 65:
          attack = 'Normalattack';
        break;
        case 73:
          attack = 'MagicOne';
        break;
        case 67:
          attack = 'MagicTwo';
        break;
        case 66:
          attack = 'StaminaOne';
        break;
        case 76:
          attack = 'StaminaTwo';
        break;
      }

    //***********************************************************************
    // Functions to attacks enemy functions - take damge, deal damge
      //***********************************************************************
        // Defualt Attack Functions for player and enemy
        function playerBaseAttack  (stats) {
          switch (enemyArmor) {
            case '1':
              $('#enemyArmor').attr('data-id', '0.5');
              // change armor image to half armor image
              $('#enemyArmor').css('background-image', 'url(images/halfShield.png)');
            break;
            case '0.5':
              $('#enemyArmor').attr('data-id', '0');
              // change armor image to half armor image
              $('#enemyArmor').css('background-image', 'none');
            break;
            case '0':
              $('#enemyHealth').show().css('width', (enemyHealth - playerDefualtAttack) + 'px');
              // no armor rating do damge to health text
              $('#enemyHealth').text('100/' + (enemyHealth - playerDefualtAttack));
            break;
          }
        }

        // enemy fight back function defualt attack *****************************
        function enemyBaseAttack (stats) {
          console.log('enemyattack', magicOneAbility);
          if (magicOneAbility === true) {
            console.log('sTrue', magicOneAbility);
            playerHealth = playerHealth;
            playerMana = playerMana;
            playerStamina = playerStamina;
            playerArmor = playerArmor;
            magicOneAbility = false;
          } else {
            console.log('SFalse', magicOneAbility);
            switch (playerArmor) {
              case '1':
                $('#playerArmor').attr('data-id', '0.5');
                // change armor image to half armor image
                $('#playerArmor').css('background-image', 'url(images/halfShield.png)');
              break;
              case '0.5':
                $('#playerArmor').attr('data-id', '0');
                // change armor image to half armor image
                $('#playerArmor').css('background-image', 'none');
              break;
              case '0':
                $('#playerHealth').show().css('width', (playerHealth - enemydefaultAttack) + 'px');
                // no armor rating do damge to health text
                $('#playerHealth').text('300/' + (playerHealth - enemydefaultAttack));
              break;
            }
          }

        }
        // END defualt Attack functions
      //***********************************************************************

      //***********************************************************************
        // Magic One Functions for player
        function svenMagicOne (stats) {
          console.log('ability', magicOneAbility);
          // sven is invis for one round takes no damage
          magicOneAbility = true;
          console.log('should be true here-->', magicOneAbility);
          if (magicOneAbility === true) {
            // creats a clone of him self enemy has 50% to do damge
            $('.playerHolder').css('background-image', 'none');
            playerHealth = playerHealth;
            playerMana = playerMana;
            playerStamina = playerStamina;
            playerArmor = playerArmor;
            $('#playerMana').show().css('width', (playerMana - svenMagicOneCost) + 'px');
            // mana cost in mana bar text
            $('#playerMana').text('200/' + (playerMana - svenMagicOneCost));
            console.log('lastbit in if s b t', magicOneAbility);
          }
        }

        // magic Two ability for Player
        function svenMagicTwo (stats) {
          // sven Magic two ability is double him self
          var x = Math.floor((Math.random() * 2) + 1);
          magicTwoAbility = true;
          if (magicTwoAbility === true) {
            // creats a clone of him self enemy has 50% to do damge
            $('.playerHolderDouble').show().css('left', '-14px', 'bottom', '-1px');
            $('.playerHolder').css('left', '84px');
            playerHealth = playerHealth;
            playerMana = playerMana;
            playerStamina = playerStamina;
            playerArmor = playerArmor;
            $('#playerMana').show().css('width', (playerMana - svenMagicTwoCost) + 'px');
            // mana cost in mana bar text
            $('#playerMana').text('200/' + (playerMana - svenMagicTwoCost));

            // random number to see if enemy strikes back
            console.log('random', x);
            if (x === 1) {
              console.log('hit');
              enemyBaseAttack();
            }
            magicTwoAbility = false;
          }
        }
        // END of Magic function
      //***********************************************************************
      //***********************************************************************
        // Stamina Functions for player
        function brutusStaminaOne (stats) {
          // stamina 1 ability DD damage
          switch (enemyArmor) {
            case '1':
              if (playerStamina <= 20) {
                $('.keys').text('Not enough stamina for attack');
                $('#playerStamina').show().css('width', '20px');
                $('#playerStamina').text('200/20');
              } else {
                // enemy Armor is reduced to 0 from double attack
                $('#enemyArmor').attr('data-id', '0');
                // armor image none
                $('#enemyArmor').css('background-image', 'none');
                // stamina cost from double attack
                $('#playerStamina').css('width', (playerStamina - brutusStaminaOneCost) + 'px');
                // stamina text change
                $('#playerStamina').text('200/' + (playerStamina - brutusStaminaOneCost));
              }
            break;

            case '0.5':
              if (playerStamina <= 20) {
                  $('.keys').text('Not enough stamina for attack');
                  $('#playerStamina').show().css('width', '20px');
                  $('#playerStamina').text('200/20');
              } else {
                // enemy takes half armor damage + half real damge due to DD attack
                $('#enemyArmor').attr('data-id', '0');
                // armor image none
                $('#enemyArmor').css('background-image', 'none');
                // plus damge from attack to enemy
                $('#enemyHealth').show().css('width', (enemyHealth - (playerDefualtAttack / 2)) + 'px');
                // no armor rating do damge to health text
                $('#enemyHealth').text('100/' + (enemyHealth - (playerDefualtAttack / 2)));
                // stamina cost from double attack
                $('#playerStamina').css('width', (playerStamina - brutusStaminaOneCost) + 'px');
                // stamina text change
                $('#playerStamina').text('200/' + (playerStamina - brutusStaminaOneCost));
              }
            break;

            case '0':
              if (playerStamina <= 20) {
                $('.keys').text('Not enough stamina for attack');
                $('#playerStamina').show().css('width', '20px');
                $('#playerStamina').text('200/20');
              } else {
                // do DD to enemy health
                $('#enemyHealth').show().css('width', (enemyHealth - (playerDefualtAttack * 2)) + 'px');
                // no armor rating do damge to health text
                $('#enemyHealth').text('100/' + (enemyHealth - (playerDefualtAttack * 2 )));
                // stamina text change
                $('#playerStamina').text('200/' + (playerStamina - brutusStaminaOneCost));
                // text to align with cost
                $('#playerStamina').css('width', (playerStamina - brutusStaminaOneCost) + 'px');
              }
            break;
          }
        }

        // stamina two ability
        function brutusStaminaTwo () {
          // brutus bleed strik
          staminaTwoAbility = true;
          if (staminaTwoAbility === true) {
            switch (enemyArmor) {
              case '1':
              if (playerStamina <= 20) {
                $('.keys').text('Not enough stamina for attack');
                $('#playerStamina').show().css('width', '20px');
                $('#playerStamina').text('200/20');
                break;
              } else {
                $('#enemyArmor').attr('data-id', '0.5');
                // change armor image to half armor image
                $('#enemyArmor').css('background-image', 'url(images/halfShield.png)');
                bleedFunction();
                break;
              }
              case '0.5':
              if (playerStamina <= 20) {
                $('.keys').text('Not enough stamina for attack');
                $('#playerStamina').show().css('width', '20px');
                $('#playerStamina').text('200/20');
              } else {
                $('#enemyArmor').attr('data-id', '0');
                // change armor image to half armor image
                $('#enemyArmor').css('background-image', 'none');
                bleedFunction();
                break;
              }
              case '0':
              if (playerStamina <= 20) {
                $('.keys').text('Not enough stamina for attack');
                $('#playerStamina').show().css('width', '20px');
                $('#playerStamina').text('200/20');
                break;
              } else {
                $('#enemyHealth').show().css('width', (enemyHealth - (playerDefualtAttack * 2)) + 'px');
                // no armor rating do damge to health text
                $('#enemyHealth').text('100/' + (enemyHealth - (playerDefualtAttack * 2)));
                $('#playerStamina').text('200/' + (playerStamina - brutusStaminaTwoCost));
                // text to align with cost
                $('#playerStamina').css('width', (playerStamina - brutusStaminaTwoCost) + 'px');
                break;
              }
            }
            staminaTwoAbility = false;
          }
        }

        //stamina two bleed function
        function bleedFunction (stats) {
          $('#enemyHealth').show().css('width', (enemyHealth - 5) + 'px');
              // no armor rating do damge to health text
          $('#enemyHealth').text('100/' + (enemyHealth - 5));
          $('#playerStamina').text('200/' + (playerStamina - brutusStaminaTwoCost));
          // text to align with cost
          $('#playerStamina').css('width', (playerStamina - brutusStaminaTwoCost) + 'px');
        }
        // End Of Stamina functions
      //***********************************************************************

      //***********************************************************************
        // Death function for both player and enemy
        function death (stats) {
          // if enemy or you die from attack
          if (enemyHealth === 10 || playerHealth === 30 || enemyHealth <= 0 || playerHealth <= 0) {
            $('#container').hide();
            location.reload();
          }
        }
        // End of Death function
      //***********************************************************************

    // END Functions 
    //***********************************************************************

      // see if a attack key was pressed
      // and attack enemy
      switch (attack) {
        // Normal attack
        case 'Normalattack':
          playerBaseAttack();
          enemyBaseAttack();
          death();
        break;

        // magic One Attack
        case 'MagicOne':
          svenMagicOne();
          death();
        break;

        // magic Two Attack
        case 'MagicTwo':
          svenMagicTwo();
          death();
        break;

        // stamina One attack
        case 'StaminaOne':
          death();
        break;

        // stamina Two attack
        case 'StaminaTwo':
          death();
        break;
      }
    });
  });