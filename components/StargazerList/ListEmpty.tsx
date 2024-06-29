import { StyleSheet, View } from 'react-native'
import { Text } from '../shared/Text'

export function ListEmpty() {
  return (
    <View style={styles.container}>
      <Text accessibilityLabel="No stargazers found">
        There are no stargazers in this repository.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
