using System;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Text.Json;
using System.Text;
using FirebaseAdmin;

namespace EmployeeDirectorySheet
{
    class Program
    {
        static string[] Scopes = { SheetsService.Scope.SpreadsheetsReadonly };
        static string ApplicationName = "Employee Directory Sheet";

        static void Main(string[] args)
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.GetApplicationDefault(),
            });

            UserCredential credential;

            using (var stream =
                new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                // The file token.json stores the user's access and refresh tokens, and is created
                // automatically when the authorization flow completes for the first time.
                string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
            }

            // Create Google Sheets API service.
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            // Define request parameters.
            String spreadsheetId = "1t2ujZRMnGpT0l9nHrgwl4GfTT8jqnG90MX80DBWKtKI";
            String range = "Sheet1!A2:L76";
            SpreadsheetsResource.ValuesResource.GetRequest request =
                    service.Spreadsheets.Values.Get(spreadsheetId, range);

            ValueRange response = request.Execute();
            IList<IList<Object>> values = response.Values;
            var employees = new List<Employee>();

            if (values != null && values.Count > 0)
            {
                foreach (var row in values)
                {
                    employees.Add(new Employee
                    {
                        Name = row[0].ToString(),
                        Email = row[2].ToString(),
                        Phone = row[3].ToString(),
                        Address = row[7].ToString()
                    });
                }
            }


            using (FileStream fs = File.Create("output.json"))
            {
                var json = JsonSerializer.Serialize(employees, options: new JsonSerializerOptions { WriteIndented = true });
                byte[] info = new UTF8Encoding(true).GetBytes(json);
                fs.Write(info, 0, info.Length);
            }

        }
    }
}
