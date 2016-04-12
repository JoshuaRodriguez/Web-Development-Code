(function() {
    var app = angular.module('myList', []);

    var isCompleted = false;
    var isDragged = false;
    var myTodoList = [];
    var selectedCards = [];

    app.controller('ListController', function($scope) {
        this.list = myTodoList;
        this.checkedItems = selectedCards;

        this.deleteSelected = function() {
          var self = this;
          this.checkedItems.forEach(function(task) {
            self.list.splice(self.list.indexOf(task), 1);
          });
          this.checkedItems = [];
        }

        this.toggleClass = function(toggle, task) {
          var self = this;
          var index = 0;
          var isToggled = toggle;

          if(this.checkedItems.length == 0) {
            this.checkedItems.push(task);
            return !toggle;
          }

          this.checkedItems.forEach(function(x) {
            if(x === task) {
              self.checkedItems.splice(self.checkedItems.indexOf(task), 1);
              isToggled = !toggle;
            } else if(index == self.checkedItems.length - 1) {
              self.checkedItems.push(task);
              isToggled = !toggle;
            }
            index++;
          });

          return isToggled;
        };

        this.deleteAll = function() {
            this.list = [];
        }

        this.addTask = function(task) {
            this.list.push(task);
            $scope.aTask = '';
        }
    });

    app.directive('taskCard', function() {
      return {
        restrict: 'E',
        templateUrl: '/angular/task-card.html'
      };
    });

    app.directive('ngDraggable', function($document) {
        return {
            restrict: 'A',
            scope: {
                dragOptions: '=ngDraggable'
            },
            link: function(scope, element, attr) {
              var startX = 0, startY = 0, x = 0, y = 0;

              element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
              });

              function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                  top: y + 'px',
                  left:  x + 'px'
                });
              }

              function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
              }
            }
          }
        });
})();
