import React from 'react';
import {Button, StyleSheet, Text, View,TouchableOpacity} from 'react-native';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const App: React.FC<Props> = ({
  name,
  baseEnthusiasmLevel = 0,
}) => {
  const [enthusiasmLevel, setEnthusiasmLevel] = React.useState(
    baseEnthusiasmLevel,
  );

  const onIncrement = () =>
    setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () =>
    setEnthusiasmLevel(
      enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0,
    );
  const onPress = () =>
      setEnthusiasmLevel(enthusiasmLevel +2);

  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join('!') : '';

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Test Props & State {name}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
        <View style={styles.button}>
        <Button
          title="Decrease enthusiasm"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="red"
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Open Sans',
    margin: 16,
    color: '#fff',
  },
  button : {
    marginTop : 20
  },
  buttonText : {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Open Sans',
    margin: 16,
    color: '#fff',
  }
});

export default App;
