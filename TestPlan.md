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

## 2 - List Employees page
### 2.1 - The page should display all employees

Description : Empty the employees database, add a few employees, and go the to "List Employees" page

Acceptance : Verify that add added employees are visible and that their information is correct

Works : Yes

### 2.2 - The page should redirect to the right actions when clicking the "Edit" and "Delete" buttons

Description : Click on the "Edit" button, then go back to the page and click the "Delete" button

Acceptance : Verify that you are redirected to a page to edit the user, and a page to delete the user

Works : Yes
