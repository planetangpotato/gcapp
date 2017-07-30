// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //ADMIN
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
    // controller: 'loginCtrl'
    })

    .state('setup', {
    url: '/setup',
    templateUrl: 'templates/setup.html'
    // controller: 'loginCtrl'
    })


  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        // controller: 'homeCtrl'
      }
    }
  })

  .state('announcement', {
    url: '/announcement',

        templateUrl: 'templates/announcement.html',
        controller: 'department'
    })

  .state('tab.contactus', {
    url: '/contactus',
    views: {
      'tab-contactus': {
        templateUrl: 'templates/contactus.html'
        // controller: 'contactusCtrl'
      }
    }
  })

  .state('addannouncement', {
    url: '/addannouncement',
      templateUrl: 'templates/addannouncement.html'
  })

    .state('edit', {
    url: '/edit',
    templateUrl: 'templates/edit.html'
          // controller: 'loginCtrl'
    })
    .state('edit1', {
    url: '/edit1',
    templateUrl: 'templates/edit1.html'
})
  //user
  .state('usertabs', {
  url: '/usertabs',
  abstract: true,
  templateUrl: 'templates/usertabs.html'
  })

  //
  // .state('api', {
  // url: '/api',
  // templateUrl: 'templates/api.html'
  // })

  .state('userhome', {
  url: '/userhome',
  templateUrl: 'templates/userhome.html'
  })

  .state('userannouncement', {
  url: '/userannouncement',
  templateUrl: 'templates/userannouncement.html',
  controller:'department'
  })


  .state('userlogin', {
  url: '/userlogin',
  templateUrl: 'templates/userlogin.html'
        // controller: 'loginCtrl'
  })

          // controller: 'loginCtrl'


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/setup');
});
