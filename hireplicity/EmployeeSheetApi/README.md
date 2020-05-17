# Employee Directory Sheet

Pulls from a Google Sheet and create a json output based on the records.

## Requirements

 - .NET Core 3.1
 - Google API Credential

## Running

 - `dotnet restore`
 - `dotnet run`
 - `dotnet publish --self-contained --runtime linux-x64 -c release /p:PublishSingleFile=true`
