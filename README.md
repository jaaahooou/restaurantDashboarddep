# React-Python POS for the catering industry

This application is an exercise project aimed at creating mechanics that speed up cashier work. The application does not have any currency exchange mechanics, and there are no plans to add them in the future. To test the application, please send a private message through GitHub.

The project consists of two components: React for the front-end and Python as the backend with a PostgreSQL database.

## Table of Contents

**Front-end**

- [Login](#login)
- [Services](#services)
- [Selection Panel](#selection-panel)

## Login

To log in to the application, use the login and password provided via email or GitHub.

## Services

The front-end is divided into several main sections:

### Service Panel

The selection panel consists of:

- Table Service
- Pending orders
- Menu
- Labors
- Tables

### Product Sales Section

**Table service**
The page consists of several functionalities.

- Room selection panel using buttons
- Table selection panel. The table is selected by clicking the button and entering the number of guests sitting at the table. The application checks if the number of guests does not exceed the maximum number of guests available for the table and suggests a change by highlighting it.
- Occupied tables are available for selection but are marked to indicate their status.
- Transition to the orders panel occurs by selecting the number of guests or clicking on an already occupied table to edit the order.

**Orders Panel**
The panel is divided into two main sections: product display panel and product selection panel.
The product display panel shows:

- Name
- Quantity
- Cost multiplied by the quantity. The cost is determined in Manager activities -> Menu management.

The product selection panel consists of category selection and product selection. Each category has its own color, which can be changed in Manager activities -> Menu management -> Edit.

A category contains dishes whose quantity and values can be changed in Manager activities -> Menu management.

To **add a dish**, click on the button for the dish you want to add to the list. After clicking on the dish, specify the quantity of products added to the list, and then click "Done" to confirm.

You can select multiple products from different categories.

**Order confirmation** is done by clicking the "Set as paid and remove" button.

To **remove a product from the list**, select the product from the list, reduce the value to 0, and then click "Done".

**Manager Activities**
Menu Activities support several key functionalities: displaying, adding, editing, and deleting data.

To add, click the "+ Add Category" button, enter the category name, and select one of the previously prepared colors. The category will be added after confirming with the "Confirm" button.

Editing is similar, except that the "Edit" button is used for editing. Data changes are made after accepting the data with the "Confirm" button.

Adding a dish, user, or table is the same as adding a parent category: category (dish), room.

## Installation

Clone the repository and use `npm install`. The project uses Tailwind CSS as the CSS framework. Material-UI components have been used in the project.

### Environment

The front-end part does not have any .env files or variables.

## Dependencies

    "dependencies": {
    "dependencies": "^0.0.1",
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@fontsource/public-sans": "^4.5.12",
    "@mui/icons-material": "^5.11.0",
    "@mui/joy": "^5.0.0-alpha.66",
    "@mui/material": "^5.11.7",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.3.2",
    "bootstrap": "^5.2.3",
    "jwt-decode": "^3.1.2",
      "react": "^18.2.0",
    "react-bootstrap": "^2.7.1",
    "react-dom": "^18.2.0",
    "react-icons": "^4.8.0",
    "react-if-elseif-else-render": "^1.0.2",
    "react-pro-sidebar": "^1.0.0",
    "react-redux": "^8.0.5",
    "react-router-bootstrap": "^0.26.2",
    "react-router-dom": "^6.8.1",
    "react-scripts": "5.0.1",
    "react-slick": "^0.29.0",
    "redux": "^4.2.1",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^2.4.2",
    "slick-carousel": "^1.8.1",
    "styled-components": "^5.3.9",
    "swiper": "^9.3.2",
    "web-vitals": "^2.1.4"
    },
     "devDependencies": {
    "tailwindcss": "^3.3.2",
    "tailwindcss-animated": "^1.0.1"
     }
