## Application Security Model

<p align="center">
  <img src="https://user-images.githubusercontent.com/70578176/208485409-b37d9915-f14d-404d-b1ca-ab57d583de89.png">
</p>

Application security models have several attributes that need to be addressed at each layer of the application. Our application satisfies the following security principles:

### User Management:

The application provides the ability to create, delete, and modificate users, groups, and roles within an identity system support an application. The modifications can include adding or removing attributes(managing permissions), changing passwords, resetting passwords, locking user accounts, adding or deleting group membership, or similar activities.

### Authentication: 
Authentication is the most generic concept that provides your identity to the system and it is a common way  to handle security for all applications.
There are two different ways through which the user is able to prove his identity to the system:
- Cookie based authentication
The client posts the login credential to the server, server verifies the credential and creates session id which is stored in server(state-full) and returned to client via set-cookie. On subsequent request the session id from the cookie is verified in the server and the request get processed. Upon logout session id will be cleared from both client cookie and server.

- Single Sign On that allows a single authentication process managed by a single Identity Provider (in our case Google Sign In)

### Authorization: 
The process of determining if the authenticated identity is allowed to access the requested server resource based upon a predefined authorization policy.
In our case Authorization is coupled with authentication process so that the server knows the user role and credential what restricts the user from performing unintended requests.

### Confidentiality: 
Limiting access to the data to parties that should be allowed to see it in transit or at rest.

### Identity Propagation: 
A mechanism that, ideally, securely transmits an authenticated identity from one system actor to another (think SAML 2.0 Bearer Tokens or JWT tokens).

### The application is resistant to SQL injections and Cross-site scripting when attacker tries to gain access to private information by delivering malicious code to end-users via trusted Web site.
