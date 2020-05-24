class Background {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.planets = [];
        this.stars = [];

        this.speedTypes = {

            SLOW: "slow",
            NORMAL: "normal",
            FAST: "fast"

        }

        this.loadTypes = {

            FIRST: "first",
            RUNNING: "running"

        }

    }
    
    createObjects() {

        // Create planets at the beginning
        let rand1 = Math.floor(Math.random() * 2);
        for (let i = 0; i < rand1; i++) {
        
            this.planets.push(new Planet());
        
        }

        // Create stars at the beginning
        let rand2 = 20 + Math.floor(Math.random() * 20);
        for (let i = 0; i < rand2; i++) {
        
            this.stars.push(new Star());
        
        }

    }

    start(game) {

        // Get player
        this.player = game.player;

        // Create next planet time
        this.lastCreatePlanet = 0;
        this.nextPlanetTime = 5000 + Math.random() * 10000;

        // Create next star time
        this.lastCreateStar = 0;
        this.nextStarTime = Math.random() * 150;

        // Set speed to NORMAL
        this.speed = this.speedTypes.NORMAL;
        this.dampener = 0;

        // Initialize planets
        this.planets.forEach(planet => {
        
            planet.init(this, this.loadTypes.FIRST);
        
        });

        // Initialize stars
        this.stars.forEach(star => {

            star.init(this, this.loadTypes.FIRST);
        
        });
    
    }

    setSlow() {

        this.speed = this.speedTypes.SLOW;

    }

    setNormal() {

        this.speed = this.speedTypes.NORMAL;

    }

    setFast() {

        this.speed = this.speedTypes.FAST;
    
    }

    update(deltaTime, timeStamp) {

        // If goaled then dampen speed
        if (this.player.isGoalLineCrossed)
            this.dampener += 1;
        else
            this.dampener = 0;

        // Create new planet at random interval
        if (timeStamp > this.lastCreatePlanet + this.nextPlanetTime && !this.player.isGoalLineCrossed) {

            this.planets.push(new Planet());
            this.planets[this.planets.length - 1].init(this, this.loadTypes.RUNNING);

            this.lastCreatePlanet = timeStamp;
            this.nextPlanetTime = 5000 + Math.random() * 10000;

        }

        // Create new star at random interval
        if (timeStamp > this.lastCreateStar + this.nextStarTime && !this.player.isGoalLineCrossed) {

            this.stars.push(new Star());
            this.stars[this.stars.length - 1].init(this, this.loadTypes.RUNNING);
            
            this.lastCreateStar = timeStamp;
            this.nextStarTime = Math.random() * 150;

        }

        // Update planets
        this.planets.forEach(planet => {

            planet.update(deltaTime);

        });

        // Update stars
        this.stars.forEach(star => {

            star.update(deltaTime);

        });

        // Delete planet when it reaches end
        this.planets.forEach(planet => {

            if (planet.position.x + planet.width / 2 < 0) {

                this.planets.splice(this.planets.indexOf(planet), 1);

            }

        });

        // Delete star when it reaches end
        this.stars.forEach(star => {

            if (star.position.x + star.width / 2 < 0) {

                this.stars.splice(this.stars.indexOf(star), 1);

            }

        });

    }

    draw(ctx) {

        // Draw stars
        this.stars.forEach(star => {

            star.draw(ctx);

        });

        // Draw planets
        this.planets.forEach(planet => {

            planet.draw(ctx);

        });

    }

}