// Class to calculate time between clickDown and clickUp
class ClickTimer {
    constructor(delta = 1000) {
        // Time threshold in milliseconds (default: 1 second)
        this.delta = delta;
        this.start = ''; // Timestamp of clickDown
    }

    clickDown() {
        // Capture the current timestamp when the click starts
        this.start = Date.now();
    }

    clickUp() {
        // Check the difference between now and the start time
        if (this.start === null) {
            throw new Error("clickDown must be called before clickUp.");
        }
        const elapsedTime = Date.now() - this.start;
        this.start = null; // Reset start after calculation
        return elapsedTime >= this.delta; // Return true if delta is reached
    }
}

export default ClickTimer;