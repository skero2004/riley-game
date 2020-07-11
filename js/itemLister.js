class ItemLister {

    constructor(canvases) {

        this.canvases = canvases;

        this.chosenItem = "";

    }

    update() {

        // Set item description
        const itemDescription = document.getElementById("itemDescription");
        const canvases = document.getElementById("canvases");
        itemDescription.style.width = `${canvases.offsetLeft - canvases.clientLeft - 20}px`;

        if (localStorage.getItem("items")) {

            // Get items
            const items = localStorage.getItem("items").split(",");

            // Get item list element
            const itemList = document.getElementById("itemList");
            
            // Calculate number of items on the side
            const canvasLeft = this.canvases.offsetLeft - this.canvases.clientLeft;

            let numItemsSide = 1;
            let imgFarRight = 100 * numItemsSide;
            while (imgFarRight < canvasLeft) {

                numItemsSide++;
                imgFarRight = 100 * numItemsSide;

            }
            if (numItemsSide > 1) numItemsSide--;

            // Only refresh if there is less or more items than before
            if (this.lastItemsNumber != items.length || this.lastNumItemsSide != numItemsSide) {

                while (itemList.firstChild) {

                    itemList.removeChild(itemList.lastChild);

                }

                // Set last number of items
                this.lastItemsNumber = items.length;

                // Set last number of items horizontally
                this.lastNumItemsSide = numItemsSide;

                // Key: name of item, value: number of that item
                const numPerItem = new Map();
                for (let i = 0; i < items.length; i++) {

                    // Calculate how many of this item exists
                    let numItem = 0;
                    for (let j = 0; j < items.length; j++) {

                        if (items[i] == items[j]) numItem++;

                    }
                    numPerItem.set(items[i], numItem);

                }

                let itemNumber = 1;
                numPerItem.forEach((value, key, map) => {

                    // Check for repeats
                    let numRepeats = 0;
                    for (let i = 0; i < itemList.childElementCount; i++) {

                        if (itemList.children[i].getElementsByTagName("p")[0].innerHTML == key)
                            numRepeats++;

                    }

                    // Create new element only if no repeats
                    if (numRepeats == 0) {

                        // Set image source and text
                        const imgsrc = "assets/images/items/" + key.replace(/\s/g,'', "") + ".png";
                        const text = value + "x";

                        // Set up div
                        const div = document.createElement("div");
                        div.style.position = "relative";

                        // Set up image
                        const img = document.createElement("img");
                        const imgDiv = document.createElement("div");
                        img.src = imgsrc;
                        imgDiv.style.backgroundColor = "black";
                        imgDiv.style.borderRadius = "10px";
                        imgDiv.style.position = "absolute";
                        imgDiv.style.width = "80px";
                        imgDiv.style.height = "80px";
                        img.style.objectFit = "scale-down";
                        img.style.width = "80px";
                        img.style.height = "80px";
                        img.style.position = "relative";

                        // Set up paragraph
                        const p = document.createElement("p");
                        p.innerHTML = text;
                        p.style.textAlign = "center";
                        p.style.font = "30px SpaceAge";
                        p.style.color = "white";
                        p.style.position = "absolute";

                        // Set top position
                        imgDiv.style.top = `${-55 + 110 * Math.ceil(itemNumber / numItemsSide)}px`;
                        p.style.top = `${-55 + 110 * Math.ceil(itemNumber / numItemsSide)}px`;

                        // Set left/right position
                        imgDiv.style.left = `${100 * ((itemNumber - 1) % numItemsSide)}px`;
                        p.style.left = `${25 + 100 * ((itemNumber - 1) % numItemsSide)}px`
                        
                        // Add the elements
                        itemList.appendChild(div);
                        div.appendChild(imgDiv);
                        imgDiv.appendChild(img);
                        div.appendChild(p);

                    }

                    itemNumber++;

                });

            }

            // Select image
            for (let i = 0; i < itemList.children.length; i++) {
                
                const imgDiv = itemList.children[i].getElementsByTagName("div")[0];
                const img = imgDiv.getElementsByTagName("img")[0];
                if (this.chosenItem == img.src.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "").replace(/([A-Z])/g, ' $1').trim()) 
                    imgDiv.style.border = "6px solid orangered";
                else imgDiv.style.border = "6px solid blue";
                
            }

        }

    }

}