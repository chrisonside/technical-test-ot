'use strict';

function limitNotExceeded(order, item1, limit) {
    let itemCount = 0;
    // Loop through the items in the order, and add to count if you see flagged item
    for ( let item in order ) {
        if ( order.hasOwnProperty(item) && order[item].includes(item1) ) {
            itemCount += 1;
        }
    }
    // Finally see if the limit has been exceeded for that item
    return (limit >= itemCount);
}

function noBannedCombinations(order, item1, item2) {
    let noItem1Ordered = true;
    let noItem2Ordered = true;
    
    for (let item in order) {
        if ( order.hasOwnProperty(item) && order[item].includes(item1) ) {
            noItem1Ordered = false;
        }
        if ( order.hasOwnProperty(item) && order[item].includes(item2) ) {
            noItem2Ordered = false;
        }
    }

    if (!noItem1Ordered && !noItem2Ordered) {
        return false; 
    } else {
        return true;
    }

}

function minimumOrderAchieved(order, item1, item2, option) {
    let item1Present = false;
    let item2Present = false;
    let diner1Count = 0;
    let diner2Count = 0;

    for (let item in order) {
        if ( order.hasOwnProperty(item) ) {

            if ( item == item1 ) {
                item1Present = true;
                diner1Count += 1;
            } else if( item == item2 ) {
                item2Present = true;
                diner2Count += 1;
            } else if( item.includes(option) ) {
                diner1Count += 1;
            } else {
                diner2Count += 1;
            }

        }
    }

    if( item1Present && item2Present && (diner1Count > 1 ) && (diner2Count > 1) ) {
        return true;
    }  else {
        return false;
    }
}

export { limitNotExceeded, noBannedCombinations, minimumOrderAchieved};