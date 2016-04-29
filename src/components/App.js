import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import { connect } from 'react-redux';

import {
  GoogleSignin,
  GoogleSigninButton
} from 'react-native-google-signin';

import {
  handleAuthSuccess
} from '../actions/AuthActions';

import RegionMarker from './RegionMarker';

GoogleSignin.configure({
  iosClientId: '489906414923-l8drtch2c8dknhj28pdhffdosnjs50l7.apps.googleusercontent.com',
  webClientId: '489906414923-2fgju83qvpaottk7igjarir5uh1rkopd.apps.googleusercontent.com',
  offlineAccess: true
});

class indahouse extends Component {
  componentDidMount () {
    GoogleSignin.currentUserAsync().then((user) => {
      this.props.handleAuthSuccess(user);
    }).done();
  }

  _signIn () {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.props.handleAuthSuccess(user);
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
      this.props.handleAuthFailure(err);
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

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.auth.user ? (
            <View>
              <RegionMarker />
            </View>
          ) : this._renderSigninButton()
        }
      </View>
    );
  }
}

function mapStateToProps (state) {
  const { auth } = state;
  return {
    auth
  }
}

export default connect(mapStateToProps, {
  handleAuthSuccess
})(indahouse);

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
