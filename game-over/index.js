// Set player score
export const setPlayerScore = (points) => {
  points = parseInt(points);
  const playerScore = document.querySelector("#player_score");
  playerScore.textContent = points + "!";
};

// Fetch scores from backend
export const fetchHighScores = async () => {
  const highScores = document.querySelector("#db_scores");

  console.log("fetching highscores");
  const response = await fetch("http://localhost:3001/api/scores");
  let score = await response.json();
  score = score.sort((a, b) => b.score - a.score);
  console.log(score);

  let text = "";
  for (let i = 0; i < score.length; i++) {
    text = score[i].name + ":\xa0\xa0" + score[i].score + "\n";
    let li = document.createElement("li");
    li.innerText = text;
    highScores.appendChild(li);
  }

  console.log(text);
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
