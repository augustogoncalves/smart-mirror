function Greeting($scope, $http, $interval) {

  var greetingUpdater = function () {
    if (config.greeting.option == 'time') {
      var hour = moment().hour();
      var greetingTime = "random";

      if (hour > 7 && hour < 10) {
        greetingTime = "morning";
      } else if (hour >= 11 && hour <= 13) {
        greetingTime = "midday"
      } else if (hour > 18 && hour < 22) {
        greetingTime = "evening";
      } else if (hour >= 22 && hour <= 23) {
        greetingTime = "night";
      }
      var nextIndex = Math.floor(Math.random() * config.greeting[greetingTime].length);
      var nextGreeting = config.greeting[greetingTime][nextIndex]
      $scope.greeting = nextGreeting;
    } else if (config.greeting.allDay) {
      $scope.greeting = config.greeting.allDay[Math.floor(Math.random() * config.greeting.allDay.length)];
    }
  };

  if (typeof config.greeting !== 'undefined') {
    greetingUpdater();
    $interval(greetingUpdater, config.greeting.refreshInterval * 60000 || 3600000)
  }
}

angular.module('SmartMirror')
  .controller('Greeting', Greeting);