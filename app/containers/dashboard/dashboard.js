import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, ScrollView, Alert, TouchableOpacity, BackHandler } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fetchPeople } from '../../redux/actions/peopleActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import colors from '../../appColors/appColors';
console.disableYellowBox = true;
const deviceWidth = Dimensions.get("window").width;

class DashboardView extends Component {
    static navigationOptions = {
        header: null
    };
    constructor() {
        super()
        this.state = {
            projectNameToDisplay: ''
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount = () => {
        this.props.fetchPeople();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        Alert.alert(
            "Exit", "Are you sure you want to exit ?",
            [
                {
                    text: "Cancel", onPress: () => { console.log("Cancel Pressed"); }, style: "cancel"
                },
                {
                    text: "ok", onPress: () => { return this.handleLogout(); }
                }
            ],
            { cancelable: false }
        );
        return true;
    }

    handleLogout = () => {
        BackHandler.exitApp()
    }

    render() {
        let contents = this.props.randomPeople.people
        var jsonData = contents.user
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor='#009387' barStyle="light-content" />
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 20, color: 'white', }}>
                                Dashboard
                                </Text>
                        </View>
                    </View>

                    {/* Body Data */}
                    <ScrollView horizontal={true}>
                        <View style={{ paddingTop: '10%', padding: 16 }}>
                            <View style={styles.rowViewHeader}>
                                <View style={styles.headerId}>
                                    <Text style={styles.headerText}>
                                        ID
                                    </Text>
                                </View>
                                <View style={styles.headerStyle} >
                                    <Text style={styles.headerText}>
                                        Name
                                 </Text>
                                </View>
                                <View style={styles.headerStyle} >
                                    <Text style={styles.headerText}>
                                        Age
                                 </Text>
                                </View>
                                <View style={styles.headerStyle} >
                                    <Text style={styles.headerText}>
                                        Gender
                                 </Text>
                                </View>
                                <View style={styles.emailStyle}>
                                    <Text style={styles.headerText}>
                                        Email
                                 </Text>
                                </View>
                                <View style={styles.phoneStyle}>
                                    <Text style={styles.headerText}>
                                        Phone No:
                                 </Text>
                                </View>
                            </View>
                            <View >
                                {jsonData.map((columnData, index) =>
                                    <View style={styles.rowViewHeader}>
                                        <View style={styles.headerId}>
                                            <Text style={styles.headerText}>
                                                {columnData.id}
                                            </Text>
                                        </View>
                                        <View style={styles.headerStyle} >
                                            <Text style={styles.tableText}>
                                                {columnData.name}
                                            </Text>
                                        </View>
                                        <View style={styles.headerStyle} >
                                            <Text style={styles.tableText}>
                                                {columnData.age}
                                            </Text>
                                        </View>
                                        <View style={styles.headerStyle} >
                                            <Text style={styles.tableText}>
                                                {columnData.gender}
                                            </Text>
                                        </View>
                                        <View style={styles.emailStyle}>
                                            <Text style={styles.tableText}>
                                                {columnData.email}
                                            </Text>
                                        </View>
                                        <View style={styles.phoneStyle}>
                                            <Text style={styles.tableText}>
                                                {columnData.phoneNo}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider >
        );
    }
}

DashboardView.PropTypes = {
    fetchPeople: PropTypes.func.isRequired,
    randomPeople: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    phoneStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.65,
        borderColor: colors.borderColor,
        height: 'auto',
        width: 120,
    },
    emailStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.65,
        borderColor: colors.borderColor,
        height: 'auto',
        width: 200,
    },
    headerId: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.65,
        borderColor: colors.borderColor,
        height: 'auto',
        width: 30,
    },
    headerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.65,
        borderColor: colors.borderColor,
        height: 'auto',
        width: 80,
    },
    headerText: {
        fontWeight: 'bold',
        margin: 6
    },
    tableText: {
        fontWeight: 'normal',
        margin: 6
    },
    rowViewHeader: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 52,
        backgroundColor: colors.borderColor,
    },
});

const mapStateToProps = state => {
    return {
        randomPeople: state
    };
}

export default connect(mapStateToProps, { fetchPeople })(DashboardView);
