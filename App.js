import React, { Component } from 'react';

import { Image, StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class LoginActivity extends Component {

  static navigationOptions =
    {
      title: 'Login Form',
    };

  constructor(props) {

    super(props)
    this.state = {

      UserEmail: '',
      UserPassword: ''

    }

  }

  RegisterFunction = () => {

    this.props.navigation.navigate('Third');
  }

  UserLoginFunction = () => {

    const { UserEmail } = this.state;
    const { UserPassword } = this.state;



    fetch('http://17.17.17.104/my-react/User_Login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: UserEmail,
        password: UserPassword

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === 'Data Matched') { this.props.navigation.navigate('Second', { Email: UserEmail }); }
        else { Alert.alert(responseJson); }

      }).catch((error) => {
        console.error(error);
      });


  }

  render() {
    let imagePath = { uri: 'https://www.upnjatim.ac.id/wp-content/uploads/2018/05/logoupnbaru.png' };

    return (

      <View style={styles.MainContainer}>
        <View style={styles.container}>
          <Image source={imagePath} style={{ width: 150, height: 150 }} /></View>

        <Text style={styles.TextComponentStyle}></Text>

        <TextInput placeholder="Enter User Email" onChangeText={UserEmail => this.setState({ UserEmail })} underlineColorAndroid='transparent' style={styles.TextInputStyleClass}
        />

        <TextInput placeholder="Enter User Password" onChangeText={UserPassword => this.setState({ UserPassword })} underlineColorAndroid='transparent' style={styles.TextInputStyleClass} secureTextEntry={true} />

        <Button title="Login" onPress={this.UserLoginFunction} color="green"  />
        <Text style={styles.TextComponentStyle}>______or_______</Text>
        <Button title="Register" onPress={this.RegisterFunction} color="green" />
      </View>

    );
  }
}

class ProfileActivity extends Component {

  static navigationOptions =
    {
      title: 'Profile',
    };


  render() {

    const { goBack } = this.props.navigation;

    return (
      <View style={styles.MainContainer}>
        <Text style={styles.TextComponentStyle}> {this.props.navigation.state.params.Email} </Text>
        <Button title="Logout" onPress={() => goBack(null)} />
      </View>
    );
  }
}

class RegisterActivity extends Component {

  constructor(props) {

    super(props)
    

    this.state = {

      UserName: '',
      UserEmail: '',
      UserPassword: ''

    }

  }

  static navigationOptions =
    {
      title: 'Register Form',
    };

  UserRegistrationFunction = () => {


    const { UserName } = this.state;
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;

    fetch('http://17.17.17.104/my-react/user_registration.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: UserName,
        email: UserEmail,
        password: UserPassword

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        Alert.alert(responseJson);
        this.props.navigation.navigate('First');
        

      }).catch((error) => {
        console.error(error);
      });


  }

  render() {
    let imagePath = {uri:'https://www.upnjatim.ac.id/wp-content/uploads/2018/05/logoupnbaru.png'};
    return (
      
      <View style={styles.MainContainer}>
        <View style={styles.container}>
        <Image source={imagePath} style={{width:150, height:150}} /></View>
        <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}></Text>
        <TextInput placeholder="User Name"  onChangeText={UserName => this.setState({ UserName })} underlineColorAndroid='transparent'  style={styles.TextInputStyleClass}
        />

        <TextInput placeholder="User Email" onChangeText={UserEmail => this.setState({ UserEmail })} underlineColorAndroid='transparent' style={styles.TextInputStyleClass}
        />

        <TextInput  placeholder="User Password" onChangeText={UserPassword => this.setState({ UserPassword })} underlineColorAndroid='transparent' style={styles.TextInputStyleClass} secureTextEntry={true}
        />

        <Button title="Register" onPress={this.UserRegistrationFunction} color="green" />

      </View>

    );
  }
}

const MainProject = createStackNavigator(
  {
    First: { screen: LoginActivity },
    Second: { screen: ProfileActivity },
    Third: { screen: RegisterActivity }

  });

export default createAppContainer(MainProject);

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',

  },
  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,

    borderColor: 'green',

    borderRadius: 5,

  },

  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: 'center',
    marginBottom: 15
  }
});