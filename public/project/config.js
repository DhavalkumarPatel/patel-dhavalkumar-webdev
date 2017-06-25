(function () {
    angular
        .module('OFM')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/financialAccount', {
                templateUrl: 'views/admin/templates/admin-financialAccount.view.client.html',
                controller: 'adminFinancialAccountsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/followUser', {
                templateUrl: 'views/followUser/templates/followUser-list.view.client.html',
                controller: 'followUserListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/followUser/new', {
                templateUrl: 'views/followUser/templates/followUser-new.view.client.html',
                controller: 'followUserNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/user/public/:publicUserId', {
                templateUrl: 'views/user/templates/profile-public.view.client.html',
                controller: 'publicProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/balance', {
                templateUrl: 'views/balance/templates/balance.view.client.html',
                controller: 'balanceController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/financialAccount', {
                templateUrl: 'views/financialAccount/templates/financialAccount-list.view.client.html',
                controller: 'financialAccountListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/financialAccount/new', {
                templateUrl: 'views/financialAccount/templates/financialAccount-new.view.client.html',
                controller: 'financialAccountNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH
                }
            })
            .when('/financialAccount/:financialAccountId', {
                templateUrl: 'views/financialAccount/templates/financialAccount-edit.view.client.html',
                controller: 'financialAccountEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH
                }
            })
            .when('/financialAccount/:financialAccountId/yodleeTransaction', {
                templateUrl: 'views/transaction/templates/yodleeTransaction-list.view.client.html',
                controller: 'yodleeTransactionListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/financialAccount/:financialAccountId/yodleeTransaction/:transactionId', {
                templateUrl: 'views/transaction/templates/yodleeTransaction-detail.view.client.html',
                controller: 'yodleeTransactionDetailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/financialAccount/:financialAccountId/transaction', {
                templateUrl: 'views/transaction/templates/transaction-list.view.client.html',
                controller: 'transactionListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/financialAccount/:financialAccountId/transaction/new', {
                templateUrl: 'views/transaction/templates/transaction-new.view.client.html',
                controller: 'transactionNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/financialAccount/:financialAccountId/transaction/:transactionId', {
                templateUrl: 'views/transaction/templates/transaction-edit.view.client.html',
                controller: 'transactionEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            })
            .when('/familyMember', {
                templateUrl: 'views/familyMember/templates/family-member.view.client.html',
                controller: 'familyMemberController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkHH_FM
                }
            });
    }
    
    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkHH_FM(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkHH_FM()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkHH(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .checkHH()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
    
    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();
        
        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
})();