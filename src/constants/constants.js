const checkedInStatus =  (checkedIns)=>{
    let checkedIn=0;
    let pending=0;
    checkedIns.map((item)=>{
        if(item.booking_status==='checked_in'){
            checkedIns++;
        }
        else if(item.booking_status==='pending'){
            pending++;
        }
    })
    return {checkedIn,pending};
}
export const checkedOutStatus =  (checkedOuts)=>{
    let checkedOut=0;
    let pending=0;
    checkedOuts.map((item)=>{
        if(item.booking_status==='check_out'){
            checkedOut++;
        }
        else {
            pending++;
        }
    })
    return {checkedOut,pending};
}


export default checkedInStatus;