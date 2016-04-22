(function() {
  'use strict';

  var
    /// immutable
    const_modes = Object.freeze(['cc', 'pc']),

    api,
    game;

  /// usage:
  ///   var g = game({
  ///     mode: gamelib.modes[1], // computer vs computer
  ///     rounds: 5 // max number of rounds to play
  ///   });
  game = function game(opts) {
    var mode,
      maxRounds,
      roundsForWin,
      roundsPlayed;

    opts = opts || {};

    mode = typeof opts !== 'undefined' && opts.hasOwnProperty('mode') &&
      const_modes.indexOf(opts.mode) > -1 ? opts.mode : const_modes[0];

    /// maximum number of rounds to play, as specified at invocation. note that to have a 'winner',
    /// logic dictates that we need to play an odd number fo rounds, so increment if the specified
    /// opts.rounds value is even. defaults to 3
    /// special case of -1 covers opts.rounds === Infinity whereby the game will continue without
    /// an official target number of rounds
    maxRounds = (function() {
      var rounds;

      if (!opts || !opts.hasOwnProperty('rounds') || typeof opts.rounds !== 'number' ||
        Number.isNaN(Number(opts.rounds))) {
        console.log(opts.rounds);
        return 3;
      }

      rounds = Math.ceil(Math.abs(opts.rounds));
      rounds = rounds % 2 === 0 ? rounds + 1 : rounds;

      // console.debug(opts.rounds, rounds);

      return rounds;
    }());

    /// as mentioned, to have a 'winner', the game must have an odd number of rounds. the game
    /// 'winner' is therefore decided by the first player to win Math.ceil(numberOfRounds / 2)
    /// rounds in the current game.
    /// special case of -1 covers opts.rounds === Infinity whereby the 'winner' is deemed the
    /// player with the highest number of wins when either player eventually gets bored
    roundsForWin = Math.ceil(maxRounds / 2);

    /// keep a tally of number of rounds played within current game for statistical purposes
    roundsPlayed = 0;

    return Object.freeze({
      mode: mode,

      players: Object.freeze(['a', 'b']),

      get rounds() {
        return Object.freeze({
          limit: maxRounds.toString() === 'Infinity' ? -1 : maxRounds,
          target: roundsForWin.toString() === 'Infinity' ? -1 : roundsForWin,
          played: roundsPlayed
        });
      }
    });
  };

  api = Object.freeze({
    game: game,

    /// game modes
    modes: const_modes /// all available modes
  });

  module.exports = api;

  /// gratuitous logging to prove it works in the browser
  console.log('hello from game.js');
}());
