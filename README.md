# Riddle-me-this

The main objective of this homework was to make a quiz from scratch.
This homework was quite difficult since everything had to be written.

Within the index.html:
    *It was mainly used to make the class and ID tags in order to code with javascript.

Withing the Style.CSS:
    *I focused on the CSS last in order to make sure that the javascript and index.html would launch properly.
    Once the codes worked properly with zero errors is when I would make the changes to the style of the layout.

Within the Script.JS:
    *This is where majority of what the web page displays comes from. The first few lines of code I made sure to focus
    on first were the timer, the questions, and the buttons.
        -This is because what I wanted to make sure is that when the user clicks on the button to start the game, it 
        would display the questions and answers, along with the timer counting down by 1 second.

    *After I saw that the questions would display, I wanted to focus next on when the user clicks on an answer, the next
    question and answers would appear, along with if the user gets the question incorrect, the timer would reduce by
    10 seconds.

    *Once the questions and answers were all taken care of, my next focus was to allow the user to submit their name and
    their score.
        -one of the issues I came across was when the user finished answering questions, the score would consistently
        pop up 0.
            >This was taken care of by using the if statement of timer <= 0 instead of timer === 0.
            This is because the timer could jump past 0 seconds if the user were to get a question incorrect when 9
            seconds or less remained.


There were no images included in this homework, mainly because it is one of my flaws when coding. I cannot seem to
position it properly.

Deployed URL: https://kims1998.github.io/Riddle-me-this/
GitHub Repository: https://github.com/kims1998/Riddle-me-this

Screenshots of deployed URL:

Screen when URL is opened:
    file:///C:/Users/hocol/OneDrive/Desktop/CODING/Homework/Riddle-me-this/Img/front%20page.JPG

Screen when user clicks start:
    file:///C:/Users/hocol/OneDrive/Desktop/CODING/Homework/Riddle-me-this/Img/first%20question%20timer%20down.JPG

Screen when user completes the quiz or time runs out:
    file:///C:/Users/hocol/OneDrive/Desktop/CODING/Homework/Riddle-me-this/Img/End%20page.JPG