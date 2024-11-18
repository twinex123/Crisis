document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('scoreDisplay');

    const gridSize = 20;
    let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    let direction = { x: gridSize, y: 0 };
    let food = { x: gridSize * 10, y: gridSize * 10 };
    let isGameOver = false;
    let score = 0;

    function drawRect(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, gridSize, gridSize);
    }

    function placeFood() {
        food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    }

    function moveSnake() {
        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || 
            snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            isGameOver = true;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = score; 
            placeFood();
        } else {
            snake.pop();
        }
    }

    function drawGame() {
        if (isGameOver) {
            displayGameOver();
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.forEach((segment, index) => drawRect(segment.x, segment.y, index === 0 ? 'green' : 'lime'));

        drawRect(food.x, food.y, 'red');

        moveSnake();
    }

    function displayGameOver() {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over!', canvas.width / 4, canvas.height / 2);
        ctx.fillText(`Score: ${score}`, canvas.width / 3, canvas.height / 2 + 40);
        setTimeout(() => {
            document.location.reload();
        }, 3000); 
    }

    function changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -gridSize };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: gridSize };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -gridSize, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: gridSize, y: 0 };
                break;
        }
    }

    document.addEventListener('keydown', changeDirection);

    setInterval(drawGame, 100);
});
