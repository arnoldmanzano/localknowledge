(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('MapsStylesService', [ function() {

    var self = this;
    var madColorsMapStyle;

    self.createStyledMap = function(){
      self.madColorsMapStyle = new google.maps.StyledMapType(light, {

                      name: 'Something A Bit Different?'
    });
  };

  var mondrianStyle = [
      // {
      //     "elementType": "labels",
      //     "stylers": [
      //         {
      //             "visibility": "on",
      //             "color": "rgb(35, 163, 75)"
      //         }
      //     ]
      // },
      {
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#E4F7F7"
              },
              {
                  "visibility": "on"
              },
              {
                  "weight": 0.9
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#0F0919"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#002FA7"
              }
          ]
      },
      {
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#E4F7F7"
              }
          ]
      },
      {
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#002FA7"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#E60003"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#fffd3"
              },
              {
                  "gamma": 9
              },
              {
                    "hue": "#FFED00"
              },
              {
                "saturation": 81
              },
              {
                "lightness": 63
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#FFED00"
              }
          ]
      },
      {
          "featureType": "poi.government",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#D41C1D"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "rgb(35, 163, 75)"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#BF0000"
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "saturation": -100
              }
          ]
      }
  ];

  var hipperThanHipster = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#004358"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1f8a70"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1f8a70"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fd7400"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1f8a70"
            },
            {
                "lightness": -20
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1f8a70"
            },
            {
                "lightness": -17
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            },
            {
                "weight": 0.9
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1f8a70"
            },
            {
                "lightness": -10
            }
        ]
    },
    {},
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1f8a70"
            },
            {
                "weight": 0.7
            }
        ]
    }
  ];

  var tooFewLines = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#27e2aa"
            }
        ]
    },
     {
         "featureType": "road",
         "elementType": "geometry",
         "stylers": [
             {
                 "visibility": "on"
             }
         ]
     },
     {
         "featureType": "all",
         "elementType": "labels.text",
         "stylers": [
             {
                 "visibility": "on"
             },
             {
                 "weight": 0.9
             }
            //  {
            //    "color": "#27e2aa"
            //  }
         ]
     },
     {
         "featureType": "all",
         "elementType": "labels.text.fill",
         "stylers": [
             {
                 "color": "#fba377"
             },
             {
                 "weight": 1.5
             }
         ]
     },
     {
         "featureType": "all",
         "elementType": "labels.text.stroke",
         "stylers": [
             {
                 "color": "#fba377"
             },
             {
                 "weight": 1.5
             }
         ]
     },
     {
         "featureType": "administrative",
         "elementType": "all",
         "stylers": [
             {
                 "visibility": "on"
             }
         ]
     },
     {
         "featureType": "landscape",
         "elementType": "all",
         "stylers": [
             {
                 "color": "#ffffff"
             },
             {
                 "visibility": "on"
             }
         ]
     },
     {
         "featureType": "poi",
         "elementType": "labels.text",
         "stylers": [
             {
                 "visibility": "on"
             }
         ]
     },
     {
         "featureType": "road",
         "elementType": "all",
         "stylers": [
             {
                 "visibility": "on"
             }
         ]
     },
     {
         "featureType": "road",
         "elementType": "geometry",
         "stylers": [
             {
                 "color": "#000000"
             },
             {
                 "weight": 0.1
             },
         ]
     },
    //  {
    //      "featureType": "road",
    //      "elementType": "geometry",
    //      "stylers": [
    //          {
    //            "color": "#000000"
    //          },
    //         //      "color": "#000000"
    //         //  },
    //          {
    //              "weight": 0.9
    //          }
    //      ]
    //  },
     {
         "featureType": "road",
         "elementType": "labels.icons",
         "stylers": [
             {
                 "visibility": "off"
             },

         ]
     },
     {
         "featureType": "transit",
         "elementType": "labels.icons",
         "stylers": [
             {
                 "visibility": "on"
             }
         ]
     },
     {
         "featureType": "water",
         "elementType": "all",
         "stylers": [
             {
                 "visibility": "on"
             }
         ]
     },

  ];

  var vintageDaaaarling = [
      {
          "featureType": "administrative",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "water",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "transit",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "stylers": [
              {
                  "color": "#84afa3"
              },
              {
                  "lightness": 52
              }
          ]
      },
      {
          "stylers": [
              {
                  "saturation": -17
              },
              {
                  "gamma": 0.36
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#3f518c"
              }
          ]
      }
  ];

  var theNamesBond = [
      {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#b0b1b2"
              },
              {
                  "saturation": "1"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#929e97"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#989899"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#8d8e8f"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "transit.station",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "transit.station.airport",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "transit.station.bus",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "transit.station.rail",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#6c8b98"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      }
  ];

  var simple = [
      {
        stylers: [
          { hue: "#00ffe6" },
          { saturation: -20 }
        ]
      },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      },{
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];


    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    // var mapOptions = {
    //   zoom: 11,
    //   center: new google.maps.LatLng(55.6468, 37.581),
    //   mapTypeControlOptions: {
    //     mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    //   }
    // };
    // var map = new google.maps.Map(document.getElementById('map'),
    //   mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.


    }]);
  }());

  var brownie = [
    {
      featureType: "all",
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        { hue: "#00ffee" },
        { saturation: 50 }
      ]
    },{
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  var light = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#FFBB00"
            },
            {
                "saturation": 43.400000000000006
            },
            {
                "lightness": 37.599999999999994
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "hue": "#FFC200"
            },
            {
                "saturation": -61.8
            },
            {
                "lightness": 45.599999999999994
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "hue": "#FF0300"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 51.19999999999999
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "hue": "#FF0300"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 52
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#0078FF"
            },
            {
                "saturation": -13.200000000000003
            },
            {
                "lightness": 2.4000000000000057
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "hue": "#00FF6A"
            },
            {
                "saturation": -1.0989010989011234
            },
            {
                "lightness": 11.200000000000017
            },
            {
                "gamma": 1
            }
        ]
    }
  ];
