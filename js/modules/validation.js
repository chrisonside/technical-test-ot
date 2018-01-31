
function limitNotExceeded(order, item, limit) {
    let itemCount = 0;
    // Loop through the items in the order, and add to count if you see flagged item
    for ( let dish in order ) {
        if ( order.hasOwnProperty(dish) && order[dish].includes(item) ) {
            itemCount += 1;
        }
    }
    // Finally see if the limit has been exceeded for that item
    return (limit >= itemCount);
}

function noBannedCombinations(order, item1, item2) {
    let noItem1Ordered = true;
    let noItem2Ordered = true;
    
    for (let dish in order) {
        if ( order.hasOwnProperty(dish) && order[dish].includes(item1) ) {
            noItem1Ordered = false;
        }
        if ( order.hasOwnProperty(dish) && order[dish].includes(item2) ) {
            noItem2Ordered = false;
        }
    }

    if (!noItem1Ordered && !noItem2Ordered) {
        return false; 
    } else {
        return true;
    }

}

export { limitNotExceeded, noBannedCombinations};