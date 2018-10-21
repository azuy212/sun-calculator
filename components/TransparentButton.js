import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
	return (
		<Button
			icon={<Icon name="crosshairs" size={15} color="white" />}
			title={props.buttonTitle}
			activeOpacity={1}
			underlayColor="transparent"
			onPress={props.handleButtonPress}
			loading={props.showLoading}
			loadingProps={{ size: 'small', color: 'white' }}
			disabled={props.isDisabled}
			buttonStyle={{
				height: 50,
				width: 250,
				backgroundColor: 'transparent',
				borderWidth: 2,
				borderColor: 'white',
				borderRadius: 30,
			}}
			containerStyle={{ marginVertical: 10 }}
			titleStyle={{
				fontWeight: 'bold',
				color: 'white',
			}}
		/>
	);
};
