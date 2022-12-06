# Test plan

## 1 - Add employees page 
### 1.1 - Insert an employee by filling all the fields

Description : Click on the "Add new employee" link on the main page, then completely fill the form with dummy data, and click on the "Add" button

Acceptance : Click on the "List Employees" link on the main page and check if the employee that has been added is displayed

Works : Yes

### 1.2 - Insert an employee without filling any fields

Description : Click on the "Add new employee" link on the main page, then directly click on the "Add" button

Acceptance : The application refuses to add the empty employee

Works : Yes

### 1.3 - Try to insert an employee but omit one field

Description : Click on the "Add new employee" link on the main page, then completely fill the form with dummy data. Then, for each field, remove its value and click on the "Add" button. Fill the field again, before removing the next one's value. Only the second line of the employee's address can be kept empty.

Acceptance : The application refuses to add the employee

Works : Yes

### 1.4 - The ZIP code field should refuse inputs that are not integers

Description : Try to enter a non integer value into the ZIP code field

Acceptance : The application refuses to accept that value

Works : Yes

### 1.5 - Send a request to the server to add a new user with empty fields

Description : Using some software to make HTTP requests such as Postman, send a POST request to "https://e.hr.dmerej.info/add_employee" with empty fields

Acceptance : The server should refuse the request

Works : Yes

### 1.6 - Send a request to the server to add a new user without correctly filling all the fields

Description : Using some software to make HTTP requests such as Postman, send a POST request to "https://e.hr.dmerej.info/add_employee" with invalid values in the fields

Acceptance : The server should refuse the request

Works : Yes

### 1.7 - Send a request to the server without the CSRF Token

Description : Using some software to make HTTP requests such as Postman, send a valid POST request to "https://e.hr.dmerej.info/add_employee" but without echoing the CSRF token

Acceptance : The server should refuse the request

Works : No, the server acepts the request even when the CSRF token is absent

### 1.8 - Try to use a negative integer for the ZIP Code

Description : Click on the "Add new employee" link on the main page, then completely fill the form with dummy data, set a negative integer for the ZIP code, and click on the "Add" button

Acceptance : The application should refuse to add the user

Works : No, the application accepts a negative ZIP Code

### 1.9 - Ensure the date is parsed as DD/MM/YYYY

Description : Using some software to make HTTP requests such as Postman, send a POST request to "https://e.hr.dmerej.info/add_employee" with a date in the DD/MM/YYYY format

Acceptance : The employee is added with an hiring date in the french format and not the american format (ex : 11/12/2022 = 11 dec 2022 and not 12 nov 2022)

Works : No, if sending a request directly to the server, it is parsed as an american date

### 1.10 - Try to add two emloyees with the same email address

Description : Add two employees that have the same email address

Acceptance : The second insertion should fail as email addresses are supposed to be unique

Works : No, it is possible to create two employees with the same address

## 2 - List Employees page
### 2.1 - The page should display all employees

Description : Empty the employees database, add a few employees, and go the to "List Employees" page

Acceptance : Verify that the added employees are visible and that their information is correct

Works : Yes

### 2.2 - The page should redirect to the right actions when clicking the "Edit" and "Delete" buttons

Description : Click on the "Edit" button, then go back to the page and click the "Delete" button

Acceptance : Verify that you are redirected to a page to edit the user, and a page to delete the user

Works : Yes

## 3 - Edit Employee page
### 3.1 - The page should display the correcy information

Description : Go to edit an employee, and read the displayed information

Acceptance : The information should be correct

Works : Yes

### 3.2 - Update basic information using correct values

Description : Click on "Update basic info", change the name and email adress of the employee, then click on "Update"

Acceptance : The changes are reflected on the employe's detail page

Works : Yes

### 3.3 - Update adress using correct values

Description : Click on "Update address", change the adress of the employee, then click on "Update"

Acceptance : The changes are reflected on the employe's detail page

Works : No, changes to the second line of the address are not saved

### 3.4 - Update adress using a negative ZIP Code

Description : Click on "Update address", change the adress of the employee and specify a negative zip code, then click on "Update"

Acceptance : The changes should be rejected

Works : No, the negative zip code is accepted

### 3.5 - Update contract with correct values

