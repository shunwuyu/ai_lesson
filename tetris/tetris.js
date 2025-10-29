class Tetris {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('next-canvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        this.boardWidth = 10;
        this.boardHeight = 20;
        this.blockSize = 30;
        
        this.board = this.createBoard();
        this.currentPiece = null;
        this.nextPiece = null;
        this.gameOver = false;
        this.paused = false;
        
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.dropSpeed = 1000; // 初始下落速度（毫秒）
        
        this.colors = [
            '#FF5252', // 红色
            '#FF9800', // 橙色
            '#FFEB3B', // 黄色
            '#4CAF50', // 绿色
            '#2196F3', // 蓝色
            '#9C27B0', // 紫色
            '#00BCD4'  // 青色
        ];
        
        this.pieces = [
            // I 形
            {
                shape: [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                color: 0
            },
            // O 形
            {
                shape: [
                    [1, 1],
                    [1, 1]
                ],
                color: 1
            },
            // T 形
            {
                shape: [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                color: 2
            },
            // S 形
            {
                shape: [
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0]
                ],
                color: 3
            },
            // Z 形
            {
                shape: [
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0]
                ],
                color: 4
            },
            // J 形
            {
                shape: [
                    [1, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                color: 5
            },
            // L 形
            {
                shape: [
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                color: 6
            }
        ];
        
        this.init();
    }
    
    createBoard() {
        return Array(this.boardHeight).fill().map(() => Array(this.boardWidth).fill(0));
    }
    
    init() {
        this.setupEventListeners();
        this.resetGame();
    }
    
    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('pause-btn').addEventListener('click', () => this.togglePause());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    
    handleKeyPress(e) {
        if (this.gameOver || this.paused) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                this.movePiece(-1, 0);
                break;
            case 'ArrowRight':
                this.movePiece(1, 0);
                break;
            case 'ArrowDown':
                this.movePiece(0, 1);
                break;
            case 'ArrowUp':
                this.rotatePiece();
                break;
            case ' ':
                this.hardDrop();
                break;
            case 'p':
            case 'P':
                this.togglePause();
                break;
        }
    }
    
    getRandomPiece() {
        const randomIndex = Math.floor(Math.random() * this.pieces.length);
        return JSON.parse(JSON.stringify(this.pieces[randomIndex]));
    }
    
    createPiece() {
        const piece = this.nextPiece || this.getRandomPiece();
        this.nextPiece = this.getRandomPiece();
        
        piece.x = Math.floor((this.boardWidth - piece.shape[0].length) / 2);
        piece.y = 0;
        
        return piece;
    }
    
    isValidMove(piece, xOffset = 0, yOffset = 0, newShape = null) {
        const shape = newShape || piece.shape;
        const newX = piece.x + xOffset;
        const newY = piece.y + yOffset;
        
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const boardX = newX + x;
                    const boardY = newY + y;
                    
                    if (boardX < 0 || boardX >= this.boardWidth || 
                        boardY >= this.boardHeight || 
                        (boardY >= 0 && this.board[boardY][boardX])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    movePiece(xOffset, yOffset) {
        if (this.isValidMove(this.currentPiece, xOffset, yOffset)) {
            this.currentPiece.x += xOffset;
            this.currentPiece.y += yOffset;
            this.draw();
            return true;
        }
        return false;
    }
    
    rotatePiece() {
        const shape = this.currentPiece.shape;
        const newShape = [];
        
        // 矩阵转置
        for (let i = 0; i < shape[0].length; i++) {
            newShape[i] = [];
            for (let j = 0; j < shape.length; j++) {
                newShape[i][j] = shape[shape.length - 1 - j][i];
            }
        }
        
        if (this.isValidMove(this.currentPiece, 0, 0, newShape)) {
            this.currentPiece.shape = newShape;
            this.draw();
        }
    }
    
    hardDrop() {
        while (this.movePiece(0, 1)) {}
        this.lockPiece();
    }
    
    lockPiece() {
        const { shape, x, y, color } = this.currentPiece;
        
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const boardY = y + row;
                    const boardX = x + col;
                    
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = color + 1;
                    }
                }
            }
        }
        
        this.clearLines();
        this.currentPiece = this.createPiece();
        
        if (!this.isValidMove(this.currentPiece)) {
            this.gameOver = true;
            alert('游戏结束！最终得分: ' + this.score);
        }
    }
    
    clearLines() {
        let linesCleared = 0;
        
        for (let y = this.boardHeight - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(this.boardWidth).fill(0));
                linesCleared++;
                y++; // 重新检查当前行
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += this.calculateScore(linesCleared);
            this.updateLevel();
            this.updateDisplay();
        }
    }
    
    calculateScore(lines) {
        const baseScore = [0, 40, 100, 300, 1200]; // 0, 1, 2, 3, 4 行消除的分数
        return baseScore[lines] * this.level;
    }
    
    updateLevel() {
        this.level = Math.floor(this.lines / 10) + 1;
        this.dropSpeed = Math.max(100, 1000 - (this.level - 1) * 100);
    }
    
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lines').textContent = this.lines;
    }
    
    draw() {
        // 清空画布
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制已落下的方块
        for (let y = 0; y < this.boardHeight; y++) {
            for (let x = 0; x < this.boardWidth; x++) {
                if (this.board[y][x]) {
                    this.drawBlock(x, y, this.board[y][x] - 1);
                }
            }
        }
        
        // 绘制当前方块
        if (this.currentPiece) {
            const { shape, x, y, color } = this.currentPiece;
            
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col]) {
                        this.drawBlock(x + col, y + row, color);
                    }
                }
            }
        }
        
        // 绘制网格
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x <= this.boardWidth; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.blockSize, 0);
            this.ctx.lineTo(x * this.blockSize, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.boardHeight; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.blockSize);
            this.ctx.lineTo(this.canvas.width, y * this.blockSize);
            this.ctx.stroke();
        }
        
        // 绘制下一个方块预览
        this.drawNextPiece();
    }
    
    drawBlock(x, y, colorIndex) {
        const color = this.colors[colorIndex];
        
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
        
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
        
        // 添加3D效果
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, 3);
        this.ctx.fillRect(x * this.blockSize, y * this.blockSize, 3, this.blockSize);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(x * this.blockSize + this.blockSize - 3, y * this.blockSize, 3, this.blockSize);
        this.ctx.fillRect(x * this.blockSize, y * this.blockSize + this.blockSize - 3, this.blockSize, 3);
    }
    
    drawNextPiece() {
        this.nextCtx.fillStyle = '#1a1a2e';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        if (this.nextPiece) {
            const { shape, color } = this.nextPiece;
            const blockSize = 20;
            const offsetX = (this.nextCanvas.width - shape[0].length * blockSize) / 2;
            const offsetY = (this.nextCanvas.height - shape.length * blockSize) / 2;
            
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col]) {
                        this.nextCtx.fillStyle = this.colors[color];
                        this.nextCtx.fillRect(offsetX + col * blockSize, offsetY + row * blockSize, blockSize, blockSize);
                        
                        this.nextCtx.strokeStyle = '#fff';
                        this.nextCtx.lineWidth = 1;
                        this.nextCtx.strokeRect(offsetX + col * blockSize, offsetY + row * blockSize, blockSize, blockSize);
                    }
                }
            }
        }
    }
    
    gameLoop() {
        if (this.gameOver || this.paused) return;
        
        if (!this.movePiece(0, 1)) {
            this.lockPiece();
        }
        
        this.draw();
        
        setTimeout(() => this.gameLoop(), this.dropSpeed);
    }
    
    startGame() {
        if (this.gameOver) {
            this.resetGame();
        }
        
        this.paused = false;
        document.getElementById('pause-btn').textContent = '暂停';
        this.gameLoop();
    }
    
    togglePause() {
        this.paused = !this.paused;
        document.getElementById('pause-btn').textContent = this.paused ? '继续' : '暂停';
        
        if (!this.paused && !this.gameOver) {
            this.gameLoop();
        }
    }
    
    resetGame() {
        this.board = this.createBoard();
        this.currentPiece = this.createPiece();
        this.nextPiece = this.getRandomPiece();
        this.gameOver = false;
        this.paused = false;
        
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.dropSpeed = 1000;
        
        this.updateDisplay();
        this.draw();
        
        document.getElementById('pause-btn').textContent = '暂停';
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new Tetris();
});