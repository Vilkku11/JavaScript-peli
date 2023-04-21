
console.log("Test");

export const fetchTopThree = async () => {
    console.log("Fetching data");
    fetch('http://localhost:3001/api/scores/top')
      .then(response => response.json())  // Parse the response as JSON
      .then(scores => {
        // Get the <ol> element for the scores
        const scoresList = document.getElementById('top-score-list');
  
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

  const fetchScores = async () => {
    const response = await fetch('http://localhost:3001/api/scores/highscores');
    const scores = await response.json();
    console.log(scores);
  }

export const postScore = async (name, score) => {
  console.log('Posting data');
  const fixedScore = score.slice(0, -1);
  console.log(name, fixedScore);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json'},
    body: JSON.stringify({ name: name, score: fixedScore})
  };
  try {
    await fetch('http://localhost:3001/api/scores', requestOptions)
    .then(await fetchScores())
  } catch (err) {
    console.error(err);
  }
}