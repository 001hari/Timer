// here i will write what it meant to be a time

class Timer {
	static running = false;
	static totalTime;
    static paused = 0;

	static timer;
	// will not give specific time to set interval insted of it
	// curr time will be derived from total time - curr time

	static getTime() {
		let time = this.totalTime - Date.now();
		if (time > 0) {
			return time;
		} else return 0;
	}

	static start(miliSeconds) {
		if (this.running) return;
		this.running = true;
		this.totalTime = Date.now() + miliSeconds;
		console.log(this.totalTime - Date.now());
		this.timer = setInterval(() => {
			console.log(Math.ceil(this.getTime() / 1000));
			this.stop();
		}, 1000);
	}

	static stop() {
		if (this.totalTime <= Date.now()) {
            clearInterval(this.timer);
            this.running = false;
		}
	}

	//to pause clear the interval but remembe how much time is left
	// time left = total time - date.now()

    static pause() {
        // if not running and paused != 0 then start timer 
        if (!this.running && this.paused !== 0) {
            this.start(this.paused * 1000);
            return;
        }

        this.paused = this.totalTime - Date.now();
        this.running = false;
    }

    static reset() {
        if (!this.running) return;


    }
}

Timer.start(10000);
