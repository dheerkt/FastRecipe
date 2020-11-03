import React from "react";
import { StyleSheet, Text, View } from 'react-native';

class AccountScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Account</Text>
            </View>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
  
export default AccountScreen;
  