class Background {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.planets = [];
        this.lastCreatePlanet = 0;
        this.nextPlanetTime = 5000 + Math.random() * 10000;

        this.stars = [];
        this.lastCreateStar = 0;
        this.nextStarTime = Math.random() * 150;

        this.speedTypes = {

            SLOW: "slow",
            NORMAL: "normal",
            FAST: "fast"

        }
        this.speed = this.speedTypes.NORMAL;

    }
    
    start() {

        // Create planets at the beginning
        let rand1 = Math.floor(Math.random() * 2);
        for (let i = 0; i < rand1; i++) {

            this.planets.push(new Planet(this));

        }
        this.planets.forEach(planet => {

            planet.setRandomImage();
            planet.setFirstPosition();

        });

        // Create stars at the beginning
        let rand2 = 20 + Math.floor(Math.random() * 20);
        for (let i = 0; i < rand2; i++) {

            this.stars.push(new Star(this));

        }
        this.stars.forEach(star => {

            star.setFirstPosition();

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

        // Create new planet at random interval
        if (timeStamp > this.lastCreatePlanet + this.nextPlanetTime) {

            this.planets.push(new Planet(this));
            this.planets[this.planets.length - 1].setRandomImage();
            this.planets[this.planets.length - 1].setPosition();

            this.lastCreatePlanet = timeStamp;
            this.nextPlanetTime = 5000 + Math.random() * 10000;

        }

        // Create new star at random interval
        if (timeStamp > this.lastCreateStar + this.nextStarTime) {

            this.stars.push(new Star(this));

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
        
        // Clear the screen
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

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