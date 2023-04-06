const card = document.getElementById("gameOverCard");

// Card visibility
//  card.style.visibility = "hidden";

// Main menu button
const toMainMenu = () => {
  console.log("to main menu");

  //setPlayerScore(42043);
};

// Retry button
const retry = () => {
  console.log("retry");
  fetchHighScores();
};

// Set player score
const setPlayerScore = (points) => {
  const playerScore = document.querySelector("#player_score");
  playerScore.textContent = points + "!";
};

// Fetch scores from backend
const fetchHighScores = async () => {
  const highScores = document.querySelector("#db_scores");

  console.log("fetching highscores");
  const response = await fetch("http://localhost:3001/api/scores");
  let score = await response.json();
  score = score.sort((a, b) => b.score - a.score);
  console.log(score);

  let text = "";
  for (let i = 0; i < score.length; i++) {
    text = text + score[i].name + ":\xa0\xa0" + score[i].score + "\n";
    highScores.innerText = text;
  }
  console.log(text);
};

// Send score to db
const postHighScore = async (name, score) => {
  console.log("posting highscore");

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
