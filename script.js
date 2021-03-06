$(init);

// dynamic display of date and time at the top of the page
function init(){
    $("#currentDay").text(moment().format("dddd,MMMM Do YYYY, H:mm"));

// Timeblocks to be checked every minute for colour updates
timeBlocks();
setInterval (timeBlocks,60000);

// Timeblocks to be updated and loaded with saved data in local storage
$(".time-block").each(function(){
    var blockId= $(this).attr("id");
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DD MM YYYY") + blockId));
});

// Handler for save button
$(".saveBtn").on("click",handleSave);
}

function timeBlocks(){

    $(".time-block").each(function(){
        var blockTime= parseInt($(this).attr("id").replace("hour-", ""));
        var currentTime= parseInt(moment().format("H"));

        $(this).removeClass("past", "present", "future");

        if (blockTime < currentTime) {
            $(this).addClass("past");
        } else if (blockTime > currentTime){
            $(this).addClass("future");
        } else {
            $(this).addClass("present");
        }
    
    });
}

function handleSave(event){
    var hourId=$(this).parent().attr("id");
    localStorage.setItem(moment().format("DD MM YYYY")+ hourId, $("#" + hourId + " textarea").val());
}