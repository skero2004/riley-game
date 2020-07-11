class Item extends ImageElement {        

    init(image) {

        this.setPosition(-200, 160);

        this.scaleTo(0, 0);

        this.setImage(image);

        this.rotateBy(0, 180);

        this.name = image.src.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "").replace(/([A-Z])/g, ' $1').trim();

    }

    appear() {

        super.appear(0.5);
        this.scaleTo(0.5, 1);
        this.rotateBy(0.5, 180);

    }

    disappear() {

        super.disappear(0.5);

    }

    storeItem() {

        // Store item to local storage
        if (localStorage.getItem("items") == null)
            localStorage.setItem("items", this.name);
        else {

            let items = localStorage.getItem("items").split(",");

            let numOfThisItem = 0;
            for (let i = 0; i < items.length; i++) {

                if (items[i] == this.name) numOfThisItem++;
                
            }

            if (numOfThisItem < 30) items.push(this.name);

            let newItems;
            for (let i = 0; i < items.length; i++) {

                newItems += items[i] + ",";

            }
            newItems = newItems.replace("undefined", "").slice(0, -1); 

            localStorage.setItem("items", items);

        }

    }

}