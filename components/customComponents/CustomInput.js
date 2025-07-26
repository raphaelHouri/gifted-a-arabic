import React from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  subtitle,
  secureTextEntry=false,
  keyboardType= "default"
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              {borderColor: error ? 'red' : '#e8e8e8',direction: "rtl"},
            ]}>
              {subtitle && <Text style={styles.inputLabel}>{subtitle}</Text>}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#6b7280"
              style={styles.input}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              textAlign={'center'}

            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch', textAlign: Platform.OS =='web'? 'right' : 'left'}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign:Platform.OS =="web"? 'right':'left'
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    marginTop: 4,
    textAlign:Platform.OS =="web"? 'right':'left'
  },
});

export default CustomInput;