/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

var {DeviceEventEmitter} = React;

var Beacons = require('react-native-ibeacon');

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import indahouse from './src/components/Container';

// var PushNotification = require('react-native-push-notification');
//
// PushNotification.configure({
//
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function(token) {
//     console.log( 'TOKEN:', token );
//   },
//
//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function(notification) {
//     console.log( 'NOTIFICATION:', notification );
//   },
//
//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true
//   },
//
//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: false,
//
//   /**
//     * IOS ONLY: (optional) default: true
//     * - Specified if permissions will requested or not,
//     * - if not, you must call PushNotificationsHandler.requestPermissions() later
//     */
//   requestPermissions: true,
// });
//
// PushNotification.checkPermissions((permissions) => {
//   console.log(permissions);
// })
//
// PushNotification.localNotification({
//   message: "Welcome to Instamojo" // (required)
// });

// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
//
const IMOJO_BEACON_UUID = '74278BDA-B644-4520-8F0C-720EAF059935';
var region = {
    identifier: 'DAFLABS',
    uuid: IMOJO_BEACON_UUID,
    major: 4660,
    minor: 64001
};

// Request for authorization while the app is open
Beacons.requestAlwaysAuthorization();

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

// Listen for beacon changes
var subscription = DeviceEventEmitter.addListener(
  'beaconsDidRange',
  (data) => {
    // console.log(data);

    // data.region - The current region
    // data.region.identifier
    // data.region.uuid

    // data.beacons - Array of all beacons inside a region
    //  in the following structure:
    //    .uuid
    //    .major - The major version of a beacon
    //    .minor - The minor version of a beacon
    //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //    .accuracy - The accuracy of a beacon
  }
);

var regionDidEnter = DeviceEventEmitter.addListener(
  'regionDidEnter',
  (data) => {
    console.log('--------------------------regionDidEnter-------------------');
    console.log(data);
    console.log('--------------------------regionDidEnter-------------------');
  }
);

var regionDidExit = DeviceEventEmitter.addListener(
  'regionDidExit',
  (data) => {
    console.log('--------------------------regionDidExit-------------------');
    console.log(data);
    console.log('--------------------------regionDidExit-------------------');
  }
);


var subscription = DeviceEventEmitter.addListener('centralManagerDidUpdateState', bluetoothState => {
  // bluetoothState can either be "on", "off", "unknown", "unauthorized", "resetting" or "unsupported‚"
  //
  if (bluetoothState !== 'on') {
    Alert.alert('Bluetooth is required', 'Turn on the bluetooth')
  }
});


GoogleSignin.configure({
  iosClientId: '489906414923-l8drtch2c8dknhj28pdhffdosnjs50l7.apps.googleusercontent.com',
  webClientId: '489906414923-2fgju83qvpaottk7igjarir5uh1rkopd.apps.googleusercontent.com',
  offlineAccess: true
});


AppRegistry.registerComponent('indahouse', () => indahouse);
