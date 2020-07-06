# Auth0ClientNET

Auth0Client library for console type of application.

### Installation

Add this package source url on your nuget.config: https://nuget.pkg.github.com/sandaemc/index.json

`dotnet add package Auth0ClientNET`

### Usage

```
var client = new Auth0Client(new Auth0ClientOptions() {
    Domain = "project.auth0.com",
    ClientId = "12345",
    ClientSecret = "thisIsASecret",
    Audience = "https://project-api.com"
});

var result = await _auth0Client.RegisterDevice();
Console.WriteLine($"Click to verify: {result.VerificationUriComplete}");
Console.WriteLine("Hit enter when verified [enter]:");
Console.Read();

Console.WriteLine("Verifying...");
var loginResponse = await _auth0Client.Login(result.DeviceCode);

// loginResponse.AccessToken,
// loginResponse.RefreshToken
```
