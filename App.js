import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './components/mainScreen';

export default class App extends React.Component {
	state = {
		errorMessage: '',
	};
	handleInputKeyPress = () => {};
	render() {
		return (
			<View style={styles.container}>
				<MainScreen />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	selectCityView: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		borderWidth: 2,
	},
});
