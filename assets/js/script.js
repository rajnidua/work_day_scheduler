var myHour = 1;
var morningOrEvening = ":00am";
var timeAfter12 = 1;
var timeBefore12 =1;
var myTime;
var myStoredRecord = [];
var myStoredRecordName = 'my_StoredRecord';

$('#currentDay').text(moment());

function showDayScheduler(){
for(rowNum=0;rowNum<24;rowNum++){

    
    myTime = myHour + morningOrEvening;
    var now = moment();
    var currentHour = now.hour();
    //var currentHour = 1;
    var systemMorningOrEvening = moment(myDate).format('a');
    //var systemMorningOrEvening = 'am';
console.log(currentHour);


    $myRowBlock = $("<tr>").addClass("row time-block");
    $myTimeBlock = $("<td>").addClass(" col col-md-2 hour").text(myTime);
    $myTextBlock = $("<textarea>").addClass("col col-md-8 textarea").text("").attr("id",myTime);
    $myButtonBlock = $("<button>").addClass("col col-md-2 save-btn").text("save");
    var myDate = new Date();
    console.log("console in "+moment(myDate).format('h a'));
    console.log("fff"+morningOrEvening.substr(3,5)+"jjjj"+systemMorningOrEvening);
    if(morningOrEvening.substr(3,5) === 'am' && systemMorningOrEvening ==='am'){
        console.log("one "+morningOrEvening + systemMorningOrEvening);
        if(myHour<currentHour){
            $myRowBlock.addClass("past");
        }else if(myHour===currentHour){
            $myRowBlock.addClass("present");
        }
        else{
            $myRowBlock.addClass("future");
        }
    } 
    if(morningOrEvening.substr(3,5) === 'pm' && systemMorningOrEvening ==='pm'){
        console.log("two "+morningOrEvening + systemMorningOrEvening);
        if(myHour<currentHour){
            $myRowBlock.addClass("past");
        }else if(myHour===currentHour){
            $myRowBlock.addClass("present");
        }
        else{
            $myRowBlock.addClass("future");
        }
    } 
    if(morningOrEvening.substr(3,5) === 'pm' && systemMorningOrEvening ==='am'){
        console.log("three "+morningOrEvening + systemMorningOrEvening);
        $myRowBlock.addClass("future");
        $myTextBlock.addClass("future");
    }

    if(morningOrEvening.substr(3,5) === 'am' && systemMorningOrEvening ==='pm'){
        console.log("four "+morningOrEvening + systemMorningOrEvening);
        $myRowBlock.addClass("past");
    }
    
    
    $myRowBlock.append($myTimeBlock,$myTextBlock,$myButtonBlock);
    
$("#myTable").append($myRowBlock);
getTheTime();
console.log("time created");
console.log(moment().toDate());
var now = moment();
var currentHour = now.hour();
console.log(currentHour);
var time = now.hour() + ':00';
var testTime ="2:00am";
time = time + ((now.hour()) >= 12 ? 'pm' : ' am');
console.log("the time is"+time);

 }
}

showDayScheduler();
GetStoredBlocks();

function getTheTime(){
if (myHour===12){
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

//console.log("i am here"+ $(".save-btn")) ;
$(".save-btn").click(saveData);

function saveData(){
    console.log("Iam inside data");
    $correspondingTextArea = $($(this).parent().children()[1]);
    textContent = $correspondingTextArea.val();
    textId = $correspondingTextArea.attr("id");
    console.log("value inside the text area is "+textContent+ "id value is "+textId);

    addData(textContent,textId);

}

function addData(myText,myId){
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


function GetStoredBlocks()
{
   console.log ("i am in getstoredblocks");
    if(localStorage.getItem(myStoredRecordName))
    {
        myStoredRecord = JSON.parse(localStorage.getItem(myStoredRecordName));

        myStoredRecord.forEach(myRowBlock => {
           
            textId = "#" + myRowBlock.myRecordId;

             $(document.getElementById(myRowBlock.myRecordId)).val(myRowBlock.myRecordText);

           // $myTextBlock.val(myRowBlock.myRecordText);

          //  $myTextBlock = $(($myRowBlock).children()[1])
            
//            $iLock.toggleClass("unlocked");

        });

    }

}


/* function renderSavedData(){
    if(localStorage.getItem(myStoredRecordName)){
        myStoredRecord = JSON.parse(localStorage.getItem(myStoredRecordName))
        myStoredRecord.forEach(myRowBlock => {
            textId =  "#"+myRowBlock.myRecordId;
                console.log("so my new id is "+textId);
                textContent = myRowBlock.myRecordText;
                console.log(textContent);
               $(( ($myRowBlock).children()[1])).attr("id",myRowBlock.myRecordId).val =textContent;
               console.log(($myRowBlock).children()[1]); */
                //$myTextBlock.attr("id",textId).text(textContent);
//$myTextBlock = $(document.getElementById(textId)).text(myTextBlock.innerHTML);
//console.log($myTextBlock);
           /*  console.log("My latest row is"+$myRowBlock);
           // $myTextBlock.val(myRecordText);
           $myTextArea.val(myRowBlock.myRecordText);
            console.log("My text value should be"+myRowBlock.myRecordText);
           // console.log("text inside is "+$myTextArea.val());
            textContent = myRowBlock.myRecordText;
            //$iLock = $(($myRowBlock).parent().children().children()[1])
           $($(myRowBlock).children()[1]).val =textContent;
            
            console.log($myRowBlock.attr("background-color:red;"));
            //$iLock.toggleClass("unlocked"); */

            
  /*       });
    }
} */

 

