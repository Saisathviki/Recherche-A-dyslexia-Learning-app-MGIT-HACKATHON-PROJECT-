document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Define an array of letters to be traced
    const letters = ['A', 'B', 'C', 'D', 'E']; // Add more letters as needed
    let currentLetterIndex = 0;
    let targetLetter = letters[currentLetterIndex];

    // Variables to keep track of mouse movement
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Function to start drawing
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Function to draw when mouse moves
    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Function to stop drawing
    function stopDrawing() {
        isDrawing = false;
        checkLetter();
    }

    // Function to check if the traced letter matches the target letter
    function checkLetter() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const threshold = 100; // Adjust threshold as needed

        let matchCount = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            const red = pixels[i];
            const green = pixels[i + 1];
            const blue = pixels[i + 2];

            // Calculate brightness (average of RGB values)
            const brightness = (red + green + blue) / 3;

            if (brightness < threshold) {
                matchCount++;
            }
        }

        // Calculate percentage of matched pixels
        const totalPixels = canvas.width * canvas.height;
        const matchPercentage = (matchCount / totalPixels) * 100;

        // If match percentage is above a threshold, consider the letter correctly traced
        const matchThreshold = 90; // Adjust match threshold as needed
        if (matchPercentage >= matchThreshold) {
            alert('Correct! Next letter: ' + getNextLetter());
            clearCanvas();
        }
    }

    // Function to get the next letter to be traced
    function getNextLetter() {
        currentLetterIndex++;
        if (currentLetterIndex >= letters.length) {
            currentLetterIndex = 0; // Wrap around to the first letter
        }
        targetLetter = letters[currentLetterIndex];
        return targetLetter;
    }

    // Clear canvas function
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(targetLetter, 50, 100);
    }

    // Display the initial letter to be traced
    ctx.font = '80px Arial';
    ctx.fillText(targetLetter, 50, 100);

    // Event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
});
