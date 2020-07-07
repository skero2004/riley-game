class ItemDescriptions {

    static descriptions = new Map([

        ["AsteroidDust", `Asteroid dusts are rare items which you can only find in the planet of 
                          Diginet! They are mainly used to power the spaceship. From his first 
                          space race, Riley learned that asteroid dusts leak a lot; he now 
                          knows that he should ask Sammy Cyborg for help if it happens again.`],
        ["Battery", `All robots need batteries (maybe except Riley...?)! Batteries are used to 
                     power robots, spaceships, etc. A crucial part of robotics!`],
        ["Gears", `Gears can be used to change torque (power of rotation) and speed (how fast
                   things move). Rumors say that Riley's spaceship broke in his first race
                   because he used all his gears for speed and didn't think about torque...`],
        ["LunarCube", `Lunar cubes are quite rare! Riley has never been to the moon so he's happy
                       that he now has a lunar cube. By the way, lunar cubes must be in line or 
                       else many things can go wrong...`],
        ["Motor", `A motor makes things move. Not sure about you, but if you ask me, I think 
                   movement is important for a robot.`],
        ["NutsAndBolts", `Nuts and bolts are important because they connect the different 
                          pieces of a robot or a spaceship! Riley aspires to make his own
                          spaceship one day.`],
        ["Servo", `Servos are a type of motor that uses error-sensing to make the output
                   achieve the desired effect. It can be used to control speed, position, etc.
                   Riley thinks that by using servos, he can stabilize his spaceship more.`],
        ["StarReceptor", `Wow! A star receptor! One of the rarest items in space! It absorbs
                          energy from stars nearby and uses it to speed up the spaceship.
                          Many space-racers aspire to win this item since it's so rare!
                          Riley is very happy!`],
        ["Wheels", `One might think, "what use are there for wheels if the spaceships are 
                    flying?" Well, they are necessary for landing... and who knows what else 
                    Riley might use them for?`],
        ["Wires", `Ah the key component of electrical engineering. Put wires there, put 
                   wires here. Be careful though! If you touch it, you might get zapped
                   because electricity flows through them!`]

    ]);


    static getDescription(item) {

        return this.descriptions.get(item);

    }

}