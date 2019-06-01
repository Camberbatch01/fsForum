import React from 'react';

const postDayTime = (postDate, dateNow) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utcD1 = Date.UTC(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
    const utcD2 = Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
    const ans = Math.floor((utcD2 - utcD1) / msPerDay);

    if (ans === 0) {
        if (postDate.getUTCHours() < dateNow.getUTCHours()){    //if hours greater but minutes not then not truly an hour
            if (postDate.getUTCMinutes() <= dateNow.getUTCMinutes()){    //eg. 12:50, 13:10
                return `${dateNow.getUTCHours() - postDate.getUTCHours()}hr ago`;
            }   //check if actually an hour difference in minutes
            if (dateNow.getUTCHours() - postDate.getUTCHours() === 1){
                if (postDate.getUTCMinutes() > dateNow.getUTCMinutes()){
                    return `${60 - (postDate.getUTCMinutes() - dateNow.getUTCMinutes())}m ago`
                }
            }
            return `${(dateNow.getUTCHours() - postDate.getUTCHours()) - 1}hr ago`
        }
        return `${dateNow.getUTCMinutes() - postDate.getUTCMinutes()}m ago`
    } else {
        return `${ans}d ago`
    }
}

export default postDayTime;