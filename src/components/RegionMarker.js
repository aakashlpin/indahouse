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
    var subscription = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.props.handleBeaconUpdates(data);
        console.log(data);

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
