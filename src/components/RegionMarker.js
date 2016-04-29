import React, {
  View,
  Text
} from 'react-native';

import { connect } from 'react-redux';

import {
  handleBeaconUpdates
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

  render () {
    const { props } = this.props.beacon;
    return (
      <View>
        <Text>{props.accuracy} meters</Text>
      </View>
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
  handleBeaconUpdates
})(RegionMarker);
