angular.module('ng-transloadit', []).factory('Transloadit', ['$http', '$rootScope', '$timeout', function($http, $rootScope, $timeout) {
  $scope = $rootScope.$new();

  var TRANSLOADIT_API = 'https://api2-eu-west-1.transloadit.com/assemblies';

  return {
    options: null,
    upload: function(file, options) {
  
      this.options = options || {};
      this._validateOptions(this.options);

      this.options.signature(function(signatureValue) {

        options.params.auth.expires = signatureValue.expires;
        var paramsValue = angular.toJson(options.params);

        var formData = new FormData();
        formData.append('params', paramsValue);
        formData.append('signature', signatureValue.sig);
        formData.append(file.name, file);
        var bytesValue = new Uint8Array();
        function processing(reader) {
          var soFar;
          return reader.read().then(function (result) {
            if (result.done) {
              console.log('all done ' + soFar + ' bytes total');
              return;
            }
            var chunk = result.value;
            console.log('chunk', chunk.byteLength);
            soFar += chunk.byteLength;
            options.progress(soFar, 'still processing');

            return processing(reader);


          });
        }

          fetch(TRANSLOADIT_API, {
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: formData
          })
            .then(function (json) {

              var soFar = 0;
              contentLength = json.headers.get('Content-Length');
              options.progress(soFar, contentLength)
              options.processing();

              return processing(json.body.getReader());

            });
      });

    },

    _validateOptions: function(options) {
      // mandatory fields
      if (!options.signature) {
        throw new Error('must supply a signature function');
      }

      if (!options.uploaded) {
        throw new Error('must supply an uploaded callback');
      }

      if (!options.params) {
        throw new Error('must supply params');
      }

      if (!options.params.auth.key) {
        throw new Error('must supply a key');
      }

      // optional fields
      options.processing = options.processing || function() {};
      options.progress = options.progress || function() {};
      options.error = options.error || function() {};
    }
  };
}]);
