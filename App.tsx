import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Colors } from './ui/constants';
import { ArrowUpLeft, HeartIcon, UserIcon } from './ui/icons';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeartIcon color={Colors.skooveRed} />
      <UserIcon
        color={Colors.skooveBlue}
        backgroundColor={Colors.skooveLightBlue}
      />
      <ArrowUpLeft color={Colors.primary_700} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.skooveWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
