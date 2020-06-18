class TextElement extends GameElement {

    init(canvas) {

        super.init(canvas);

    }

    setText(text) {

        this.text = text;

    }

    setFont(font) {

        this.font = font;

    }

    setColor(color) {

        this.color = color;

    }

    setBorder(width, height) {

        this.width = width;
        this.height = height;

    }

    pulse(seconds, color) {

        // Get pulsed color
        let pulsedColor = color;

        // If pulsedColor not in rgb form, change to rgb
        if (pulsedColor.search("rgb") == -1) {

            pulsedColor = this.getRGB(pulsedColor);

        }

        // Get original color
        let originalColor = this.color;

        // If originalColor not in rgb form, change to rgb
        if (originalColor.search("rgb") == -1) {

            originalColor = this.getRGB(originalColor);

        }
        
        // Separate the RGB values to an array and change each to an Int
        let pulsedColorRGB = pulsedColor.replace("rgb(", "").replace(")", "").replace(/\s/g, '').split(",");
        let originalColorRGB = originalColor.replace("rgb(", "").replace(")", "").replace(/\s/g, '').split(",");
        pulsedColorRGB = pulsedColorRGB.map(value => parseInt(value));
        originalColorRGB = originalColorRGB.map(value => parseInt(value));

        // Calculate differences in RGB
        const rDiff = originalColorRGB[0] - pulsedColorRGB[0];
        const gDiff = originalColorRGB[1] - pulsedColorRGB[1];
        const bDiff = originalColorRGB[2] - pulsedColorRGB[2];

        // RGB values setter
        let r = pulsedColorRGB[0];
        let g = pulsedColorRGB[1];
        let b = pulsedColorRGB[2];

        // Necessary calculations
        const fps = 60;
        const framesInInterval = fps * seconds;
        const interval = setInterval(() => {
            
            // Increase redness
            if (seconds) r += rDiff / framesInInterval; 
            else r = originalColorRGB[0];
            
            // Increase greenness
            if (seconds) g += gDiff / framesInInterval; 
            else g = originalColorRGB[1];
            
            // Increase blueness
            if (seconds) b += bDiff / framesInInterval; 
            else b = originalColorRGB[2];

            // Set color
            this.color = `rgb(${r}, ${g}, ${b})`;
            
            if (((rDiff < 0 && r <= originalColorRGB[0]) || (rDiff > 0 && r >= originalColorRGB[0]) || (rDiff == 0)) &&
                ((gDiff < 0 && g <= originalColorRGB[1]) || (gDiff > 0 && g >= originalColorRGB[1]) || (gDiff == 0)) &&
                ((bDiff < 0 && b <= originalColorRGB[2]) || (bDiff > 0 && b >= originalColorRGB[2]) || (bDiff == 0))) {

                this.color = originalColor;
                clearInterval(interval);
            
            }

        }, 1000 / fps);

    }

    getRGB(color) {

        const div = document.createElement("div");
        div.style.color = color;
        document.body.appendChild(div);
        const rgb = window.getComputedStyle(div).color
        div.remove();
        return rgb;

    }

    update() {

        if (this.width && this.height) {

            // Update border positions
            this.left = this.position.x - this.width / 2;
            this.right = this.position.x + this.width / 2;
            this.top = this.position.y - this.height;
            this.bottom = this.position.y;

        }

        super.update();

    }

    draw(ctx) {

        // If it is visible, then draw
        if (this.alpha > 0) {

            // Set visibility
            ctx.globalAlpha = this.alpha;

            // Set font
            ctx.font = this.font;

            // Set color
            ctx.fillStyle = this.color;

            // Align to center
            ctx.textAlign = "center";

            // Rotate
            ctx.rotate(this.angle * Math.PI / 180);

            // Draw text
            ctx.fillText(this.text, this.position.x, this.position.y);

            // Reset visibility
            ctx.globalAlpha = 1;

        }

    }

}