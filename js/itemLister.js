class ItemLister {

    update() {

        // Get items
        const items = localStorage.getItem("items").split(",");

        // Unordered list
        const itemList = document.getElementById("itemList");
        
        // If there is less item, refresh
        if (this.lastItemsNumber != items.length) {

            while (itemList.firstChild) {

                itemList.removeChild(itemList.lastChild);

            }

            // Set last number of items
            this.lastItemsNumber = items.length;

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
                    img.src = imgsrc;
                    img.style.backgroundColor = "black";
                    img.style.border = "6px solid blue";
                    img.style.borderRadius = "10px";
                    img.style.position = "absolute";
                    img.style.width = "80px";
                    img.style.height = "80px";
                    img.style.objectFit = "scale-down";

                    // Set up paragraph
                    const p = document.createElement("p");
                    p.innerHTML = text;
                    p.style.textAlign = "center";
                    p.style.fontSize = "40px";
                    p.style.color = "white";
                    p.style.position = "absolute";

                    // Set top position
                    img.style.top = `${-50 + 120 * Math.ceil(itemNumber / 3)}px`;
                    p.style.top = `${-65 + 120 * Math.ceil(itemNumber / 3)}px`;

                    // Set left/right position
                    if (itemNumber % 3 == 1) {

                        img.style.left = "0";
                        p.style.left = "30px"

                    } else if (itemNumber % 3 == 2) {

                        img.style.left = "100px";
                        p.style.left = "130px"

                    } else {

                        img.style.left = "200px";
                        p.style.left = "230px"
                        
                    }

                    // Add the elements
                    itemList.appendChild(div);
                    div.appendChild(img);
                    div.appendChild(p);

                }

                itemNumber++;

            });

        }

    }

}