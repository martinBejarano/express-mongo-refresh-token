# Login/Register server.

Just a simple but usefull server that uses express and JWT (refresh token) to keep sessions.

/register = Body must include email, password and repassword to register. Returns refresh and access token.

/login = Body must include a valid email and password. Returns refresh and access token.

/protected = Protected route, request must include valid token to access information. 

/refresh = Must contain valid refresh tokend to return access token.

/logout = Deletes refresh token.
