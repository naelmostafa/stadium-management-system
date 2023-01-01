# Software Engineering final project

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9563849&assignment_repo_type=AssignmentRepo)

## Table of contents

- [TODO](#todo)
- [Stadium management system](#stadium-management-system)
- [Team members](#team-members)
- [User requirements](#user-requirements)
  - [Customer](#customer)
  - [Employee](#employee)
  - [Admin](#admin)
- [System requirements](#system-requirements)
  - [Functional requirements](#functional-requirements)
  - [Non-functional requirements](#non-functional-requirements)
- [Software process](#software-process)
  - [Type of process](#type-of-process)
  - [Division of phases](#division-of-phases)
- [Architecture design](#architecture-design)
  - [System architecture](#system-architecture)
  - [Application architecture](#application-architecture)
- [System modeling](#system-modeling)
  - [Use case diagram](#use-case-diagram)
  - [Class diagram](#class-diagram)
  - [Sequence diagram](#sequence-diagram)
  - [State diagram](#state-diagram)
  - [Activity diagram](#activity-diagram)
- [Design and implementation](#design-and-implementation)
- [Testing](#testing)
  - [Development testing](#development-testing)
  - [Release testing](#release-testing)

## TODO

- [x] Add the project description.
- [x] Add the team members' names and IDs.
- [x] Add the project's description.
- [x] Add the user requirements.
- [x] Add the system requirements.
- [x] Add the software process.
- [ ] Add the architecture design.
  - [ ] Add the system architecture.
  - [ ] Add the application architecture.
- [ ] Add the system modeling.
  - [x] Add the use case diagram.
  - [x] Add the class diagram.
  - [x] Add the sequence diagram.
  - [ ] Add the state diagram.
  - [x] Add the activity diagram.
- [ ] Add the design and implementation.
- [ ] Add the testing.
  - [ ] Development testing.
  - [ ] Release testing.

## Stadium management system

This project is a stadium reservation system for a football club. The system is designed to be used by the club's employees to manage the stadium's reservations and by the club's customers to reserve fields.

## Team members

|Name           |ID     |Handler                                        |
|-              |-      |-                                              |
|Nael Mostafa   |6099   |[naelmostafa](https://github.com/naelmostafa)  |
|Omar Saad      |6317   |[Omar-Saad](https://github.com/Omar-Saad)      |
|Omar Sherif    |6540   |   |

## User requirements

### Customer

- The customer can view the stadium's fields and their availability.
- The customer can reserve a field for a specific time.
- The customer can cancel a reservation.
- The customer can view his reservations.

### Employee

- The employee can do everything a customer can do.
- The employee can view all reservations.
- The employee can view all customers.
- The employee can add a new field.
- The employee can remove a field.
- The employee can add a new customer.
- The employee can remove a customer.

### Admin

- The admin can do everything an employee can do.
- The admin can view all employees.
- The admin can add a new employee.
- The admin can remove an employee.
- The admin can view all admins.

## System requirements

> The system requirements are divided into functional requirements and non-functional requirements.

### Functional requirements

- The system should be able to run on any operating system.
- The system should be able to store the data in a file.
- The system should be able to load the data from a file.
- The system should be able to add a new field.
- The system should be able to remove a field.
- The system should be able to add a new customer.
- The system should be able to remove a customer.
- The system should be able to add a new employee.
- The system should be able to remove an employee.
- The system should be able to add a new admin.
- The system should be able to remove an admin.
- The system should be able to reserve a field.
- The system shouldn't allow a customer to reserve a field that is already reserved.
- The system shouldn't allow a customer to reserve a field that is not available.
- The system should be able to cancel a reservation.
- The system should be able to view all reservations.
- The system should be able to view all customers.
- The system should be able to view all employees.
- The system should be able to view all admins.
- The system should be able to view the stadium's fields and their availability.
- The system should be able to view the customer's reservations.
- The system should be able to calculate the total revenue of the stadium.
- The system should be able to calculate the total revenue of a specific field.

### Non-functional requirements

- The system should be easy to use.
- The system should be secure.
- The system should be fast.
- The system should be reliable.
- The system should be maintainable.
- The system should be testable.

## Software process

### Type of process

The software process that will be used in this project is agile.

### Division of phases

The project will be divided into 3 phases:

- Phase 1: Design and implementation of the system.
- Phase 2: Testing and debugging.
- Phase 3: Maintenance.

## Architecture design

### System architecture

- Choose the system architecture that will be used in the project.

### Application architecture

- Choose the application architecture that will be used in the project.

## System modeling

### Use case diagram

![Use-case](../assets/use-case.jpg)

### Class diagram

![class-diagram](../assets/class-diagram.jpg)

### Sequence diagram

#### Customer sequence diagram

![customer-sequence-diagram](../assets/customer-sequence.jpg)

#### Employee sequence diagram

![admin-sequence-diagram](../assets/admin-sequence.jpg)

### State diagram

- Draw the state diagram of the system.

### Activity diagram

![activity-diagram](../assets/activity-diagram.jpg)

## Design and implementation

- Design the system.
- Implement the system.

## Testing

### Development testing

- Test the system during development.

### Release testing

- Test the system before release.
