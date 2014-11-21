// Brutus Abilities
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
        brutusMagicOneCost   = 60,
        // brutus Magic 2 attack reduces the enemy armor
        brutusMagicTwoCost   = 60,
        // shadowling enemy Magic 1 cost
        // Still need to set shadowling mana attack
        shadowMagicOneCost   = 1 * 10,
        // still need tio set shadowling mana2 attack
        shadowMagicTwoCost   = 1 * 10,

        // set player and enemy stamina cost **********************************
        // brutus stamina 1 attack is double attack
        brutusStaminaOneCost = 60,
        // brutus stamina 2 attack is bleed strike
        brutusStaminaTwoCost = 60,
        // staminaTwoAbility
        staminaTwoAbility    = false;
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

      //***********************************************************************
        // Defualt enemy counter attacks
        //shadowLingMagicOne();
        // End of Defualt checking
      //***********************************************************************

      // attack is false
      var attack = false;
      //swap based on the keyCode
      switch (event.keyCode) {
        case 65:
          attack = 'Normalattack';
        break;
        case 71:
          attack = 'MagicOne';
        break;
        case 82:
          attack = 'MagicTwo';
        break;
        case 68:
          attack = 'StaminaOne';
        break;
        case 66:
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
        // END defualt Attack functions
      //***********************************************************************

      //***********************************************************************
        // Magic One Functions for player
        function brutusMagicOne (stats) {
          // armor check for spell to take affect
          switch (playerArmor) {
              case '1':
              // check mana before grant
              if (playerMana <= 40) {
                $('.keys').text('Not enough mana for spell');
                $('#playerArmor').attr('data-id', '1');
                $('#playerArmor').css('background-image', 'url(images/fullShield.png)');
                $('#playerMana').show().css('width', '40px');
                $('#playerMana').text('100/40');
              } else {
                // spell cast
                $('.keys').text('Armor granted');
                // set armor to 1
                $('#playerArmor').attr('data-id', '1');
                // change image to full armor image
                $('#playerArmor').css('background-image', 'url(images/fullShield.png)');
                // mana cost in mana bar
                $('#playerMana').show().css('width', (playerMana - brutusMagicOneCost) + 'px');
                // mana cost in mana bar text
                $('#playerMana').text('100/' + (playerMana - brutusMagicOneCost));
              }
              
            break;
            case '0.5':
            // check mana before grant
              if (playerMana <= 40) {
                $('.keys').text('Not enough mana for spell');
                $('#playerArmor').attr('data-id', '0.5');
                $('#playerArmor').css('background-image', 'url(images/halfShield.png)');
                $('#playerMana').show().css('width', '40px');
                $('#playerMana').text('100/40');
              } else {
                // spell cast
                $('.keys').text('Armor granted');
                // set armor to 1
                $('#playerArmor').attr('data-id', '1');
                // change image to full armor image
                $('#playerArmor').css('background-image', 'url(images/fullShield.png)');
                // mana cost in mana bar
                $('#playerMana').show().css('width', (playerMana - brutusMagicOneCost) + 'px');
                // mana cost in mana bar text
                $('#playerMana').text('100/' + (playerMana - brutusMagicOneCost));
              }
            break;
            case '0':
            // check mana before grant
              if (playerMana <= 40) {
                $('.keys').text('Not enough mana for spell');
                $('#playerArmor').attr('data-id', '0');
                $('#playerArmor').css('background-image', 'none');
                $('#playerMana').show().css('width', '40px');
                $('#playerMana').text('100/40');
              } else  {
                // spell cast
                $('.keys').text('Armor granted');
                // set armor to 1
                $('#playerArmor').attr('data-id', '1');
                // change image to full armor image
                $('#playerArmor').css('background-image', 'url(images/fullShield.png)');
                // mana cost in mana bar
                $('#playerMana').show().css('width', (playerMana - brutusMagicOneCost) + 'px');
                // mana cost in mana bar text
                $('#playerMana').text('100/' + (playerMana - brutusMagicOneCost));
              }
            break;
          }
        }

        // magic Two ability for Player
        function brutusMagicTwo (stats) {
          // Brutus Magic two ability is reduce enemy armor
          switch (enemyArmor) {
            case '1':
              if (playerMana <= 40) {
                $('.keys').text('Not enough mana for spell');
                $('#enemyArmor').attr('data-id', '0');
                $('#enemyArmor').css('background-image', 'url(images/fullShield.png)');
                $('#playerMana').show().css('width', '40px');
                $('#playerMana').text('100/40');
              } else {
                // spell cast
                $('.keys').text('Enemy armor reduced');
                // remove any armor
                $('#enemyArmor').attr('data-id', '0');
                // change armor image to none
                $('#enemyArmor').css('background-image', 'none');
                // magicTwo mana cost
                $('#playerMana').show().css('width', (playerMana - brutusMagicTwoCost) + 'px');
                // mana cost in mana bar text
                $('#playerMana').text('100/' + (playerMana - brutusMagicTwoCost));
              }
            break;
            case '0.5':
            if (playerMana <= 40) {
                $('.keys').text('Not enough mana for spell');
                $('#enemyArmor').attr('data-id', '0');
                $('#enemyArmor').css('background-image', 'url(images/halfShield.png)');
                $('#playerMana').show().css('width', '40px');
                $('#playerMana').text('100/40');
              } else {
                // spell cast
                $('.keys').text('Enemy armor reduced');
                // remove any armor
                $('#enemyArmor').attr('data-id', '0');
                // change armor image to none
                $('#enemyArmor').css('background-image', 'none');
                // magicTwo mana cost
                $('#playerMana').show().css('width', (playerMana - brutusMagicTwoCost) + 'px');
                // mana cost in mana bar text
                $('#playerMana').text('100/' + (playerMana - brutusMagicTwoCost));
              }
            break;
            case '0':
            if (playerMana <= 40) {
                $('.keys').text('Not enough mana for spell');
                $('#enemyArmor').attr('data-id', '0');
                $('#enemyArmor').css('background-image', 'none');
                $('#playerMana').show().css('width', '40px');
                $('#playerMana').text('100/40');
              } else {
                // spell cast
                $('.keys').text('Enemy armor reduced');
                // remove any armor
                $('#enemyArmor').attr('data-id', '0');
                // change armor image to none
                $('#enemyArmor').css('background-image', 'none');
                // magicTwo mana cost
                $('#playerMana').show().css('width', (playerMana - brutusMagicTwoCost) + 'px');
                // mana cost in mana bar text
                $('#playerMana').text('100/' + (playerMana - brutusMagicTwoCost));
              }
            break;
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
          brutusMagicOne();
          death();
        break;

        // magic Two Attack
        case 'MagicTwo':
          brutusMagicTwo();
          death();
        break;

        // stamina One attack
        case 'StaminaOne':
          brutusStaminaOne();
          death();
        break;

        // stamina Two attack
        case 'StaminaTwo':
          brutusStaminaTwo();
          death();
        break;
      }
    });
  });