function keyboard() {
  'use strict';
  return {
    restrict: 'AE',
    link: function($scope, $element, $attrs) {
      var body = document.querySelector('body');
      var n = 0;
      body.onkeydown = function(e) {
        $('.arrow-selected').removeClass('arrow-selected');
        if (e.keyCode === 37) {
          $('#arrow-left').toggleClass('arrow-selected');
          $scope.digital.setMotors(1, -1);
        } else if (e.keyCode === 38) {
          $('#arrow-up').toggleClass('arrow-selected');
          $scope.digital.setMotors(1, 1);
        } else if (e.keyCode === 39) {
          $('#arrow-right').toggleClass('arrow-selected');
          $scope.digital.setMotors(-1, 1);
        } else if (e.keyCode === 40) {
          $('#arrow-down').toggleClass('arrow-selected');
          $scope.digital.setMotors(-1, -1);
        } else if (e.keyCode === 32) {
          $('.arrow-selected').removeClass('arrow-selected');
          $scope.digital.setMotors(0, 0);
        } else if (e.keyCode === 107) {
          $scope.digital.power += 10;
        } else if (e.keyCode === 109) {
          $scope.digital.power -= 10;
        } else if (e.keyCode === 106) {
          n++;
          var videoCanvas = document.getElementById('videoCanvas');
          download(videoCanvas, 'test' + n + '.png');
        }
        $scope.$digest();
      };

      function download(canvas, filename) {
        /// create an "off-screen" anchor tag
        var lnk = document.createElement('a'),
          e;
        /// the key here is to set the download attribute of the a tag
        lnk.download = filename;
        /// convert canvas content to data-uri for link. When download
        /// attribute is set the content pointed to by link will be
        /// pushed as "download" in HTML5 capable browsers
        lnk.href = canvas.toDataURL();
        /// create a "fake" click-event to trigger the download
        if (document.createEvent) {
          e = document.createEvent("MouseEvents");
          e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);
          lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
          lnk.fireEvent("onclick");
        }
      }

    }
  };
}

angular
  .module('ngDiddyborg')
  .directive('keyboard', keyboard);
