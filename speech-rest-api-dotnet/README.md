# TextToSpeechLib

## Development Setup

 - Install NuGet package `Install-Package Google.Cloud.TextToSpeech.V1 -Pre`
 - Download [Google Cloud SDK](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe)
 - export `GOOGLE_APPLICATION_CREDENTIALS` pointing to the credentials JSON

## Deploying

 - `dotnet publish -c release -r ubuntu.18.04-x64 --self-contained`
