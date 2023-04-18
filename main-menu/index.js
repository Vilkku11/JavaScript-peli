
console.log("Test");
export const toMainMenu = async () => {
    console.log("Navigating to main menu...");
    window.location.href = "mainMenu.html";
};

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
  