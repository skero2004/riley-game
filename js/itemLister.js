class ItemLister {

    update() {

        // Get items
        const items = localStorage.getItem("items").split(",");

        // Unordered list
        const ul = document.getElementById("itemList");
        
        // If there is less item, refresh
        if (this.lastItemsNumber > items.length) {

            while (ul.firstChild) {

                ul.removeChild(ul.lastChild);

            }

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

        // Set list
        for (let i = 0; i < items.length; i++) {

            const liName = `${numPerItem.get(items[i])}x ${items[i]}`

            // Check for repeats
            let numRepeats = 0;
            for (let j = 0; j < ul.children.length; j++) {

                if (ul.children[j].innerHTML == liName) numRepeats++;

            }
            
            // Create element only if there is no repeats
            if (numRepeats == 0) {

                // If same item, then add 1
                let isSameItem = false;
                for (let j = 0; j < ul.children.length; j++) {

                    if (ul.children[j].innerHTML.replace(`${numPerItem.get(items[i]) - 1}x `, "") ==
                        items[i]) {

                        ul.children[j].innerHTML = `${numPerItem.get(items[i])}x ${items[i]}`;
                        isSameItem = true;
                    
                    }

                }

                // Add new list only if you have never received the item
                if (!isSameItem) {

                    const li = document.createElement("li");
                    li.innerHTML = liName;
                    ul.appendChild(li);

                }

            }

        }

    }

}