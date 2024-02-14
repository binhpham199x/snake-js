export class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.xDirection = 0;
        this.yDirection = 1;

        this.snakeTail = [{ x: this.x, y: this.y }];
    };

    move() {
        let newRect;

        if (this.xDirection == 1) {
            newRect = {
                x: this.snakeTail[0].x + this.size,
                y: this.snakeTail[0].y
            };
        } else if (this.xDirection == -1) {
            newRect = {
                x: this.snakeTail[0].x - this.size,
                y: this.snakeTail[0].y
            };

        } else if (this.yDirection == 1) {
            newRect = {
                x: this.snakeTail[0].x,
                y: this.snakeTail[0].y + this.size
            };

        } else if (this.yDirection == -1) {
            newRect = {
                x: this.snakeTail[0].x,
                y: this.snakeTail[0].y - this.size
            };
        };
        this.snakeTail.pop();
        this.snakeTail.unshift(newRect);
    };

    turnLeft() {
        if (this.xDirection != 1) {
            this.xDirection = -1;
            this.yDirection = 0;
        }
    };
    turnRight() {
        if (this.xDirection != -1) {
            this.xDirection = 1;
            this.yDirection = 0;
        }
    };
    turnUp() {
        if (this.yDirection != 1) {
            this.xDirection = 0;
            this.yDirection = -1;
        }
    };
    turnDown() {
        if (this.yDirection != -1) {
            this.xDirection = 0;
            this.yDirection = 1;
        }
    };
}