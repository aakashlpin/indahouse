import React, {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';

import {
  handleBeaconUpdates,
  initializeNormalizingSpot
} from '../actions/BeaconActions';

const { DeviceEventEmitter } = React;
const Beacons = require('react-native-ibeacon');

class RegionMarker extends React.Component {
  componentDidMount () {
    // Request for authorization while the app is open
    //
    const { region } = this.props.beacon;
    Beacons.requestAlwaysAuthorization();

    Beacons.startMonitoringForRegion(region);
    Beacons.startRangingBeaconsInRegion(region);

    Beacons.startUpdatingLocation();

    // Listen for beacon changes
    DeviceEventEmitter.addListener(
      'beaconsDidRange', data => {
        this.props.handleBeaconUpdates(data);
      });
  }

  _onPressMarkSpot () {
    console.log('_onPressMarkSpot')
  }

  _onPressMarkSpot () {
    this.props.initializeNormalizingSpot();
  }

  render () {
    const { props, isMarkingRegion } = this.props.beacon;

    if (isMarkingRegion) {
      const { timePending } = this.props.beacon;
      return (
        <View>
          <Text>Please Wait..</Text>
          <Text>{timePending} seconds</Text>
        </View>
      )
    }

    return (
      <TouchableHighlight onPress={() => this._onPressMarkSpot()}>
        <View style={{width: 250, height: 60, backgroundColor: '#1990B8', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{margin:30, textAlign: 'center', color: '#fff', fontSize: 24}}>This is my spot!</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

function mapStateToProps (state) {
  const { beacon } = state;
  return {
    beacon
  };
}

export default connect(mapStateToProps, {
  handleBeaconUpdates,
  initializeNormalizingSpot
})(RegionMarker);
