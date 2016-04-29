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

// var subscription = DeviceEventEmitter.addListener('centralManagerDidUpdateState', bluetoothState => {
//   // bluetoothState can either be "on", "off", "unknown", "unauthorized", "resetting" or "unsupported‚"
//   //
//   if (bluetoothState !== 'on') {
//     Alert.alert('Bluetooth is required', 'Turn on the bluetooth')
//   }
// });


AppRegistry.registerComponent('indahouse', () => indahouse);
