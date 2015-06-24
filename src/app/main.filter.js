angular
  .module('NashMatch')

  .filter('objToArr', function () {
    return function (obj) {
      if (obj) {
        return Object
          .keys(obj)
          .map(function (key) {
            obj[key]._id = key; //stores simplelogin:#
            return obj[key]; //whole obj as array
          });
      }
    }
  })
