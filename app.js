// Initialize constants and variables
const totalOver = 5; // Total number of overs
let totalScore = 0; // Total score of the current team
let currScore = 0; // Current score in the ongoing over
let ballCount = 0; // Count of balls in the current over
let wicket = 0; // Total wickets taken
let over = 0; // Number of overs completed
let record = []; // Array to record scores of each over
let team = 1; // Current team (1 or 2)
let team1Score = 0; // Total score of team 1

// Access all buttons on the web page
let btns = document.querySelectorAll(".btn"); 

// Create a paragraph element to display the current score
let p = document.createElement("p"); 
p.innerHTML = `Team ${team} <br> Current Score: ${totalScore} Runs and ${wicket} wickets`;
p.classList.add("curr");
document.getElementById("main").append(p); // Add the paragraph to the main container

// Add event listeners to all buttons
for (let btn of btns) {
    btn.addEventListener("click", (event) => {
        let temp = event.target.value; // Get the value of the clicked button
        
        // Update score and ball count based on button value
        if (temp >= '1' && temp <= '6') {
            totalScore += parseInt(temp);
            currScore += parseInt(temp);
        }
        if (temp != 'N' && temp != 'W')
            ballCount++;
        if (temp == 'W' || temp == 'N') {
            currScore++;
            totalScore++;
        }
        if (temp == 'O')
            wicket++;

        addBall(temp); // Add ball to the scoreboard

        // Check if team 2 has won
        if (team == 2) {
            if (over == totalOver || team1Score < totalScore || wicket == 10)
                winner();
        }

        // Check if team 1's innings are over
        if (team == 1 && (wicket == 10 || over == totalOver)) {
            team1Score = totalScore;
            newTeam();
        }

        // Start a new over if 6 balls have been bowled
        if (ballCount == 6) {
            newOver();
        }    
    });
}

// Function to add ball to the scoreboard
function addBall(temp) {
    document.getElementById("ball").innerText = "";
    let ball = document.createElement('div');
    ball.innerHTML = temp;
    ball.classList.add("score");
    document.getElementById("scoreBoard").append(ball);
    p.innerHTML = `Team ${team} <br> Current Score: ${totalScore} Runs and ${wicket} wickets`
}

// Function to start a new over
function newOver() {
    over++;
    ballCount = 0;
    disableBtn();
    displayOnOver();
    newOverBtn();
}

// Function to create a new over button
function newOverBtn() {
    let overbtn = document.createElement("button");
    overbtn.innerText = "New Over";
    overbtn.classList.add("balltype");
    document.getElementById("ballBoard").append(overbtn);
    overbtn.addEventListener("click", () => {
        enableBtn();
        overbtn.remove();
    });
}

// Function to display all over runs
function displayOnOver() {
    record.push(currScore);
    currScore = 0;
    let display = document.createElement("h2");
    display.innerText = `Team ${team} Total Score: ${totalScore} runs, Wickets: ${wicket}`;
    display.classList.add("displayRun");
    document.getElementById("overrun").append(display);
    for (let i = 0; i < record.length; i++) {
        let h4 = document.createElement("h4");
        h4.innerText = `Team ${team}, Over ${i+1} : ${record[i]}`;
        h4.classList.add("displayRun");
        document.getElementById("overrun").append(h4);
    }
}

// Function to disable all run buttons
function disableBtn() {
    for (let btn of btns) {
        btn.disabled = true;
        btn.classList.add("disable");
    }
}

// Function to enable all run buttons
function enableBtn() {
    for (let btn of btns) {
        btn.disabled = false;
        btn.classList.remove("disable");
    }
    removeDisplay();
}

// Function to remove all previous content
function removeDisplay() {
    let balls = document.querySelectorAll(".score");
    for (let ball of balls)
        ball.remove();
    let displayRun = document.querySelectorAll(".displayRun");
    for (let dis of displayRun)
        dis.remove();
    document.getElementById("ball").innerText = `Team ${team} is playing...`;
}

// Function to start the game for team 2
function newTeam() {
    removeDisplay();
    disableBtn();
    let h4 = document.querySelector("h4");
    h4.innerText = `Team 1 Score: ${team1Score}`;
    document.getElementById("ball").innerText = `Team ${team} Total Score ${totalScore}, Wicket ${wicket}`;
    newOverBtn();
    over = wicket = currScore = totalScore = ballCount = 0;
    team = 2;
    p.innerHTML = `Team ${team} <br> Current Score: ${totalScore} Runs and ${wicket} wickets`
    while (record.length != 0)
        record.pop();
}

// Function to declare the winner
function winner() {
    disableBtn();
    removeDisplay();
    if (team1Score != totalScore) {
        if (team1Score > totalScore)
            team = 1;
        document.getElementById("ball").innerText = `Team ${team} is Winner by ${Math.abs(totalScore - team1Score)}`;
    } else {
        document.getElementById("ball").innerText = "Match Draw...!";
    }
    resetGame();
}

// Function to reset or restart the game
function resetGame() {
    totalScore = wicket = over = ballCount = team1Score = 0;
    team = 1;
    while (record.length != 0)
        record.pop();
    let h4 = document.querySelector("h4");
    h4.innerText = ``;
    p.innerHTML = `Team ${team} <br> Current Score: ${totalScore} Runs and ${wicket} wickets`;
    let reset = document.createElement("button");
    reset.innerText = "New Game";
    reset.classList.add("balltype");
    document.getElementById("ballBoard").append(reset);
    reset.addEventListener("click", () => {
        enableBtn();
        reset.remove();
    });
}
