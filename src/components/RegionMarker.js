import React, {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';

import {
  handleBeaconUpdates,
  initializeNormalizingSpot,
  markUserHappyWithSpot
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
    this.props.initializeNormalizingSpot();
  }

  _gotoDashboard () {
    this.props.markUserHappyWithSpot();
  }

  _recalibrate () {
    this.props.initializeNormalizingSpot();
  }

  render () {
    const { props, isMarkingRegion, isSpotMarked } = this.props.beacon;

    if (isSpotMarked) {
      const { spotAccuracy } = this.props.beacon;
      return (
        <View style={{width: 300, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginBottom: 40}}>
            <Text>Your spot is</Text>
            <Text style={{fontSize: 40}}>~{spotAccuracy}m</Text>
            <Text>from beacon</Text>
          </View>

          <TouchableHighlight onPress={() => this._gotoDashboard()}>
            <View style={{width: 200, height: 48, backgroundColor: '#1990B8', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Looks Good!</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._recalibrate()}>
            <View style={{width: 200, height: 48, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontSize: 16, color: '#1990B8'}}>Recalibrate</Text>
            </View>
          </TouchableHighlight>
        </View>
      )
    }

    if (isMarkingRegion) {
      const { timePending } = this.props.beacon;
      return (
        <View style={{width: 300, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Calibrating your device..</Text>
          <Text style={{fontSize: 40}}>{timePending}s</Text>
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
  initializeNormalizingSpot,
  markUserHappyWithSpot
})(RegionMarker);
