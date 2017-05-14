/**
 * Created by Dhaval Patel on 5/14/2017.
 */
(function(){ // IIFE = Immediately Invoked Function Expression
    angular
        .module("BlogApp", [])
        .controller("BlogPostListController", BlogPostListController);

    function BlogPostListController($scope, $http) {
        $scope.post = {title: 'Enter title here.', body: 'Enter body here.'}
        $scope.posts = [];

        function init() {
            findBlogPosts();
        }
        init();

        // event handlers
        $scope.deletePost = deletePost;
        $scope.addPost = addPost;
        $scope.selectPost = selectPost;
        $scope.updatePost = updatePost;

        function findBlogPosts() {
            $http.get('/api/post')
                .then(function(response){
                    $scope.posts = response.data;
                });
        }

        function deletePost(index) {
            // $scope.posts.splice(index, 1);
            $http
                .delete('/api/post/' + index)
                .then(findBlogPosts);
        }

        function addPost(post) {
            var newPost = {
                title: post.title,
                body: post.body,
                date: new Date()
            };
            $scope.posts.push(newPost);
            console.log($scope.posts);
        }

        function selectPost(index) {
            $scope.post = angular.copy($scope.posts[index]);
            $scope.index = index;
        }

        function updatePost(post) {
            $scope.posts[$scope.index] = angular.copy(post);
        }
    }
})();
