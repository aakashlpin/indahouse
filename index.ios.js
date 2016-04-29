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

class indahouse extends Component {
  constructor () {
    super();
    this.state = {
      loading: true,
      user: null
    };
  }

  componentDidMount () {
    const user = GoogleSignin.currentUser();
    this.setState({user: user});
  }

  _signIn () {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
        this.setState({user: user});
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  _renderSigninButton () {
    return (
      <GoogleSigninButton
        style={{width: 48, height: 48}}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn.bind(this)}
      />
    )
  }

  _renderApp () {
    return (
      <View>
        <Text>{this.state.user.name}</Text>
      </View>

    )
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.user ?
            this._renderApp() : this._renderSigninButton()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('indahouse', () => indahouse);
