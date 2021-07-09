var myHour = 9;
var morningOrEvening = ":00am";
var myTime;
var myStoredRecord = [];
var myStoredRecordName = 'my_StoredRecord';

//display the current day
$('#currentDay').text(moment().format("MMM Do, YYYY"));


//display the calender on the page
function showDayScheduler()
{
    for(rowNum=0;rowNum<12;rowNum++)
    {
        myTime = myHour + morningOrEvening;
        $myRowBlock = $("<tr>").addClass("row time-block");
        $myTimeBlock = $("<td>").addClass(" col col-md-2 hour").text(myTime);
        $myTextBlock = $("<textarea>").addClass("col col-md-8 textarea").text("").attr("id",myTime);
        $myButtonBlock = $("<button>").addClass("col col-md-2 save-btn").text("save");
    
        $myRowBlock.append($myTimeBlock,$myTextBlock,$myButtonBlock);
        $("#myTable").append($myRowBlock);
        //display the background color from past, present and future classes
        getTheBackgroundColour(); 
        //get the time blocks for displaying the first column of the table
        getTheTime();
    }
}

function getTheBackgroundColour()
{
    var now = moment();
    var currentHour = moment(myDate).format('h');
    var systemMorningOrEvening = moment(myDate).format('a');
   
    console.log("The current hour is "+currentHour);

    var myDate = new Date();
    
    if(morningOrEvening.substr(3,5) === 'am' && systemMorningOrEvening ==='am')
    {
        console.log("my hour is " + myHour);
        console.log("current hour is " + currentHour);
        if(myHour<currentHour)
        {
            $myRowBlock.addClass("past");
        }
        
        if(myHour===currentHour)
        {
            $myRowBlock.addClass("present");
        }
        
        if(myHour>currentHour)
        {
            $myRowBlock.addClass("future");
        }
    } 
    if(morningOrEvening.substr(3,5) === 'pm' && systemMorningOrEvening ==='pm')
    {
        console.log("pm block");
        console.log("my hour is " + myHour);
        console.log("current hour is " + currentHour);
        if(myHour == currentHour)
        {
            console.log("i am in present block");
            $myRowBlock.addClass("present");
        }
        
        if(myHour === 12 && myHour !== currentHour)
        {
            console.log("i am inside first if");
            $myRowBlock.addClass("past");
        }
        
        if(myHour<currentHour && myHour!==12)
        {
            console.log("i am inside second if");
            $myRowBlock.addClass("past");
        }
        
        if(myHour>currentHour && myHour!==12)
        {
            console.log("i am inside forth if");
            $myRowBlock.addClass("future");
        }
    } 
    if(morningOrEvening.substr(3,5) === 'pm' && systemMorningOrEvening ==='am')
    {
        console.log("pm and am block");
        console.log("my hour is " + myHour);
        console.log("current hour is " + currentHour);
        $myRowBlock.addClass("future");
        $myTextBlock.addClass("future");
    }

    if(morningOrEvening.substr(3,5) === 'am' && systemMorningOrEvening ==='pm')
    {
        console.log("pm and am block");
        console.log("my hour is " + myHour);
        console.log("current hour is " + currentHour);
        $myRowBlock.addClass("past");
    }
    
}

showDayScheduler();
GetStoredBlocks();

function getTheTime()
{
    if (myHour===12)
    {      
    myHour=1;
    }
    else if(myHour === 11)
    {
        morningOrEvening = ":00pm";
        myHour++;
    } else
    {
        myHour++;
    }    
     
} 


$(".save-btn").click(saveData);
//this functions calls when the save button is clicked
function saveData()
{
    console.log("Iam inside data");
    $correspondingTextArea = $($(this).parent().children()[1]);
    textContent = $correspondingTextArea.val();
    textId = $correspondingTextArea.attr("id");
    console.log("value inside the text area is "+textContent+ "id value is "+textId);
    addData(textContent,textId);
}

//add a new record in the local storage
function addData(myText,myId)
{
    console.log("i am in add data");
    myRecord = {
        myRecordText : myText,
        myRecordId : myId
    };

    console.log("The value of my record text is "+myRecord.myRecordText +"and the value of my record id is"+myRecord.myRecordId);
    for(var i = 0; i < myStoredRecord.length; i++)
    {
        if(myStoredRecord[i].myRecordId === myRecord.myRecordId)
        {
            myStoredRecord.splice(i, 1);
            localStorage.setItem(myStoredRecordName, JSON.stringify(myStoredRecord));
            return null;
        }
    }
    myStoredRecord.push(myRecord);
    localStorage.setItem(myStoredRecordName,JSON.stringify(myStoredRecord));
}

//extracting data from local storage and populating it to the text area for their corresponding ids
function GetStoredBlocks()
{
    console.log ("i am in getstoredblocks");
    if(localStorage.getItem(myStoredRecordName))
    {
        myStoredRecord = JSON.parse(localStorage.getItem(myStoredRecordName));
        myStoredRecord.forEach(myRowBlock => {
            textId = "#" + myRowBlock.myRecordId;
            $(document.getElementById(myRowBlock.myRecordId)).val(myRowBlock.myRecordText);
        });
    }
}


