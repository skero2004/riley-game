class ItemDescriptions {

    static getDescription(item) {

        return this.descriptions.get(item);

    }

}

ItemDescriptions.descriptions = new Map([

    ["AsteroidDust", `Asteroid dusts are rare items which you can only find in
                      Diginet Planet! They are mainly used to power the spaceship. From his first 
                      space race, Riley learned that asteroid dusts leaks a lot; he now 
                      knows that he should ask Sammy Cyborg for help if it happens again.`],
    ["Battery", `All robots need batteries of a certain kind. (maybe except Riley...?)! Batteries are used to 
                 energy rquired to power robots, spaceships, and much more. It is a crucial part of robotics!`],
    ["Gears", `Gears can be used to change torque (power of rotation), and speed (how fast
               things move). Rumors say that the reason Riley's spaceship broke in his first race is
               because he used all his gears for speed and didn't think about torque...`],
    ["LunarCube", `Lunar cubes are quite rare! Riley has never been to the moon, so he's happy
                   that he now has a lunar cube. By the way, lunar cubes must be in line or 
                   else many things can go wrong...`],
    ["Motor", `A motor makes many mechanisms move to complete a specific task. Not sure if it will help you, but if you ask me, I think 
               movement is important to make a robot properly.`],
    ["NutsAndBolts", `Nuts and bolts are important because they connect the different 
                      pieces of a robot or a spaceship! Riley aspires to make his own
                      spaceship one day.`],
    ["Servo", `Servos are a type of motor that uses error-sensing to make the output
               achieve the desired effect. It can be used to control speed, position, etc.
               Riley thinks that by using servos, he can stabilize his spaceship more and prevent it from
               getting broke in the middle of a race.`],
    ["StarReceptor", `Wow! A star receptor! One of the rarest items in space! It absorbs
                      energy from stars nearby and uses it to speed up the spaceship.
                      Many space-racers aspire to win this item since it's so rare!
                      Riley is very happy to have one!`],
    ["Wheels", `One might think, "What are these wheels used if the spaceships are 
                flying?" Well, they are necessary for landing... and who knows what else 
                Riley might use them for?`],
    ["Wires", `Ah the key component of electrical engineering, tough to orginize properly if you ask me. Put wires there, put 
               wires here. Be careful though! If you touch it while they are powered, you might get zapped.
               Remember electricity flows through them!`]

]);