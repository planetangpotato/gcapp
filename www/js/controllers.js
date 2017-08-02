angular.module('starter.controllers', [])

.controller('setup',function($scope,$state){

  $scope.set = function(){
    var a = document.getElementById('server').value;
    if(a == ""){
      $scope.seterror = 'Please input server';
    }else{
      localStorage.setItem('server',a);
      $state.go('login');
    }
  }

})

////login
.controller('login', function ($scope, $http, $state, $ionicHistory ){
    $scope.changelogin = function(){
      $state.go('userlogin')
    }
    $scope.loginform = function(){
        var username = $scope.username;
        var password = $scope.password;

        console.log(username + " " + password);

        $http.defaults.headers.post['Content-Type'] = 'applicaation/x-www-form-urlencoded; charset=UTF-8';
        $http({
            url: 'https://renzo-baranda.000webhostapp.com/login.php',
            method: "POST",
            data:{
                'username' : username,
                'password' : password

            }
            })
        .then(function(response){
            console.log(response);
            var data = response.data[0];
            console.log(data);
            if(data != "Account Doesn't exist!"){
                $scope.username = '';
                $scope.password = '';
                $state.go('tab.home');
                localStorage.setItem("name", data);

            }else{
                $scope.error = data;
                $scope.password = '';
            }
        },
        function(response){
            console.log('Error');
        });
      }
    })
    // .controller('userlogin', function ($scope, $http, $state, $ionicHistory ){
    //     $scope.changetouser = function(){
    //       $state.go('login')
    //     }
    //     $scope.userloginform = function(){
    //         var username = $scope.username;
    //         var password = $scope.password;
    //
    //         console.log(username + " " + password);
    //
    //         $http.defaults.headers.post['Content-Type'] = 'applicaation/x-www-form-urlencoded; charset=UTF-8';
    //         $http({
    //             url: 'http://'+localStorage.getItem('server')+'/gcapp1/admin/www/php/userlogin.php',
    //             method: "POST",
    //             data:{
    //                 'username' : username,
    //                 'password' : password
    //             }
    //             })
    //         .then(function(response){
    //             console.log(response);
    //             var data = response.data[0];
    //             // console.log(data);
    //             if(data != "Account Doesn't exist!"){
    //                 $scope.username = '';
    //                 $scope.password = '';
    //                 $state.go('usertabs.userhome');
    //                 localStorage.setItem("name", data);
    //
    //             }else{
    //                 $scope.error = data;
    //                 $scope.password = '';
    //             }
    //         },
    //         function(response){
    //             console.log('Error');
    //         });
    //       }
    //     })

//ADD
.controller('TodoController', function($scope,$http,$state) {
    $scope.add = function(){
      var description = document.getElementById('description').value;
      var name = document.getElementById('name').value;
      console.log(name);
      $http({
        url:"https://renzo-baranda.000webhostapp.com/add.php",
        method:"POST",
        data:{
          'add':name,
          'adddescription':description
        }
      })
    .then(function(response){
      console.log(response);
      document.getElementById('name').value="";
      document.getElementById('description').value="";
      $state.go('announcement');

    })
  };

})

// edit
  .controller('edit',function($scope,$http,$state){
    $scope.$on('$ionicView.beforeEnter',function(){
      $scope.editlabel = "";
    console.log('wsadsad');
    var a = JSON.parse(localStorage.getItem('detailsa'));
    console.log(a);
    document.getElementById('ename').value = a[1];
    document.getElementById('edescription').value = a[2];

    })

    $scope.submitedit = function(){
      var a = JSON.parse(localStorage.getItem('detailsa'));
      var name = document.getElementById('ename').value;
      var desc = document.getElementById('edescription').value;
      var id = a[0];
      if(name == "" || desc == ""){
        $scope.editlabel = "Please complete the form";
      }else{
        $http({
          url:"https://renzo-baranda.000webhostapp.com/edit.php",
          method:"POST",
          data:{
            'add':name,
            'adddescription':desc,
            'id':id
          }
        })
      .then(function(response){
        // console.log(response);
        $scope.editlabel = "Edit Successfully!";

      })
      }
    }

  })

//GET
  .controller('department', function($scope,$http,$state){
    $scope.$on('$ionicView.beforeEnter',function(){

    $http({
      url:"http://api.openweathermap.org/data/2.5/weather?id=1697175&units=metric&APPID=d02485068a2975f35eb51b2323cbf239",
      method:"GET"
    })

  .then(function(response){

    console.log(response['data']['main']['temp']);
    $scope.temp = response['data']['main']['temp'];
  });

    $http({
      url:"https://renzo-baranda.000webhostapp.com/getdata.php",
      method:"GET"
    })

  .then(function(response){

    console.log(response['data']);
    $scope.announcementlist = response['data'];
  });
    })

//speak
$scope.speak = function(name,desc){
  var content1 = 'Title '+name+' Details '+desc;
  console.log(content1);
  $scope.theText = content1;
    TTS
        .speak({
            text: $scope.theText,
            locale: 'en-US',
            rate: 1
        }, function () { console.log('success');
    },
    function (reason) {
    });

}

//delete
  $scope.deletecom = function (a){
    $http.get('https://renzo-baranda.000webhostapp.com/delete.php?id='+a).then(function(a){
      console.log(a);
      $http({
        url:"https://renzo-baranda.000webhostapp.com/getdata.php",
        method:"GET"
      })

    .then(function(response){

      console.log(response['data']);
      $scope.announcementlist = response['data'];
    });
    })
  }


    $scope.edits = function(id,name,desc){
      var data = [];
      data.push(id,name,desc);
      console.log(id+' '+name+' '+desc);
      localStorage.setItem('detailsa',JSON.stringify(data));
      console.log(data);
      $state.go('edit');
    }

  })
