import React, {useState,Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
 
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
 
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color:"#7d53ea"
  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});

class App extends Component {
    state = { 
        vcodeTxt:""
    }
    onVcodeChangeText=(vcodeTxt)=>{
       this.setState({vcodeTxt})
    }
    render() {
        return (
            <SafeAreaView>
              <CodeField
                value={this.state.vcodeTxt}
                onChangeText={this.onVcodeChangeText}
                cellCount={6}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              </SafeAreaView>
          );
    }
}

export default App;