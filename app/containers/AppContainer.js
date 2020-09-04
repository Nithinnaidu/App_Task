//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon_Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { fetchPeople } from '../redux/actions/peopleActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

const signIn = () => {
    Actions.about()
}

class AppContainer extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            content: [],
            check_textInputChange: false,
            secureTextEntry: true,
            isValidUser: true,
            isValidPassword: true,
        }
    }
    componentDidMount = () => {
        this.props.fetchPeople();
    }

    textInputChange = (val) => {
        const data = this.state;
        if (val.trim().length >= 6) {
            var user = this.props.randomPeople.people
            var Users = user.login
            const foundUser = Users.filter(item => {
                return val == item.username;
            });
            this.setState({
                ...data,
                username: val,
            });
            if (foundUser.length != 0) {
                this.setState({
                    check_textInputChange: true,
                    isValidUser: true
                })
            }
            else {
                this.setState({
                    check_textInputChange: false,
                    isValidUser: false
                })
            }
        } else {
            this.setState({
                ...data,
                username: val,
            });
        }
    }

    handlePasswordChange = (val) => {
        const data = this.state;
        if (val.trim().length >= 8) {
            this.setState({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            this.setState({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    updateSecureTextEntry = () => {
        const data = this.state;
        this.setState({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    handleValidUser = (val) => {
        const data = this.state;
        if (val.trim().length >= 4) {
            this.setState({
                ...data,
                isValidUser: true
            });
        } else {
            this.setState({
                ...data,
                isValidUser: false
            });
        }
    }

    loginHandle = (userName, password) => {
        const data = this.state;
        var user = this.props.randomPeople.people
        var Users = user.login
        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });
        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        if (foundUser.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                { text: 'Okay' }
            ]);
            return;
        }
        signIn(foundUser);
    }

    render() {
        const data = this.state;
        let contents = this.props.randomPeople.people
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome!</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: '#fff'
                    }]}
                >
                    <Text style={[styles.text_footer, {
                        color: '#009387'
                    }]}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={'#009387'}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: '#009387'
                            }]}
                            //autoFocus={true}
                            autoCapitalize="none"
                            onChangeText={(val) => this.textInputChange(val)}
                            onEndEditing={(e) => this.handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Username is incorrect.</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        color: '#009387',
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color={'#009387'}
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: '#009387'
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => this.handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={this.updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { this.loginHandle(data.username, data.password) }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        );
    }
}

AppContainer.PropTypes = {
    fetchPeople: PropTypes.func.isRequired,
    randomPeople: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => {
    return {
        randomPeople: state
    };
}

export default connect(mapStateToProps, { fetchPeople })(AppContainer);
