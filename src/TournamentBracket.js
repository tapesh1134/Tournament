import React, { useState } from 'react';
import './TournamentBracket.css';

const TournamentBracket = () => {
  const [numPlayers, setNumPlayers] = useState(0);
  const [bracket, setBracket] = useState([]);

  const generateBracket = () => {
    const numRounds = Math.log2(numPlayers);
    const rounds = [];

    for (let i = 0; i < numRounds; i++) {
      const numMatches = numPlayers / Math.pow(2, i + 1);
      const matches = [];

      for (let j = 0; j < numMatches; j++) {
        const participantIndex1 = j * 2;
        const participantIndex2 = j * 2 + 1;

        const match = {
          participant1: participantIndex1,
          participant2: participantIndex2,
          winner: '',
        };

        matches.push(match);
      }

      rounds.push(matches);
    }

    setBracket(rounds);
  };

  const handleNumPlayersChange = (event) => {
    const { value } = event.target;
    setNumPlayers(parseInt(value, 10));
  };

  const handleWinnerChange = (event, roundIndex, matchIndex, participantIndex) => {
    const { value } = event.target;
    const updatedBracket = [...bracket];
    updatedBracket[roundIndex][matchIndex][`participant${participantIndex}`] = value;
    setBracket(updatedBracket);
  };

  return (
    <div className="tournament-bracket">
      <h3>Tournament Bracket Generator</h3>
      <div className="input-container">
        <label>Number of Players:</label>
        <input type="number" value={numPlayers} onChange={handleNumPlayersChange} />
        <button onClick={generateBracket}>Generate Bracket</button>
      </div>

      {bracket.length > 0 && (
        <div className="bracket">
          {bracket.map((round, roundIndex) => (
            <div key={roundIndex} className={`round round-${roundIndex}`}>
              <h4>Round {roundIndex + 1}</h4>
              {round.map((match, matchIndex) => (
                <div key={matchIndex} className="match">
                  {roundIndex > 0 && <div className="connector"></div>}
                  <div className="participant1">
                    <input
                      type="text"
                      placeholder={`Participant ${match.participant1 + 1}`}
                      value={match.participant1}
                      onChange={(event) => handleWinnerChange(event, roundIndex, matchIndex, 1)}
                    />
                  </div>
                  <div className="participant2">
                    <input
                      type="text"
                      placeholder={`Participant ${match.participant2 + 1}`}
                      value={match.participant2}
                      onChange={(event) => handleWinnerChange(event, roundIndex, matchIndex, 2)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentBracket;
