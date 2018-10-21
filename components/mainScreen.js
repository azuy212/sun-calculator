import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Dimensions,
} from 'react-native';

import { Font } from 'expo';
import InputBox from './inputBox';
import TransparentButton from './TransparentButton';

import * as SunCalc from 'suncalc';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/images/bg_screen4.jpg');

const defaultText = {
  latLong: 'Finding...',
  sunriseSunset: 'Calculating...'
}

export default class SunCalculator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fontLoaded: false,
			latitude: defaultText.latLong,
			longitude: defaultText.latLong,
			loading_failed: false,
			showLoading: false,
			latErrorMessage: '',
			lonErrorMessage: '',
			sunrise: defaultText.sunriseSunset,
			sunset: defaultText.sunriseSunset,
		};

		this.loadGPSCoordinates = this.loadGPSCoordinates.bind(this);
		this.validateLatitude = this.validateLatitude.bind(this);
		this.validateLongitude = this.validateLongitude.bind(this);
	}

	async componentDidMount() {
		await Font.loadAsync({
			georgia: require('../assets/fonts/Georgia.ttf'),
			regular: require('../assets/fonts/Montserrat-Regular.ttf'),
			light: require('../assets/fonts/Montserrat-Light.ttf'),
			bold: require('../assets/fonts/Montserrat-Bold.ttf'),
		});
		this.setState({ fontLoaded: true });

		this.getGPSCoordinates();
	}

	getGPSCoordinates() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({
					latitude: position.coords.latitude.toString(10),
					longitude: position.coords.longitude.toString(10),
					showLoading: false,
        });
        this.calculateSunriseAndSunset();
			},
			error => this.setState({ errorMessage: error.message })
		);
	}

	validateLatitude() {
		const lat = this.state.latitude;
		this.setState({
			latErrorMessage:
				lat <= 85 && lat >= -85
					? ''
					: 'Latitude Out of range (-85 to 85)',
		});
	}

	validateLongitude() {
		const long = this.state.longitude;
		return long <= 180 && long >= -180;
	}

	loadGPSCoordinates() {
		this.setState({
			showLoading: true,
			latitude: defaultText.latLong,
      longitude: defaultText.latLong,
      sunrise: defaultText.sunriseSunset,
      sunset: defaultText.sunriseSunset
		});

		this.getGPSCoordinates();
	}

	calculateSunriseAndSunset() {
		const sunLightTimes = SunCalc.getTimes(
			new Date(),
			parseFloat(this.state.latitude),
			parseFloat(this.state.longitude),
    );
    
    this.setState({
      sunrise: sunLightTimes.sunrise.toLocaleTimeString(),
      sunset: sunLightTimes.sunset.toLocaleTimeString()
    })
	}

	render() {
		const { showLoading } = this.state;

		return (
			<View style={styles.container}>
				<ImageBackground source={BG_IMAGE} style={styles.bgImage}>
					{this.state.fontLoaded ? (
						<View style={styles.cityView}>
							<View style={styles.cityTitle}>
								<Text style={styles.appTitle}>
									Sunrise & Sunset
								</Text>
							</View>
							<View style={styles.gpsInput}>
								<InputBox
									leftIcon={
										<Text style={styles.inputBoxTitle}>
											Latitude:
										</Text>
									}
									onChangeText={latitude =>
										this.setState({ latitude })
									}
									InputValue={this.state.latitude}
									placeHolder="Latitude"
									validateInputValue={this.validateLatitude}
									errorMessage={this.state.latErrorMessage}
								/>
								<InputBox
									leftIcon={
										<Text style={styles.inputBoxTitle}>
											Longitude:
										</Text>
									}
									onChangeText={longitude =>
										this.setState({ longitude })
									}
									InputValue={this.state.longitude}
									placeHolder="Longitude"
									validateInputValue={this.validateLongitude}
									errorMessage={this.state.lonErrorMessage}
								/>
							</View>
							<TransparentButton
								buttonTitle="Get Coordinates"
								handleButtonPress={this.loadGPSCoordinates}
								showLoading={showLoading}
								isDisabled={false}
							/>
							<View style={styles.sunCalcOutputContainer}>
								<View style={styles.sunCalcOutputView}>
									<Text style={styles.sunCalcOutputText}>
										Sunrise
									</Text>
									<Text style={styles.sunCalcOutputValueText}>
										{this.state.sunrise}
									</Text>
								</View>
								<View style={styles.sunCalcOutputView}>
									<Text style={styles.sunCalcOutputText}>
										Sunset
									</Text>
									<Text style={styles.sunCalcOutputValueText}>
										{this.state.sunset}
									</Text>
								</View>
							</View>
						</View>
					) : (
						<Text>Loading...</Text>
					)}
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgImage: {
		flex: 1,
		top: 0,
		left: 0,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputBoxTitle: {
		color: 'white',
		fontFamily: 'bold',
	},
	cityView: {
		// marginTop: 150,
		backgroundColor: 'transparent',
		// width: 250,
		// height: 400,
	},
	cityTitle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	appTitle: {
		color: 'white',
		fontSize: 30,
		fontFamily: 'bold',
	},
	gpsInput: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sunCalcOutputContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	sunCalcOutputView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	sunCalcOutputText: {
		color: 'white',
		fontFamily: 'bold',
		fontSize: 20,
	},
	sunCalcOutputValueText: {
		color: 'white',
		fontSize: 18,
	},
});
