(function() {
  'use strict';

  var
    /// libs
    paperlib = require('./paper.js'),
    scissorslib = require('./scissors.js'),
    rocklib = require('./rock.js'),

    /// lib APIs
    paper = paperlib.paper,
    scissors = scissorslib.scissors,
    rock = rocklib.rock,

    /// immutable
    const_modes = Object.freeze(['cc', 'pc']),

    api,
    game;

  /// usage:
  ///   var g = game({
  ///     mode: gamelib.modes[1], // player vs computer
  ///     rounds: 5               // max number of rounds to play
  ///   });
  game = function game(opts) {
    var mode,
      players,
      maxRounds,
      roundsForMajority,
      roundsPlayed,
      weapons,

      fnFight,
      fnReset;

    opts = opts || {};

    /*** game mode ***/
    /// determine whether the user has chosen an interactive (player-vs-computer aka `pc`) game,
    /// or a passive (computer-vs-computer aka `cc`) game:
    ///   * `pc` will ultimately prompt for a username, and render the UI game controls;
    ///   * `cc` will invoke a non-interactive game which plays out on screen for the user.
    mode = const_modes.indexOf(opts.mode) > -1 ? opts.mode : const_modes[0];

    /*** players ***/
    /// the `players` list consists of 2 elements:
    ///   * player || computer;
    ///   * computer.
    ///
    /// given a game mode of `pc` (see /*** game mode ***/), a `player` object will be created
    /// and assigned to players[0]. alternatively, for a game mode of `cc`, a `computer` object
    /// will be created and assigned to players[0]. regardless of game mode, a `computer` object
    /// will be created and assigned to players[1].
    players = (function players() {
      var playerList = [];

      if (typeof opts === 'object' && opts.hasOwnProperty('player') && typeof opts.player === 'string') {
        playerList.push(opts.player);
      }
      else {
        playerList.push('Prof. Plum');
      }

      playerList.push('Col. Mustard');
      return Object.freeze(playerList);
    }());

    /*** rounds ***/
    /// maximum number of rounds to play, as specified at invocation. note that to have a 'winner',
    /// logic dictates that we need to play an odd number fo rounds, so increment if the specified
    /// opts.rounds value is even. defaults to 3
    /// special case of -1 covers opts.rounds === Infinity whereby the game will continue without
    /// an official target number of rounds
    maxRounds = (function maxRounds() {
      var rounds;

      if (typeof opts !== 'object' || !opts.hasOwnProperty('rounds') ||
        typeof opts.rounds !== 'number' || Number.isNaN(Number(opts.rounds))) {
        rounds = 3;
      }
      else {
        rounds = Math.ceil(Math.abs(opts.rounds));
        rounds = rounds % 2 === 0 ? rounds + 1 : rounds;
      }

      return rounds;
    }());

    /// as mentioned, to have a 'winner', the game must have an odd number of rounds. the game
    /// 'winner' is therefore decided by the first player to win Math.ceil(numberOfRounds / 2)
    /// rounds in the current game.
    /// special case of -1 covers opts.rounds === Infinity whereby the 'winner' is deemed the
    /// player with the highest number of wins when either player eventually gets bored
    roundsForMajority = Math.ceil(maxRounds / 2);

    /// keep a tally of number of rounds played within current game for statistical purposes
    roundsPlayed = 0;

    /*** weapons ***/
    /// game `weapons` are registered on initialisation and are immutable. weapon modifications are
    /// therefore not permitted during a game
    weapons = (function() {
      if (typeof opts === 'object' && opts.hasOwnProperty('weapons') &&
        (typeof opts.weapons === 'object' && opts.weapons !== null &&
        !(opts.weapons instanceof Array))) {
        var keys = Object.keys(opts.weapons);

        if (keys.length < 3) {
          throw new Error('expecting "opts.weapons" to have at least 3 elements, but received ' + keys.length);
        }
        else if (keys.length % 2 === 0) {
          throw new Error('expecting "opts.weapons" to have an odd number of elements, but received ' + keys.length);
        }
        else {
          return opts.weapons;
        }
      }
      else {
        return {};
      }
    }());
    // Object.freeze({
    //   paper: paper({
    //     defeats: {
    //       rock: 'covers'
    //     }
    //   }),
    //   scissors: scissors({
    //     defeats: {
    //       paper: 'cut'
    //     }
    //   }),
    //   rock: rock({
    //     defeats: {
    //       scissors: 'crushes'
    //     }
    //   })
    // });

    /// compare weapons `a` and `b` according to their `defeats` property
    fnFight = function fight(a, b) {
      var result;

      if (!weapons.hasOwnProperty(a)) {
        throw new Error('check params: "' + a + '" is not a member of "weapons"');
      }

      if (!weapons.hasOwnProperty(b)) {
        throw new Error('check params: "' + b + '" is not a member of "weapons"');
      }

      /// draw
      if (a === b) {
        result = 0;
      }

      /// a > b
      if (weapons[a].defeats.hasOwnProperty(b)) {
        roundsPlayed += 1;
        result = 1;
      }

      /// a < b
      if (weapons[b].defeats.hasOwnProperty(a)) {
        roundsPlayed += 1;
        result = -1;
      }

      return result;
    };

    /// reset the game
    fnReset = function reset() {
      roundsPlayed = 0;

      console.log('players[0].reset()');
      console.log('players[1].reset()');
    };

    return Object.freeze({
      /// getters
      get mode() {
        return mode;
      },

      get players() {
        return players;
      },

      get rounds() {
        return Object.freeze({
          limit: maxRounds.toString() === 'Infinity' ? -1 : maxRounds,
          target: roundsForMajority.toString() === 'Infinity' ? -1 : roundsForMajority,
          played: roundsPlayed
        });
      },

      get weapons() {
        return Object.freeze(weapons);
      },

      /// methods
      fight: fnFight,
      reset: fnReset
    });
  };

  api = Object.freeze({
    /// factory method
    game: game,

    /// game modes
    modes: const_modes /// all available modes
  });

  module.exports = api;

  /// gratuitous logging to prove it works in the browser
  console.log('hello from game.js');
}());
