import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import styles from './app.style';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number>(0);
  const [unit, setUnit] = useState<string>('metric'); // metric or imperial

  const calculateBmi = () => {
    let heightNum = Number(height);
    let weightNum = Number(weight);

    if (unit === 'imperial') {
      heightNum = heightNum * 2.54; // convert inches to centimeters
      weightNum = weightNum * 0.453592; // convert pounds to kilograms
    }

    let bmiNum = weightNum / Math.pow(heightNum / 100, 2);
    bmiNum = Math.round(bmiNum * 100) / 100;

    setBmi(bmiNum);
  };

  const getBmiCategory = () => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Height ({unit === 'metric' ? 'cm' : 'in'})</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Weight ({unit === 'metric' ? 'kg' : 'lb'})</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={unit}
          onValueChange={(itemValue) => setUnit(itemValue)} // This function can infer the type of itemValue automatically
          style={styles.picker}
          dropdownIconColor='#fff'>
          <Picker.Item label="kg/cm" value="metric" />
          <Picker.Item label="lb/in" value="imperial" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={calculateBmi}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
      {bmi > 0 && (
        <View>
          <Text style={styles.result}>Your BMI is {bmi}</Text>
          <Text style={styles.category}>{getBmiCategory()}</Text>
        </View>
      )}
    </View>
  );
};

export default BMICalculator;