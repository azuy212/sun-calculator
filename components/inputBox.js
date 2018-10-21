import React from 'react';
import { Keyboard } from 'react-native';
import { Input } from 'react-native-elements';

export default props => {
	return (
		<Input
			leftIcon={props.leftIcon}
			label={props.label}
			labelStyle={{ color: 'white' }}
			containerStyle={{ marginVertical: 10 }}
			onChangeText={inputValue => props.onChangeText(inputValue)}
			value={props.InputValue}
			inputStyle={{
				marginLeft: 10,
				color: 'white',
			}}
			keyboardAppearance="light"
			placeholder={props.placeholder}
			autoFocus={false}
			autoCapitalize="none"
			autoCorrect={false}
			onSubmitEditing={() => {
				props.validateInputValue();
				Keyboard.dismiss()
			}}
			blurOnSubmit={false}
			placeholderTextColor="white"
			errorStyle={{
				textAlign: 'center',
				fontSize: 12,
			}}
			errorMessage={props.errorMessage}
		/>
	);
};
