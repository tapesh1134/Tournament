import React from 'react';
import TournamentBracket from './TournamentBracket';

const App = () => {
  const participants = ['Participant 1', 'Participant 2', 'Participant 3', 'Participant 4'];

  return (
    <div className="App">
      <h1>Tournament Bracket</h1>
      <TournamentBracket participants={participants} />
    </div>
  );
};

export default App;
