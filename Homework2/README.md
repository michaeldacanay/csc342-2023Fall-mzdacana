# Homework 2: Basic Calculator

[Instructions](https://github.ncsu.edu/engr-csc342/2023Fall-Course/blob/main/Homework/Homework2.md)

A basic web-based calculator with computation history, using Javascript, DOM manipulation and event handling.

[Calculator](https://csc342-112.csc.ncsu.edu/calculator.html)


## Change Log

**Revision 1**:  

- Center calculator horizontally on screen and increase font size
- Apply calc-btn class to all buttons, check if the button is a digit, operator, etc. via innerText using single click event handler
- Make cursor a pointer when hovering over history item

**Feedback from Review 1**:  
UI

I think you can do better with the look of your calculator. It's currently smaller than the space available for it. Moreover, It appears unstyled. 

Finding Button elements

Your current approach to finding the button elements is not wrong, but there are better ways to implement this. Consider applying a similar class to all buttons, and then you can grab them with querySelectorAll(class). With this, you can check if the button is a digit or an operator from the innerText property. This prevents the situation where you have to grab individual buttons and apply listeners to them.

Hover on the History List

When the mouse is over an item in the history list, you should make the cursor a pointer. This gives the notion of a clickable element.
