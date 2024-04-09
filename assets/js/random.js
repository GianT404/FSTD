const activities = [
    { text: "listen to music", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D"},
    { text: "take a walk outside. Who doesn't like to go out?" },
    { text: "block crush messages for 3 day ¯\_(ツ)_/¯"},
    { text: "watch a movie" },
    { text: "call a friend",link:"https://voice-room-34.glitch.me/"},
    { text: "play a game", link:"DriftCarGame.html"},
    { text: "practice a hobby" },
    { text: "visit a museum", link:"https://www.google.com/maps/search/museum/@9.7792696,105.6189036,11z/data=!3m1!4b1?hl=vi-VN&entry=ttu"},
    { text: "take a nap" },
    { text: "plan a future trip" ,link:"https://www.google.com/maps/@9.779349,105.6189045,11z?hl=vi-VN&entry=ttu"},
    { text: "do a puzzle",link:"puzzle.html" },
    { text: "donate to me ✍️(◔◡◔)" },
];

// Function to pick a random activity
function getRandomActivity() {
    const randomIndex = Math.floor(Math.random() * activities.length);
    return activities[randomIndex];
}

// Function to display random activity when button is clicked
document.getElementById('randomButton').addEventListener('click', function() {
    const randomActivity = getRandomActivity();
    const activityText = "Why not " + randomActivity.text + "?";
    let activityHTML = activityText;

    // Nếu có liên kết, thêm vào chuỗi HTML
    if (randomActivity.link) {
        activityHTML += "<br><a href='" + randomActivity.link + "' target='_blank'>?</a>";
    }

    document.getElementById('randomActivity').innerHTML = activityHTML;
    if (randomActivity.text === "donate to me ✍️(◔◡◔)") {
        activityHTML += "<br><img src='images/QR.jpg'>";
    }

    document.getElementById('randomActivity').innerHTML = activityHTML;
});

