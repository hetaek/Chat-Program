//jQuery code that runs after DOM is ready
$(document).ready(function() {
    let i = 0; //index to append the correct parent container for computer messages
    let j = 0; //index to append the correct parent container for user messages
    
    //add computer text in HTML
    let compMessage = (cmessage) => {
        let $parentContainer = $('<div>').addClass('chatbox_message chatbox_message-bot')
        let $childMessage = $('<div>').addClass('messagebubble').text(cmessage);
        let $timeStamp = $('<div>').addClass('timestamp').text(timeStamp());

        $('.chatbox').append($parentContainer)
        $('.chatbox_message-bot').eq(i).append($childMessage, $timeStamp);  
        i++;
    };

    //add user text in HTML
    let userMessage = (umessage) => {
        let $parentContainer = $('<div>').addClass('chatbox_message chatbox_message-user')
        let $childMessage = $('<div>').addClass('messagebubble').text(umessage);
        let $timeStamp = $('<div>').addClass('timestamp').text(timeStamp());

        $('.chatbox').append($parentContainer);
        $('.chatbox_message-user').eq(j).append($childMessage, $timeStamp);  
        j++;
    };

    //welcome statement
    compMessage(`Welcome to ChatterBox! My name is Chatter...Box. Wait really?! I have the same name as the program? Now that's just lazy writing...anyway, what's your name?`);
    
    let wtrigger = true; //trigger to check if the welcome dialog is true
    let ftrigger = true; //trigger to check if the final dialog is true

    //dialog between computer and user happens in here and is dependant on the click event handler
    $(':button').click(function(event) {
        let umessage = $('input:text').val();
                
        userMessage(umessage);
        $('input:text').val('');

        //scrolls down automatically when chatbox view is out of focus 
        $('.chatbox').animate({scrollTop: $('.chatbox')[0].scrollHeight});
        
        //welcome dialog consists of certain responses depending on user's message
        if (wtrigger === true) { 
            if (umessage === '') {
                compMessage(`Oh darn, you saw right through me! I was totally going to steal your name and use it for myself! So how long have you been a detective? I mean...a programmer.`)
            } else if (umessage === 'Skynet') {
                compMessage(`Wait, John Connor is that you? So does this make me Helena Bonham Carter or Matt Smith? This is getting confusing...anyway, how long have you been a programmer?...John.`)
            } else {
                compMessage(`Hmmm...your name sounds much better than ChatterBox. I was thinking of changing it to Skynet, but I guess I'll just take yours...JK! So how long have you been a programmer?`)
            }
        }; 
        
        //main dialog consists of invoking proper response and question depending on user's message 
        if (wtrigger === false) {
            //reloads page in 4 seconds and stops computer's message
            if (ftrigger === false) {
                setTimeout( () => { location.reload(true)}, 4000);
            //final message when question array is empty
            } else if (question.length === 0) {
                compMessage(`Thanks for the answer! Well it was very nice getting to know you, but I believe it's time for me to go now. Not sure where that is...anyway, until next time. Bye!`)
                ftrigger = false;
            } else if (umessage === '') { 
                compMessage(compBlankReply() + compQuestion()); 
            } else {
                compMessage(compReply() + compQuestion()); 
            }   
        };
        
        //change to false since welcome dialog is done
        wtrigger = false;
    });

    //execute click event handler when pressing the enter button by using ASCII code 13
    $('input:text').keypress(function (e) {
        let key = e.which;
        
        if (key === 13) {
            $(':button').click();
        };
    });  
});
    

//find current time
let timeStamp = () => {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let format = '';

    if (hour < 12) {
        format = ' AM';
    } else if (hour > 12) {
        format = ' PM';
        hour = hour - 12;
    } else {
        format = ' PM';
    };

    if (min < 10) {
        min = '0' + min;  
    };

    return hour + ':' + min + format;
};

//an array of computer's responses to user's non blank message
const response = [
    `Hmmm...that's interesting. `,
    `Well that's unexpected. `,
    `Not sure how to respond to that...anyway...`,
    `I might want to change my answer if I were you. `,
    `Hello? Sorry, I didn't get your last text. I think we got cut off. `,
    `Really? Me too! `,
    `Get out of my head! `,
    `I appreciate that answer. `,
    `Good answer my friend...good answer. `,
    `I knew you'd say that. Am I a mind-reader? I should explore that...`
];

//randomly select one of the response above and then delete it
let compReply = () => {
    return response.splice(Math.floor(Math.random() * response.length), 1);
};

//randomly select one of the response
let compBlankReply = () => {
    //an array of computer's responses to user's blank message
    const blankResponse = [
        `Ha ha very funny detective. `,
        `Check your keyboard...I don't think they're working correctly. `,
        `Is your computer working correctly? Try turning your computer off and then back on. `,
        `Oh great, the silent treatment. Anyway...`,
        `So...next question? `
    ];
    
    return blankResponse[Math.floor(Math.random() * blankResponse.length)];
};

//an array of computer's questions
const question = [
    `How are you dealing with the lockdown?`,
    `Are you a computer?`,
    `What are your interests (besides having conversations with a soulless machine)?`,
    `What do you miss about the pre-COVID-19 world?`,
    `What number am I thinking of?`,
    `Would you consider yourself an emotional person?`,
    `What are your favorite languages?`,
    `How would you define the meaning of life?`,
    `What's one thing that made you smile recently?`,
    `Who's your favorite Marvel character?`
];

//randomly select one of the question above and then delete it
let compQuestion = () => {
    return question.splice(Math.floor(Math.random() * question.length), 1);
};