Description : Click on "Update contract", change the job title of the employee, then click on "Update"

Acceptance : The changes are reflected on the employe's detail page

Works : Yes

### 3.6 - Try to change the employee's start date using direct HTTP requests

Description : Using some software to make HTTP requests such as Postman, send a POST request to "https://e.hr.dmerej.info/employee/1/contract" and change the date in the "hiring_date" field

Acceptance : The changes should be rejected

Works : No, the hiring date is changed

### 3.7 - Promote an employee as manager

Description : Click on "Promote as manager", then click on "Proceed"

Acceptance : The changes are reflected on the employe's detail page

Works : Yes

### 3.8 - Add an employee to a team

Description : Click on "Add to team", then choose an existing teams, then click on "Add"

Acceptance : The employee is now listed in the team they were added to

Works : Yes

### 3.9 - Add an employee to a team lists all teams

Description : Click on "Add to team", then click on the selection dropdown

Acceptance : All teams are listed

Works : Yes

### 3.10 - Add an employee to a team removes the employee from their previous team

Description : Choose an employee that is in a team. Click on "Add to team", then choose another team, and click "Add"

Acceptance : The employee is removed from their previous team and added to the new one

Works : Yes

### 3.10 - Try to add an employee to a non-existent team using direct HTTP requests

Description : Using some software to make HTTP requests such as Postman, send a POST request to "https://e.hr.dmerej.info/employee/1/add_to_team" with a non existent team in the "team" field

Acceptance : The server refuses the request

Works : Yes

### 3.11 - Try to edit the email address of an employee so it is the same as another employee

Description : Edit an employee's email address and set it to an address already used by another employee

Acceptance : The edition should fail as email addresses are supposed to be unique

Works : No, it is possible to edit an employe so they have the same address as someone else

## 4 - Delete employee page
### 4.1 - Deleting an employee should remove them from the employee's list

Description : Choose an employee, and click on the delete button, then on "Proceed"

Acceptance : The employee should be removed from the employee's list

Works : Yes

### 4.2 - Deleting an employee should remove them from their team

Description : Choose an employee that is in a team, and click on the delete button, then on "Proceed"

Acceptance : The employee should be removed from their team's list

Works : Yes

## 5 - Team creation
### 5.1 - Create a team with a valid name

Description : On the main page, click on "Create new team". Choose a team name, write it in the field, and click on "Add"

Acceptance : Go to the team list and ensure the new team is there

Works : Yes

### 5.2 - Try to reate a team with a name that already exists

Description : On the main page, click on "Create new team". Choose a team name that already exists, write it in the field, and click on "Add"

Acceptance : The addition should be refused as the name is already taken

Works : Yes

### 5.2 - Try to reate a team with an invalid name

Description : On the main page, click on "Create new team". Choose a team name like ' ' (only a space), write it in the field, and click on "Add"

Acceptance : The addition should be refused as the name is invalid

Works : No, the server crashes instead

## 6 - Team list
### 6.1 - The page should display all teams

Description : Empty the team list, add a few teams, and go the to "List teams" page

Acceptance : Verify that the added teams are visible and that their information is correct

Works : Yes

### 6.2 - The member list should be correct

Description : Add a few employees to a team. Click on "View members" in the team list.

Acceptance : Verify that all the employees that have been added are listed, with the correct information

Works : Yes

### 6.3 - Delete a team

Description : Choose a team. Click on "Delete" and then "Proceed".

Acceptance : The team should be deleted, and all its member removed from it

Works : No, deleting a team with employees in it deletes all employees as well. However, empty teams can be deleted

## 7 - Database reset
### 7.1 - All the data in the database should be deleted

Description : Fill the database with some employees and teams. On the main page, click on "Reset database", then "Proceed"

Acceptance : All the data should be deleted

Works : Yes

### 7.2 - Incrementing IDs should be reset on database deletion

Description : All tables that use autoincrement fields should reset those to their default value when the database is reset. Fill the database with some employees and teams. On the main page, click on "Reset database", then "Proceed". Then add new employees and teams

Acceptance : Check that the new employees and teams added after the deletion have ids that start at 1

Works : No, the new employees' and teams' ids aren't reset
