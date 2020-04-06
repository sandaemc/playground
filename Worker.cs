using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SlackApi;

namespace SlackStandup
{
    public class SlackOptions
    {
        public string UserToken { get; set; }
        public string Channel { get; set; }
        public string Message { get; set; }
    }

    public class ScheduleOptions
    {
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Second { get; set; }
    }

    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IConfiguration _configuration;
        private readonly SlackOptions _slackOptions;
        private readonly ScheduleOptions _scheduleOptions;
        private readonly Slack _slack;

        public Worker(ILogger<Worker> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _slackOptions = new SlackOptions();
            _scheduleOptions = new ScheduleOptions();

            _configuration.GetSection("Slack").Bind(_slackOptions);
            _configuration.GetSection("Schedule").Bind(_scheduleOptions);

            _slack = new Slack(_slackOptions.UserToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Service started");
            _logger.LogInformation("{@_scheduleOptions}", _scheduleOptions);

            while (!stoppingToken.IsCancellationRequested)
            {
                var current = DateTime.Now;

                if (current.DayOfWeek == DayOfWeek.Saturday || current.DayOfWeek == DayOfWeek.Sunday)
                {
                    _logger.LogInformation("Not running on weekend");
                    await Task.Delay(24 * 60 * 1000, stoppingToken);
                    continue;
                }


                if (current.Hour == _scheduleOptions.Hour && current.Minute == _scheduleOptions.Minute && current.Second == _scheduleOptions.Second)
                {
                    var json = await _slack.PostAsync(_slackOptions.Channel, _slackOptions.Message);
                    if (!json.Ok)
                    {
                        _logger.LogError(json.Error);
                    }
                    else
                    {
                        _logger.LogInformation("Message posted");
                    }

                    await Task.Delay(1000, stoppingToken);
                    continue;
                }

                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}
