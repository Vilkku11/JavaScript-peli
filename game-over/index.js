// Set player score
export const setPlayerScore = (points) => {
  points = parseInt(points);
  const playerScore = document.querySelector("#player_score");
  playerScore.textContent = points + "!";
};

// Fetch scores from backend
export const fetchHighScores = async () => {
  console.log("Fetching data");
  fetch('http://localhost:3001/api/scores/highscores')
    .then(response => response.json())  // Parse the response as JSON
    .then(scores => {
      // Get the <ol> element for the scores
      const scoresList = document.getElementById('db_scores');

      // Clear the existing list items
      scoresList.innerHTML = '';

      // Create a new list item for each score and add it to the <ol>
      scores.forEach(score => {
        const listItem = document.createElement('li');
        listItem.textContent = score.name + ': ' + score.score;
        scoresList.appendChild(listItem);
      });
      console.log(scores);
    })
    .catch(error => {
      console.error('Error fetching top 3 scores:', error);
    });
};


// Send score to db
export const postHighScore = async (name, score) => {
  console.log("posting highscore");
  score = parseInt(score);

  const response = await fetch("http://localhost:3001/api/scores", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      score: score,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(response);
};
