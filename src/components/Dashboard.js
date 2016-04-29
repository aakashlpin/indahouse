import React, {
  View,
  Text,
 } from 'react-native';

import { connect } from 'react-redux';

class Dashboard extends React.Component {
  render () {
    const { props } = this.props.beacon;
    if (props.accuracy > 0) {
      return (
        <View>
          <Text>You're in Office!</Text>
        </View>
      )
    }

    return (
      <View>
        <Text>Enjoy!</Text>
      </View>
    )
  }

}

function mapStateToProps (state) {
  const {beacon} = state;
  return {
    beacon
  }
}

export default connect(mapStateToProps)(Dashboard);
