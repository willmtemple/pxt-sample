/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.turtle {
    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=90
    //% block
    export function forwardAsync(steps: number) {
        return board().sprite.forwardAsync(steps)
    }

    /**
     * Moves the sprite forward
     * @param direction the direction to turn, eg: Direction.Left
     * @param angle degrees to turn, eg:90
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    export function turnAsync(direction: Direction, angle: number) {
        let b = board();

        if (direction == Direction.Left)
            b.sprite.angle -= angle;
        else
            b.sprite.angle += angle;
        return Promise.delay(400)
    }

    /**
     * Triggers when the turtle bumps a wall
     * @param handler 
     */
    //% blockId=onBump block="on bump"
    export function onBump(handler: RefAction) {
        let b = board();

        b.bus.listen("Turtle", "Bump", handler);
    }
}

namespace pxsim.k12cer {
    /**
     * Maps a range of values to another range
     */
    //% weight=100
    //% blockId=mapBlk block="go from %o1 = number| to %o2 = number| as %inVal = number| goes from %i1 = number| to %i2 = number"
    export function mapBlk(o1 : number, o2 : number, inVal: number, i1 : number, i2: number) {
	let slope = 1.0 * (o2 - o1) / (i2 - i1);
	return o1 + (slope * (inVal - i1));
    }
}

namespace pxsim.loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return Promise.delay(ms)
    }
}

function logMsg(m:string) { console.log(m) }

namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function log(msg:string) {
        logMsg("CONSOLE: " + msg)
        // why doesn't that work?
        board().writeSerial(msg + "\n")
    }
}

namespace pxsim {
    /**
     * A ghost on the screen.
     */
    //%
    export class Sprite {
        /**
         * The X-coordiante
         */
        //%
        public x = 100;
         /**
         * The Y-coordiante
         */
        //%
        public y = 100;
        public angle = 90;
        
        constructor() {
        }
        
        private foobar() {}

        /**
         * Move the thing forward
         */
        //%
        public forwardAsync(steps: number) {
            let deg = this.angle / 180 * Math.PI;
            this.x += Math.cos(deg) * steps * 10;
            this.y += Math.sin(deg) * steps * 10;
            board().updateView();

            if (this.x < 0 || this.y < 0)
                board().bus.queue("TURTLE", "BUMP");

            return Promise.delay(400)
        }
    }
}

namespace pxsim.sprites {
    /**
     * Creates a new sprite
     */
    //% block
    export function createSprite(): Sprite {
        return new Sprite();
    }
}
