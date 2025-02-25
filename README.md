# API - Check-in  

## FRs (Functional Requirements)  

- [x] It must be possible to register;  
- [x] It must be possible to authenticate;  
- [x] It must be possible to retrieve the profile of a logged-in user;
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user;  
- [x] It must be possible for the user to retrieve their check-in history;  
- [x] It must be possible for the user to search for nearby gyms;  
- [x] It must be possible for the user to search for gyms by name;  
- [x] It must be possible for the user to check in at a gym;  
- [x] It must be possible to validate a user's check-in;  
- [x] It must be possible to register a gym;  

## BRs (Business Rules)  

- [x ] A user must not be able to register with a duplicate email;  
- [ x] A user must not be able to check in twice on the same day;  
- [ x] A user must not be able to check in unless they are within 100 meters of the gym;  
- [x ] A check-in can only be validated up to 20 minutes after its creation;  
- [ ] A check-in can only be validated by administrators;  
- [ ] A gym can only be registered by administrators;  

## NFRs (Non-Functional Requirements)  

- [x ] The user's password must be encrypted;  
- [x ] The application data must be stored in a PostgreSQL database;  
- [x ] All data lists must be paginated with 20 items per page;  
- [ ] The user must be identified by a JWT;  
