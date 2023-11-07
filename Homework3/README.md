# Homework 3: Payments

[Instructions](https://github.ncsu.edu/engr-csc342/2023Fall-Course/blob/main/Homework/Homework3.md)

Payments

VM [Form](https://csc342-112.csc.ncsu.edu/hw3)

Changelog:

- email format validation on frontend in static/js/validate.js
- email format validation on backend in server.js
- use toLowerCase() to block stu dent and other variations in capitalization
- revise error page to display err message and redirect payment to stu dent to error.hbs
- update absolute paths to relative paths so that application works as expected on /hw3/ path

Feedback:

```
The email field should check whether the email is in correct format. I think your regular expression just check for @ in the email, so it also allows a@a but ideally it should not. It should also check for domain in email like .com, .edu etc.

I can see that you implemented a check for Stu Dent user; however user Stuart can trick your system by sending the name in different cases since your implementation is not case-sensitive. For instance, names like sTU denT will pass your validation. The easiest way is to use .toLowerCase() or toUpperCase() methods when checking.

I like your UI, it is simple and easy to navigate, just a suggestion to use colors to make it more user centric. Good job on implementing the success page using hbs. I like your code quality.

When I enter any payment directed to Stuart Dent, it should redirect me to the error page but it just shows an alert. 
```
